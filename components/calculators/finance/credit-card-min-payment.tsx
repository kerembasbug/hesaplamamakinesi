"use client"

import { useState, useCallback, useEffect } from "react"
import { Copy, Check, Calculator, Info, Landmark } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function CreditMinPaymentCalculator() {
    const [balance, setBalance] = useState<string>("50000")
    const [minRate, setMinRate] = useState<string>("20") // Genelde %20 veya %40
    const [result, setResult] = useState<{
        minOdeme: number
        kalanBorc: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const b = parseFloat(balance.replace(",", "."))
        const r = parseFloat(minRate.replace(",", "."))

        if (isNaN(b) || isNaN(r) || b < 0) {
            setResult(null)
            return
        }

        const minOdeme = b * (r / 100)
        const kalanBorc = b - minOdeme

        setResult({
            minOdeme: Math.round(minOdeme * 100) / 100,
            kalanBorc: Math.round(kalanBorc * 100) / 100
        })
    }, [balance, minRate])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Asgari Ödeme: ${formatCurrency(result.minOdeme)}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Landmark className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Kredi Kartı Asgari Ödeme</CardTitle>
                            <CardDescription className="text-blue-100">
                                Ekstre borcuna göre asgari ödeme tutarı
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Toplam Ekstre Borcu (₺)</Label>
                            <Input
                                type="text"
                                placeholder="Örn: 50000"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Asgari Ödeme Oranı (%)</Label>
                            <select
                                value={minRate}
                                onChange={(e) => setMinRate(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                <option value="20">%20 (Limit ≤ 25.000 TL)</option>
                                <option value="40">%40 (Limit &gt; 25.000 TL)</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 text-sm italic">
                        <Info className="h-4 w-4 inline mr-2 text-blue-600" />
                        BDDK kurallarına göre 25.000 TL altı limitlerde %20, üstü limitlerde %40 asgari oran uygulanır.
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Ödeme Planı
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white transform hover:scale-[1.02] transition-transform">
                            <p className="text-sm text-blue-100 mb-1">Asgari Ödeme Tutarı</p>
                            <p className="text-4xl font-bold">{formatCurrency(result.minOdeme)}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                            <p className="text-sm text-slate-500 mb-1">Kalan Borç (Anapara)</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(result.kalanBorc)}</p>
                            <p className="text-xs text-red-500 mt-2 font-medium">⚠️ Kalan borca akdi faiz uygulanacaktır.</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
