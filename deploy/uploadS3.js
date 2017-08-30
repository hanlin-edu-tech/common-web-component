const AWS = require("aws-sdk");
const FS = require("fs");
const PATH = require("path");
const EHANLIN_S3_ID = process.env.EHANLIN_S3_ID;
const EHANLIN_S3_KEY = process.env.EHANLIN_S3_KEY;
const TRAVIS_TAG = process.env.TRAVIS_TAG;

AWS.config.update({
  accessKeyId: EHANLIN_S3_ID,
  secretAccessKey: EHANLIN_S3_KEY
});
const AWS_S3 = new AWS.S3();

/*
 * 尋找存在於 S3 common_webcomponent 的最新版本目錄
 */
var findExistedLastVersionDir = () => {
  var params = {
    Bucket: "ehanlin-web-resource",
    KeyMarker: "common_webcomponent",
    Prefix: "common_webcomponent/v",
    Delimiter: "/"
  };

  var retrieve = (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      // targetDir = common_webcomponent/vX.X.X
      prefixPath = data.CommonPrefixes[data.CommonPrefixes.length - 1].Prefix;
      findDist(sourceDir);
    }
  };

  AWS_S3.listObjectVersions(params, retrieve);
};

/*
 * 尋找目標資料夾
 */
var findDist = dir => {
  FS.readdir(dir, (err, files) => {
    var entireFilePath, saveDir;
    if (determineFileEmpty(files)) return;

    files.forEach(fileName => {
      entireFilePath = PATH.join(dir, fileName);
      if (fileName !== "destination") {
        if (FS.statSync(entireFilePath).isDirectory()) {
          findDist(entireFilePath);
          return;
        }
      } else {
        // 讀取路徑含有 destination 的目錄
        saveDir = PATH.basename(dir);
        listDestinationPath(dir, saveDir);
      }
    });
  });
};

/*
 * 一一列舉讀取含有 destination 路徑的所有目錄與檔案
 * 並將檔案上傳至 AWS S3
 */
var listDestinationPath = (dir, saveDir) => {
  FS.readdir(dir, (err, files) => {
    var upload = (fileName, prefixPath, entireFilePath) => {
      // 將當前路徑到 destination 的位置，以前一層目錄 ${saveDir} 取代
      // firstDir/second/third/destination => firstDir/second/third
      var suffixPath = entireFilePath.replace(/[\w\/-]*(destination)/, saveDir);
      var key = `${prefixPath}${suffixPath}`;
      var params = {
        Bucket: "ehanlin-web-resource",
        Body: FS.readFileSync(entireFilePath),
        Key: key,
        ACL: "public-read"
      };

      if (fileName.substr(-3) === ".js") {
        params.ContentType = "application/x-javascript";
      } else if (fileName.substr(-4) === ".css") {
        params.ContentType = "text/css";
      }

      AWS_S3.putObject(params)
        .on("httpUploadProgress", function(progress) {
          // 上傳的進程
          console.log(
            `upload to ${key}, ${progress.loaded} of ${progress.total} bytes`
          );
        })
        .send((err, data) => {
          if (err) console.log("err is " + err);
        });
    };

    if (determineFileEmpty(files)) return;

    if (!TRAVIS_TAG) {
      files.forEach(fileName => {
        var currentSnapshotDir;
        if (isMac_DSstore(fileName)) return;

        entireFilePath = PATH.join(dir, fileName);
        if (FS.statSync(entireFilePath).isDirectory()) {
          listDestinationPath(entireFilePath, saveDir);
          return;
        }
        // upload(fileName, prefixPath, entireFilePath);
        currentSnapshotDir = `common_webcomponent/current.SNAPSHOT/`;
        upload(fileName, currentSnapshotDir, entireFilePath); //upload to current.SNAPSHOT folder
      });
    } else {
      for (var i = 0; i < files.length; i++) {
        var currentDir;
        var fileName = files[i];
        entireFilePath = PATH.join(dir, fileName);

        if (FS.statSync(entireFilePath).isDirectory()) {
          listDestinationPath(entireFilePath, saveDir);
          return;
        }
        upload(fileName, prefixPath, entireFilePath); //upload to tag folder
        currentDir = `common_webcomponent/current/`;
        upload(fileName, currentDir, entireFilePath); //upload to current folder
      }
    }
  });
};

/* 
 * 判斷檔案是否為空
 */
var determineFileEmpty = files => {
  if (!files || files.length === 0) {
    console.log(`${files} is not found or empty...`);
    return true;
  }

  return false;
};

/*
 * 略過 mac OS 檔案系統下的 DS_Store
 */
var isMac_DSstore = fileName => {
  if (fileName === ".DS_Store") {
    return true;
  }

  return false;
};

var prefixPath;
var sourceDir = PATH.join(__dirname, "../");

if (!TRAVIS_TAG) findExistedLastVersionDir();
else {
  prefixPath = `common_webcomponent/${TRAVIS_TAG}/`;
  findDist(sourceDir);
}
