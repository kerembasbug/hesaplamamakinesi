"use client"

import { useState, useEffect, useCallback } from "react"
import { Flame, Copy, Check, Calculator, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Gender = "male" | "female"
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive"

const activityMultipliers: Record<ActivityLevel, { value: number; label: string; description: string }> = {
    sedentary: { value: 1.2, label: "Hareketsiz", description: "Masa başı iş, az hareket" },
    light: { value: 1.375, label: "Az Hareketli", description: "Haftada 1-3 gün hafif egzersiz" },
    moderate: { value: 1.55, label: "Orta Aktif", description: "Haftada 3-5 gün orta düzey egzersiz" },
    active: { value: 1.725, label: "Aktif", description: "Haftada 6-7 gün yoğun egzersiz" },
    veryActive: { value: 1.9, label: "Çok Aktif", description: "Günde 2 kez antrenman veya fiziksel iş" }
}

interface CalculationResult {
    bmr: number
    tdee: number
    weightLoss: number
    weightGain: number
}

export function CalorieCalculator() {
    const [age, setAge] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [height, setHeight] = useState<string>("")
    const [gender, setGender] = useState<Gender>("male")
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateCalories = useCallback(() => {
        const a = parseInt(age)
        const w = parseFloat(weight.replace(/,/g, "."))
        const h = parseFloat(height.replace(/,/g, "."))

        if (isNaN(a) || isNaN(w) || isNaN(h) || a <= 0 || w <= 0 || h <= 0) {
            setResult(null)
            return
        }

        // Harris-Benedict BMR Formülü
        let bmr: number
        if (gender === "male") {
            bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
        } else {
            bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a)
        }

        const tdee = bmr * activityMultipliers[activityLevel].value

        setResult({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            weightLoss: Math.round(tdee - 500), // 0.5 kg/hafta kilo kaybı için
            weightGain: Math.round(tdee + 500)  // 0.5 kg/hafta kilo alımı için
        })
    }, [age, weight, height, gender, activityLevel])

    useEffect(() => {
        calculateCalories()
    }, [calculateCalories])

    const copyToClipboard = async (value: string, type: string) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(type)
            setTimeout(() => setCopied(null), 2000)
        } catch (err) {
            console.error("Kopyalama başarısız:", err)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Flame className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Kalori İhtiyacı Hesaplama</CardTitle>
                            <CardDescription className="text-orange-100">
                                Günlük kalori ihtiyacınızı ve metabolizma hızınızı hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="age" className="text-sm font-medium">Yaş</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="30"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight" className="text-sm font-medium">Kilo (kg)</Label>
                            <Input
                                id="weight"
                                type="text"
                                inputMode="decimal"
                                placeholder="70"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height" className="text-sm font-medium">Boy (cm)</Label>
                            <Input
                                id="height"
                                type="text"
                                inputMode="decimal"
                                placeholder="175"
                                value={height}
                                onChange={(e) => setHeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12"
                            />
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
                                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={option.value} id={`gender-${option.value}`} className="sr-only" />
                                    <span className={gender === option.value ? "text-orange-600 font-medium" : "text-slate-700 dark:text-slate-300"}>
                                        {option.label}
                                    </span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Aktivite Seviyesi</Label>
                        <RadioGroup
                            value={activityLevel}
                            onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
                            className="space-y-2"
                        >
                            {Object.entries(activityMultipliers).map(([key, { label, description }]) => (
                                <Label
                                    key={key}
                                    htmlFor={`activity-${key}`}
                                    className={`
                    flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${activityLevel === key
                                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={key} id={`activity-${key}`} />
                                    <div>
                                        <span className={activityLevel === key ? "text-orange-600 font-medium" : "text-slate-700 dark:text-slate-300"}>
                                            {label}
                                        </span>
                                        <p className="text-xs text-slate-500">{description}</p>
                                    </div>
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
                            <Activity className="h-5 w-5 text-orange-500" />
                            Kalori Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500">Bazal Metabolizma Hızı (BMR)</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {result.bmr.toLocaleString("tr-TR")} kcal
                                </p>
                                <p className="text-xs text-slate-400">Dinlenme halinde yakılan kalori</p>
                            </div>

                            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-orange-100">Günlük Kalori İhtiyacı (TDEE)</p>
                                        <p className="text-3xl font-bold">{result.tdee.toLocaleString("tr-TR")} kcal</p>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => copyToClipboard(result.tdee.toString(), "tdee")}
                                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                                    >
                                        {copied === "tdee" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                                <p className="text-sm text-green-600">Kilo Vermek İçin (-0.5 kg/hafta)</p>
                                <p className="text-xl font-bold text-green-700">{result.weightLoss.toLocaleString("tr-TR")} kcal/gün</p>
                            </div>

                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <p className="text-sm text-blue-600">Kilo Almak İçin (+0.5 kg/hafta)</p>
                                <p className="text-xl font-bold text-blue-700">{result.weightGain.toLocaleString("tr-TR")} kcal/gün</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
