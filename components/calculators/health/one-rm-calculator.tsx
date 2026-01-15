"use client"

import { useState, useCallback, useEffect } from "react"
import { Dumbbell, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function OneRmCalculator() {
    const [weight, setWeight] = useState<string>("100")
    const [reps, setReps] = useState<string>("5")
    const [result, setResult] = useState<{
        oneRm: number
        percentages: { pct: number; weight: number }[]
    } | null>(null)
    const [copied, setCopied] = useState(false)

    // Brzycki Formülü: weight / (1.0278 - (0.0278 * reps))
    const calculate = useCallback(() => {
        const w = parseFloat(weight.replace(",", "."))
        const r = parseInt(reps)

        if (isNaN(w) || isNaN(r) || w <= 0 || r <= 0) {
            setResult(null)
            return
        }

        const oneRm = w / (1.0278 - (0.0278 * r))

        const percentages = [95, 90, 85, 80, 75, 70, 60, 50].map(pct => ({
            pct,
            weight: Math.round((oneRm * (pct / 100)) * 2) / 2 // 0.5 kg hassasiyet
        }))

        setResult({
            oneRm: Math.round(oneRm * 2) / 2,
            percentages
        })
    }, [weight, reps])

    useEffect(() => {
        calculate()
    }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`1RM (Max) Kaldırış: ${result.oneRm} kg`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-900 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Dumbbell className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">1RM (Tek Tekrar Maksimum)</CardTitle>
                            <CardDescription className="text-slate-300">
                                Kaldırdığınız yüke göre maksimum gücünüzü bulun
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
                                inputMode="decimal"
                                placeholder="Örn: 100"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Tekrar Sayısı</Label>
                            <Input
                                type="text"
                                inputMode="numeric"
                                placeholder="Örn: 5"
                                value={reps}
                                onChange={(e) => setReps(e.target.value.replace(/[^0-9]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 text-sm italic">
                        <Info className="h-4 w-4 inline mr-2 text-slate-500" />
                        1RM, bir egzersizde tek bir seferde kaldırabileceğiniz maksimum ağırlıktır. (Brzycki Modeli kullanılır)
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Hesaplanan 1RM
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-slate-700 to-indigo-900 text-white shadow-inner">
                            <p className="text-sm text-slate-300 mb-1">Tek Tekrar Maksimum</p>
                            <p className="text-6xl font-black tracking-tighter">{result.oneRm} <span className="text-2xl">kg</span></p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {result.percentages.map((p) => (
                                <div key={p.pct} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                                    <p className="text-xs text-slate-500">%{p.pct}</p>
                                    <p className="text-lg font-bold">{p.weight} kg</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
