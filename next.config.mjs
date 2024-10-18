/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
    APP_URL: process.env.APP_URL,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'flowbite.com',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.com',
      },
      {
        protocol: 'https',
        hostname: 'api-talentnesia.skwn.dev',
      },
      {
        protocol: 'https',
        hostname: 'img-b.udemycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'imagizer.imageshack.com',
      },
    ],
  },
  trailingSlash: true,
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const withBundleAnalyzerFunc = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzerFunc(nextConfig);
