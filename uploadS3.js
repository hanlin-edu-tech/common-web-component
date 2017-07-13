const AWS = require("aws-sdk"); // from AWS SDK
const fs = require("fs"); // from node.js
const path = require("path"); // from node.js

var keyId = process.env.EHANLIN_S3_ID
var pwd = process.env.EHANLIN_S3_KEY

console.log('=========>>>>>' + keyId);

AWS.config.update({
  accessKeyId: keyId,
  secretAccessKey: pwd
});

var awsS3 = new AWS.S3();

// resolve full folder path
const distFolderPath = path.join(__dirname, './menu');
console.log("====" + distFolderPath);

// get of list of files from 'dist' directory
fs.readdir(distFolderPath, (err, files) => {
  if(!files || files.length === 0) {
    console.log(`provided folder '${distFolderPath}' is empty or does not exist.`);
    console.log('Make sure your project was compiled!');
    return;
  }

  var entireFilePath;
  console.log(files);
  // for each file in the directory
  for (var fileName of files) {
    entireFilePath = path.join(distFolderPath, fileName);
    console.log('entire->' + entireFilePath);

    // ignore if directory
    if (fs.lstatSync(entireFilePath).isDirectory()) {
      continue;
    }

    // read file contents
    fs.readFile(entireFilePath, (error, fileContent) => {
      // if unable to read file contents, throw exception
      if (error) { throw error; }

      awsS3.upload({
        Bucket: 'ehanlin-web-resource',
        Body: fileContent,
        Key: 'common_webcomponent/' + fileName
      }).on('httpUploadProgress', function(evt) {
        console.log('progress -->' + evt);
        console.log(evt);
      }).
      send((err, data) => {
        console.log('err ==> ' + err);
      });
    });
  }
});