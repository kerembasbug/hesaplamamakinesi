"use client"

import { useState } from "react"
import { Radical, Copy, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function SquareRootCalculator() {
    const [number, setNumber] = useState<string>("")
    const [degree, setDegree] = useState<string>("2")
    const [result, setResult] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = () => {
        const n = parseFloat(number.replace(/,/g, "."))
        const d = parseInt(degree)

        if (isNaN(n) || isNaN(d) || d <= 0) {
            setResult(null)
            return
        }

        if (n < 0 && d % 2 === 0) {
            setResult("Negatif sayının çift dereceli kökü alınamaz")
            return
        }

        const res = Math.pow(n, 1 / d)
        setResult((Math.round(res * 100000) / 100000).toString())
    }

    const copyToClipboard = async () => {
        if (result && !result.includes("alınamaz")) {
            try {
                await navigator.clipboard.writeText(result)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error("Kopyalama başarısız:", err)
            }
        }
    }

    const quickCalc = (n: number) => {
        const res = Math.sqrt(n)
        setNumber(n.toString())
        setDegree("2")
        setResult((Math.round(res * 100000) / 100000).toString())
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Radical className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Karekök Hesaplama</CardTitle>
                            <CardDescription className="text-violet-100">Sayıların karekökünü ve n&apos;inci kökünü hesaplayın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Sayı</Label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder="16"
                                value={number}
                                onChange={(e) => setNumber(e.target.value.replace(/[^0-9.,\-]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Kök Derecesi</Label>
                            <Input
                                type="number"
                                min="2"
                                placeholder="2"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                className="h-12 text-lg"
                            />
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-violet-600 hover:bg-violet-700">
                        Hesapla
                    </Button>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-500">Hızlı Hesapla</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {[4, 9, 16, 25, 36, 49, 64, 81, 100, 144].map((n) => (
                                <Button key={n} variant="outline" size="sm" onClick={() => quickCalc(n)}>{n}</Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                            <div>
                                <p className="text-sm text-violet-100">{degree === "2" ? "Karekök" : `${degree}. Dereceden Kök`}</p>
                                <p className="text-3xl font-bold">{result}</p>
                            </div>
                            {!result.includes("alınamaz") && (
                                <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Tam Kare Sayılar</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225...
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
