"use client"

import { useState } from "react"
import { Scale, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function RatioCalculator() {
    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [c, setC] = useState("")
    const [d, setD] = useState("")
    const [solveFor, setSolveFor] = useState<"a" | "b" | "c" | "d">("d")
    const [result, setResult] = useState<number | null>(null)

    const calculate = () => {
        const numA = parseFloat(a.replace(/,/g, "."))
        const numB = parseFloat(b.replace(/,/g, "."))
        const numC = parseFloat(c.replace(/,/g, "."))
        const numD = parseFloat(d.replace(/,/g, "."))

        let calculated: number | null = null

        // a/b = c/d => a*d = b*c
        switch (solveFor) {
            case "a":
                if (!isNaN(numB) && !isNaN(numC) && !isNaN(numD) && numD !== 0) {
                    calculated = (numB * numC) / numD
                }
                break
            case "b":
                if (!isNaN(numA) && !isNaN(numC) && !isNaN(numD) && numC !== 0) {
                    calculated = (numA * numD) / numC
                }
                break
            case "c":
                if (!isNaN(numA) && !isNaN(numB) && !isNaN(numD) && numB !== 0) {
                    calculated = (numA * numD) / numB
                }
                break
            case "d":
                if (!isNaN(numA) && !isNaN(numB) && !isNaN(numC) && numA !== 0) {
                    calculated = (numB * numC) / numA
                }
                break
        }

        setResult(calculated)
    }

    const handleChange = (value: string, setter: (v: string) => void) => {
        setter(value.replace(/[^0-9.,\-]/g, ""))
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Scale className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Oran Orantı Hesaplama</CardTitle>
                            <CardDescription className="text-violet-100">a/b = c/d orantı problemlerini çözün</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-center gap-4 text-lg font-medium">
                        <span className="text-slate-600 dark:text-slate-300">a / b = c / d</span>
                    </div>

                    <div className="space-y-2">
                        <Label>Hangi değeri bulmak istiyorsunuz?</Label>
                        <div className="grid grid-cols-4 gap-2">
                            {(["a", "b", "c", "d"] as const).map((letter) => (
                                <Button
                                    key={letter}
                                    variant={solveFor === letter ? "default" : "outline"}
                                    className={solveFor === letter ? "bg-violet-600" : ""}
                                    onClick={() => setSolveFor(letter)}
                                >
                                    {letter.toUpperCase()}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>A değeri</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder={solveFor === "a" ? "Hesaplanacak" : "Değer girin"}
                                value={a}
                                onChange={(e) => handleChange(e.target.value, setA)}
                                disabled={solveFor === "a"}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>B değeri</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder={solveFor === "b" ? "Hesaplanacak" : "Değer girin"}
                                value={b}
                                onChange={(e) => handleChange(e.target.value, setB)}
                                disabled={solveFor === "b"}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>C değeri</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder={solveFor === "c" ? "Hesaplanacak" : "Değer girin"}
                                value={c}
                                onChange={(e) => handleChange(e.target.value, setC)}
                                disabled={solveFor === "c"}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>D değeri</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder={solveFor === "d" ? "Hesaplanacak" : "Değer girin"}
                                value={d}
                                onChange={(e) => handleChange(e.target.value, setD)}
                                disabled={solveFor === "d"}
                                className="h-12"
                            />
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-violet-600 hover:bg-violet-700">
                        <Calculator className="h-4 w-4 mr-2" />
                        Hesapla
                    </Button>

                    {result !== null && (
                        <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg text-center">
                            <p className="text-sm text-violet-600 dark:text-violet-400">{solveFor.toUpperCase()} değeri</p>
                            <p className="text-2xl font-bold text-violet-800 dark:text-violet-200">
                                {result.toFixed(4)}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
