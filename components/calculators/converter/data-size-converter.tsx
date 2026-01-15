"use client"

import { useState, useEffect, useCallback } from "react"
import { HardDrive, Copy, Check, ArrowRightLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const dataUnits = [
    { value: "bit", label: "Bit", factor: 1 },
    { value: "byte", label: "Byte (B)", factor: 8 },
    { value: "kb", label: "Kilobyte (KB)", factor: 8 * 1024 },
    { value: "mb", label: "Megabyte (MB)", factor: 8 * 1024 * 1024 },
    { value: "gb", label: "Gigabyte (GB)", factor: 8 * 1024 * 1024 * 1024 },
    { value: "tb", label: "Terabyte (TB)", factor: 8 * 1024 * 1024 * 1024 * 1024 },
    { value: "pb", label: "Petabyte (PB)", factor: 8 * 1024 * 1024 * 1024 * 1024 * 1024 },
    { value: "kib", label: "Kibibyte (KiB)", factor: 8 * 1024 },
    { value: "mib", label: "Mebibyte (MiB)", factor: 8 * 1024 * 1024 },
    { value: "gib", label: "Gibibyte (GiB)", factor: 8 * 1024 * 1024 * 1024 }
]

export function DataSizeConverter() {
    const [fromUnit, setFromUnit] = useState("mb")
    const [toUnit, setToUnit] = useState("gb")
    const [fromValue, setFromValue] = useState("")
    const [result, setResult] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const convert = useCallback(() => {
        const value = parseFloat(fromValue.replace(/,/g, "."))
        if (isNaN(value)) { setResult(null); return }

        const fromFactor = dataUnits.find(u => u.value === fromUnit)?.factor || 1
        const toFactor = dataUnits.find(u => u.value === toUnit)?.factor || 1

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
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><HardDrive className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Veri Boyutu Dönüştürücü</CardTitle>
                            <CardDescription className="text-indigo-100">Byte, KB, MB, GB, TB çevirisi</CardDescription>
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
                                {dataUnits.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
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
                                {dataUnits.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
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
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                            <p className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">
                                {fromValue} {dataUnits.find(u => u.value === fromUnit)?.label} = {result} {dataUnits.find(u => u.value === toUnit)?.label}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
