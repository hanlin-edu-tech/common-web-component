const fs = require('fs')
const path = require('path')
const TRAVIS_TAG = process.env.TRAVIS_TAG

/**
 * 更改元件內容路徑
 */
var readFileChangeContent = (filePath, fileName) => {
  fs.readFile(filePath, 'UTF-8', function (err, data) {
    if (!err) {
      let changeContent
      if (TRAVIS_TAG && !TRAVIS_TAG.includes('SNAPSHOT')) {
        changeContent = data.replace(/current(\.SNAPSHOT)?/g, 'current')
      } else {
        changeContent = data.replace(/current(\.SNAPSHOT)?/g, 'current.SNAPSHOT')
      }
      writeFileToFolder(filePath, changeContent, fileName)
    } else {
      console.log(err)
    }
  })
}

/**
 * 替後內容後，重寫入檔案
 */
var writeFileToFolder = (filePath, changeContent, fileName) => {
  fs.writeFile(filePath, changeContent, 'UTF-8', err => {
    if (err) throw err
    console.log(`The ${filePath} was succesfully changed and saved!`)
  })
}

// 讀取所有欲更改路徑之設定檔
var fileMapping = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'addFileUsingJson.json'), 'UTF-8')
)
for (let componentName in fileMapping) {
  let fileName = fileMapping[componentName]
  let changeFilePath = `dist/${componentName}/${fileName}`
  let filePath = path.join(__dirname, `../${changeFilePath}`)
  readFileChangeContent(filePath, fileName)
}
