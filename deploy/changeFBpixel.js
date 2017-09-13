const FS = require("fs");
const PATH = require("path");

var replaceFBpixel = (sourceDir, script) => {
  FS.readdir(sourceDir, (err, files) => {
    var writeToFile = (entireFilePath, fileContent) => {
      FS.writeFile(entireFilePath, fileContent, "UTF-8", err => {
        if (err) throw err;
        console.log(`${entireFilePath} was succesfully saved!`);
      });
    };

    var changeToCurrent = entireFilePath => {
      FS.readFile(entireFilePath, "UTF-8", function(err, data) {
        if (!err) {
          if (data.includes("1640262175986847")) {
            // 轉正式 FB pixel
            var fileContent = data.replace(
              /1640262175986847/g,
              "210352019155685"
            );

            writeToFile(entireFilePath, fileContent);
          }
        } else {
          console.log(err);
        }
      });
    };

    files.forEach(fileName => {
      if (script === fileName) {
        entireFilePath = PATH.join(sourceDir, fileName);
        changeToCurrent(entireFilePath);
      }
    });
  });
};

replaceFBpixel(PATH.join(__dirname, "../footer/destination"), "ehanlin-fb.js");
replaceFBpixel(PATH.join(__dirname, "../js/destination"), "ehanlin-social.js");
