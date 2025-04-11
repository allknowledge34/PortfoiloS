/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable filesystem cache if issues persist
  generateEtags: false,
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
