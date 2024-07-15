/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/mixedError/mixedContents",
        destination: `${process.env.NEXT_PUBLIC_SEOUL_API_URL}`,
      },
      {
        source: "/api/rewrite/rewrite",
        destination: "/about",
      },
      {
        source: "/hasMixedContent",
        destination: `${process.env.NEXT_PUBLIC_SEOUL_API_URL}`,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/redirect",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
