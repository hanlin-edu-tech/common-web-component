# 網站的共用元件庫

## 常用元件
```
ehanlin-header,
ehanlin-menu,
ehanlin-event-left-side,
ehanlin-info-left-side,
ehanlin-footer
```
#### 呼叫元件
1. 在 platform、平台或相關靜態活動頁引入 ehanlin-loader.js

```html
<script type="text/javascript" data-module="ehanlin-header, ehanlin-menu" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/js/ehanlin-loader.js"></script>
```

若想要指定呼叫的元件，則在 data-module attribute 指定即可。    
呼叫複數元件時，元件以 ',' 分隔，EX: `data-module="ehanlin-header, ehanlin-menu, ehanlin-footer"`

2. 在 html body 中的 element，給定與 data-module 相同的元件 id，元件內容就會嵌入在此 element 中，在呼叫相關元件時，若能符合 HTML5 的語意化結構，可增加 google 搜尋引擎的分數，EX：

``` html
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

## 環境：
呼叫 ehanlin-loader.js，其原始檔路徑為：    
`https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/${env}/js/ehanlin-loader.js`

其中，注意若為本地環境或上傳至測試環境時，ehanlin-loader.js 所存取的 S3 路徑 `env=current.SNAPSHOT`，若是上傳到正式機，則 `env=current`
執行 changeCurrentPath.js 會對路徑作轉換：

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

路徑會依據 git tag 自動替換成符合環境之路徑

```shell
# 更改為測試環境
git tag vX.X.X-SNAPSHOT 

# 更改為正式環境
git tag vX.X.X 
```

## 社群元件：
呼叫 
```html
https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/js/ehanlin-social.js
```    
ehanlin-social.js 會執行 Google Analytics 和 Facebook 的行銷 Pageview 統計，    
其中特別注意，測試時，呼叫路徑記得為 **current.SNAPSHOT**，這樣才不會誤用 GA 和 FB 的正式帳號，造成流量統計錯誤。

#### 在本機測試元件時：
1.改變共用元件的呼叫路徑，執行 changeCurrentPath.js  元件庫內容的相依的路徑將改變為 current.SNAPSHOT
```javascript
$ node changeCurrentPath.js
```
