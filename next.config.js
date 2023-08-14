/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["bcrypt", "prisma"],
    },
};

module.exports = nextConfig;
