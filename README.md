# common-web-component

網站的共用元件庫，舉凡是 header, menu, footer or leftSide ...
目錄結構以元件名稱為主，其下再新增一個 destination 置放所有內容：

```
common-web-component
|
|____commonCss
| |____destination
|   |____ _mixins.scss
|   |____font-awesome.min.css
|   |____font-face.css
|   |____font-face.css.map
|   |____fontface.scss
|
|____header
| |____destination
|   |____ehanlin_header.css
|   |____ehanlin_header.html
|   |____ehanlin-header.js
|
|____menu
| |____destination
|   |____ehanlin_menu.css
|   |____ehanlin_menu.html
|
|____js
| |____destination
|   |____ehanlin-social.js
|   |____ehanlin-loader.js
|   |____jquery-3.2.1.min.js
|   |____require.js
|
```

destination 可以再新增任何子目錄來存不同類別的檔案，元件大部分會上傳至 AWS S3，    
上傳時會再將 destination 的名稱取代為元件名。

## 呼叫元件方式：
1. 在 platform、平台或相關靜態活動頁引入 ehanlin-loader.js，js 會直接呼叫元件
```
<script type="text/javascript" data-module="ehanlin-header, ehanlin-menu" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/js/ehanlin-loader.js"></script>
```
若想要指定呼叫的元件，則在 data-module attribute 指定即可。元件名稱：

**ehanlin-header**,
**ehanlin-menu**,
**ehanlin-event-left-side**,
**ehanlin-info-left-side**,
**ehanlin-footer**

呼叫複數元件時，元件以 ',' 分隔，EX: `data-module="ehanlin-header, ehanlin-menu, ehanlin-footer"`

2. 在 html body 中的 element，給定與元件名稱相同的 id，元件內容就會嵌入在此 element 中；    
在呼叫相關元件時，期待是能符合 HTML5 的語意化結構，可增加 google 搜尋引擎的分數，EX：

- ehanlin-header
`<header id="ehanlin-header"></header>`

- ehanlin-menu
`<nav id="ehanlin-menu"></nav>`

- ehanlin-footer
`<footer id="ehanlin-footer"></footer>`

- ehanlin-event-left-side
`<section id="ehanlin-event-left-side"></section>`

- ehanlin-info-left-side
`<section id="ehanlin-info-left-side"></section>`
***
# 測試套與正式套元件：
呼叫 ehanlin-loader.js，其原始檔路徑為：    
`https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/js/ehanlin-loader.js`

其中，注意若為本地測試或上傳至測試機時，路徑為 **current.SNAPSHOT**，    
若是上傳到正式機，則必須使用 **current**，    
所以當要佈版至正式機時，記得要把路徑改為 **current**。

#### 這裡有提供一段 function 可以把 html 呼叫 ehanlin-loader.js 的路徑替換為 current (**檔案路徑自行更改為對應的結構**)
```
var replaceToProduction = () => {
    fs.readdir(destinationDir, (err, files) => {
      var writeToFile = fileContent => {
        fs.writeFile(entireFilePath, fileContent, "UTF-8", err => {
          if (err) throw err;
          console.log("The html file was succesfully saved!");
        });
      };

      var changeToCurrent = () => {
        fs.readFile(entireFilePath, "UTF-8", function(err, data) {
          if (err) throw err;
          if (data.includes("current.SNAPSHOT")) {
            var fileContent = data.replace(/current\.SNAPSHOT/g, "current");
            writeToFile(fileContent);
          }
        });
      };
      var entireFilePath;
      if (err) throw err;
      files.forEach(fileName => {
        if (/(.html)$/.test(fileName)) {
          entireFilePath = path.join(destinationDir, fileName);
          changeToCurrent();
        }
      });
    });
  };
```
# 社交工具：
呼叫 `https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/js/ehanlin-social.js`    
ehanlin-social.js 會執行 Google Analytics 和 Facebook 的行銷 Pageview 統計，    
其中要注意，測試時，呼叫路徑要記得得是 **current.SNAPSHOT**，這樣才不會誤用 GA 和 FB 的正式帳號，造成流量統計錯誤。

***
# 本機開發元件時測試：
改變共用元件庫相依的路徑：
1. 首先執行 changeCurrentPath.js  元件庫內容的相依的路徑將改變為 current.SNAPSHOT
```
$ node changeCurrentPath.js
```
上正式機必須再改變一次路徑：
1. 再執行 changeCurrentPath.js  相依的路徑將改變為 current
```
$ node changeCurrentPath.js
```
