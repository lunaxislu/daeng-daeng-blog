/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/mixedError/mixedContents",
        destination: `${process.env.NEXT_PUBLIC_ANIMAL_HOSPITAL}`,
      },
      {
        source: "/api/rewrite/rewrite",
        destination: "/about",
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
