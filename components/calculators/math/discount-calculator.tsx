"use client"

import { useState, useCallback, useEffect } from "react"
import { Tag, Copy, Check, Calculator, Percent } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function DiscountCalculator() {
    const [price, setPrice] = useState<string>("")
    const [discountRate, setDiscountRate] = useState<string>("20")
    const [result, setResult] = useState<{
        indirimTutari: number
        sonFiyat: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const p = parseFloat(price.replace(",", "."))
        const r = parseFloat(discountRate.replace(",", "."))

        if (isNaN(p) || isNaN(r) || p <= 0) {
            setResult(null)
            return
        }

        const indirimTutari = p * (r / 100)
        const sonFiyat = p - indirimTutari

        setResult({
            indirimTutari: Math.round(indirimTutari * 100) / 100,
            sonFiyat: Math.round(sonFiyat * 100) / 100
        })
    }, [price, discountRate])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`İndirimli Fiyat: ${formatCurrency(result.sonFiyat)}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-500 to-rose-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Tag className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">İskonto (İndirim) Hesaplama</CardTitle>
                            <CardDescription className="text-red-100">
                                Fiyat üzerinden yüzde indirim hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Normal Fiyat (₺)</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder="Örn: 1000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">İndirim Oranı (%)</Label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="Örn: 20"
                                    value={discountRate}
                                    onChange={(e) => setDiscountRate(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="h-12 pr-10 text-lg"
                                />
                                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {[5, 10, 20, 25, 30, 50, 70].map((rate) => (
                            <Button
                                key={rate}
                                variant="outline"
                                size="sm"
                                onClick={() => setDiscountRate(rate.toString())}
                                className={discountRate === rate.toString() ? "bg-red-50 border-red-200 text-red-600" : ""}
                            >
                                %{rate}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                İndirimli Sonuç
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white">
                            <p className="text-sm text-red-100 mb-1">Yeni Fiyat</p>
                            <p className="text-5xl font-bold">{formatCurrency(result.sonFiyat)}</p>
                            <p className="text-red-100 mt-2">Toplam Kazanç: {formatCurrency(result.indirimTutari)}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
