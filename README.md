# ₹ Personal Finance Tracker

A minimalist, offline-first personal finance tracker for INR. It runs entirely in the browser as an installable PWA. All data stays on your device (`localStorage`) and nothing is sent to any server.

## Features

**Income and budgeting**
- Monthly income entry with automatic daily, weekly and monthly allocation.
- Extra income (bonus, freelance, gifts, interest, refunds), added to that month's income.
- Disposable daily limit that excludes committed Fixed expenses (rent, EMIs, bills).
- Independent Daily, Weekly and Monthly balances with over/under indicators.

**Expense tracking**
- Category and subcategory (including Parents Care and Child Education).
- Expense type: Fixed or Variable.
- Payment mode: Cash, UPI, Debit Card, Credit Card, Bank Transfer, Other.
- Scope: Personal or Common/Shared.
- "For (Person)" field to track who an expense was for.
- Edit and delete (with confirmation) from the ledger.
- Ledger hidden by default; tap "Show Details" to expand.

**Credit card handling**
- Credit Card expenses keep their real date in the ledger but count against **next month's** budget, because that's when the bill is paid.
- Monthly Balance = this month's non-card spends + last month's card spends (due now).
- Two summary boxes show "Credit Card Due This Month" and "Card Spent (bills next month)".
- Daily and Weekly balances still show actual spending on the day it happened.

**SMS and share-to-app**
- Paste a bank or UPI SMS to auto-fill amount, merchant, payment mode and date.
- Parsing happens on-device; nothing is uploaded.
- Shared text is picked up from the URL (`?text=` or `?title=`) and parsed automatically. For Android's Share menu to send SMS text here, the `manifest.webmanifest` also needs a `share_target` entry; the manifest in this package doesn't include one yet.

**Reports**
- Charts by category, month, payment mode and person.
- Pivot-style tables: category, fixed vs variable, common vs personal, subcategory.
- All reports use billing month, so credit card spends match the Monthly Balance.

**Reminders and onboarding**
- Daily reminder with a configurable time (default 8:00 PM).
- Step-by-step on-screen guide for first-time users (reopen anytime with the Guide button).

**Data**
- Detailed CSV and Summary CSV export, ready for Google Sheets pivot tables. Both include a `Billing Month` column.
- Backup and restore as JSON.

## Install on Android (PWA)

1. Host the files on HTTPS (GitHub Pages works).
2. Open the site in Chrome.
3. Menu → **Add to Home screen** / **Install app**.

## Notes and limits

- **Reminders are best-effort.** Browsers can't reliably wake a fully closed app at an exact time. The reminder fires when the app is opened or brought to the foreground on or after the chosen time, and while the app is running in the background.
- **Reading SMS automatically isn't possible** in a browser. Paste the SMS text, or share it into the app.
- **Data lives only on your device.** Use Backup JSON regularly. Clearing browser data erases it.

## Updating the app

The service worker loads `index.html` from the network first, so updates show up automatically when you're online. If a device still shows an old version, clear the site's data once, then reinstall the shortcut. When you change cached files, bump the cache name in `sw.js` (`finance-vNN`).

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app (HTML, CSS and JS) |
| `sw.js` | Service worker (offline support, notification click) |
| `manifest.webmanifest` | PWA install metadata |
| `icon.svg` | App icon |
| `README.md` | This file |
