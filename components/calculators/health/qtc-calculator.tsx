"use client"

import { useState, useCallback, useEffect } from "react"
import { Activity, Copy, Check, Calculator, Info, HeartPulse, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function QtcCalculator() {
    const [qtInterval, setQtInterval] = useState<string>("400")
    const [heartRate, setHeartRate] = useState<string>("60")
    const [formula, setFormula] = useState<"bazett" | "fridericia">("bazett")

    const [result, setResult] = useState<{
        qtc: number
        status: string
        color: string
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const qt = parseFloat(qtInterval.replace(",", "."))
        const hr = parseFloat(heartRate.replace(",", "."))

        if (isNaN(qt) || isNaN(hr) || qt <= 0 || hr <= 0) {
            setResult(null)
            return
        }

        const rr = 60 / hr // R-R interval in seconds
        let qtc = 0

        if (formula === "bazett") {
            qtc = qt / Math.sqrt(rr)
        } else {
            qtc = qt / Math.pow(rr, 1 / 3)
        }

        let status = "Normal"
        let color = "text-green-600"

        // Basit yetişkin normları
        if (qtc > 440) { status = "Uzamış (Prolonged)"; color = "text-red-600" }
        else if (qtc < 350) { status = "Kısa (Short)"; color = "text-blue-600" }

        setResult({
            qtc: Math.round(qtc),
            status,
            color
        })
    }, [qtInterval, heartRate, formula])

    useEffect(() => {
        calculate()
    }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`QTc Değeri (${formula}): ${result.qtc} ms - Durum: ${result.status}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-600 to-rose-700 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <HeartPulse className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">QTc (Düzeltilmiş QT) Hesaplama</CardTitle>
                            <CardDescription className="text-red-100">
                                EKG parametrelerine göre QTc analizi
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">QT Aralığı (ms)</Label>
                            <Input
                                type="text"
                                value={qtInterval}
                                onChange={(e) => setQtInterval(e.target.value.replace(/[^0-9.,]/g, ""))}
                                placeholder="Örn: 400"
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Kalp Hızı (Nabız - BPM)</Label>
                            <Input
                                type="text"
                                value={heartRate}
                                onChange={(e) => setHeartRate(e.target.value.replace(/[^0-9.,]/g, ""))}
                                placeholder="Örn: 60"
                                className="h-11"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Hesaplama Yöntemi</Label>
                        <div className="flex gap-2">
                            <Button variant={formula === "bazett" ? "default" : "outline"} onClick={() => setFormula("bazett")} className="flex-1">Bazett</Button>
                            <Button variant={formula === "fridericia" ? "default" : "outline"} onClick={() => setFormula("fridericia")} className="flex-1">Fridericia</Button>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-xs text-red-800 dark:text-red-400 italic">
                        <AlertCircle className="h-4 w-4 inline mr-2" />
                        Tıbbi Uyarı: QTc değerlendirmesi kardiyoloji uzmanı tarafından yapılmalıdır. Bu araç sadece yardımcı hesaplama içindir.
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardContent className="p-8 text-center space-y-4">
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Düzeltilmiş QT (QTc)</p>
                        <p className="text-7xl font-black">{result.qtc} <span className="text-xl">ms</span></p>
                        <p className={`text-2xl font-bold ${result.color}`}>{result.status}</p>

                        <div className="flex justify-center mt-6">
                            <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                Sonucu Kopyala
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
