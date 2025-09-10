import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    // remarkPlugins: [['remark-gfm']],
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        hostname: 'www.notion.so',
      },
    ],
  },
};

export default withMDX(nextConfig);
