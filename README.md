# 網站的共用元件庫

## 使用方式
### 個人版常用元件
```
ehanlin-header
ehanlin-menu
ehanlin-event-left-side
ehanlin-info-left-side
ehanlin-footer
```

### 呼叫元件
1. 在 platform、平台或 APP 中的 html 引入 ehanlin-loader.js

```html
<!-- 測試環境 -->
<script type="text/javascript" data-module="ehanlin-header, ehanlin-menu" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/js/ehanlin-loader.js"></script>

<!-- 正式環境 -->
<script type="text/javascript" data-module="ehanlin-header, ehanlin-menu" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current/js/ehanlin-loader.js"></script>
```

若想要指定要使用的元件，則在 data-module attribute 指定即可。呼叫複數元件時，元件以 ',' 分隔，    
>  EX: data-module="ehanlin-header, ehanlin-menu, ehanlin-footer"

1. 在 html body 中的 element，給定與 data-module 相同的元件 id，元件內容就會嵌入在此 element 中，在呼叫相關元件時，若能符合 HTML5 的語意化結構，可增加 google 搜尋引擎的分數，EX：

```html
<!-- ehanlin-header -->
<header id="ehanlin-header"></header>

<!-- ehanlin-menu -->
<nav id="ehanlin-menu"></nav>

<!-- ehanlin-footer -->
<footer id="ehanlin-footer"></footer>

<!-- ehanlin-event-left-side -->
<section id="ehanlin-event-left-side"></section>

<!-- ehanlin-info-left-side -->
<section id="ehanlin-info-left-side"></section>
```

## 社群元件
### 呼叫元件

1. 在相關 APP 的 html 引入：

```html
<!-- 測試環境 -->
<script type="text/javascript" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/js/ehanlin-social.js"></script>

<!-- 正式環境 -->
<script type="text/javascript" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current/js/ehanlin-social.js></script>
```

> ehanlin-social.js 會執行 Google Analytics 和 Facebook 的行銷 Pageview 統計，其中特別注意，測試時，呼叫路徑記得要改為 **current.SNAPSHOT**，這樣才不會誤用 GA 和 FB 的正式帳號，造成流量統計錯誤。

## 環境

若在本地環境或測試環境時，引入元件 js，其 src 的 `S3` 路徑 `https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/${env}/js/ehanlin-loader.js` 中有個變數 `env`，我們需要賦值給它：`env=current.SNAPSHOT` 為測試；`env=current` 為正式。    專案內引入時要特別注意，可在專案用 gulp 來替換 html 的 s3 路徑：

```javascript
/* 先安裝 npm install --save-dev gulp-replace */
gulp.task('buildEnvToDev', (htmlFile) => {
  return gulp
    .src(htmlFile, {
      base: './'
    })
    .pipe(
      replace(/common_webcomponent\/(current.SNAPSHOT|current)/g, (match) => {
        let dev = `common_webcomponent\/current.SNAPSHOT`
        console.log(`replace ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(gulp.dest(''))
})
```

## 建置元件與部署

- 常用元件是由 ehanlin-loader.js 控管
  [參考 ehanlin-loader.js](https://github.com/eHanlin/common-web-component/blob/master/src/js/ehanlin-loader.js)
- 社群元件
  [參考 ehanlin-social.js](https://github.com/eHanlin/common-web-component/blob/master/src/js/ehanlin-social.js)

### 建置
執行 `gulp package` 會將 src 的相關檔案打包至 dist 中

### 部署
執行 `git push` 後，並帶入 `tag`，    
路徑會依據 `git tag` 自動將 common-web-component 替換成符合環境之路徑

```bash
# 更改為測試環境
git tag vX.X.X-SNAPSHOT 

# 更改為正式環境
git tag vX.X.X 
```

### 替換路徑的片段程式碼
```javascript
/**
 * 更改元件內容路徑
 */
let readFileChangeContent = (filePath, fileName) => {
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
```

如果開發元件後，沒有上 tag，單純修改小內容，則執行

```bash
# 替換路徑
npm run changeCurrentPath
# 上傳 S3
npm run uploadS3
```

### 部署歷屆試題相關頁面
切換至 cd ./packages/info-entry-pre-exam/ 目錄下

修改程式後，直接鍵入
```bash
# 測試環境
npm run deployToTest

# 正式環境
npm run deployToProduction
```
參考 [package.json](https://github.com/hanlin-edu-tech/common-web-component/blob/master/packages/info-entry-pre-exam/package.json#L6-L9)

參考 [GCP firestore 專案位置](https://console.firebase.google.com/u/1/project/entry-pre-exam-info/overview)
；轉檔部分，寫入 firestore 相關程式碼，則參考 [info-entry-pre-exam-google-script Git Repo](https://github.com/hanlin-edu-tech/info-entry-pre-exam-google-script/blob/master/ast/main.js#L12-L23)，是透過 Google Apps Scripts 所引入的 Firestore Library 將 Google Sheet 之資料寫入 Firestore。

