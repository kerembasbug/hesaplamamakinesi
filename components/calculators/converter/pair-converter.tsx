"use client"

import { useMemo, useState } from "react"
import { ArrowRightLeft, Check, Copy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { convert, getUnit, getUnitCategory, unitSymbol } from "@/lib/units/registry"
import { formatResult } from "@/lib/units/format"

type PairConverterProps = {
    categorySlug: string
    fromSlug: string
    toSlug: string
    /** Sayfa açıldığında girili gelen değer. */
    defaultValue?: number
}

/**
 * Tek çifte odaklı kompakt dönüştürücü. Sayfa hangi dönüşüm için açıldıysa
 * o değer hazır girili gelir; kullanıcı istediği değeri yazıp anında sonuç alır.
 */
export function PairConverter({ categorySlug, fromSlug, toSlug, defaultValue }: PairConverterProps) {
    const [swapped, setSwapped] = useState(false)
    const [raw, setRaw] = useState(defaultValue !== undefined ? String(defaultValue) : "")
    const [copied, setCopied] = useState(false)

    const category = getUnitCategory(categorySlug)
    const unitA = getUnit(categorySlug, fromSlug)
    const unitB = getUnit(categorySlug, toSlug)

    const from = swapped ? unitB : unitA
    const to = swapped ? unitA : unitB

    const result = useMemo(() => {
        if (!category || !from || !to) return null
        const value = Number.parseFloat(raw.replace(/\./g, "").replace(/,/g, "."))
        if (!Number.isFinite(value)) return null
        return convert(category, from, to, value)
    }, [category, from, to, raw])

    if (!category || !from || !to) return null

    const copy = async () => {
        if (result === null) return
        try {
            await navigator.clipboard.writeText(formatResult(result))
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Pano erişimi reddedildiyse sessizce geç.
        }
    }

    return (
        <Card className="shadow-lg border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-t-lg">
                <CardTitle className="text-xl">
                    {from.ad} → {to.ad} Çevirici
                </CardTitle>
                <CardDescription className="text-indigo-100">
                    Değeri değiştirin, sonuç anında güncellensin.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                    <div className="space-y-2">
                        <Label htmlFor="pair-converter-input">{from.ad} ({unitSymbol(from)})</Label>
                        <Input
                            id="pair-converter-input"
                            inputMode="decimal"
                            value={raw}
                            onChange={(event) => setRaw(event.target.value)}
                            placeholder={`Örn. ${defaultValue ?? 1}`}
                        />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setSwapped((s) => !s)}
                        aria-label="Birimleri yer değiştir"
                        className="mx-auto"
                    >
                        <ArrowRightLeft className="h-4 w-4" />
                    </Button>

                    <div className="space-y-2">
                        <Label htmlFor="pair-converter-output">{to.ad} ({unitSymbol(to)})</Label>
                        <div className="flex gap-2">
                            <Input
                                id="pair-converter-output"
                                readOnly
                                value={result === null ? "" : formatResult(result)}
                                placeholder="Sonuç"
                                className="font-semibold"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={copy}
                                disabled={result === null}
                                aria-label="Sonucu kopyala"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
