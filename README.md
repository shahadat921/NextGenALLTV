# 📺 NextGen TV v2.0
**Developed by Shahadat** — Live Sports Streaming App

---

## 🚀 GitHub → Vercel Deploy (ধাপে ধাপে)

### Step 1 — GitHub-এ Push করুন
```bash
git init
git add .
git commit -m "NextGen TV v2.0"
git remote add origin https://github.com/YOUR_USERNAME/nextgen-tv.git
git push -u origin main
```

### Step 2 — Vercel-এ Deploy করুন
1. **vercel.com** → Login → **"Add New Project"**
2. GitHub repo সিলেক্ট করুন: `nextgen-tv`
3. Settings:
   - Framework Preset: **Other**
   - Root Directory: **`./`**
   - Build Command: *(খালি রাখুন)*
   - Output Directory: **`public`**
4. **Deploy** চাপুন ✅

---

## 📁 ফাইল স্ট্রাকচার
```
nextgen-tv/
├── api/
│   └── matches.js      ← Football API proxy (API Key সুরক্ষিত)
├── public/
│   ├── index.html      ← সম্পূর্ণ অ্যাপ (44 KB)
│   └── logo.png        ← NGTV লোগো
├── vercel.json         ← Vercel config
├── package.json
└── README.md
```

---

## ✨ Features v2.0
| ফিচার | বিবরণ |
|-------|-------|
| ⚽ FIFA 2026 ব্যানার | স্ট্যাটস সহ হিরো সেকশন |
| 📅 লাইভ ম্যাচ ডেটা | football-data.org API থেকে অটো |
| ⏱ কাউন্টডাউন | ম্যাচের ৫ ঘণ্টা আগে শুরু |
| ▶ আজকের ম্যাচ ক্লিক | সরাসরি T Sports HD চালু |
| 📋 আগামীকাল ক্লিক | শিডিউল স্ক্রিন + বড় কাউন্টডাউন |
| 📺 ব্লার ভিডিও প্লেয়ার | কোনো কিছু কাটে না, পুরো স্ক্রিন ভরা |
| 🔄 Auto-retry | HLS error হলে ৩ বার নিজেই চেষ্টা করে |
| 🔄 Auto-refresh | প্রতি ৩ মিনিটে ম্যাচ ডেটা আপডেট |
| 📱 মোবাইল-ফার্স্ট | Touch-optimized সব কিছু |

---

## 🔧 নতুন চ্যানেল যোগ করতে
`public/index.html` → `const CH = [...]` অ্যারেতে যোগ করুন:
```js
{ id:7, name:"beIN Sports", cat:"FIFA 2026", q:"FHD",
  logoUrl:"https://...", url:"https://.../index.m3u8" }
```

## 🔑 API Key পরিবর্তন করতে
`api/matches.js` → `const API_KEY = "..."` লাইনে বদলান।

---
**© 2026 NextGen TV · Developed by Shahadat**
