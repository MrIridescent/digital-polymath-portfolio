# cPanel Hosting Deployment Guide

## 📁 Static Files Location
Your static website files are now ready in the `out` folder:
```
C:\Users\I2s-ltd\Desktop\RESUME\DIGITAL POLYMAT\digitalpolymat\out\
```

## 🚀 How to Deploy to cPanel Hosting

### Step 1: Access Your cPanel
1. Log into your hosting provider's cPanel
2. Navigate to **File Manager**
3. Go to the `public_html` directory (or your domain's document root)

### Step 2: Upload Files
1. **Option A: Using File Manager**
   - Select all files and folders from the `out` directory
   - Upload them to `public_html` (or your domain folder)
   - Extract if uploaded as a zip file

2. **Option B: Using FTP Client (FileZilla, WinSCP)**
   - Connect to your hosting via FTP
   - Upload all contents of the `out` folder to `public_html`

### Step 3: File Structure on Server
Your server should look like this:
```
public_html/
├── index.html (your homepage)
├── 404.html
├── _next/ (contains CSS, JS, and assets)
├── about/
│   └── index.html
├── case-studies/
│   ├── index.html
│   ├── ai-recommendation-engine/
│   ├── financial-microservices/
│   └── iot-anomaly-detection/
├── contact/
├── philosophy/
├── projects/
├── resume/
└── writings/
```

## ⚙️ cPanel Configuration

### 1. Set Default Document
In cPanel → **Indexes** → Set `index.html` as default document

### 2. Enable Gzip Compression (Optional)
Add this to your `.htaccess` file in `public_html`:
```apache
# Enable Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 3. Handle 404 Errors
The `404.html` file is already included for custom error pages.

## 🔄 Future Updates

### To Update Your Site:
1. Make changes to your code
2. Run `npm run build` 
3. Upload new files from the `out` folder to replace old ones
4. Clear any caching if needed

### Automated Deployment (Advanced):
Consider using GitHub Actions to automatically build and deploy:
- Push code to GitHub
- GitHub Action builds the site
- Automatically uploads to your cPanel via FTP

## 📋 Pre-Upload Checklist

✅ **Build completed successfully** - `npm run build` finished without errors
✅ **Out folder created** - Contains all static files
✅ **All pages generated** - 19 pages including case studies, writings, resume
✅ **Assets optimized** - CSS, JS, and images are minified
✅ **SEO ready** - Meta tags, sitemap, and structured data included

## 🌐 Domain Configuration

### If using a subdirectory:
Update `next.config.js`:
```javascript
const nextConfig = {
  basePath: '/portfolio', // if your site is at yourdomain.com/portfolio
  assetPrefix: '/portfolio',
  // ... other config
}
```

### If using a subdomain:
No changes needed - upload directly to the subdomain's document root.

## 📞 Support

If you encounter issues:
1. Check file permissions (755 for folders, 644 for files)
2. Ensure all files uploaded correctly
3. Check browser console for any 404 errors
4. Contact your hosting provider if needed

Your portfolio is now ready for professional hosting! 🎉
