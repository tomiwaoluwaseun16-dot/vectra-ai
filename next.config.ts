/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/trading',
        destination: '/ai-trading',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;