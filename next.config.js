/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for SSR
  // output: 'export', // Commented out for SSR
  trailingSlash: true,
  basePath: '', // Add your subdirectory here if needed, e.g., '/portfolio'
  assetPrefix: '', // Add your domain here if using CDN, e.g., 'https://yourdomain.com'
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Enable advanced optimizations
    optimizeCss: true,
    serverComponentsExternalPackages: ['three'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ultra-fast SSR optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  optimizeFonts: true,
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

// Bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)