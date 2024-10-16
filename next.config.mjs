/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.datocms-assets.com",
      "img.freepik.com",
      "ifpnews.com",
      "www.bing.com",
      "cdn.sortiraparis.com",
      "www.tripsavvy.com",
      "www.paristouristinformation.fr",
      "www.tout-paris.org",
      "th.bing.com",
      "www.rodei.com.br",
      "www.worldbyisa.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/external-api/:path*", // Rota para a API externa
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
