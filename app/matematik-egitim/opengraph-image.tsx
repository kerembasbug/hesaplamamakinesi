import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const alt = "Matematik ve Eğitim | HesaplamaMakinesi"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
    return renderOgCard({
        eyebrow: "HesaplamaMakinesi",
        title: "Matematik ve Eğitim",
        subtitle: "Yüzde, karekök, ortalama, GPA ve sınav puanı hesaplayıcıları",
        plate: "matematik-egitim",
    })
}
