"use client"

import { useState, useEffect, useCallback } from "react"
import { Scale, Copy, Check, ArrowRightLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type UnitType = "length" | "weight" | "area" | "volume"

const units: Record<UnitType, { name: string; units: { value: string; label: string; factor: number }[] }> = {
    length: {
        name: "Uzunluk",
        units: [
            { value: "km", label: "Kilometre", factor: 1000 },
            { value: "m", label: "Metre", factor: 1 },
            { value: "cm", label: "Santimetre", factor: 0.01 },
            { value: "mm", label: "Milimetre", factor: 0.001 },
            { value: "mi", label: "Mil", factor: 1609.34 },
            { value: "ft", label: "Feet", factor: 0.3048 },
            { value: "in", label: "İnç", factor: 0.0254 }
        ]
    },
    weight: {
        name: "Ağırlık",
        units: [
            { value: "ton", label: "Ton", factor: 1000 },
            { value: "kg", label: "Kilogram", factor: 1 },
            { value: "g", label: "Gram", factor: 0.001 },
            { value: "mg", label: "Miligram", factor: 0.000001 },
            { value: "lb", label: "Pound", factor: 0.453592 },
            { value: "oz", label: "Ons", factor: 0.0283495 }
        ]
    },
    area: {
        name: "Alan",
        units: [
            { value: "km2", label: "km²", factor: 1000000 },
            { value: "m2", label: "m²", factor: 1 },
            { value: "cm2", label: "cm²", factor: 0.0001 },
            { value: "ha", label: "Hektar", factor: 10000 },
            { value: "donum", label: "Dönüm", factor: 1000 },
            { value: "sqft", label: "ft²", factor: 0.092903 }
        ]
    },
    volume: {
        name: "Hacim",
        units: [
            { value: "m3", label: "m³", factor: 1000 },
            { value: "l", label: "Litre", factor: 1 },
            { value: "ml", label: "Mililitre", factor: 0.001 },
            { value: "gal", label: "Galon (US)", factor: 3.78541 },
            { value: "pt", label: "Pint", factor: 0.473176 }
        ]
    }
}

export function UnitConverter() {
    const [unitType, setUnitType] = useState<UnitType>("length")
    const [fromUnit, setFromUnit] = useState<string>("m")
    const [toUnit, setToUnit] = useState<string>("cm")
    const [fromValue, setFromValue] = useState<string>("")
    const [result, setResult] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const convert = useCallback(() => {
        const value = parseFloat(fromValue.replace(/,/g, "."))
        if (isNaN(value)) { setResult(null); return }

        const fromFactor = units[unitType].units.find(u => u.value === fromUnit)?.factor || 1
        const toFactor = units[unitType].units.find(u => u.value === toUnit)?.factor || 1

        const baseValue = value * fromFactor
        const converted = baseValue / toFactor

        setResult((Math.round(converted * 1000000) / 1000000).toString())
    }, [fromValue, fromUnit, toUnit, unitType])

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

    const currentUnits = units[unitType].units

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Scale className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Birim Dönüştürücü</CardTitle>
                            <CardDescription className="text-teal-100">Uzunluk, ağırlık, alan ve hacim birimleri</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-4 gap-2">
                        {(Object.keys(units) as UnitType[]).map((type) => (
                            <Button
                                key={type}
                                variant={unitType === type ? "default" : "outline"}
                                className={unitType === type ? "bg-teal-600" : ""}
                                onClick={() => {
                                    setUnitType(type)
                                    setFromUnit(units[type].units[0].value)
                                    setToUnit(units[type].units[1].value)
                                    setResult(null)
                                }}
                            >
                                {units[type].name}
                            </Button>
                        ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Kaynak Birim</Label>
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                {currentUnits.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
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
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                {currentUnits.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
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
                </CardContent>
            </Card>
        </div>
    )
}
