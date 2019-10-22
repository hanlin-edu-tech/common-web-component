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
<!-- 測試環境 與 正式環境 -->
<script type="text/javascript" crossorigin="anonymous" data-module="ehanlin-header,ehanlin-menu,ehanlin-footer,ehanlin-event-left-side" src="/app/web-component/js/ehanlin-loader.js"></script>
```

若想要指定要使用的元件，則在 data-module attribute 指定即可。呼叫複數元件時，元件以 ',' 分隔，

> EX: data-module="ehanlin-header, ehanlin-menu, ehanlin-footer"

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
<!-- 測試環境 與 正式環境-->
<script type="text/javascript" crossorigin="anonymous" data-module="ehanlin-header,ehanlin-menu,ehanlin-footer,ehanlin-event-left-side" src="/app/web-component/js/ehanlin-social.js"></script>
```

## 建置元件與部署

-   常用元件是由 ehanlin-loader.js 控管
    [參考 ehanlin-loader.js](https://github.com/eHanlin/common-web-component/blob/master/src/js/ehanlin-loader.js)
-   社群元件
    [參考 ehanlin-social.js](https://github.com/eHanlin/common-web-component/blob/master/src/js/ehanlin-social.js)

## 部署及upload

#### 測試機
```html
./package.sh
```
#### 正式機
```html
./packageProd.sh
```
