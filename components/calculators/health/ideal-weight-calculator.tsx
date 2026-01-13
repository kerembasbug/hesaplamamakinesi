"use client"

import { useState, useEffect, useCallback } from "react"
import { Target, Copy, Check, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Gender = "male" | "female"
type Formula = "devine" | "robinson" | "miller" | "hamwi"

interface CalculationResult {
    devine: number
    robinson: number
    miller: number
    hamwi: number
    average: number
    currentWeight: number
    difference: number
}

export function IdealWeightCalculator() {
    const [height, setHeight] = useState<string>("")
    const [currentWeight, setCurrentWeight] = useState<string>("")
    const [gender, setGender] = useState<Gender>("male")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const calculateIdealWeight = useCallback(() => {
        const h = parseFloat(height.replace(/,/g, "."))
        const w = parseFloat(currentWeight.replace(/,/g, "."))

        if (isNaN(h) || h <= 0) {
            setResult(null)
            return
        }

        // Boy inç olarak (152.4 cm = 60 inç = 5 fit)
        const heightInInches = h / 2.54
        const inchesOver5Feet = Math.max(0, heightInInches - 60)

        let devine: number, robinson: number, miller: number, hamwi: number

        if (gender === "male") {
            // Erkek formülleri
            devine = 50 + 2.3 * inchesOver5Feet
            robinson = 52 + 1.9 * inchesOver5Feet
            miller = 56.2 + 1.41 * inchesOver5Feet
            hamwi = 48.0 + 2.7 * inchesOver5Feet
        } else {
            // Kadın formülleri
            devine = 45.5 + 2.3 * inchesOver5Feet
            robinson = 49 + 1.7 * inchesOver5Feet
            miller = 53.1 + 1.36 * inchesOver5Feet
            hamwi = 45.5 + 2.2 * inchesOver5Feet
        }

        const average = (devine + robinson + miller + hamwi) / 4
        const difference = isNaN(w) ? 0 : w - average

        setResult({
            devine: Math.round(devine * 10) / 10,
            robinson: Math.round(robinson * 10) / 10,
            miller: Math.round(miller * 10) / 10,
            hamwi: Math.round(hamwi * 10) / 10,
            average: Math.round(average * 10) / 10,
            currentWeight: isNaN(w) ? 0 : w,
            difference: Math.round(difference * 10) / 10
        })
    }, [height, currentWeight, gender])

    useEffect(() => {
        calculateIdealWeight()
    }, [calculateIdealWeight])

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result.average.toString())
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
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Target className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">İdeal Kilo Hesaplama</CardTitle>
                            <CardDescription className="text-emerald-100">
                                Boy ve cinsiyetinize göre ideal kilonuzu hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="height" className="text-sm font-medium">Boy (cm)</Label>
                            <div className="relative">
                                <Input
                                    id="height"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="175"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-10 h-12 text-lg"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">cm</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentWeight" className="text-sm font-medium">Mevcut Kilo (isteğe bağlı)</Label>
                            <div className="relative">
                                <Input
                                    id="currentWeight"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="70"
                                    value={currentWeight}
                                    onChange={(e) => setCurrentWeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-10 h-12 text-lg"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">kg</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Cinsiyet</Label>
                        <RadioGroup
                            value={gender}
                            onValueChange={(value) => setGender(value as Gender)}
                            className="grid grid-cols-2 gap-3"
                        >
                            {[
                                { value: "male", label: "Erkek" },
                                { value: "female", label: "Kadın" }
                            ].map((option) => (
                                <Label
                                    key={option.value}
                                    htmlFor={`gender-${option.value}`}
                                    className={`
                    flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${gender === option.value
                                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={option.value} id={`gender-${option.value}`} className="sr-only" />
                                    <span className={gender === option.value ? "text-emerald-600 font-medium" : "text-slate-700 dark:text-slate-300"}>
                                        {option.label}
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
                            <Calculator className="h-5 w-5 text-emerald-500" />
                            İdeal Kilo Sonuçları
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                            <div>
                                <p className="text-sm text-emerald-100">Ortalama İdeal Kilo</p>
                                <p className="text-4xl font-bold">{result.average} kg</p>
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

                        {result.currentWeight > 0 && (
                            <div className={`p-4 rounded-lg ${result.difference > 0
                                    ? "bg-orange-50 dark:bg-orange-900/20"
                                    : result.difference < 0
                                        ? "bg-blue-50 dark:bg-blue-900/20"
                                        : "bg-green-50 dark:bg-green-900/20"
                                }`}>
                                <p className="text-sm text-slate-600">Mevcut durumunuz:</p>
                                <p className={`text-lg font-bold ${result.difference > 0
                                        ? "text-orange-600"
                                        : result.difference < 0
                                            ? "text-blue-600"
                                            : "text-green-600"
                                    }`}>
                                    {result.difference > 0
                                        ? `İdeal kilonuzun ${result.difference} kg üzerindesiniz`
                                        : result.difference < 0
                                            ? `İdeal kilonuzun ${Math.abs(result.difference)} kg altındasınız`
                                            : "İdeal kilonuzdasınız!"}
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500">Devine Formülü</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">{result.devine} kg</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500">Robinson Formülü</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">{result.robinson} kg</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500">Miller Formülü</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">{result.miller} kg</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500">Hamwi Formülü</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">{result.hamwi} kg</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
