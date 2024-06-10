/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'skrksbry.synology.me',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;
