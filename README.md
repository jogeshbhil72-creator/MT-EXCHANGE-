# MT EXCHANGE — Demo Website

Founder: **JOGESH BHEEL**  
Theme: **Black + Gold**  
Purpose: **Educational demo interface only**

## Included
- Responsive black-and-gold landing page
- Sample market watchlist (fictional values)
- Demo signup/login UI
- Local-device-only demo profiles using browser localStorage
- Practice-trade confirmation UI (does not execute trades)
- PWA manifest and service worker for Add to Home Screen/offline shell

## Publish on GitHub Pages
1. Extract this ZIP.
2. Upload/replace the files in the root of your `MT-EXCHANGE-` repository.
3. Make sure `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, and `sw.js` are in the repository root. Keep the `assets` folder.
4. Commit changes to `main`.
5. In Settings → Pages, keep **Deploy from a branch**, branch **main**, folder **/(root)**.
6. Open `https://jogeshbhil72-creator.github.io/MT-EXCHANGE-/`.

## Important limitations
This is a **front-end demo**, not a production exchange. Demo accounts are stored only in the current browser/device and are not shared with friends or synced. The sample password handling is not secure and must not be used for real accounts. There is no real trading, live price feed, deposits, withdrawals, or payment processing.

## Before enabling shared accounts
Connect a real authentication backend (for example Supabase Auth) and use its official client SDK. Never put a service-role/secret key in browser code. Use Row Level Security for any user data. Do not collect identity documents or financial details in this demo.
