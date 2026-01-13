"use client"

import { useState, useCallback, useEffect } from "react"
import { Car, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// 2025 ÖTV Oranları (Motor Hacmi ve Fiyata Göre)
const otvOranlari = [
    { maxFiyat: 1450000, oran1600: 0.45, oran1600_2000: 0.50, oran2000: 0.60 },
    { maxFiyat: 1700000, oran1600: 0.50, oran1600_2000: 0.55, oran2000: 0.70 },
    { maxFiyat: 2200000, oran1600: 0.60, oran1600_2000: 0.65, oran2000: 0.80 },
    { maxFiyat: Infinity, oran1600: 0.80, oran1600_2000: 1.30, oran2000: 2.20 }
]

export function DisabledVehicleCalculator() {
    const [aracFiyati, setAracFiyati] = useState<string>("")
    const [motorHacmi, setMotorHacmi] = useState<string>("1600")
    const [engelliOrani, setEngelliOrani] = useState<string>("90")
    const [result, setResult] = useState<{
        normalOtv: number
        normalKdv: number
        normalToplam: number
        indirimliFiyat: number
        tasarruf: number
        indirimOrani: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const fiyat = parseFloat(aracFiyati.replace(/\./g, "").replace(",", "."))
        const motor = parseInt(motorHacmi)
        const engelli = parseInt(engelliOrani)

        if (isNaN(fiyat) || fiyat <= 0) {
            setResult(null)
            return
        }

        // ÖTV oranını bul
        let otvOrani = 0
        for (const dilim of otvOranlari) {
            if (fiyat <= dilim.maxFiyat) {
                if (motor <= 1600) otvOrani = dilim.oran1600
                else if (motor <= 2000) otvOrani = dilim.oran1600_2000
                else otvOrani = dilim.oran2000
                break
            }
        }

        // Normal fiyat hesaplama (ÖTV ve KDV dahil)
        const normalOtv = fiyat * otvOrani
        const otvDahilFiyat = fiyat + normalOtv
        const normalKdv = otvDahilFiyat * 0.20 // %20 KDV
        const normalToplam = otvDahilFiyat + normalKdv

        // Engelli indirimi
        let indirimOrani = 0
        if (engelli >= 90) {
            // %90 ve üzeri engelli: ÖTV ve KDV muafiyeti (motor hacmi sınırı var)
            if (motor <= 1600) {
                indirimOrani = 1 // Tam muafiyet
            } else {
                indirimOrani = 0 // 1600cc üzeri araçlarda muafiyet yok
            }
        } else if (engelli >= 40) {
            // %40-89 engelli: Sadece ÖTV muafiyeti (H sınıfı ehliyet ile)
            if (motor <= 1600) {
                indirimOrani = 0.85 // Sadece ÖTV muaf
            }
        }

        const indirimliFiyat = indirimOrani > 0
            ? (indirimOrani === 1 ? fiyat : fiyat + (fiyat * 0.20)) // Tam muafiyet veya sadece KDV
            : normalToplam
        const tasarruf = normalToplam - indirimliFiyat

        setResult({
            normalOtv: Math.round(normalOtv),
            normalKdv: Math.round(normalKdv),
            normalToplam: Math.round(normalToplam),
            indirimliFiyat: Math.round(indirimliFiyat),
            tasarruf: Math.round(tasarruf),
            indirimOrani: indirimOrani * 100
        })
    }, [aracFiyati, motorHacmi, engelliOrani])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Tasarruf: ${formatCurrency(result.tasarruf)}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Car className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Engelli Araç İndirimi Hesaplama 2025</CardTitle>
                            <CardDescription className="text-purple-100">
                                ÖTV ve KDV muafiyetinizi hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Araç Fabrika Çıkış Fiyatı (ÖTV/KDV Hariç) (₺)</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder="1.000.000"
                                value={aracFiyati}
                                onChange={(e) => setAracFiyati(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Motor Hacmi (cc)</Label>
                                <select
                                    value={motorHacmi}
                                    onChange={(e) => setMotorHacmi(e.target.value)}
                                    className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                                >
                                    <option value="1000">1000 cc ve altı</option>
                                    <option value="1400">1001-1400 cc</option>
                                    <option value="1600">1401-1600 cc</option>
                                    <option value="1800">1601-1800 cc</option>
                                    <option value="2000">1801-2000 cc</option>
                                    <option value="2500">2000 cc üzeri</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Engellilik Oranı</Label>
                                <select
                                    value={engelliOrani}
                                    onChange={(e) => setEngelliOrani(e.target.value)}
                                    className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                                >
                                    <option value="90">%90 ve üzeri (Tam Muafiyet)</option>
                                    <option value="40">%40-89 (H Sınıfı Ehliyet)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200">
                        <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-purple-600 mt-0.5" />
                            <div className="text-sm text-purple-700 dark:text-purple-300">
                                <strong>Muafiyet Şartları:</strong>
                                <ul className="mt-1 space-y-1">
                                    <li>• %90+: 1600cc altı araçlarda ÖTV+KDV muafiyeti</li>
                                    <li>• %40-89: H sınıfı ehliyet ile sadece ÖTV muafiyeti</li>
                                    <li>• 5 yılda 1 kez kullanılabilir</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
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
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
                                <p className="text-sm text-red-600 dark:text-red-400">Normal Fiyat (ÖTV+KDV Dahil)</p>
                                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(result.normalToplam)}</p>
                                <p className="text-xs text-red-500 mt-1">ÖTV: {formatCurrency(result.normalOtv)} | KDV: {formatCurrency(result.normalKdv)}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                                <p className="text-sm text-green-600 dark:text-green-400">Engelli İndirimiyle</p>
                                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(result.indirimliFiyat)}</p>
                                <p className="text-xs text-green-500 mt-1">İndirim oranı: %{result.indirimOrani}</p>
                            </div>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                            <p className="text-sm text-purple-100 mb-1">Toplam Tasarrufunuz</p>
                            <p className="text-4xl font-bold">{formatCurrency(result.tasarruf)}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
