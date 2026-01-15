"use client"

import { useState, useCallback, useEffect } from "react"
import { Activity, Copy, Check, Calculator, Info, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function PromileCalculator() {
    const [weight, setWeight] = useState<string>("75")
    const [gender, setGender] = useState<"male" | "female">("male")
    const [drinkType, setDrinkType] = useState<string>("bira") // bira, raki, sarap
    const [quantity, setQuantity] = useState<string>("500") // ml
    const [timeSinceDrink, setTimeSinceDrink] = useState<string>("1") // saat
    const [result, setResult] = useState<{
        promile: number
        status: string
        color: string
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const alcoholRates: Record<string, number> = {
        bira: 0.05,
        sarap: 0.12,
        raki: 0.45,
        viski: 0.40,
        votka: 0.40
    }

    const calculate = useCallback(() => {
        const w = parseFloat(weight.replace(",", "."))
        const q = parseFloat(quantity.replace(",", "."))
        const t = parseFloat(timeSinceDrink.replace(",", "."))

        if (isNaN(w) || isNaN(q) || isNaN(t) || w <= 0) {
            setResult(null)
            return
        }

        // Widmark Formülü
        // Alkol Gram = (Hacim ml * Alkol Oranı * 0.8)
        // Promil = (Alkol Gram / (Ağırlık * Cinsiyet Çarpanı)) - (Zaman * 0.15)

        const r = gender === "male" ? 0.68 : 0.55
        const alcoholGrams = q * (alcoholRates[drinkType] || 0.05) * 0.8
        let promile = (alcoholGrams / (w * r)) - (t * 0.15)

        if (promile < 0) promile = 0

        let status = ""
        let color = ""
        if (promile === 0) { status = "Alkolsüz"; color = "text-green-600" }
        else if (promile < 0.5) { status = "Düşük (Yasal Sınır Altı)"; color = "text-yellow-600" }
        else if (promile < 1.0) { status = "Yasal Sınır Üstü"; color = "text-orange-600" }
        else { status = "Yüksek Alkollü"; color = "text-red-600" }

        setResult({
            promile: Math.round(promile * 100) / 100,
            status,
            color
        })
    }, [weight, gender, drinkType, quantity, timeSinceDrink])

    useEffect(() => {
        calculate()
    }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Alkol Promili: ${result.promile} (${result.status})`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Activity className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Promil (Alkol) Hesaplama</CardTitle>
                            <CardDescription className="text-emerald-100">
                                Tüketilen alkole göre kandaki promil seviyesi raporu
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Vücut Ağırlığı (KG)</Label>
                            <Input
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Cinsiyet</Label>
                            <div className="flex gap-2">
                                <Button variant={gender === "male" ? "default" : "outline"} onClick={() => setGender("male")} className="flex-1">Erkek</Button>
                                <Button variant={gender === "female" ? "default" : "outline"} onClick={() => setGender("female")} className="flex-1">Kadın</Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">İçecek Türü</Label>
                            <select
                                value={drinkType}
                                onChange={(e) => setDrinkType(e.target.value)}
                                className="w-full h-11 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                <option value="bira">Bira (%5)</option>
                                <option value="sarap">Şarap (%12)</option>
                                <option value="viski">Viski (%40)</option>
                                <option value="votka">Votka (%40)</option>
                                <option value="raki">Rakı (%45)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Miktar (ML)</Label>
                            <Input
                                type="text"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value.replace(/[^0-9]/g, ""))}
                                placeholder="Örn: 500"
                                className="h-11"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">İçkinin Üzerinden Geçen Zaman (Saat)</Label>
                        <Input
                            type="text"
                            value={timeSinceDrink}
                            onChange={(e) => setTimeSinceDrink(e.target.value.replace(/[^0-9.,]/g, ""))}
                            className="h-11"
                        />
                    </div>

                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 text-sm flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                        <span className="text-red-700 dark:text-red-300 text-xs">
                            Sorumluluk Reddi: Bu hesaplama sadece tahmini bir değerdir. Fizyolojik faktörler sonucu değiştirebilir.
                            <strong> ASLA alkollü araç kullanmayınız.</strong> Türkiye&apos;de yasal sınır hususi araçlar için 0.50 promildir.
                        </span>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-900 text-white text-center">
                        <CardTitle>Hesaplanan Promil Seviyesi</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 text-center space-y-4">
                        <p className="text-sm text-slate-500 font-medium">Kandaki Tahmini Alkol</p>
                        <p className="text-7xl font-black">{result.promile}</p>
                        <p className={`text-2xl font-bold ${result.color}`}>{result.status}</p>

                        <Button variant="outline" size="sm" onClick={copyToClipboard} className="mt-4">
                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            Kopyala
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
