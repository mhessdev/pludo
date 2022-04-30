/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "cdn.thecyclemap.info"],
  },
};

module.exports = nextConfig;
