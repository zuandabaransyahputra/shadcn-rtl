import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // The registry JSON in public/r is fetched cross-origin by the shadcn CLI.
  async headers() {
    return [
      {
        source: "/r/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ]
  },
}

export default nextConfig
