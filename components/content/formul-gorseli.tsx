import { FORMULA_HEIGHT, FORMULA_WIDTH } from "@/lib/formula-diagram"

type Props = {
    /** lib/formulas.ts içindeki slug. */
    slug: string
    /** Odak kelimeyi içermeli — RankMath "görsel alt metninde odak kelime" kriteri. */
    alt: string
}

/**
 * Build sırasında üretilen formül kartını gerçek bir <img> olarak gömer.
 * width/height verildiği için yükleme sırasında yer kayması (CLS) olmaz.
 */
export function FormulGorseli({ slug, alt }: Props) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`/gorseller/formul/${slug}.svg`}
            alt={alt}
            width={FORMULA_WIDTH}
            height={FORMULA_HEIGHT}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
        />
    )
}
