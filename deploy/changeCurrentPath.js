const FS = require("fs");
const PATH = require("path");
const AWS = require("aws-sdk");
const EHANLIN_S3_ID = process.env.EHANLIN_S3_ID;
const EHANLIN_S3_KEY = process.env.EHANLIN_S3_KEY;
const TRAVIS_TAG = process.env.TRAVIS_TAG;
const AWS_S3 = new AWS.S3();
var sourceDir = PATH.join(__dirname, "../");

AWS.config.update({
  accessKeyId: EHANLIN_S3_ID,
  secretAccessKey: EHANLIN_S3_KEY
});

/**
 * 更改元件內容路徑
 */
var m = new Map();
m.set("header", "ehanlin_header.html");
m.set("footer", "ehanlin_footer.html");
m.set("eventLeftSide", "ehanlin_event_left_side.html");
m.set("infoLeftSide", "ehanlin_info_left_side.html");
m.set("menu", "ehanlin_menu.html");
m.set("js", "ehanlin-loader.js");

m.forEach(function(item, key) {
  var folderName = key.toString();
  var fileName = item.toString();
  var changeFilePath = `${folderName}/destination/${fileName}`;
  var filePath = PATH.join(sourceDir, `${changeFilePath}`);

  var readFileChangeContent = () => {
    FS.readFile(filePath, "UTF-8", function(err, data) {
      if (!err)
        if (data.includes("current.SNAPSHOT")) {
          var changeContent = data.replace(/current\.SNAPSHOT/g, "current");
        } else if (data.includes("current")) {
          var changeContent = data.replace(/current/g, "current.SNAPSHOT");
        } else console.log(err);
      writeFileToFolder(folderName, fileName, changeContent);
    });
  };
  readFileChangeContent();
});

var writeFileToFolder = (folderName, fileName, changeContent) => {
  FS.writeFile(
    `../${folderName}/destination/${fileName}`,
    changeContent,
    "UTF-8",
    err => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
    }
  );
};
