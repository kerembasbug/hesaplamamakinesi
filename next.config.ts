import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  async redirects() {
    return [
      {
        // /zaman-tarih/saat-hesaplama, /zaman-takvim/saat-hesaplama'nın yetim
        // kopyasıydı: nav'da ve sitemap'te yoktu, title/description'ı neredeyse
        // aynıydı. Kanonik sürüme kalıcı olarak yönlendiriliyor.
        source: "/zaman-tarih/saat-hesaplama",
        destination: "/zaman-takvim/saat-hesaplama",
        permanent: true,
      },
      {
        source: "/zaman-tarih",
        destination: "/zaman-takvim",
        permanent: true,
      },
      {
        // /saglik-spor/promil-hesaplama da yetim bir kopyaydı: aynı hesaplayıcı
        // bileşenini kullanıyor, nav ve sitemap'te yer almıyordu. Kanonik sürüm
        // "alkol promil" varyasyonunu da kapsıyor.
        source: "/saglik-spor/promil-hesaplama",
        destination: "/saglik-spor/alkol-promil-hesaplama",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
