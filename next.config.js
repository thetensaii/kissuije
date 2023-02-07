/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    dirs: ['pages', 'lib', 'components', 'hooks', 'providers', 'reducers'],
  },
};

module.exports = nextConfig;
