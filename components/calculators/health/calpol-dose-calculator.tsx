"use client"

import { useState, useCallback, useEffect } from "react"
import { Activity, Copy, Check, Calculator, Info, AlertCircle, Syringe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function CalpolDoseCalculator() {
    const [weight, setWeight] = useState<string>("15")
    const [medicationType, setMedicationType] = useState<string>("calpol-120") // 120mg/5ml or 250mg/5ml
    const [customDose, setCustomDose] = useState<string>("15") // mg/kg

    const [result, setResult] = useState<{
        mgPerDose: number
        mlPerDose: number
        maxDosesPerDay: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const w = parseFloat(weight.replace(",", "."))
        const d = parseFloat(customDose.replace(",", "."))

        if (isNaN(w) || w <= 0) {
            setResult(null)
            return
        }

        // Standart Parasetamol dozu: 10-15 mg/kg
        const mgPerDose = w * d

        // Konsantrasyon
        let mgPerMl = 24 // Standart 120mg/5ml = 24mg/ml
        if (medicationType === "calpol-250") mgPerMl = 50 // 250mg/5ml = 50mg/ml

        const mlPerDose = mgPerDose / mgPerMl

        setResult({
            mgPerDose: Math.round(mgPerDose),
            mlPerDose: Math.round(mlPerDose * 10) / 10,
            maxDosesPerDay: 4 // Genellikle 4-6 saatte bir, max 4 kez
        })
    }, [weight, medicationType, customDose])

    useEffect(() => {
        calculate()
    }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Calpol Dozu: ${result.mlPerDose} ml (${result.mgPerDose} mg) per doz.`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Syringe className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Calpol (Parasetamol) Dozu Hesaplama</CardTitle>
                            <CardDescription className="text-pink-100">
                                Çocuğun kilosuna göre ölçekli doz rehberi
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Çocuğun Ağırlığı (KG)</Label>
                            <Input
                                type="text"
                                placeholder="Örn: 15"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg border-pink-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">İlaç Türü</Label>
                            <select
                                value={medicationType}
                                onChange={(e) => setMedicationType(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                <option value="calpol-120">Calpol 120 mg / 5 ml (Normal)</option>
                                <option value="calpol-250">Calpol 6 Plus 250 mg / 5 ml (Yüksek Doz)</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 text-sm flex gap-3">
                        <Info className="h-5 w-5 text-blue-600 shrink-0" />
                        <span className="text-blue-800 dark:text-blue-300">
                            Bu hesaplamada 15 mg/kg standart dozu baz alınmıştır. Hekiminizin farklı bir önerisi varsa ona uyunuz.
                        </span>
                    </div>

                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 text-sm flex gap-3 text-red-700 dark:text-red-300">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-xs uppercase font-bold tracking-tight text-red-600">
                            UYARI: İlaç kullanımı için mutlaka doktorunuza danışınız. Bu araç sadece bilgilendirme amaçlıdır.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Hesaplanan Doz
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 text-center space-y-6">
                        <div>
                            <p className="text-slate-500 mb-2 font-medium">Önerilen Doz (ML)</p>
                            <p className="text-7xl font-black text-slate-900 dark:text-white">{result.mlPerDose} <span className="text-2xl">ml</span></p>
                            <p className="text-slate-400 font-bold mt-1">({result.mgPerDose} mg parasetamol)</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <p className="text-xs text-slate-500 mb-1">Maksimum Doz Sıklığı</p>
                                <p className="text-lg font-bold">4-6 Saatte Bir</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <p className="text-xs text-slate-500 mb-1">Günlük Maksimum</p>
                                <p className="text-lg font-bold">4 Doz</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
