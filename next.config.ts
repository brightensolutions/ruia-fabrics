import type { NextConfig } from 'next'
import type { Configuration as WebpackConfig } from 'webpack'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['vercel-storage.com'], // Replace with your actual storage domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  serverExternalPackages: ['sharp'],
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      // Properly handle externals array
      const externals = [...(config.externals ? 
        (Array.isArray(config.externals) ? config.externals : [config.externals]) 
        : [])];
      config.externals = externals.concat(['sharp']);
    }
    return config;
  },
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
    serverComponentsExternalPackages: ['sharp'], // Add this for Next.js 13+
  },
}

export default nextConfig