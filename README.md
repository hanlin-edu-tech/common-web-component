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
