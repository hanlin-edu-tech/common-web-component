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

// 尋找存在於 S3 common_webcomponent 的最新版本目錄
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
      findDist(__dirname);
    }
  };

  AWS_S3.listObjectVersions(params, retrieve);
};

// 尋找目標資料夾
var findDist = dir => {
  FS.readdir(dir, (err, files) => {
    var entireFilePath;
    if (determineFileEmpty(files)) return;

    files.forEach(fileName => {
      entireFilePath = PATH.join(dir, fileName);
      if (fileName !== "destination") {
        if (FS.statSync(entireFilePath).isDirectory()) {
          findDist(entireFilePath);
          return;
        }
      } else {
        // destination 的前一層目錄
        var saveDir = PATH.basename(dir);
        firstUpload(dir, saveDir);
      }
    });
  });
};

// 上傳檔案
var firstUpload = (dir, saveDir) => {
  FS.readdir(dir, (err, files) => {
    if (determineFileEmpty(files)) return;

    files.forEach(fileName => {
      var pathKey = keyUpload => {
        // 將當前路徑到 dist 的位置，以前一層目錄取代
        var suffixPath = entireFilePath.replace(
          /[\w\/-]*(destination)/,
          saveDir
        );
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

      entireFilePath = PATH.join(dir, fileName);
      if (FS.statSync(entireFilePath).isDirectory()) {
        firstUpload(entireFilePath, saveDir);
        return;
      }
      pathKey(key);
      pathKey(key);
    });
  });
};

// 判斷檔案是否為空
var determineFileEmpty = files => {
  if (!files || files.length === 0) {
    console.log(`${files} is not found or empty...`);
    return true;
  }

  return false;
};

var prefixPath;
if (!TRAVIS_TAG) findExistedLastVersionDir();
else {
  prefixPath = `common_webcomponent/${TRAVIS_TAG}/`;
  prefixPath = `common_webcomponent/current/`;
  findDist(__dirname);
}
