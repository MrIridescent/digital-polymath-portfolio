# 🚀 cPanel Deployment Guide

## Step-by-Step Instructions for Deploying Your Digital Polymath Portfolio

### 📋 Prerequisites

1. **GitHub Account** - Create one at [github.com](https://github.com)
2. **cPanel Hosting** - Your hosting provider with cPanel access
3. **FTP Access** - FTP credentials from your hosting provider

### 🔧 Step 1: Create GitHub Repository

1. **Go to GitHub** and create a new repository:
   - Repository name: `digital-polymath-portfolio` (or your preferred name)
   - Set to **Public** (recommended) or Private
   - Don't initialize with README (we already have one)

2. **Copy the repository URL** (e.g., `https://github.com/yourusername/digital-polymath-portfolio.git`)

### 📤 Step 2: Push Code to GitHub

Open your terminal/command prompt in the project directory and run:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### 🔐 Step 3: Configure GitHub Secrets

1. **Go to your GitHub repository**
2. **Click on "Settings"** (in the repository menu)
3. **Navigate to "Secrets and variables" → "Actions"**
4. **Click "New repository secret"** and add these four secrets:

#### Required Secrets:

**CPANEL_FTP_SERVER**
- **Value**: Your FTP server address
- **Examples**: 
  - `ftp.yourdomain.com`
  - `yourdomain.com`
  - `server123.hostingprovider.com`

**CPANEL_FTP_USERNAME**
- **Value**: Your FTP username
- **Usually**: Your cPanel username or domain name

**CPANEL_FTP_PASSWORD**
- **Value**: Your FTP password
- **Usually**: Your cPanel password or FTP-specific password

**CPANEL_FTP_SERVER_DIR**
- **Value**: Target directory on your server
- **Common values**:
  - `/public_html/` (for main domain)
  - `/public_html/subdomain/` (for subdomain)
  - `/` (if FTP user is already in the correct directory)

### 🎯 Step 4: Find Your FTP Details

#### Method 1: cPanel File Manager
1. **Login to cPanel**
2. **Go to "FTP Accounts"**
3. **Find your main FTP account** or create a new one
4. **Note down**: Server, Username, Password

#### Method 2: Hosting Provider Documentation
- **Check your hosting provider's documentation**
- **Look for**: "FTP Setup" or "File Transfer" guides
- **Common providers**:
  - **Hostinger**: `ftp.hostinger.com`
  - **Bluehost**: `ftp.yourdomain.com`
  - **GoDaddy**: `ftp.yourdomain.com`
  - **Namecheap**: `server123.web-hosting.com`

### 🚀 Step 5: Deploy!

Once you've configured the secrets:

1. **Go to your repository on GitHub**
2. **Make any small change** (like updating README.md)
3. **Commit and push** the change:
   ```bash
   git add .
   git commit -m "Trigger deployment"
   git push
   ```

4. **Watch the deployment**:
   - Go to **"Actions"** tab in your GitHub repository
   - You'll see the deployment workflow running
   - It takes about 3-5 minutes to complete

### 📁 Step 6: Add Your Profile Image

1. **Add your professional photo** to the `public` folder as `profile.jpg`
2. **Commit and push**:
   ```bash
   git add public/profile.jpg
   git commit -m "Add professional profile image"
   git push
   ```

3. **The deployment will automatically update** your live site!

### ✅ Step 7: Verify Deployment

1. **Visit your domain** in a web browser
2. **Check that**:
   - All animations are working
   - Images are loading properly
   - Navigation works correctly
   - Mobile responsiveness is good

### 🔧 Troubleshooting

#### Deployment Fails?
1. **Check the Actions tab** for error messages
2. **Verify your FTP credentials** are correct
3. **Ensure the server directory exists**
4. **Try with different directory paths**:
   - `/public_html/`
   - `/`
   - `/www/`

#### Images Not Loading?
1. **Check file paths** are correct
2. **Ensure images are in the `public` folder**
3. **Verify file extensions** match exactly

#### Site Not Updating?
1. **Clear your browser cache**
2. **Check if deployment completed successfully**
3. **Wait a few minutes** for changes to propagate

### 🎨 Customization After Deployment

#### Update Content:
1. **Edit the relevant component files**
2. **Commit and push changes**
3. **Automatic deployment** will update your site

#### Add New Sections:
1. **Create new components**
2. **Import them in the main page**
3. **Push changes** for automatic deployment

### 📞 Support

If you encounter issues:

1. **Check the GitHub Actions logs** for detailed error messages
2. **Verify your hosting provider's FTP settings**
3. **Contact your hosting provider** for FTP assistance
4. **Try manual deployment** as a backup (upload `out` folder contents)

### 🎉 Success!

Once deployed, your **Digital Polymath Portfolio** will be live with:
- ✅ **Spectacular animations**
- ✅ **Professional presentation**
- ✅ **Cisco Cyber Threat Management showcase**
- ✅ **Automatic updates** on every code change
- ✅ **Optimized performance**

Your portfolio will automatically rebuild and deploy every time you push changes to GitHub! 🚀
