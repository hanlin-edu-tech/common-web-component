## 使用情況調查（2026-11-09）

> 本節為 hanlin-edu-tech repo 清理作業的調查紀錄，待負責人確認後決定封存或刪除。

- 調查結論：仍在使用
- 建議處置：保留，理由：本 repo 產出的 ehanlin-loader.js 與頁首、頁尾元件仍由正式站提供，並被正式機運行中的 tutor-cashflow、tutor-nu-ehanlin、tutor-platform-root、tutor-guardian_104 頁面載入。
- 最後更新：pushedAt 2026-10-28；最後 commit `3408ccc` 2026-10-28 hotdog929 chore: 升級 Node.js 至 26（CVE-2026-111497） (#45)
- 用途：eHanlin 個人版網站共用 Web Component（ehanlin-header、ehanlin-menu、ehanlin-footer、ehanlin-event-left-side、ehanlin-info-left-side 與載入器 ehanlin-loader.js），以 lerna 管理，原始碼在 `packages/ehanlin-platform-layout`；以 gulp 上傳到 GCS，正式站路徑 `/app/web-component/`；舊版以 Travis 上傳到 S3 `common_webcomponent/`。

### 檢查結果

| 檢查項目 | 結果 | 依據 |
|---|---|---|
| GitHub 活動 | 最後實質 commit `cff85f9` 2022-04-11 tzhau（舊皮訊息中心按鈕改為僅導向歷史訊息中心 [sc-14615]），2022-05-04 合併；2026-10-28 `3408ccc` 屬 org 內 120 個 repo 的「升級 Node.js 至 26」批次修改，不列為實質開發。分支 36 個（dependabot 34 個、master、test 最後 2022-01-07）；open PR 34 筆皆為 dependabot；issue 0；只有 Dependabot Updates workflow；tag 27 個，最新 v1.1.5；release 0；非 fork | 已查核，細節記錄於內部調查報告 |
| org 內程式碼引用 | 正式機運行中的服務頁面載入本 repo 產物 | 已查核，細節記錄於內部調查報告（關鍵字：common-web-component、ehanlin-loader.js、common_webcomponent、ehanlin-platform-layout、app/web-component；命中 tutor-cashflow、tutor-nu-ehanlin、tutor-platform-root、tutor-platform-user、tutor-platform-keys、tutor-platform-cart、tutor-platform-products、tutor-guardian_104 等） |
| GCP 部署 | 正式站 `/app/web-component/` 由本 repo 產物提供，最後上傳 2022-05-04；查無 Cloud Build trigger、Cloud Run、Cloud Functions、GKE workload 以本 repo 為來源 | 已查核，細節記錄於內部調查報告 |
| AWS 部署 | S3 `common_webcomponent/` 存有本 repo 舊版產物（最後上傳 2020-12-02），仍可公開讀取；查無 Lambda、API Gateway（REST／HTTP）、ECR、ECS | 已查核，細節記錄於內部調查報告 |

### 待確認事項
- 部署方式無 CI：`.travis.yml` 指向的 Travis CI 已無執行紀錄，GCS 上傳靠手動執行 gulp；日後修改需由負責人確認部署流程。
- 殘留 webhook 與 34 筆未處理的 dependabot PR，細節記錄於內部調查報告。

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
