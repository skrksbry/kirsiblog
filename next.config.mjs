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
			{
				protocol: 'https',
				hostname: 'r2.silvercherry.io',
				port: '',
				pathname: '/**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/auth/:path*',
				destination: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/:path*`,
			},
			{
				source: '/images/:path*',
				destination: `${process.env.NEXT_PUBLIC_BASE_URL}/images/:path*`,
			},
		];
	},
};

export default process.env.ANALYZE === 'true'
	? withBundleAnalyzer(nextConfig)
	: nextConfig;
