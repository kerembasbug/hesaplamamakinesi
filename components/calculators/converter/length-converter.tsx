"use client"

import { useState, useEffect, useCallback } from "react"
import { Ruler, Copy, Check, ArrowRightLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const lengthUnits = [
    { value: "km", label: "Kilometre", factor: 1000 },
    { value: "m", label: "Metre", factor: 1 },
    { value: "cm", label: "Santimetre", factor: 0.01 },
    { value: "mm", label: "Milimetre", factor: 0.001 },
    { value: "um", label: "Mikrometre", factor: 0.000001 },
    { value: "nm", label: "Nanometre", factor: 0.000000001 },
    { value: "mi", label: "Mil", factor: 1609.34 },
    { value: "yd", label: "Yarda", factor: 0.9144 },
    { value: "ft", label: "Feet", factor: 0.3048 },
    { value: "in", label: "İnç", factor: 0.0254 },
    { value: "nmi", label: "Deniz Mili", factor: 1852 }
]

export function LengthConverter() {
    const [fromUnit, setFromUnit] = useState("m")
    const [toUnit, setToUnit] = useState("cm")
    const [fromValue, setFromValue] = useState("")
    const [result, setResult] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const convert = useCallback(() => {
        const value = parseFloat(fromValue.replace(/,/g, "."))
        if (isNaN(value)) { setResult(null); return }

        const fromFactor = lengthUnits.find(u => u.value === fromUnit)?.factor || 1
        const toFactor = lengthUnits.find(u => u.value === toUnit)?.factor || 1

        const baseValue = value * fromFactor
        const converted = baseValue / toFactor
        setResult((Math.round(converted * 1000000) / 1000000).toString())
    }, [fromValue, fromUnit, toUnit])

    useEffect(() => { convert() }, [convert])

    const swapUnits = () => {
        setFromUnit(toUnit)
        setToUnit(fromUnit)
    }

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) { console.error("Kopyalama başarısız:", err) }
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Ruler className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Uzunluk Dönüştürücü</CardTitle>
                            <CardDescription className="text-blue-100">Metre, feet, inç ve diğer uzunluk birimleri</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Kaynak Birim</Label>
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700"
                            >
                                {lengthUnits.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                            </select>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder="1"
                                value={fromValue}
                                onChange={(e) => setFromValue(e.target.value.replace(/[^0-9.,\-]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>

                        <div className="flex items-center justify-center sm:hidden">
                            <Button variant="outline" size="icon" onClick={swapUnits}><ArrowRightLeft className="h-4 w-4" /></Button>
                        </div>

                        <div className="space-y-2 relative">
                            <div className="hidden sm:block absolute -left-6 top-1/2 -translate-y-1/2">
                                <Button variant="outline" size="icon" onClick={swapUnits} className="rounded-full"><ArrowRightLeft className="h-4 w-4" /></Button>
                            </div>
                            <Label className="text-sm font-medium">Hedef Birim</Label>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700"
                            >
                                {lengthUnits.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                            </select>
                            <div className="relative">
                                <Input type="text" readOnly value={result || ""} className="h-12 text-lg bg-slate-50 dark:bg-slate-800" />
                                {result && (
                                    <Button variant="ghost" size="sm" onClick={copyToClipboard} className="absolute right-2 top-1/2 -translate-y-1/2">
                                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {result && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                            <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                                {fromValue} {lengthUnits.find(u => u.value === fromUnit)?.label} = {result} {lengthUnits.find(u => u.value === toUnit)?.label}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
