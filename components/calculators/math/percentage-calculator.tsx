"use client"

import { useState, useCallback } from "react"
import { Percent, Copy, Check, Calculator, Plus, Minus, Equal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type CalculationType = "valueOfPercent" | "percentOfValue" | "percentChange" | "addPercent" | "subtractPercent"

export function PercentageCalculator() {
    const [type, setType] = useState<CalculationType>("valueOfPercent")
    const [value1, setValue1] = useState<string>("")
    const [value2, setValue2] = useState<string>("")
    const [result, setResult] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const v1 = parseFloat(value1.replace(/,/g, "."))
        const v2 = parseFloat(value2.replace(/,/g, "."))

        if (isNaN(v1) || isNaN(v2)) {
            setResult(null)
            return
        }

        let res: number
        switch (type) {
            case "valueOfPercent": // X'in Y%'si kaçtır?
                res = (v1 * v2) / 100
                break
            case "percentOfValue": // X, Y'nin yüzde kaçıdır?
                res = (v1 / v2) * 100
                break
            case "percentChange": // X'ten Y'ye yüzde kaç değişim?
                res = ((v2 - v1) / v1) * 100
                break
            case "addPercent": // X'e Y% ekle
                res = v1 * (1 + v2 / 100)
                break
            case "subtractPercent": // X'ten Y% çıkar
                res = v1 * (1 - v2 / 100)
                break
            default:
                res = 0
        }
        setResult((Math.round(res * 100) / 100).toString())
    }, [value1, value2, type])

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error("Kopyalama başarısız:", err)
            }
        }
    }

    const calculationTypes: { value: CalculationType; label: string; desc: string; icon: React.ReactNode }[] = [
        { value: "valueOfPercent", label: "Yüzde Değeri", desc: "X'in %Y'si kaçtır?", icon: <Percent className="h-4 w-4" /> },
        { value: "percentOfValue", label: "Oran Hesabı", desc: "X, Y'nin yüzde kaçıdır?", icon: <Equal className="h-4 w-4" /> },
        { value: "percentChange", label: "Yüzde Değişim", desc: "X'ten Y'ye değişim", icon: <Calculator className="h-4 w-4" /> },
        { value: "addPercent", label: "Yüzde Ekleme", desc: "X'e %Y ekle", icon: <Plus className="h-4 w-4" /> },
        { value: "subtractPercent", label: "Yüzde Çıkarma", desc: "X'ten %Y çıkar", icon: <Minus className="h-4 w-4" /> }
    ]

    const getLabels = () => {
        switch (type) {
            case "valueOfPercent": return ["Sayı (X)", "Yüzde (%)"]
            case "percentOfValue": return ["Sayı (X)", "Toplam (Y)"]
            case "percentChange": return ["Başlangıç (X)", "Sonuç (Y)"]
            case "addPercent": return ["Sayı (X)", "Eklenecek (%)"]
            case "subtractPercent": return ["Sayı (X)", "Çıkarılacak (%)"]
            default: return ["Değer 1", "Değer 2"]
        }
    }

    const [label1, label2] = getLabels()

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Percent className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Yüzde Hesaplama</CardTitle>
                            <CardDescription className="text-indigo-100">Çeşitli yüzde hesaplamalarını kolayca yapın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                        {calculationTypes.map((t) => (
                            <Button
                                key={t.value}
                                variant={type === t.value ? "default" : "outline"}
                                className={`flex flex-col h-auto py-3 text-xs ${type === t.value ? "bg-indigo-600" : ""}`}
                                onClick={() => { setType(t.value); setResult(null) }}
                            >
                                {t.icon}
                                <span className="mt-1">{t.label}</span>
                            </Button>
                        ))}
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">{label1}</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder="100"
                                value={value1}
                                onChange={(e) => setValue1(e.target.value.replace(/[^0-9.,\-]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">{label2}</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder={type.includes("percent") && !type.includes("Of") ? "10" : "50"}
                                value={value2}
                                onChange={(e) => setValue2(e.target.value.replace(/[^0-9.,\-]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700">
                        Hesapla
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            <div>
                                <p className="text-sm text-indigo-100">Sonuç</p>
                                <p className="text-3xl font-bold">
                                    {result}{type.includes("percent") && type !== "addPercent" && type !== "subtractPercent" && type !== "valueOfPercent" ? "%" : ""}
                                </p>
                            </div>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
