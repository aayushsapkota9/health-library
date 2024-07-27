/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                port: '',
                pathname: '/40',
            },
            {
                protocol: 'https',
                hostname: 'assets.example.com',
                port: '',
                pathname: '/account123/**',
            },
        ],
    },
};

module.exports = nextConfig;
