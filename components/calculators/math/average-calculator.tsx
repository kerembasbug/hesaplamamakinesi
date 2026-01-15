"use client"

import { useState } from "react"
import { BarChart3, Calculator, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AverageCalculator() {
    const [numbers, setNumbers] = useState<string[]>(["", "", ""])
    const [result, setResult] = useState<{ mean: number; median: number; mode: string; sum: number; count: number } | null>(null)

    const addNumber = () => {
        setNumbers([...numbers, ""])
    }

    const removeNumber = (index: number) => {
        if (numbers.length > 2) {
            setNumbers(numbers.filter((_, i) => i !== index))
        }
    }

    const updateNumber = (index: number, value: string) => {
        const newNumbers = [...numbers]
        newNumbers[index] = value.replace(/[^0-9.,\-]/g, "")
        setNumbers(newNumbers)
    }

    const calculate = () => {
        const validNumbers = numbers
            .map(n => parseFloat(n.replace(/,/g, ".")))
            .filter(n => !isNaN(n))

        if (validNumbers.length === 0) {
            setResult(null)
            return
        }

        // Mean (Aritmetik Ortalama)
        const sum = validNumbers.reduce((a, b) => a + b, 0)
        const mean = sum / validNumbers.length

        // Median (Ortanca)
        const sorted = [...validNumbers].sort((a, b) => a - b)
        const mid = Math.floor(sorted.length / 2)
        const median = sorted.length % 2 !== 0
            ? sorted[mid]
            : (sorted[mid - 1] + sorted[mid]) / 2

        // Mode (Mod/Tepe değer)
        const frequency: Record<number, number> = {}
        validNumbers.forEach(n => {
            frequency[n] = (frequency[n] || 0) + 1
        })
        const maxFreq = Math.max(...Object.values(frequency))
        const modes = Object.keys(frequency)
            .filter(k => frequency[Number(k)] === maxFreq)
            .map(Number)
        const modeStr = maxFreq === 1 ? "Yok" : modes.join(", ")

        setResult({
            mean,
            median,
            mode: modeStr,
            sum,
            count: validNumbers.length
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><BarChart3 className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Ortalama Hesaplama</CardTitle>
                            <CardDescription className="text-cyan-100">Aritmetik ortalama, medyan ve mod hesaplayın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Sayıları girin</Label>
                        <div className="space-y-2">
                            {numbers.map((num, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder={`Sayı ${index + 1}`}
                                        value={num}
                                        onChange={(e) => updateNumber(index, e.target.value)}
                                        className="h-10"
                                    />
                                    {numbers.length > 2 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeNumber(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" onClick={addNumber} className="w-full mt-2">
                            <Plus className="h-4 w-4 mr-2" />
                            Sayı Ekle
                        </Button>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-cyan-600 hover:bg-cyan-700">
                        <Calculator className="h-4 w-4 mr-2" />
                        Hesapla
                    </Button>

                    {result && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-center">
                                <p className="text-sm text-cyan-600 dark:text-cyan-400">Aritmetik Ortalama</p>
                                <p className="text-xl font-bold text-cyan-800 dark:text-cyan-200">
                                    {result.mean.toFixed(4)}
                                </p>
                            </div>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                                <p className="text-sm text-blue-600 dark:text-blue-400">Medyan (Ortanca)</p>
                                <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                                    {result.median.toFixed(4)}
                                </p>
                            </div>
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                                <p className="text-sm text-indigo-600 dark:text-indigo-400">Mod (Tepe Değer)</p>
                                <p className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                                    {result.mode}
                                </p>
                            </div>
                            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg text-center">
                                <p className="text-sm text-violet-600 dark:text-violet-400">Toplam / Sayı Adedi</p>
                                <p className="text-xl font-bold text-violet-800 dark:text-violet-200">
                                    {result.sum.toFixed(2)} / {result.count}
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
