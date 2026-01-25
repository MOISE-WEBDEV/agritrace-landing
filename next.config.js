/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      // Redirect non-www to www (fallback if vercel.json doesn't catch it)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'agritrace.fr',
          },
        ],
        destination: 'https://www.agritrace.fr/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
