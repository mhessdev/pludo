/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: "custom",
        path: "https://cdn.thecyclemap.info",
        domains: ["cdn.discordapp.com", "cdn.thecyclemap.info"],
        // loader: "imgix",
        // path: "",
    },
};

module.exports = nextConfig;
