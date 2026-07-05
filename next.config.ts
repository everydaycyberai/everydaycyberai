import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tools/breach-checker",
        destination: "/tools/password-strength",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
