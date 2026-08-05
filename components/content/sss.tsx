import { JsonLd } from "@/components/seo/json-ld"
import { faqSchema, type FaqItem } from "@/lib/schema"

type Props = {
    /** Bölüm başlığı — odak kelimeyi içermeli. */
    baslik?: string
    sorular: FaqItem[]
}

/**
 * Sıkça sorulan sorular bölümü: görünür içerik + FAQPage şeması tek yerden.
 * Soruların h3 olması, RankMath'in "alt başlıkta odak kelime" kriterine ve
 * AI arama motorlarının pasaj çıkarımına yardım eder.
 */
export function SSS({ baslik = "Sıkça Sorulan Sorular", sorular }: Props) {
    if (sorular.length === 0) return null

    return (
        <>
            <JsonLd data={faqSchema(sorular)} />
            <h2>{baslik}</h2>
            {sorular.map((soru) => (
                <div key={soru.question}>
                    <h3>{soru.question}</h3>
                    <p>{soru.answer}</p>
                </div>
            ))}
        </>
    )
}
