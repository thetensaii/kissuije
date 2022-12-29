/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    dirs: ['pages', 'utils', 'components', 'hooks', 'providers'],
  },
};

module.exports = nextConfig;
