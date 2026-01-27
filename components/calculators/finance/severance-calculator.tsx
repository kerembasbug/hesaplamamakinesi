"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SeveranceCalculator() {
    const [salary, setSalary] = useState<string>("")
    const [years, setYears] = useState<string>("")
    const [months, setMonths] = useState<string>("")
    const [calculationType, setCalculationType] = useState<"kidem" | "ihbar" | "both">("both")
    const [result, setResult] = useState<{
        kidem: number
        ihbar: number
        total: number
        ihbarDays: number
    } | null>(null)

    // 2025 Kıdem tazminatı tavanı (güncel değer yaklaşık)
    const KIDEM_CEILING = 35058.58

    const calculateIhbarDays = (totalMonths: number): number => {
        if (totalMonths < 6) return 14 // 0-6 ay: 2 hafta
        if (totalMonths < 18) return 28 // 6-18 ay: 4 hafta
        if (totalMonths < 36) return 42 // 18-36 ay: 6 hafta
        return 56 // 36+ ay: 8 hafta
    }

    const calculate = () => {
        const grossSalary = parseFloat(salary) || 0
        const workYears = parseInt(years) || 0
        const workMonths = parseInt(months) || 0
        const totalMonths = workYears * 12 + workMonths

        if (grossSalary <= 0 || totalMonths <= 0) {
            setResult(null)
            return
        }

        // Kıdem tazminatı hesaplama
        // Tavan sınırı uygulanmış brüt maaş
        const effectiveSalary = Math.min(grossSalary, KIDEM_CEILING)
        const kidemAmount = effectiveSalary * workYears + (effectiveSalary / 12) * workMonths

        // İhbar tazminatı hesaplama
        const ihbarDays = calculateIhbarDays(totalMonths)
        const dailySalary = grossSalary / 30
        const ihbarAmount = dailySalary * ihbarDays

        setResult({
            kidem: kidemAmount,
            ihbar: ihbarAmount,
            total: kidemAmount + ihbarAmount,
            ihbarDays: ihbarDays
        })
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 2
        }).format(value)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Tazminat Hesaplama</CardTitle>
                    <CardDescription>
                        Kıdem ve ihbar tazminatı tutarlarınızı hesaplayın
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="salary">Brüt Maaş (TL)</Label>
                            <Input
                                id="salary"
                                type="number"
                                placeholder="35000"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Hesaplama Türü</Label>
                            <Select value={calculationType} onValueChange={(v) => setCalculationType(v as typeof calculationType)}>
                                <SelectTrigger id="type">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="both">Kıdem + İhbar</SelectItem>
                                    <SelectItem value="kidem">Sadece Kıdem</SelectItem>
                                    <SelectItem value="ihbar">Sadece İhbar</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="years">Çalışma Süresi (Yıl)</Label>
                            <Input
                                id="years"
                                type="number"
                                placeholder="5"
                                min="0"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="months">Ek Ay</Label>
                            <Input
                                id="months"
                                type="number"
                                placeholder="6"
                                min="0"
                                max="11"
                                value={months}
                                onChange={(e) => setMonths(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full">
                        Hesapla
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                    <CardHeader>
                        <CardTitle className="text-green-800 dark:text-green-200">
                            Hesaplama Sonuçları
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            {(calculationType === "kidem" || calculationType === "both") && (
                                <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Kıdem Tazminatı
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(result.kidem)}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Tavan: {formatCurrency(KIDEM_CEILING)}
                                    </p>
                                </div>
                            )}
                            {(calculationType === "ihbar" || calculationType === "both") && (
                                <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        İhbar Tazminatı ({result.ihbarDays} gün)
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(result.ihbar)}
                                    </p>
                                </div>
                            )}
                        </div>
                        {calculationType === "both" && (
                            <div className="mt-4 rounded-lg bg-indigo-100 dark:bg-indigo-900 p-4">
                                <p className="text-sm text-indigo-600 dark:text-indigo-300">
                                    Toplam Tazminat
                                </p>
                                <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-200">
                                    {formatCurrency(result.total)}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
