"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SalaryCalculator() {
    const [amount, setAmount] = useState<string>("")
    const [calcType, setCalcType] = useState<"netToGross" | "grossToNet">("grossToNet")
    const [maritalStatus, setMaritalStatus] = useState<"single" | "married">("single")
    const [result, setResult] = useState<{
        gross: number
        net: number
        sgk: number
        issizlik: number
        gelirVergisi: number
        damgaVergisi: number
        totalDeductions: number
    } | null>(null)

    // 2025 değerleri
    const MINIMUM_WAGE = 22104 // Brüt asgari ücret
    const SGK_MATRAH_TAVANI = 220500 // Aylık tavan

    const calculate = () => {
        const inputAmount = parseFloat(amount) || 0
        if (inputAmount <= 0) {
            setResult(null)
            return
        }

        let grossSalary: number
        let netSalary: number

        // SGK oranları
        const sgkOrani = 0.14 // %14 işçi payı
        const issizlikOrani = 0.01 // %1 işçi payı

        // Gelir vergisi dilimleri (2025 tahmini)
        const calculateIncomeTax = (matrah: number): number => {
            if (matrah <= 110000) return matrah * 0.15
            if (matrah <= 230000) return 16500 + (matrah - 110000) * 0.20
            if (matrah <= 580000) return 40500 + (matrah - 230000) * 0.27
            if (matrah <= 3000000) return 135000 + (matrah - 580000) * 0.35
            return 982000 + (matrah - 3000000) * 0.40
        }

        // Damga vergisi
        const damgaOrani = 0.00759 // Binde 7.59

        if (calcType === "grossToNet") {
            grossSalary = inputAmount

            // SGK Kesintisi (tavana kadar)
            const sgkMatrahi = Math.min(grossSalary, SGK_MATRAH_TAVANI)
            const sgkKesinti = sgkMatrahi * sgkOrani
            const issizlikKesinti = sgkMatrahi * issizlikOrani

            // Gelir vergisi matrahı
            const gelirVergisiMatrahi = grossSalary - sgkKesinti - issizlikKesinti

            // Aylık gelir vergisi (kümülatif hesaplama basitleştirilmiş)
            const yillikMatrah = gelirVergisiMatrahi * 12
            const yillikVergi = calculateIncomeTax(yillikMatrah)
            const aylikGelirVergisi = yillikVergi / 12

            // Asgari ücret istisnası (asgari ücret vergiden muaf)
            const asgariNetUcret = MINIMUM_WAGE * (1 - sgkOrani - issizlikOrani)
            const vergiIstisnasi = calculateIncomeTax(asgariNetUcret * 12) / 12
            const netGelirVergisi = Math.max(0, aylikGelirVergisi - vergiIstisnasi)

            // Damga vergisi
            const damgaVergisi = grossSalary * damgaOrani

            // Net maaş
            netSalary = grossSalary - sgkKesinti - issizlikKesinti - netGelirVergisi - damgaVergisi

            setResult({
                gross: grossSalary,
                net: netSalary,
                sgk: sgkKesinti,
                issizlik: issizlikKesinti,
                gelirVergisi: netGelirVergisi,
                damgaVergisi: damgaVergisi,
                totalDeductions: sgkKesinti + issizlikKesinti + netGelirVergisi + damgaVergisi
            })
        } else {
            // Net'ten brüt hesaplama (iteratif yaklaşım)
            netSalary = inputAmount
            grossSalary = netSalary * 1.4 // Başlangıç tahmini

            for (let i = 0; i < 20; i++) {
                const sgkMatrahi = Math.min(grossSalary, SGK_MATRAH_TAVANI)
                const sgkKesinti = sgkMatrahi * sgkOrani
                const issizlikKesinti = sgkMatrahi * issizlikOrani
                const gelirVergisiMatrahi = grossSalary - sgkKesinti - issizlikKesinti
                const yillikMatrah = gelirVergisiMatrahi * 12
                const yillikVergi = calculateIncomeTax(yillikMatrah)
                const aylikGelirVergisi = yillikVergi / 12
                const asgariNetUcret = MINIMUM_WAGE * (1 - sgkOrani - issizlikOrani)
                const vergiIstisnasi = calculateIncomeTax(asgariNetUcret * 12) / 12
                const netGelirVergisi = Math.max(0, aylikGelirVergisi - vergiIstisnasi)
                const damgaVergisi = grossSalary * damgaOrani
                const calculatedNet = grossSalary - sgkKesinti - issizlikKesinti - netGelirVergisi - damgaVergisi

                if (Math.abs(calculatedNet - netSalary) < 0.01) break
                grossSalary += (netSalary - calculatedNet)
            }

            const sgkMatrahi = Math.min(grossSalary, SGK_MATRAH_TAVANI)
            const sgkKesinti = sgkMatrahi * sgkOrani
            const issizlikKesinti = sgkMatrahi * issizlikOrani
            const gelirVergisiMatrahi = grossSalary - sgkKesinti - issizlikKesinti
            const yillikMatrah = gelirVergisiMatrahi * 12
            const yillikVergi = calculateIncomeTax(yillikMatrah)
            const aylikGelirVergisi = yillikVergi / 12
            const asgariNetUcret = MINIMUM_WAGE * (1 - sgkOrani - issizlikOrani)
            const vergiIstisnasi = calculateIncomeTax(asgariNetUcret * 12) / 12
            const netGelirVergisi = Math.max(0, aylikGelirVergisi - vergiIstisnasi)
            const damgaVergisi = grossSalary * damgaOrani

            setResult({
                gross: grossSalary,
                net: netSalary,
                sgk: sgkKesinti,
                issizlik: issizlikKesinti,
                gelirVergisi: netGelirVergisi,
                damgaVergisi: damgaVergisi,
                totalDeductions: sgkKesinti + issizlikKesinti + netGelirVergisi + damgaVergisi
            })
        }
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
                    <CardTitle>Maaş Hesaplama</CardTitle>
                    <CardDescription>
                        Brüt maaştan net veya net maaştan brüt hesaplayın
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="calcType">Hesaplama Yönü</Label>
                            <Select value={calcType} onValueChange={(v) => setCalcType(v as typeof calcType)}>
                                <SelectTrigger id="calcType">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="grossToNet">Brüt → Net</SelectItem>
                                    <SelectItem value="netToGross">Net → Brüt</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="marital">Medeni Durum</Label>
                            <Select value={maritalStatus} onValueChange={(v) => setMaritalStatus(v as typeof maritalStatus)}>
                                <SelectTrigger id="marital">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Bekar</SelectItem>
                                    <SelectItem value="married">Evli</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">
                            {calcType === "grossToNet" ? "Brüt Maaş (TL)" : "Net Maaş (TL)"}
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder={calcType === "grossToNet" ? "35000" : "28000"}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <Button onClick={calculate} className="w-full">
                        Hesapla
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                    <CardHeader>
                        <CardTitle className="text-blue-800 dark:text-blue-200">
                            Maaş Detayları
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Brüt Maaş
                                </p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(result.gross)}
                                </p>
                            </div>
                            <div className="rounded-lg bg-green-100 dark:bg-green-900 p-4">
                                <p className="text-sm text-green-600 dark:text-green-300">
                                    Net Maaş (Ele Geçen)
                                </p>
                                <p className="text-2xl font-bold text-green-700 dark:text-green-200">
                                    {formatCurrency(result.net)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Kesintiler</h4>
                            <div className="grid gap-2 text-sm">
                                <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                    <span>SGK Primi (%14)</span>
                                    <span className="text-red-600">- {formatCurrency(result.sgk)}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                    <span>İşsizlik Sigortası (%1)</span>
                                    <span className="text-red-600">- {formatCurrency(result.issizlik)}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                    <span>Gelir Vergisi</span>
                                    <span className="text-red-600">- {formatCurrency(result.gelirVergisi)}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                    <span>Damga Vergisi</span>
                                    <span className="text-red-600">- {formatCurrency(result.damgaVergisi)}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-red-100 dark:bg-red-900 rounded font-semibold">
                                    <span>Toplam Kesinti</span>
                                    <span className="text-red-700 dark:text-red-300">- {formatCurrency(result.totalDeductions)}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
