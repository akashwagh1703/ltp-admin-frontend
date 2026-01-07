# Deploy Admin Frontend to https://cidcomitra.com/ltp/ltp-admin-frontend/

## Step 1: Build Locally

Open terminal in `ltp-admin-frontend` folder:

```bash
cd "d:\Akash Wagh\LTP-Code-git-clone\ltp-admin-frontend"

# Install dependencies (if not done)
npm install

# Build for production
npm run build
```

This creates a `dist/` folder with all files.

---

## Step 2: Upload via FTP

### Connect to FTP:
- Host: `103.86.176.240`
- Username: `demo@cidcomitra.com`
- Password: `Supp0rt@ftp1`
- Port: `21`

### Create folder structure:
```
/ltp/
├── ltp-apis/
├── ltp-admin-frontend/    ← Create this folder
└── setup-ltp/
```

### Upload files:
1. **Create folder:** `ltp-admin-frontend` in `/ltp/` directory
2. **Upload ALL files** from `dist/` folder to `ltp-admin-frontend/`
3. **Upload:** `.htaccess` file (important for routing!)

Your structure should be:
```
/ltp/ltp-admin-frontend/
├── index.html
├── assets/
│   ├── index-xxx.js
│   └── index-xxx.css
├── .htaccess
└── (other files)
```

---

## Step 3: Access Admin Panel

Open browser:
```
https://cidcomitra.com/ltp/ltp-admin-frontend/
```

---

## Step 4: Update API CORS

The API needs to allow requests from admin frontend.

### Option A: Via setup.php

1. Go to: `https://cidcomitra.com/ltp/setup-ltp/setup.php`
2. Login
3. Scroll down to manual buttons
4. Click "Clear Config"
5. Click "Cache Config"

### Option B: Manual Edit

Edit `ltp-apis/config/cors.php`:

```php
'allowed_origins' => [
    'https://cidcomitra.com',
    'http://cidcomitra.com',
],
```

Then clear cache via setup.php.

---

## Quick Commands

### Build:
```bash
npm run build
```

### Test locally:
```bash
npm run dev
```

### Check build output:
```bash
dir dist
```

---

## Troubleshooting

### "Blank page" after upload
- Check if `.htaccess` is uploaded
- Check browser console for errors
- Verify API URL in build

### "API not connecting"
- Check CORS settings in API
- Verify API URL: `https://cidcomitra.com/ltp/ltp-apis/public/api/v1`
- Test API directly in browser

### "404 on refresh"
- `.htaccess` file missing
- Upload `.htaccess` to `ltp-admin-frontend/` folder

---

## Files to Upload

From `dist/` folder:
- ✅ index.html
- ✅ assets/ (entire folder)
- ✅ vite.svg (if exists)
- ✅ Any other files in dist/

Plus:
- ✅ .htaccess (from ltp-admin-frontend root)

---

## Access URLs

- **Admin Panel:** https://cidcomitra.com/ltp/ltp-admin-frontend/
- **API:** https://cidcomitra.com/ltp/ltp-apis/public/api/v1
- **Setup:** https://cidcomitra.com/ltp/setup-ltp/setup.php

---

**Ready to deploy!** Build and upload now.
