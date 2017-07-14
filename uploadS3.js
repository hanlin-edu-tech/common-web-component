const AWS = require("aws-sdk");
const FS = require("fs");
const PATH = require("path");
const EHANLIN_S3_ID = process.env.EHANLIN_S3_ID
const EHANLIN_S3_KEY = process.env.EHANLIN_S3_KEY
const TRAVIS_TAG = process.env.TRAVIS_TAG
const TRAVIS_BUILD_DIR = process.env.TRAVIS_BUILD_DIR

AWS.config.update({
  accessKeyId: EHANLIN_S3_ID,
  secretAccessKey: EHANLIN_S3_KEY
});

const AWS_S3 = new AWS.S3();

// 遞迴上傳檔案
var recursiveUpload = dir => {
  FS.readdir(dir, (err, files) => {
    // 不上傳的檔案
    var isNotUpload = (FS, entireFilePath, fileName) => {
      if (FS.lstatSync(entireFilePath).isDirectory()) {
        recursiveUpload(entireFilePath);
        return true;
      }
      
      var notUploadFiles = ['README.md', '.travis.yml', 'uploadS3.js', 'package.json']
      for (var notUploadFile of notUploadFiles) {
        if (fileName === notUploadFile)
          return true;
      }

      return false;
    }

    var entireFilePath;

    if (!files || files.length === 0) {
      console.log(`${files} is not found or empty...`);
      return;
    }

    files.forEach(fileName => {
      entireFilePath = PATH.join(dir, fileName);
      console.log('before->' + entireFilePath);
      if (isNotUpload(FS, entireFilePath, fileName)) {
        return;
      }

      AWS_S3.putObject({
        Bucket: 'ehanlin-web-resource',
        Body: FS.readFileSync(entireFilePath),
        Key: `common_webcomponent/${TRAVIS_TAG}/${fileName}`,
        ACL: 'public-read'
      }).on('httpUploadProgress', function (progress) {
        // 上傳的進程
        console.log(`upload ${progress.loaded} of ${progress.total} bytes`);
      }).send((err, data) => {
        if (err)
          console.log('err is ' + err);
      });
    });
  });
};

recursiveUpload(TRAVIS_BUILD_DIR);