# common-web-component

網站的共用元件庫，舉凡是 header, menu, footer or leftSide ...
目錄結構以元件名稱為主，其下再新增一個 destination 置放所有內容：

```
common-web-component
|
|____header
| |____destination
| | |____ehanlin-header.js
| | |____ehanlin_header.html
|
|____menu
| |____destination
| | |____ehanlin-menu.js
| | |____ehanlin_menu.html
|
|____footer
| |____destination
| | |____ehanlin-footer.js
| | |____ehanlin_footer.html
|
|____eventLeftSide
| |____destination
| | |____ehanlin-event-left-side.js
| | |____ehanlin_event_left_side.html
|
|____infoLeftSide
| |____destination
| | |____ehanlin-info-left-side.js
| | |____ehanlin_info_left_side.html
|
|____package.json
|____README.md
|____uploadS3.js
```

destination 可以再新增任何子目錄來存不同類別的檔案，
元件大部分會上傳至 AWS S3，上傳時會再將 destination 的名稱取代為元件名。
