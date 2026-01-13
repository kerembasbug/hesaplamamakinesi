"use client"

import { useState, useEffect, useCallback } from "react"
import { Scale, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CalculationResult {
    bmi: number
    category: string
    color: string
    idealWeightMin: number
    idealWeightMax: number
}

const getBmiCategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: "Zayıf", color: "text-blue-600 bg-blue-50" }
    if (bmi < 25) return { category: "Normal", color: "text-green-600 bg-green-50" }
    if (bmi < 30) return { category: "Fazla Kilolu", color: "text-yellow-600 bg-yellow-50" }
    if (bmi < 35) return { category: "Obez (Sınıf 1)", color: "text-orange-600 bg-orange-50" }
    if (bmi < 40) return { category: "Obez (Sınıf 2)", color: "text-red-600 bg-red-50" }
    return { category: "Morbid Obez", color: "text-red-800 bg-red-100" }
}

export function BmiCalculator() {
    const [weight, setWeight] = useState<string>("")
    const [height, setHeight] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const calculateBMI = useCallback(() => {
        const w = parseFloat(weight.replace(/,/g, "."))
        const h = parseFloat(height.replace(/,/g, "."))

        if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
            setResult(null)
            return
        }

        const heightInMeters = h / 100
        const bmi = w / (heightInMeters * heightInMeters)
        const { category, color } = getBmiCategory(bmi)

        // İdeal kilo (BMI 18.5-24.9 arası)
        const idealWeightMin = 18.5 * heightInMeters * heightInMeters
        const idealWeightMax = 24.9 * heightInMeters * heightInMeters

        setResult({
            bmi: Math.round(bmi * 10) / 10,
            category,
            color,
            idealWeightMin: Math.round(idealWeightMin * 10) / 10,
            idealWeightMax: Math.round(idealWeightMax * 10) / 10
        })
    }, [weight, height])

    useEffect(() => {
        calculateBMI()
    }, [calculateBMI])

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result.bmi.toString())
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error("Kopyalama başarısız:", err)
            }
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Scale className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Vücut Kitle İndeksi (VKİ) Hesaplama</CardTitle>
                            <CardDescription className="text-pink-100">
                                Boy ve kilonuza göre VKİ değerinizi hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="weight" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Kilo (kg)
                            </Label>
                            <div className="relative">
                                <Input
                                    id="weight"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="70"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-10 h-12 text-lg border-slate-300 focus:border-pink-500"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">kg</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="height" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Boy (cm)
                            </Label>
                            <div className="relative">
                                <Input
                                    id="height"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="175"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-10 h-12 text-lg border-slate-300 focus:border-pink-500"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">cm</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-pink-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                            <div>
                                <p className="text-sm text-pink-100">Vücut Kitle İndeksiniz</p>
                                <p className="text-4xl font-bold">{result.bmi}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={copyToClipboard}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className={`p-4 rounded-lg ${result.color}`}>
                            <p className="text-lg font-semibold">{result.category}</p>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                                Boyunuza göre ideal kilo aralığı
                            </p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">
                                {result.idealWeightMin} - {result.idealWeightMax} kg
                            </p>
                        </div>

                        {/* BMI Scale */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">VKİ Skalası</p>
                            <div className="flex h-4 rounded-full overflow-hidden">
                                <div className="w-[18.5%] bg-blue-400" title="Zayıf"></div>
                                <div className="w-[15%] bg-green-400" title="Normal"></div>
                                <div className="w-[15%] bg-yellow-400" title="Fazla Kilolu"></div>
                                <div className="w-[15%] bg-orange-400" title="Obez 1"></div>
                                <div className="w-[15%] bg-red-400" title="Obez 2"></div>
                                <div className="w-[21.5%] bg-red-600" title="Morbid Obez"></div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>0</span>
                                <span>18.5</span>
                                <span>25</span>
                                <span>30</span>
                                <span>35</span>
                                <span>40+</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p className="font-medium text-slate-900 dark:text-white mb-2">VKİ Kategorileri</p>
                            <ul className="space-y-1">
                                <li><span className="text-blue-600">Zayıf:</span> 18.5&apos;in altı</li>
                                <li><span className="text-green-600">Normal:</span> 18.5 - 24.9</li>
                                <li><span className="text-yellow-600">Fazla Kilolu:</span> 25 - 29.9</li>
                                <li><span className="text-orange-600">Obez (Sınıf 1):</span> 30 - 34.9</li>
                                <li><span className="text-red-600">Obez (Sınıf 2):</span> 35 - 39.9</li>
                                <li><span className="text-red-800">Morbid Obez:</span> 40 ve üzeri</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
