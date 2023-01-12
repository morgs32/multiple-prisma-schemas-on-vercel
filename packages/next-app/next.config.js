// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'users',
    'posts',
  ],
  experimental: {
    serverActions: true
  },
  webpack: config => {
    config.externals = [
      ...(config.externals || []), 
      /myprisma/,
    ]
    return config;
  },
}

module.exports = nextConfig