"use client"

import { useState, useEffect, useCallback } from "react"
import { Thermometer, Copy, Check, ArrowRightLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const temperatureUnits = [
    { value: "c", label: "Celsius (°C)" },
    { value: "f", label: "Fahrenheit (°F)" },
    { value: "k", label: "Kelvin (K)" }
]

export function TemperatureConverter() {
    const [fromUnit, setFromUnit] = useState("c")
    const [toUnit, setToUnit] = useState("f")
    const [fromValue, setFromValue] = useState("")
    const [result, setResult] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const convert = useCallback(() => {
        const value = parseFloat(fromValue.replace(/,/g, "."))
        if (isNaN(value)) { setResult(null); return }

        let celsius: number

        // Convert to Celsius first
        switch (fromUnit) {
            case "c": celsius = value; break
            case "f": celsius = (value - 32) * 5 / 9; break
            case "k": celsius = value - 273.15; break
            default: celsius = value
        }

        // Convert from Celsius to target
        let converted: number
        switch (toUnit) {
            case "c": converted = celsius; break
            case "f": converted = celsius * 9 / 5 + 32; break
            case "k": converted = celsius + 273.15; break
            default: converted = celsius
        }

        setResult((Math.round(converted * 100) / 100).toString())
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
                <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Thermometer className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Sıcaklık Dönüştürücü</CardTitle>
                            <CardDescription className="text-red-100">Celsius, Fahrenheit ve Kelvin</CardDescription>
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
                                {temperatureUnits.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                            </select>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder="0"
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
                                {temperatureUnits.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
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
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                            <p className="text-lg font-semibold text-red-800 dark:text-red-200">
                                {fromValue} {temperatureUnits.find(u => u.value === fromUnit)?.label} = {result} {temperatureUnits.find(u => u.value === toUnit)?.label}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
