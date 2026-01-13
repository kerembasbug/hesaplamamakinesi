"use client"

import { useState, useCallback, useEffect } from "react"
import { Briefcase, Copy, Check, Calculator, Info, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// 2025 İşsizlik Maaşı Hesaplama Değerleri
const ASGARI_UCRET_2025 = 22104 // 2025 Asgari Ücret (Brüt)
const ISSIZLIK_ORANI = 0.40 // Brüt ücretin %40'ı
const TAVAN_CARPAN = 0.80 // Asgari ücretin %80'ini geçemez

export function UnemploymentCalculator() {
    const [brutMaas, setBrutMaas] = useState<string>("")
    const [calismaSuresi, setCalismaSuresi] = useState<string>("600")
    const [result, setResult] = useState<{
        aylikOdeme: number
        gunlukOdeme: number
        toplamGun: number
        toplamOdeme: number
        tavanUygulandiMi: boolean
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const brut = parseFloat(brutMaas.replace(/\./g, "").replace(",", "."))
        const gun = parseInt(calismaSuresi)

        if (isNaN(brut) || brut <= 0 || isNaN(gun)) {
            setResult(null)
            return
        }

        // Tavan hesaplama: Asgari ücretin %80'i
        const tavanMiktar = ASGARI_UCRET_2025 * TAVAN_CARPAN

        // Brüt maaşın %40'ı
        let hesaplananMaas = brut * ISSIZLIK_ORANI
        let tavanUygulandiMi = false

        // Tavan kontrolü
        if (hesaplananMaas > tavanMiktar) {
            hesaplananMaas = tavanMiktar
            tavanUygulandiMi = true
        }

        // Ödeme süresi (gün cinsinden)
        let toplamGun = 0
        if (gun >= 600 && gun < 900) toplamGun = 180 // 6 ay
        else if (gun >= 900 && gun < 1080) toplamGun = 240 // 8 ay
        else if (gun >= 1080) toplamGun = 300 // 10 ay

        const gunlukOdeme = hesaplananMaas / 30
        const toplamOdeme = (hesaplananMaas / 30) * toplamGun

        setResult({
            aylikOdeme: Math.round(hesaplananMaas * 100) / 100,
            gunlukOdeme: Math.round(gunlukOdeme * 100) / 100,
            toplamGun,
            toplamOdeme: Math.round(toplamOdeme * 100) / 100,
            tavanUygulandiMi
        })
    }, [brutMaas, calismaSuresi])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`İşsizlik Maaşı: ${formatCurrency(result.aylikOdeme)}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Briefcase className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">İşsizlik Maaşı Hesaplama 2025</CardTitle>
                            <CardDescription className="text-blue-100">
                                İşsizlik ödeneği tutarınızı hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Son 4 Aylık Ortalama Brüt Maaş (₺)</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder="25.000"
                                value={brutMaas}
                                onChange={(e) => setBrutMaas(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Son 3 Yılda Ödenen Prim Günü</Label>
                            <select
                                value={calismaSuresi}
                                onChange={(e) => setCalismaSuresi(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                <option value="600">600-899 gün (6 ay ödeme)</option>
                                <option value="900">900-1079 gün (8 ay ödeme)</option>
                                <option value="1080">1080+ gün (10 ay ödeme)</option>
                            </select>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>2025 Yılı Değerleri:</strong>
                                <ul className="mt-1 space-y-1">
                                    <li>• Asgari Ücret (Brüt): {formatCurrency(ASGARI_UCRET_2025)}</li>
                                    <li>• Tavan: Asgari ücretin %80'i = {formatCurrency(ASGARI_UCRET_2025 * TAVAN_CARPAN)}</li>
                                    <li>• Ödeme Oranı: Brüt maaşın %40'ı</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && result.toplamGun > 0 && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Hesaplama Sonuçları
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {result.tavanUygulandiMi && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">
                                <AlertCircle className="h-5 w-5" />
                                <span className="text-sm">Tavan uygulandı. Maaşınız tavandan hesaplandı.</span>
                            </div>
                        )}

                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            <p className="text-sm text-blue-100 mb-1">Aylık İşsizlik Maaşınız</p>
                            <p className="text-4xl font-bold">{formatCurrency(result.aylikOdeme)}</p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500">Günlük Ödeme</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(result.gunlukOdeme)}</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500">Ödeme Süresi</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{result.toplamGun} gün</p>
                                <p className="text-xs text-slate-400">({result.toplamGun / 30} ay)</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500">Toplam Ödeme</p>
                                <p className="text-xl font-bold text-green-600">{formatCurrency(result.toplamOdeme)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
