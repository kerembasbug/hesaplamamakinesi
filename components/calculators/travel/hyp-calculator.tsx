"use client"

import { useState, useCallback, useEffect } from "react"
import { Gauge, Copy, Check, Calculator, Info, Fuel, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function HypCalculator() {
    const [distance, setDistance] = useState<string>("100")
    const [speed1, setSpeed1] = useState<string>("90")
    const [speed2, setSpeed2] = useState<string>("120")
    const [consumption1, setConsumption1] = useState<string>("5.5")
    const [consumption2, setConsumption2] = useState<string>("7.5")
    const [fuelPrice, setFuelPrice] = useState<string>("45.00")

    const [result, setResult] = useState<{
        timeSaved: number // dakika
        extraFuel: number // litre
        extraCost: number // TL
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const d = parseFloat(distance.replace(",", "."))
        const s1 = parseFloat(speed1.replace(",", "."))
        const s2 = parseFloat(speed2.replace(",", "."))
        const c1 = parseFloat(consumption1.replace(",", "."))
        const c2 = parseFloat(consumption2.replace(",", "."))
        const p = parseFloat(fuelPrice.replace(",", "."))

        if (![d, s1, s2, c1, c2, p].every(v => !isNaN(v) && v > 0)) {
            setResult(null)
            return
        }

        const time1 = (d / s1) * 60
        const time2 = (d / s2) * 60
        const timeSaved = time1 - time2

        const fuel1 = (d / 100) * c1
        const fuel2 = (d / 100) * c2
        const extraFuel = fuel2 - fuel1
        const extraCost = extraFuel * p

        setResult({
            timeSaved: Math.round(timeSaved),
            extraFuel: Math.round(extraFuel * 100) / 100,
            extraCost: Math.round(extraCost)
        })
    }, [distance, speed1, speed2, consumption1, consumption2, fuelPrice])

    useEffect(() => {
        calculate()
    }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`HYP Sonucu: ${result.timeSaved} dk tasarruf için ${result.extraCost} TL fazla yakıt gideri.`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-800 to-indigo-900 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Gauge className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">HYP (Hız, Yakıt, Para) Hesaplaması</CardTitle>
                            <CardDescription className="text-slate-300">
                                Hızın zaman kazancı ve yakıt maliyeti dengesi
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mesafe (KM)</Label>
                            <Input value={distance} onChange={(e) => setDistance(e.target.value.replace(/[^0-9.,]/g, ""))} className="h-11 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Yakıt Fiyatı (₺)</Label>
                            <Input value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value.replace(/[^0-9.,]/g, ""))} className="h-11 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hızlı Hız (KM/S)</Label>
                            <Input value={speed2} onChange={(e) => setSpeed2(e.target.value.replace(/[^0-9.,]/g, ""))} className="h-11 font-bold border-indigo-200" />
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold">
                                <div className="w-2 h-2 rounded-full bg-indigo-600" /> Senaryo A (Ekonomik)
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">Hız (km/h)</Label>
                                    <Input value={speed1} onChange={(e) => setSpeed1(e.target.value.replace(/[^0-9.,]/g, ""))} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Tüketim (L/100km)</Label>
                                    <Input value={consumption1} onChange={(e) => setConsumption1(e.target.value.replace(/[^0-9.,]/g, ""))} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-rose-600 font-bold">
                                <div className="w-2 h-2 rounded-full bg-rose-600" /> Senaryo B (Hızlı)
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">Hız (km/h)</Label>
                                    <Input value={speed2} onChange={(e) => setSpeed2(e.target.value.replace(/[^0-9.,]/g, ""))} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Tüketim (L/100km)</Label>
                                    <Input value={consumption2} onChange={(e) => setConsumption2(e.target.value.replace(/[^0-9.,]/g, ""))} />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="grid gap-6 sm:grid-cols-2">
                    <Card className="border-emerald-200 dark:border-emerald-800 shadow-lg bg-emerald-50/50 dark:bg-emerald-950/20">
                        <CardContent className="p-6 text-center">
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold mb-1">KAZANILAN ZAMAN</p>
                            <p className="text-5xl font-black text-emerald-700 dark:text-emerald-300">{result.timeSaved < 0 ? 0 : result.timeSaved} <span className="text-xl">dk</span></p>
                            <p className="text-xs text-emerald-600 mt-2 italic">Daha hızlı giderek kazanılan süre</p>
                        </CardContent>
                    </Card>
                    <Card className="border-rose-200 dark:border-rose-800 shadow-lg bg-rose-50/50 dark:bg-rose-950/20">
                        <CardContent className="p-6 text-center">
                            <p className="text-sm text-rose-600 dark:text-rose-400 font-bold mb-1">EKSTRA MALİYET</p>
                            <p className="text-5xl font-black text-rose-700 dark:text-rose-300">{result.extraCost} <span className="text-xl">₺</span></p>
                            <p className="text-xs text-rose-600 mt-2 italic">Hız yapmanın ekstra yakıt bedeli</p>
                        </CardContent>
                    </Card>

                    <Card className="sm:col-span-2 border-indigo-200 shadow-xl overflow-hidden">
                        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                            <span className="font-bold flex items-center gap-2"><Calculator className="h-4 w-4" /> Genel Analiz</span>
                            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-white hover:bg-white/10 shrink-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 text-white" />}
                            </Button>
                        </div>
                        <CardContent className="p-6 bg-white dark:bg-slate-900">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                                <div className="space-y-1">
                                    <p className="text-slate-500 text-sm">Zamanın Dakika Maliyeti</p>
                                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                        {result.timeSaved > 0 ? (result.extraCost / result.timeSaved).toFixed(2) : "0.00"} ₺/dk
                                    </p>
                                </div>
                                <div className="h-12 w-px bg-slate-200 hidden sm:block" />
                                <div className="space-y-1">
                                    <p className="text-slate-500 text-sm">Ekstra Yakıt Tüketimi</p>
                                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{result.extraFuel < 0 ? 0 : result.extraFuel} Litre</p>
                                </div>
                            </div>
                            <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-xs text-amber-800 dark:text-amber-400 flex gap-3">
                                <AlertTriangle className="h-5 w-5 shrink-0" />
                                Önemli: Hız yapmak kazalara davetiye çıkarır ve yasal sınırların üzerindeki hızlar trafik cezası ile sonuçlanır. Lütfen kurallara uyunuz.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
