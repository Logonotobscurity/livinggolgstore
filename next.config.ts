
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flos.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.lumens.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.lumens.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.ydesigngroup.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.visualcomfort.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'z3photorankmedia-a.akamaihd.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'z1photorankmedia-a.akamaihd.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'z2photorankmedia-a.akamaihd.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photorankmedia-a.akamaihd.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    allowedDevOrigins: [
        'https://*.cluster-ikslh4rdsnbqsvu5nw3v4dqjj2.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
