const FS = require("fs");
const PATH = require("path");
const AWS = require("aws-sdk");

const EHANLIN_S3_ID = process.env.EHANLIN_S3_ID;
const EHANLIN_S3_KEY = process.env.EHANLIN_S3_KEY;
const TRAVIS_TAG = process.env.TRAVIS_TAG;

AWS.config.update({
  accessKeyId: EHANLIN_S3_ID,
  secretAccessKey: EHANLIN_S3_KEY
});
const AWS_S3 = new AWS.S3();

/**
 * 更改ehanlin html上傳到S3的css路徑
 */
var cssMapPath = new Map();
cssMapPath.set("header", "ehanlin_header.html");
cssMapPath.set("footer", "ehanlin_footer.html");
cssMapPath.set("eventLeftSide", "ehanlin_event_left_side.html");
cssMapPath.set("infoLeftSide", "ehanlin_info_left_side.html");
cssMapPath.set("menu", "ehanlin_menu.html");

cssMapPath.forEach(function(item, key, mapObj) {
  var folderName = key.toString();
  var htmlFileName = item.toString();
  var changeFilePath = `./${folderName}/destination/${htmlFileName}`; //取得相對的路徑
  //var changeFilePath = `./tempOutput/${fileHtmlName}`; //測試的檔案路徑
  var filePath = PATH.join(__dirname, `${changeFilePath}`); // 取得html的位址

  var readHtmlFileAndChangeCurrentPath = () => {
    FS.readFile(filePath, "UTF-8", function(err, data) {
      if (!err) {
        if (data.includes("current.SNAPSHOT")) {
          var changeCurrentPath = data.replace(
            /common_webcomponent\/current\.SNAPSHOT/g,
            "common_webcomponent/current"
          );
        } else if (data.includes("current")) {
          var changeCurrentPath = data.replace(
            /common_webcomponent\/current/g,
            "common_webcomponent/current.SNAPSHOT"
          );
        }
        writeHtmlFileToFolder(folderName, htmlFileName, changeCurrentPath);
      } else {
        console.log(err);
      }
    });
  };

  var writeHtmlFileToFolder = (folderName, htmlFileName, changePath) => {
    var fileContent = changePath; // changePath content type is String
    FS.writeFile(
      `./${folderName}/destination/${htmlFileName}`, // 讓data寫進folder
      fileContent,
      "UTF-8",
      err => {
        if (err) throw err;

        console.log("The html file was succesfully saved!");
      }
    );
  };
  readHtmlFileAndChangeCurrentPath();
});

/**
 * 更改ehanlin js上傳到S3的css路徑
 */
var jsMapPath = new Map();
jsMapPath.set("js", "ehanlin-loader.js");

jsMapPath.forEach(function(item, key, mapObj) {
  var folderName = key.toString();
  var jsFileName = item.toString();
  var changeFilePath = `./${folderName}/destination/${jsFileName}`; //取得相對的路徑
  var filePath = PATH.join(__dirname, `${changeFilePath}`); // 取得html的位址

  var readJsFileAndChangeCurrentPath = () => {
    FS.readFile(filePath, "UTF-8", function(err, data) {
      if (!err) {
        if (data.includes("current.SNAPSHOT")) {
          var changeCurrentPath = data.replace(/current\.SNAPSHOT/g, "current");
        } else if (data.includes("current")) {
          var changeCurrentPath = data.replace(/current/g, "current.SNAPSHOT");
        }
        writeJsFileToFolder(folderName, jsFileName, changeCurrentPath);
      } else {
        console.log(err);
      }
    });
  };

  var writeJsFileToFolder = (folderName, jsFileName, changePath) => {
    var fileContent = changePath; // changePath content type is String
    FS.writeFile(
      `./${folderName}/destination/${jsFileName}`, // 讓data寫進folder
      fileContent,
      "UTF-8",
      err => {
        if (err) throw err;

        console.log("The js file was succesfully saved!");
      }
    );
  };
  readJsFileAndChangeCurrentPath();
});
