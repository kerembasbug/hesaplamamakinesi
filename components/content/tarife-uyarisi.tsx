import { AlertTriangle } from "lucide-react"

type Props = {
    /** Sayfadaki tarifenin ait olduğu yıl. */
    yil: number
    /** Neyin güncellenmesi gerektiği, örn. "MTV tarifesi". */
    konu: string
    kaynakAdi: string
    kaynakUrl: string
}

/**
 * Yıllık olarak değişen ama henüz doğrulanmamış tarife içeren sayfalar için
 * dürüst uyarı. Eski rakamı güncelmiş gibi göstermek, kullanıcı güvenini
 * kaybetmenin en hızlı yolu; bunun yerine hangi yıla ait olduğu açıkça yazılır.
 */
export function TarifeUyarisi({ yil, konu, kaynakAdi, kaynakUrl }: Props) {
    return (
        <div className="not-prose my-6 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <div className="text-sm text-amber-900 dark:text-amber-200">
                <p className="font-semibold">Bu sayfadaki {konu} {yil} yılına aittir.</p>
                <p className="mt-1">
                    {konu} her yıl yeniden belirlenir. Resmî işlemleriniz için güncel tutarı{" "}
                    <a
                        href={kaynakUrl}
                        target="_blank"
                        rel="noopener"
                        className="font-medium underline underline-offset-2"
                    >
                        {kaynakAdi}
                    </a>{" "}
                    üzerinden teyit edin.
                </p>
            </div>
        </div>
    )
}
