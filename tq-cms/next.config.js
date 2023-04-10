/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "quiver-news.s3.ap-south-1.amazonaws.com"
      },
    ],
    minimumCacheTTL: 1500000,
  },
};

module.exports = nextConfig