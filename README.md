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
|   |____ehanlin-menu.js
|
|____footer
| |____destination
|   |____ehanlin_footer.css
|   |____ehanlin_footer.html
|   |____ehanlin-footer.js
|
|____eventLeftSide
| |____destination
|   |____ehanlin_event_left_side.css
|   |____ehanlin_event_left_side.html
|   |____ehanlin-event-left-side.js
|
|____infoLeftSide
| |____destination
|   |____ehanlin_info_left_side.css
|   |____ehanlin_info_left_side.html
|   |____ehanlin-info-left-side.js
|
|____package.json
|____README.md
|____uploadS3.js
```

destination 可以再新增任何子目錄來存不同類別的檔案，
元件大部分會上傳至 AWS S3，上傳時會再將 destination 的名稱取代為元件名。
***

# 本機測試：
1. 改變共用元件庫相依的路徑
首先執行changeCurrentPath.js  元件庫內容的相依的路徑將改變為current.SNAPSHOT

```
$ node changeCurrentPath.js
```
2. 上正式機必須再改變一次路徑
再執行changeCurrentPath.js  相依的路徑將改變為current
```
$ node changeCurrentPath.js
```
***

## 呼叫元件方式：
1. 在 platform、平台或相關靜態活動頁引入 ehanlin-loader.js，js 會直接呼叫元件
```
<script type="text/javascript" data-module="ehanlin-header, ehanlin-menu" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current/js/ehanlin-loader.js"></script>
```
若想要指定呼叫的元件，則在 data-module attribute 指定即可。元件名稱：

**ehanlin-header**,
**ehanlin-menu**,
**ehanlin-event-left-side**,
**ehanlin-info-left-side**,
**ehanlin-footer**

呼叫複數元件時，元件以 ',' 分隔，EX: `data-module="ehanlin-header, ehanlin-menu, ehanlin-footer"`

2. 在 html body 中的 element，給定與元件名稱相同的 id，元件內容就會嵌入在此 element 中；在呼叫相關元件時，期待是能符合 HTML5 的語意化結構，可增加 google 搜尋引擎的分數，EX：

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
