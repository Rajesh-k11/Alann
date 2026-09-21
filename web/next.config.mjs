/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['@alann/orb-core', '@alann/orb-web'],
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
