const FS = require("fs");
const PATH = require("path");
const AWS = require("aws-sdk");
const EHANLIN_S3_ID = process.env.EHANLIN_S3_ID;
const EHANLIN_S3_KEY = process.env.EHANLIN_S3_KEY;
const TRAVIS_TAG = process.env.TRAVIS_TAG;
const AWS_S3 = new AWS.S3();

AWS.config.update({
  accessKeyId: EHANLIN_S3_ID,
  secretAccessKey: EHANLIN_S3_KEY
});

/**
 * 更改元件內容路徑
 */
var readFileChangeContent = (filePath, fileName) => {
  FS.readFile(filePath, "UTF-8", function(err, data) {
    if (!err) {
      if (data.includes("current.SNAPSHOT")) {
        var changeContent = data.replace(/current\.SNAPSHOT/g, "current");
      } else if (data.includes("current")) {
        var changeContent = data.replace(/current/g, "current.SNAPSHOT");
      }
      writeFileToFolder(filePath, changeContent, fileName);
    } else {
      console.log(err);
    }
  });
};

/**
 * 替後內容後，重寫入檔案 
 */
var writeFileToFolder = (filePath, changeContent, fileName) => {
  FS.writeFile(filePath, changeContent, "UTF-8", err => {
    if (err) throw err;
    console.log(`The ${fileName} was succesfully saved!`);
  });
};

// 讀取所有欲更改路徑之設定檔
var fileMapping = JSON.parse(
  FS.readFileSync(PATH.join(__dirname, "addFileUsingJson.json"), "UTF-8")
);
for (var key in fileMapping) {
  var folderName = key.toString();
  var fileName = fileMapping[key];
  var changeFilePath = `${folderName}/destination/${fileName}`;
  var filePath = PATH.join(__dirname, `../${changeFilePath}`);
  readFileChangeContent(filePath, fileName);
}
