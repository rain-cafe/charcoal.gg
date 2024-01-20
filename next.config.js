// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT ?? 'local',
  },
};

module.exports = nextConfig;
