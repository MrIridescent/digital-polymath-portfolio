# 🌟 Digital Polymath Portfolio

**David Akpoviroro OKE (Mr. Iridescent) - The Creative Renaissance Man**

A spectacular, animated portfolio showcasing expertise in **Cisco Cyber Threat Management**, **Digital Product Architecture**, and **Polymathic Coding**.

## ✨ Features

- 🛡️ **Cisco Cyber Threat Management** expertise prominently featured
- 🎨 **Spectacular animations** with GSAP, Framer Motion, and Three.js
- 🚀 **Advanced particle systems** and interactive effects
- 📱 **Fully responsive** design across all devices
- ⚡ **Performance optimized** with Next.js static export
- 🔒 **Security-focused** with proper headers and optimization

## 🛡️ Cybersecurity Credentials

- **Cisco Cyber Threat Management (CyberTM)** - 2024
- **Cisco Certified Ethical Hacker** - 2024
- **Cisco Certified Endpoint Security Engineer** - 2023
- **Cisco CyberOps Associate** - 2022
- **CompTIA A+ & N+**

## 🚀 Deployment to cPanel

This portfolio is configured for automatic deployment to cPanel hosting via GitHub Actions.

### Setup Instructions:

1. **Create a GitHub Repository:**
   ```bash
   # Push this code to your GitHub repository
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

2. **Configure GitHub Secrets:**
   Go to your GitHub repository → Settings → Secrets and variables → Actions

   Add these secrets:
   - `CPANEL_FTP_SERVER`: Your cPanel FTP server (e.g., `ftp.yourdomain.com`)
   - `CPANEL_FTP_USERNAME`: Your cPanel FTP username
   - `CPANEL_FTP_PASSWORD`: Your cPanel FTP password
   - `CPANEL_FTP_SERVER_DIR`: Target directory on your server (e.g., `/public_html/`)

3. **Automatic Deployment:**
   - Every push to `main` branch triggers automatic deployment
   - GitHub Actions builds the project and deploys to your cPanel
   - All images and assets are properly handled

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd digitalpolymat
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable React components
├── lib/                # Utility functions
├── public/             # Static assets
├── types/              # TypeScript type definitions
└── ...config files
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Self-hosted
```bash
npm run build
npm start
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with tree shaking and code splitting

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run format` - Format code with Prettier

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.# Deployment triggered on 07/16/2025 12:33:35
