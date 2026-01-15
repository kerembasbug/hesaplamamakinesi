"use client"

import { useState, useCallback, useEffect } from "react"
import { Activity, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function BmrCalculator() {
    const [weight, setWeight] = useState<string>("70")
    const [height, setHeight] = useState<string>("175")
    const [age, setAge] = useState<string>("30")
    const [gender, setGender] = useState<"male" | "female">("male")
    const [result, setResult] = useState<number | null>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const w = parseFloat(weight.replace(",", "."))
        const h = parseFloat(height.replace(",", "."))
        const a = parseFloat(age.replace(",", "."))

        if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) {
            setResult(null)
            return
        }

        // Harris-Benedict Denklemi (Revize)
        let bmrValue = 0
        if (gender === "male") {
            bmrValue = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
        } else {
            bmrValue = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a)
        }

        setResult(Math.round(bmrValue))
    }, [weight, height, age, gender])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Bazal Metabolizma Hızı (BMR): ${result} kcal`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-rose-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Activity className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">BMR (Bazal Metabolizma) Hesaplama</CardTitle>
                            <CardDescription className="text-orange-100">
                                Hiç hareket etmeden harcadığınız enerji
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Ağırlık (KG)</Label>
                            <Input
                                type="text"
                                placeholder="Örn: 70"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Boy (CM)</Label>
                            <Input
                                type="text"
                                placeholder="Örn: 175"
                                value={height}
                                onChange={(e) => setHeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-11"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Yaş</Label>
                            <Input
                                type="text"
                                placeholder="Örn: 30"
                                value={age}
                                onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ""))}
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
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                BMR Sonucu
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 text-center space-y-4">
                        <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Günlük Bazal Kalori İhtiyacı</p>
                        <div className="flex items-baseline justify-center gap-2">
                            <p className="text-7xl font-black text-slate-900 dark:text-white leading-tight">{result}</p>
                            <p className="text-2xl font-bold text-slate-400">kcal</p>
                        </div>

                        <div className="pt-6 grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                                <p className="text-xs text-slate-500 mb-1">Haftalık BMR</p>
                                <p className="text-xl font-bold text-orange-600">{result * 7} kcal</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                                <p className="text-xs text-slate-500 mb-1">Aylık BMR</p>
                                <p className="text-xl font-bold text-orange-600">{result * 30} kcal</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
