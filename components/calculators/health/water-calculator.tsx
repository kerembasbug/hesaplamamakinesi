"use client"

import { useState, useEffect, useCallback } from "react"
import { Droplets, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "athlete"

const activityFactors: Record<ActivityLevel, { factor: number; label: string }> = {
    sedentary: { factor: 30, label: "Hareketsiz (masa başı iş)" },
    light: { factor: 35, label: "Az Hareketli (hafif egzersiz)" },
    moderate: { factor: 40, label: "Orta Aktif (düzenli egzersiz)" },
    active: { factor: 45, label: "Aktif (yoğun fiziksel aktivite)" },
    athlete: { factor: 50, label: "Sporcu (profesyonel düzey)" }
}

interface CalculationResult {
    dailyWater: number
    glassCount: number
    hotWeatherExtra: number
}

export function WaterCalculator() {
    const [weight, setWeight] = useState<string>("")
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const calculateWater = useCallback(() => {
        const w = parseFloat(weight.replace(/,/g, "."))

        if (isNaN(w) || w <= 0) {
            setResult(null)
            return
        }

        const dailyWater = w * activityFactors[activityLevel].factor
        const glassCount = Math.ceil(dailyWater / 200) // 200ml'lik bardak
        const hotWeatherExtra = dailyWater * 1.2 // Sıcak havada %20 fazla

        setResult({
            dailyWater: Math.round(dailyWater),
            glassCount,
            hotWeatherExtra: Math.round(hotWeatherExtra)
        })
    }, [weight, activityLevel])

    useEffect(() => {
        calculateWater()
    }, [calculateWater])

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText((result.dailyWater / 1000).toFixed(1))
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
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Droplets className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Günlük Su İhtiyacı Hesaplama</CardTitle>
                            <CardDescription className="text-cyan-100">
                                Kilonuza ve aktivite seviyenize göre su ihtiyacınızı hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="weight" className="text-sm font-medium">Kilo (kg)</Label>
                        <div className="relative">
                            <Input
                                id="weight"
                                type="text"
                                inputMode="decimal"
                                placeholder="70"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="pr-10 h-12 text-lg"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">kg</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Aktivite Seviyesi</Label>
                        <RadioGroup
                            value={activityLevel}
                            onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
                            className="space-y-2"
                        >
                            {Object.entries(activityFactors).map(([key, { label }]) => (
                                <Label
                                    key={key}
                                    htmlFor={`activity-${key}`}
                                    className={`
                    flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${activityLevel === key
                                            ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={key} id={`activity-${key}`} />
                                    <span className={activityLevel === key ? "text-cyan-600 font-medium" : "text-slate-700 dark:text-slate-300"}>
                                        {label}
                                    </span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-cyan-500" />
                            Günlük Su İhtiyacınız
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                            <div>
                                <p className="text-sm text-cyan-100">Günlük Su İhtiyacı</p>
                                <p className="text-4xl font-bold">{(result.dailyWater / 1000).toFixed(1)} litre</p>
                                <p className="text-sm text-cyan-100">{result.dailyWater} ml</p>
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

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-center">
                                <p className="text-3xl font-bold text-cyan-600">{result.glassCount}</p>
                                <p className="text-sm text-slate-500">bardak (200ml)</p>
                            </div>

                            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-center">
                                <p className="text-3xl font-bold text-orange-600">{(result.hotWeatherExtra / 1000).toFixed(1)}L</p>
                                <p className="text-sm text-slate-500">sıcak havalarda</p>
                            </div>
                        </div>

                        {/* Water Glass Visual */}
                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <p className="text-sm font-medium mb-3">Gün içi dağılım önerisi</p>
                            <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded">
                                    <p className="font-bold text-cyan-600">{Math.ceil(result.glassCount * 0.25)}</p>
                                    <p className="text-slate-500">Sabah</p>
                                </div>
                                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded">
                                    <p className="font-bold text-cyan-600">{Math.ceil(result.glassCount * 0.3)}</p>
                                    <p className="text-slate-500">Öğle</p>
                                </div>
                                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded">
                                    <p className="font-bold text-cyan-600">{Math.ceil(result.glassCount * 0.25)}</p>
                                    <p className="text-slate-500">Akşam</p>
                                </div>
                                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded">
                                    <p className="font-bold text-cyan-600">{Math.ceil(result.glassCount * 0.2)}</p>
                                    <p className="text-slate-500">Gece</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p className="font-medium text-slate-900 dark:text-white mb-2">Su İçme İpuçları</p>
                            <ul className="space-y-1">
                                <li>• Sabah kalktığınızda bir bardak su için</li>
                                <li>• Yemeklerden 30 dakika önce su için</li>
                                <li>• Yanınızda su şişesi taşıyın</li>
                                <li>• Kahve ve çay su yerine geçmez</li>
                                <li>• İdrar renginiz açık sarı olmalı</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
