/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com','s3.resume.io'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
