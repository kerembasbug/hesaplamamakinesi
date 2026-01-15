"use client"

import { useState, useCallback, useEffect } from "react"
import { Building2, Copy, Check, Calculator, Info, Landmark } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function RayicBedelCalculator() {
    const [marketValue, setMarketValue] = useState<string>("5000000")
    const [cityRate, setCityRate] = useState<string>("50") // Şehir/Bölge çarpanı %30-%70 arası değişir
    const [result, setResult] = useState<{
        rayicBedel: number
        emsalBedel: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const mv = parseFloat(marketValue.replace(",", "."))
        const cr = parseFloat(cityRate.replace(",", "."))

        if (isNaN(mv) || isNaN(cr) || mv <= 0) {
            setResult(null)
            return
        }

        // Basit Rayiç Bedel Tahmini: Piyasa değerinin %30 ile %70'i arasıdır
        const rayicBedel = mv * (cr / 100)
        // Emsal kira bedeli: Rayiç bedelin %5'i (Yıllık)
        const emsalBedel = rayicBedel * 0.05

        setResult({
            rayicBedel: Math.round(rayicBedel),
            emsalBedel: Math.round(emsalBedel / 12) // Aylık emsal kira
        })
    }, [marketValue, cityRate])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Tahmini Rayiç Bedel: ${formatCurrency(result.rayicBedel)}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Building2 className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Rayiç Bedel Hesaplama (Tahmini)</CardTitle>
                            <CardDescription className="text-teal-100">
                                Gayrimenkulün resmi değerini tahmin edin
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Piyasa (Satış) Değeri (₺)</Label>
                            <Input
                                type="text"
                                placeholder="Örn: 5.000.000"
                                value={marketValue}
                                onChange={(e) => setMarketValue(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Bölge Değer Katsayısı (%)</Label>
                            <Input
                                type="range"
                                min="30"
                                max="80"
                                step="5"
                                value={cityRate}
                                onChange={(e) => setCityRate(e.target.value)}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-500 px-1">
                                <span>Düşük Değer (%30)</span>
                                <span className="font-bold text-teal-600">Seçili: %{cityRate}</span>
                                <span>Yüksek Değer (%80)</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 text-sm">
                        <Info className="h-4 w-4 inline mr-2 text-teal-600" />
                        Rayiç bedel, belediyeler tarafından sokak ve cadde bazında belirlenen vergi değeridir. Bu araç piyasa fiyatına göre bir projeksiyon sunar.
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Tahmini Değerler
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                            <p className="text-sm text-teal-100 mb-1">Tahmini Rayiç Bedel</p>
                            <p className="text-4xl font-bold">{formatCurrency(result.rayicBedel)}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 text-center">
                                <p className="text-xs text-slate-500 mb-1">Emsal Kira Bedeli (Aylık)</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(result.emsalBedel)}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 text-center">
                                <p className="text-xs text-slate-500 mb-1">Tapu Harcı Tahmini (%4)</p>
                                <p className="text-xl font-bold text-red-600">{formatCurrency(result.rayicBedel * 0.04)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
