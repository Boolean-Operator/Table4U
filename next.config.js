/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resizer.otstatic.com',
        pathname: '/v2/photos/xlarge/**',
      },
    ],
  },
};

module.exports = nextConfig;
