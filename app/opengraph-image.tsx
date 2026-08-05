import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"
import { SITE_TAGLINE } from "@/lib/site-config"

export const alt = "HesaplamaMakinesi - Türkiye'nin Hesaplama Platformu"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
    return renderOgCard({
        eyebrow: "Ücretsiz online araçlar",
        title: SITE_TAGLINE,
        subtitle: "Finans, vergi, sağlık, matematik ve birim dönüşümü hesaplayıcıları",
        plate: "default",
    })
}
