const FS = require("fs");
const PATH = require("path");

/**
 * 置換 FB 像素
 */
var replaceFBpixel = (sourceDir, script) => {
  FS.readdir(sourceDir, (err, files) => {
    var writeToFile = (entireFilePath, fileContent) => {
      FS.writeFile(entireFilePath, fileContent, "UTF-8", err => {
        if (err) throw err;
        console.log(`${entireFilePath} was succesfully saved!`);
      });
    };

    /**
     * 部署至正式機時，將 fb 像素編號取代為正式
     */
    var changePixelInCurrent = entireFilePath => {
      FS.readFile(entireFilePath, "UTF-8", function(err, data) {
        if (!err) {
          // FB 行銷像素的測試編號
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
        changePixelInCurrent(entireFilePath);
      }
    });
  });
};

replaceFBpixel(PATH.join(__dirname, "../footer/destination"), "ehanlin-fb.js");
replaceFBpixel(PATH.join(__dirname, "../js/destination"), "ehanlin-social.js");
