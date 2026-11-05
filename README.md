# QuestTech · DSE 備試空間

DSE 重新設計首版；取代原 GEO 工具站。以繁體中文整理 HKDSE 學科資源、試題入口、考試日程與升學資訊。

## 啟動

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4178
npm run build
```

站內工具包括 Best 5／Best 6、專注計時、搜尋、本機收藏及溫習清單。試卷與收生資料目前以有來源的外部入口提供，沒有建立站內題庫或課程收生資料庫。

完整範圍、資料來源、已驗證及未驗證項目見 [DSE-REBUILD.md](DSE-REBUILD.md)。2026-11-04 已獲授權發布首版；正式部署結果以當次發布核驗為準。舊 GEO 版本的回退點為本地 Git tag `backup/questech-before-dse-20261104`。

## 家庭私有訪問

家庭登入保護的設定、Secret管理、預設／舊預覽入口與驗證步驟見 [FAMILY-ACCESS.md](FAMILY-ACCESS.md)。不要把家庭密碼提交至Git或前端環境變數；不要為回退版面而移除認證。
