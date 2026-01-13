"use client"

import { useState, useEffect, useCallback } from "react"
import { Ruler, Copy, Check, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Gender = "male" | "female"

interface CalculationResult {
    waist: number
    hip: number
    ratio: number
    category: string
    color: string
    riskLevel: string
}

export function BodyMeasurementCalculator() {
    const [waist, setWaist] = useState<string>("")
    const [hip, setHip] = useState<string>("")
    const [gender, setGender] = useState<Gender>("male")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const getCategory = (ratio: number, gender: Gender) => {
        if (gender === "male") {
            if (ratio < 0.90) return { category: "Düşük Risk", color: "text-green-600 bg-green-50", riskLevel: "düşük" }
            if (ratio < 1.0) return { category: "Orta Risk", color: "text-yellow-600 bg-yellow-50", riskLevel: "orta" }
            return { category: "Yüksek Risk", color: "text-red-600 bg-red-50", riskLevel: "yüksek" }
        } else {
            if (ratio < 0.80) return { category: "Düşük Risk", color: "text-green-600 bg-green-50", riskLevel: "düşük" }
            if (ratio < 0.85) return { category: "Orta Risk", color: "text-yellow-600 bg-yellow-50", riskLevel: "orta" }
            return { category: "Yüksek Risk", color: "text-red-600 bg-red-50", riskLevel: "yüksek" }
        }
    }

    const calculateRatio = useCallback(() => {
        const w = parseFloat(waist.replace(/,/g, "."))
        const h = parseFloat(hip.replace(/,/g, "."))

        if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
            setResult(null)
            return
        }

        const ratio = w / h
        const { category, color, riskLevel } = getCategory(ratio, gender)

        setResult({
            waist: w,
            hip: h,
            ratio: Math.round(ratio * 100) / 100,
            category,
            color,
            riskLevel
        })
    }, [waist, hip, gender])

    useEffect(() => {
        calculateRatio()
    }, [calculateRatio])

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result.ratio.toString())
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
                <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Ruler className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Bel-Kalça Oranı Hesaplama</CardTitle>
                            <CardDescription className="text-purple-100">
                                Bel ve kalça ölçülerinizle sağlık riskinizi değerlendirin
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="waist" className="text-sm font-medium">Bel Çevresi (cm)</Label>
                            <div className="relative">
                                <Input
                                    id="waist"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="80"
                                    value={waist}
                                    onChange={(e) => setWaist(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-10 h-12 text-lg"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">cm</span>
                            </div>
                            <p className="text-xs text-slate-500">Göbek hizasından ölçün</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hip" className="text-sm font-medium">Kalça Çevresi (cm)</Label>
                            <div className="relative">
                                <Input
                                    id="hip"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="100"
                                    value={hip}
                                    onChange={(e) => setHip(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-10 h-12 text-lg"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">cm</span>
                            </div>
                            <p className="text-xs text-slate-500">En geniş yerinden ölçün</p>
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
                                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={option.value} id={`gender-${option.value}`} className="sr-only" />
                                    <span className={gender === option.value ? "text-purple-600 font-medium" : "text-slate-700 dark:text-slate-300"}>
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
                            <Calculator className="h-5 w-5 text-purple-500" />
                            Bel-Kalça Oranı Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white">
                            <div>
                                <p className="text-sm text-purple-100">Bel-Kalça Oranınız</p>
                                <p className="text-4xl font-bold">{result.ratio}</p>
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
                            <p className="text-sm mt-1">
                                Kardiyovasküler hastalık riskiniz {result.riskLevel} seviyededir.
                            </p>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <p className="text-sm font-medium mb-3">Referans Değerler ({gender === "male" ? "Erkek" : "Kadın"})</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-green-600">Düşük Risk</span>
                                    <span>{gender === "male" ? "< 0.90" : "< 0.80"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-yellow-600">Orta Risk</span>
                                    <span>{gender === "male" ? "0.90 - 1.0" : "0.80 - 0.85"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-red-600">Yüksek Risk</span>
                                    <span>{gender === "male" ? "> 1.0" : "> 0.85"}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
