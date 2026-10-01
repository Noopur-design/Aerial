// When PAGES=true (the GitHub Actions build), produce a static export under
// /Aerial for GitHub Pages. Local `npm run dev`/`build` stay at the root.
const isPages = process.env.PAGES === 'true';
const repo = 'Aerial';

/** @type {import('next').NextConfig} */
const nextConfig = isPages
  ? {
      output: 'export',
      basePath: `/${repo}`,
      assetPrefix: `/${repo}/`,
      trailingSlash: true,
      env: { NEXT_PUBLIC_BASE_PATH: `/${repo}` },
      images: { loader: 'custom', loaderFile: './image-loader.js' },
    }
  : {
      images: {
        qualities: [75, 85],
        formats: ['image/avif', 'image/webp'],
      },
    };

export default nextConfig;
