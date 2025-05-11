/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:",
              "script-src * 'unsafe-inline' 'unsafe-eval' data: blob:",
              "connect-src *",
              "img-src * data:",
              "style-src * 'unsafe-inline'",
              "frame-src *",
            ].join('; ')
          }
        ]
      }
    ]
  },
}

module.exports = nextConfig