// next.config.ts

import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@/components": path.resolve(__dirname, "src/components"),
    };
    return config;
  },
  
};

export default nextConfig;
