/* eslint-disable handle-callback-err */
const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const EHANLIN_S3_ID = process.env.EHANLIN_S3_ID
const EHANLIN_S3_KEY = process.env.EHANLIN_S3_KEY
const TRAVIS_TAG = process.env.TRAVIS_TAG

aws.config.update({
  accessKeyId: EHANLIN_S3_ID,
  secretAccessKey: EHANLIN_S3_KEY
})
const AWS_S3 = new aws.S3()

let sourceDir = path.join(__dirname, '../dist/')

/*
 * 尋找存在於 S3 common_webcomponent 的最新版本目錄
 */
let findExistedLastVersionDir = () => {
  let params = {
    Bucket: 'ehanlin-web-resource',
    KeyMarker: 'common_webcomponent',
    Prefix: 'common_webcomponent/v',
    Delimiter: '/'
  }

  let retrieve = (err, data) => {
    if (err) console.log(err, err.stack)
    else {
      findDist(sourceDir)
    }
  }

  AWS_S3.listObjectVersions(params, retrieve)
}

/*
 * 尋找目標資料夾
 */
let findDist = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (determineFileEmpty(files)) return

    files.forEach(fileName => {
      let dirFilePath = path.join(dir, fileName)
      if (fs.statSync(dirFilePath).isDirectory()) {
        findDist(dirFilePath)
      } else {
        listFileToUpload(fileName, dirFilePath)
      }
    })
  })
}

/*
 * 準備檔案並上傳至 AWS S3
 */
let listFileToUpload = (fileName, entireFilePath) => {
  let upload = (prefixPath) => {
    let suffixPath = entireFilePath.replace(/[\w/-]*(dist)[/]/, '')
    let key = `${prefixPath}${suffixPath}`

    let params = {
      Bucket: 'ehanlin-web-resource',
      Body: fs.readFileSync(entireFilePath),
      Key: key,
      ACL: 'public-read'
    }

    if (fileName.substr(-3) === '.js') {
      params.ContentType = 'application/x-javascript'
    } else if (fileName.substr(-4) === '.css') {
      params.ContentType = 'text/css'
    }

    AWS_S3.putObject(params)
      .on('httpUploadProgress', function (progress) {
        // 上傳的進程
        console.log(`upload to ${key}, ${progress.loaded} of ${progress.total} bytes`)
      })
      .send((err) => {
        if (err) console.log('err is ' + err)
      })
  }

  if (!TRAVIS_TAG) {
    if (isMacDSstore(fileName)) return
    upload('common_webcomponent/current.SNAPSHOT/') // upload to current.SNAPSHOT folder
  } else {
    let currentDir
    upload(`common_webcomponent/${TRAVIS_TAG}/`) // upload to tag folder

    if (TRAVIS_TAG.includes('SNAPSHOT')) {
      currentDir = 'common_webcomponent/current.SNAPSHOT/'
    } else {
      currentDir = 'common_webcomponent/current/'
    }
    upload(currentDir) // upload to current folder
  }
}

/*
 * 判斷檔案是否為空
 */
let determineFileEmpty = files => {
  if (!files || files.length === 0) {
    console.log(`${files} is not found or empty...`)
    return true
  }

  return false
}

/*
 * 略過 mac OS 檔案系統下的 DS_Store
 */
let isMacDSstore = fileName => {
  if (fileName === '.DS_Store') {
    return true
  }

  return false
}

if (!TRAVIS_TAG) findExistedLastVersionDir()
else {
  findDist(sourceDir)
}
