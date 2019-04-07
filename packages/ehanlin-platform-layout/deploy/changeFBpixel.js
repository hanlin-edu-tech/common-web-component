/* eslint-disable handle-callback-err */
const fs = require('fs')
const path = require('path')
const TRAVIS_TAG = process.env.TRAVIS_TAG

/**
 * 置換 FB 像素
 */
let replaceFBpixel = (sourceDir, script) => {
  fs.readdir(sourceDir, (err, files) => {
    let writeToFile = (entireFilePath, fileContent) => {
      fs.writeFile(entireFilePath, fileContent, 'UTF-8', err => {
        if (err) throw err
        console.log(`${entireFilePath} was succesfully saved!`)
      })
    }

    /**
     * 部署至正式機時，將 fb 像素編號取代為正式
     */
    let changePixelInCurrent = entireFilePath => {
      fs.readFile(entireFilePath, 'UTF-8', function (err, data) {
        if (err) {
          console.log(err)
        }

        if (!err) {
          if (!TRAVIS_TAG.includes('SNAPSHOT')) {
            // FB 行銷 pixel 測試轉正式
            if (data.includes('1640262175986847')) {
              let fileContent = data.replace(
                /1640262175986847/g,
                '210352019155685'
              )
              writeToFile(entireFilePath, fileContent)
            }
          } else {
            // FB 行銷 pixel 正式轉測試
            if (data.includes('210352019155685')) {
              let fileContent = data.replace(
                /210352019155685/g,
                '1640262175986847'
              )
              writeToFile(entireFilePath, fileContent)
            }
          }
        } else {
          console.log(err)
        }
      })
    }

    files.forEach(fileName => {
      if (script === fileName) {
        changePixelInCurrent(path.join(sourceDir, fileName))
      }
    })
  })
}

replaceFBpixel(path.join(__dirname, '../dist/footer/'), 'ehanlin-fb.js')
replaceFBpixel(path.join(__dirname, '../dist/js/'), 'ehanlin-social.js')
