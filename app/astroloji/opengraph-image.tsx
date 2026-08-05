import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const alt = "Astroloji Hesaplamaları | HesaplamaMakinesi"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
    return renderOgCard({
        eyebrow: "HesaplamaMakinesi",
        title: "Astroloji Hesaplamaları",
        subtitle: "Yükselen burç, doğum haritası, Juno ve Lilith hesaplayıcıları",
        plate: "astroloji",
    })
}
