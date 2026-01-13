"use client"

import { useState, useEffect, useCallback } from "react"
import { Dumbbell, Copy, Check, Calculator, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Goal = "maintain" | "cut" | "bulk"
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "athlete"
type Gender = "male" | "female"

interface CalculationResult {
    calories: number
    protein: number
    carbs: number
    fat: number
    proteinCal: number
    carbsCal: number
    fatCal: number
}

const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9
}

const goalAdjustments: Record<Goal, { calories: number; label: string }> = {
    maintain: { calories: 0, label: "Kilo Koruma" },
    cut: { calories: -500, label: "Yağ Yakma (-500 kcal)" },
    bulk: { calories: 300, label: "Kas Yapma (+300 kcal)" }
}

export function MacroCalculator() {
    const [age, setAge] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [height, setHeight] = useState<string>("")
    const [gender, setGender] = useState<Gender>("male")
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate")
    const [goal, setGoal] = useState<Goal>("maintain")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const calculateMacros = useCallback(() => {
        const a = parseInt(age)
        const w = parseFloat(weight.replace(/,/g, "."))
        const h = parseFloat(height.replace(/,/g, "."))

        if (isNaN(a) || isNaN(w) || isNaN(h) || a <= 0 || w <= 0 || h <= 0) {
            setResult(null)
            return
        }

        // Harris-Benedict BMR
        let bmr: number
        if (gender === "male") {
            bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
        } else {
            bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a)
        }

        const tdee = bmr * activityMultipliers[activityLevel]
        const calories = Math.round(tdee + goalAdjustments[goal].calories)

        // Makro dağılımı (hedefe göre)
        let proteinRatio: number, fatRatio: number, carbsRatio: number

        if (goal === "cut") {
            // Yağ yakarken daha fazla protein
            proteinRatio = 0.30
            fatRatio = 0.30
            carbsRatio = 0.40
        } else if (goal === "bulk") {
            // Kas yaparken daha fazla karbonhidrat
            proteinRatio = 0.25
            fatRatio = 0.25
            carbsRatio = 0.50
        } else {
            // Dengeli
            proteinRatio = 0.25
            fatRatio = 0.30
            carbsRatio = 0.45
        }

        const proteinCal = calories * proteinRatio
        const carbsCal = calories * carbsRatio
        const fatCal = calories * fatRatio

        // Gram hesaplama (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g)
        const protein = Math.round(proteinCal / 4)
        const carbs = Math.round(carbsCal / 4)
        const fat = Math.round(fatCal / 9)

        setResult({
            calories,
            protein,
            carbs,
            fat,
            proteinCal: Math.round(proteinCal),
            carbsCal: Math.round(carbsCal),
            fatCal: Math.round(fatCal)
        })
    }, [age, weight, height, gender, activityLevel, goal])

    useEffect(() => {
        calculateMacros()
    }, [calculateMacros])

    const copyToClipboard = async () => {
        if (result) {
            try {
                const text = `Kalori: ${result.calories} kcal, Protein: ${result.protein}g, Karbonhidrat: ${result.carbs}g, Yağ: ${result.fat}g`
                await navigator.clipboard.writeText(text)
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
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Dumbbell className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Makro Besin Hesaplama</CardTitle>
                            <CardDescription className="text-green-100">
                                Protein, karbonhidrat ve yağ ihtiyacınızı hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="age" className="text-sm font-medium">Yaş</Label>
                            <Input id="age" type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} className="h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight" className="text-sm font-medium">Kilo (kg)</Label>
                            <Input id="weight" type="text" inputMode="decimal" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^0-9.,]/g, ""))} className="h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height" className="text-sm font-medium">Boy (cm)</Label>
                            <Input id="height" type="text" inputMode="decimal" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value.replace(/[^0-9.,]/g, ""))} className="h-12" />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">Cinsiyet</Label>
                            <RadioGroup value={gender} onValueChange={(v) => setGender(v as Gender)} className="grid grid-cols-2 gap-2">
                                {["male", "female"].map((g) => (
                                    <Label key={g} htmlFor={`g-${g}`} className={`flex items-center justify-center p-2 rounded-lg border-2 cursor-pointer ${gender === g ? "border-green-500 bg-green-50" : "border-slate-200"}`}>
                                        <RadioGroupItem value={g} id={`g-${g}`} className="sr-only" />
                                        <span className={gender === g ? "text-green-600 font-medium" : "text-slate-600"}>{g === "male" ? "Erkek" : "Kadın"}</span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">Hedef</Label>
                            <RadioGroup value={goal} onValueChange={(v) => setGoal(v as Goal)} className="grid grid-cols-3 gap-1">
                                {Object.entries(goalAdjustments).map(([k, { label }]) => (
                                    <Label key={k} htmlFor={`goal-${k}`} className={`flex items-center justify-center p-2 rounded-lg border-2 cursor-pointer text-xs ${goal === k ? "border-green-500 bg-green-50" : "border-slate-200"}`}>
                                        <RadioGroupItem value={k} id={`goal-${k}`} className="sr-only" />
                                        <span className={goal === k ? "text-green-600 font-medium" : "text-slate-600"}>{label.split(" ")[0]}</span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                                Günlük Makro İhtiyacınız
                            </CardTitle>
                            <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center">
                            <p className="text-sm text-green-100">Toplam Kalori</p>
                            <p className="text-4xl font-bold">{result.calories.toLocaleString("tr-TR")} kcal</p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
                                <p className="text-3xl font-bold text-red-600">{result.protein}g</p>
                                <p className="text-sm text-red-500">Protein</p>
                                <p className="text-xs text-slate-500">{result.proteinCal} kcal</p>
                            </div>
                            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-center">
                                <p className="text-3xl font-bold text-amber-600">{result.carbs}g</p>
                                <p className="text-sm text-amber-500">Karbonhidrat</p>
                                <p className="text-xs text-slate-500">{result.carbsCal} kcal</p>
                            </div>
                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-center">
                                <p className="text-3xl font-bold text-blue-600">{result.fat}g</p>
                                <p className="text-sm text-blue-500">Yağ</p>
                                <p className="text-xs text-slate-500">{result.fatCal} kcal</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
