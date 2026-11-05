# 家庭私有訪問

## 目標與授權

- 堅哥要求網站僅自己及家人使用，不公開展示。
- 2026-11-05 明確要求保留免費方案、不綁卡。不開通 Zero Trust，不接受超額扣款授權，不升級 Workers。
- 採用目前的 Workers Free / Pages Functions，站點端驗證家庭共享密碼。這不是按人員郵箱識別的白名單：知道密碼的人即可登入，因此只由家人保管。

## 入口與保護

- 唯一登入域：`https://questech-bm.com`。
- `public/_worker.js` 在服務端攔截所有路徑，包括 HTML、JS、CSS、直接資產請求；`public/_routes.json` 不排除靜態路徑。
- `FAMILY_PASSWORD`：Cloudflare Production 的加密 Secret，至少16字元、至多256字元。不要使用 `VITE_` 前綴，不放進程式碼、Git、前端或聊天。
- `FAMILY_SESSION_KEY`：獨立的32位元組隨機簽署金鑰，以64字元hex表示，在Cloudflare瀏覽器中生成並直接保存為加密Secret；不讀回或寫入本機。
- 登入使用 HTTPS 同源 POST。會話由 HMAC-SHA256 驗證，Cookie 有 `__Host-`、Secure、HttpOnly、SameSite=Lax、Path=/，有效期7天。
- 更換家庭密碼或簽署金鑰並重新部署，既有登入狀態會失效。退出為同源 POST，會清除目前瀏覽器的會話Cookie；無伺服器會話資料庫，不宣稱能逐一撤銷被複製的舊Token。
- 回應設定 no-store、不允許 CDN 快取私有內容；登入頁禁止外站框架嵌入、外站表單提交及第三方腳本。robots/noindex 僅為輔助，不作認證。
- 缺少或不合規的密碼／金鑰、執行錯誤時返回503，絕不回退至公開資產。
- Cloudflare Runtime 須設為 **Fail closed**，免費額度用完時返回錯誤，不跳過驗證公開內容。
- 登入錯誤暫以每個 isolate 的記憶體節流限制；不是全域持久化或分散式防暴力破解。必須使用強密碼，不把此方案描述成企業身分管理或完整專業安全稽核。

## 舊預覽及預設域

Cloudflare帳戶層級 Bulk Redirect：

- 清單：`questech_family_canonical`，唯一來源 `questech-geo-tools.pages.dev/` → `https://questech-bm.com/`，HTTP 302。
- 開啟 Preserve query string、Include subdomains、Subpath matching、Preserve path suffix 四項。
- 規則：`QuestTech family canonical redirect`，僅引用上述清單。
- 此規則須同時驗證專案預設域、目前不可變部署 `2614a150.questech-geo-tools.pages.dev`，及舊版不可變部署，例如 `c688eaea.questech-geo-tools.pages.dev`；只在新Worker中重導不能封住舊部署。
- 沒有刪除歷史部署或其他帳戶規則。

## 上線與驗證

1. 確認 Production 有兩項加密 Secret；不讀回其值。
2. 先核實 Workers 仍是 Free、Fail closed 已保存，Bulk Redirect 已啟用。
3. `node --test tests/family-auth.test.mjs`、生產構建及改動檔案 ESLint。
4. 用既有Git整合推送主分支，等待部署。未登入應進入家庭登入頁；資產不得直接下載。
5. 用已知有效家庭密碼驗證登入、工具和退出；若密碼由堅哥直接填入而不向Agent提供，成功登入測試需堅哥本人執行，必須標為待人工核實，不能捏造通過。
6. 覆核所有上述預覽域與子路徑的重導。免費額度實際耗盡行為不故意壓測；以配置讀回為證。
7. 若出錯，保持拒絕存取並修復。**不得直接回退到沒有登入檢查的92392f6或更早版本**，否則會重新公開內容。

## 官方依據（2026-11-05查閱）

- Advanced Mode：https://developers.cloudflare.com/pages/functions/advanced-mode/
- 路由及Fail closed：https://developers.cloudflare.com/pages/functions/routing/
- 預設／預覽域重導：https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/
- 免費額度：https://developers.cloudflare.com/pages/functions/pricing/

當次發布與驗證結果記錄在Agent工作區的每日記憶及發布證據，不把尚未完成的步驟寫成已完成。

## 已修正的瀏覽器表單相容性問題

- 2026-11-05：`Referrer-Policy: no-referrer` 會讓一般HTML表單POST帶 `Origin: null`，與嚴格同源驗證衝突，導致正常使用者也看到403 Forbidden。
- 改用 `Referrer-Policy: same-origin`：同源表單保留正確Origin，外站不取得Referer；伺服器仍拒絕null及跨站Origin。不可藉由放行null、移除CSRF驗證或公開資產來修復。
- 先前curl測試人工指定Origin，所以沒有覆蓋瀏覽器對回應頭的處理；之後必須用真實瀏覽器執行原生form POST，不能只測fetch或合成Request。
- 使用明確的測試錯誤密碼驗證來源檢查：修正前403、修正後應為正常密碼錯誤401；真實家庭密碼仍由使用者自行輸入驗證。
- 參考：https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy#effect_on_the_origin_header
