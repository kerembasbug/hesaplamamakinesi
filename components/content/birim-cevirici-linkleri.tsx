import Link from "next/link"
import { pairs } from "@/lib/units/pairs"
import { getUnit, getUnitCategory, convert } from "@/lib/units/registry"
import { hubPath, valuePath } from "@/lib/units/routes"
import { formatShort, trNumber } from "@/lib/units/format"

type Props = {
    /** Sadece bu kategorinin çiftleri listelenir. Boş bırakılırsa hepsi. */
    kategori?: string
    /** Her çift altında gösterilecek popüler değer sayısı. */
    ornekSayisi?: number
}

/**
 * Dönüştürücü sayfalarından programatik dönüşüm sayfalarına iç link köprüsü.
 *
 * Yeni /birim/* sayfaları bu linkler olmadan yalnızca sitemap üzerinden
 * keşfedilirdi; kategori sayfalarından link almaları hem taranmalarını
 * hızlandırır hem de link değeri aktarır.
 */
export function BirimCeviriciLinkleri({ kategori, ornekSayisi = 5 }: Props) {
    const liste = kategori ? pairs.filter((p) => p.kategori === kategori) : pairs
    if (liste.length === 0) return null

    return (
        <div className="not-prose my-6 space-y-5">
            {liste.map((pair) => {
                const category = getUnitCategory(pair.kategori)
                const from = getUnit(pair.kategori, pair.from)
                const to = getUnit(pair.kategori, pair.to)
                if (!category || !from || !to) return null

                return (
                    <div key={`${pair.from}-${pair.to}`}>
                        <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                            <Link href={hubPath(pair)} className="text-indigo-600 hover:underline dark:text-indigo-400">
                                {from.kisaltma} {to.kisaltma} çevirici
                            </Link>
                            {category.slug !== "sicaklik" && (
                                <span className="ml-2 font-normal text-slate-500 dark:text-slate-400">
                                    1 {from.kisaltma} = {formatShort(convert(category, from, to, 1))} {to.kisaltma}
                                </span>
                            )}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                            {pair.degerler.slice(0, ornekSayisi).map((v) => (
                                <li key={v}>
                                    <Link
                                        href={valuePath(pair, v)}
                                        className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 transition-colors hover:bg-indigo-100 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
                                    >
                                        {trNumber(v)} {from.kisaltma} kaç {to.kisaltma}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
