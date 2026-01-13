"use client"

import { useState, useCallback, useEffect } from "react"
import { Car, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// 2025 MTV Tarifeleri (TL)
const mtvTarifeleri = {
    otomobil: [
        { minYas: 0, maxYas: 1, tarife: [{ min: 0, max: 1300, vergi: 2383 }, { min: 1300, max: 1600, vergi: 4161 }, { min: 1600, max: 1800, vergi: 7349 }, { min: 1800, max: Infinity, vergi: 12590 }] },
        { minYas: 1, maxYas: 3, tarife: [{ min: 0, max: 1300, vergi: 1669 }, { min: 1300, max: 1600, vergi: 2853 }, { min: 1600, max: 1800, vergi: 5002 }, { min: 1800, max: Infinity, vergi: 8576 }] },
        { minYas: 4, maxYas: 6, tarife: [{ min: 0, max: 1300, vergi: 951 }, { min: 1300, max: 1600, vergi: 1669 }, { min: 1600, max: 1800, vergi: 2853 }, { min: 1800, max: Infinity, vergi: 4765 }] },
        { minYas: 7, maxYas: 11, tarife: [{ min: 0, max: 1300, vergi: 595 }, { min: 1300, max: 1600, vergi: 951 }, { min: 1600, max: 1800, vergi: 1669 }, { min: 1800, max: Infinity, vergi: 2853 }] },
        { minYas: 12, maxYas: 15, tarife: [{ min: 0, max: 1300, vergi: 357 }, { min: 1300, max: 1600, vergi: 595 }, { min: 1600, max: 1800, vergi: 951 }, { min: 1800, max: Infinity, vergi: 1669 }] },
        { minYas: 16, maxYas: Infinity, tarife: [{ min: 0, max: 1300, vergi: 238 }, { min: 1300, max: 1600, vergi: 357 }, { min: 1600, max: 1800, vergi: 595 }, { min: 1800, max: Infinity, vergi: 951 }] }
    ]
}

export function MtvCalculator() {
    const [motorHacmi, setMotorHacmi] = useState<string>("1400")
    const [aracYasi, setAracYasi] = useState<string>("3")
    const [result, setResult] = useState<{
        yillikVergi: number
        birincilTaksit: number
        ikinciTaksit: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const motor = parseInt(motorHacmi)
        const yas = parseInt(aracYasi)

        // Yaş aralığını bul
        const yasDilimi = mtvTarifeleri.otomobil.find(d => yas >= d.minYas && yas <= d.maxYas)
        if (!yasDilimi) {
            setResult(null)
            return
        }

        // Motor hacmi tarifesini bul
        const motorTarife = yasDilimi.tarife.find(t => motor >= t.min && motor < t.max)
        if (!motorTarife) {
            setResult(null)
            return
        }

        const yillikVergi = motorTarife.vergi
        const birincilTaksit = Math.round(yillikVergi / 2)
        const ikinciTaksit = yillikVergi - birincilTaksit

        setResult({ yillikVergi, birincilTaksit, ikinciTaksit })
    }, [motorHacmi, aracYasi])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`MTV 2025: ${formatCurrency(result.yillikVergi)}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Car className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">MTV Hesaplama 2025</CardTitle>
                            <CardDescription className="text-rose-100">
                                Motorlu Taşıtlar Vergisi hesaplayıcı
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Motor Hacmi (cc)</Label>
                            <select
                                value={motorHacmi}
                                onChange={(e) => setMotorHacmi(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                <option value="1000">1300 cc ve altı</option>
                                <option value="1400">1301-1600 cc</option>
                                <option value="1700">1601-1800 cc</option>
                                <option value="2000">1801 cc ve üzeri</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Araç Yaşı (Model Yılına Göre)</Label>
                            <select
                                value={aracYasi}
                                onChange={(e) => setAracYasi(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                <option value="0">1 yaşında (2024-2025 model)</option>
                                <option value="2">1-3 yaş (2022-2024 model)</option>
                                <option value="5">4-6 yaş (2019-2021 model)</option>
                                <option value="9">7-11 yaş (2014-2018 model)</option>
                                <option value="13">12-15 yaş (2010-2013 model)</option>
                                <option value="20">16 yaş ve üzeri (2009 ve öncesi)</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200">
                        <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-rose-600 mt-0.5" />
                            <div className="text-sm text-rose-700 dark:text-rose-300">
                                <strong>Ödeme Tarihleri:</strong>
                                <ul className="mt-1 space-y-1">
                                    <li>• 1. Taksit: Ocak ayı sonuna kadar</li>
                                    <li>• 2. Taksit: Temmuz ayı sonuna kadar</li>
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
                                MTV Tutarı
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                            <p className="text-sm text-rose-100 mb-1">2025 Yıllık MTV</p>
                            <p className="text-4xl font-bold">{formatCurrency(result.yillikVergi)}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                <p className="text-sm text-blue-600 dark:text-blue-400">1. Taksit (Ocak)</p>
                                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(result.birincilTaksit)}</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                                <p className="text-sm text-purple-600 dark:text-purple-400">2. Taksit (Temmuz)</p>
                                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{formatCurrency(result.ikinciTaksit)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
