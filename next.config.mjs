/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/api/hello',
        headers: [
          {
            key: 'Content-Type',
            value: 'multipart/form-data',
          },
        ],
      },
    ]
  },
}

export default nextConfig
