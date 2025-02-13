import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude large dependencies from server bundle
      if (Array.isArray(config.externals)) {
        config.externals.push('sharp', 'canvas')
      } else {
        config.externals = ['sharp', 'canvas']
      }
    }
    return config
  },
}

export default nextConfig