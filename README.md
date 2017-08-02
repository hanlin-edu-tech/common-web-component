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

## 呼叫元件方式：
1. 在 platform、平台或相關靜態活動頁引入
```
<script type="text/javascript" data-module="ehanlin-header, ehanlin-menu" src="./js/ehanlin-loader.js"></script>
```
在引入的 script 標籤中，有一 data-module 的 attribute，可指定想要呼叫的元件：

**ehanlin-header**
**ehanlin-menu**
**ehanlin-event-left-side**
**ehanlin-info-left-side**
**ehanlin-footer**

呼叫複數元件時，元件以 ',' 分隔，EX: `data-module="ehanlin-header, ehanlin-menu, ehanlin-footer"`

2. 在 html body 中的 element，給定以元件為命名的 id，元件內容就會嵌入在這 element 中，在呼叫相關元件時，期待是符合 HTML5 的語意化結構，可增加 google 搜尋引擎的分數：

- ehanlin-header
`<header id="ehanlin-header"></header>`

- ehanlin-menu
`<nav id="ehanlin-menu"></nav>`

- ehanlin-footer
`<footer id="ehanlin-footer"></footer>`

- ehanlin-event-left-side
- ehanlin-info-left-side
``<section id="ehanlin-event-left-side"></section>
<section id="ehanlin-info-left-side"></section>``