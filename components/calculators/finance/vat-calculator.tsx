"use client"

import { useState, useEffect, useCallback } from "react"
import { Percent, Copy, Check, Calculator, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type VatRate = "1" | "10" | "20"

interface CalculationResult {
    netAmount: number
    vatAmount: number
    totalAmount: number
}

export function VatCalculator() {
    const [amount, setAmount] = useState<string>("")
    const [vatRate, setVatRate] = useState<VatRate>("20")
    const [isVatIncluded, setIsVatIncluded] = useState<boolean>(false)
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateVat = useCallback(() => {
        const numAmount = parseFloat(amount.replace(/,/g, "."))

        if (isNaN(numAmount) || numAmount <= 0) {
            setResult(null)
            return
        }

        const rate = parseFloat(vatRate) / 100

        let netAmount: number
        let vatAmount: number
        let totalAmount: number

        if (isVatIncluded) {
            // Amount includes VAT - calculate net amount
            totalAmount = numAmount
            netAmount = numAmount / (1 + rate)
            vatAmount = totalAmount - netAmount
        } else {
            // Amount excludes VAT - calculate total
            netAmount = numAmount
            vatAmount = numAmount * rate
            totalAmount = netAmount + vatAmount
        }

        setResult({
            netAmount: Math.round(netAmount * 100) / 100,
            vatAmount: Math.round(vatAmount * 100) / 100,
            totalAmount: Math.round(totalAmount * 100) / 100
        })
    }, [amount, vatRate, isVatIncluded])

    useEffect(() => {
        calculateVat()
    }, [calculateVat])

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 2
        }).format(value)
    }

    const copyToClipboard = async (value: string, type: string) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(type)
            setTimeout(() => setCopied(null), 2000)
        } catch (err) {
            console.error("Kopyalama başarısız:", err)
        }
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9.,]/g, "")
        setAmount(value)
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Calculator Card */}
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Percent className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">KDV Hesaplama</CardTitle>
                            <CardDescription className="text-indigo-100">
                                KDV dahil veya hariç tutarları kolayca hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {/* Amount Input */}
                    <div className="space-y-2">
                        <Label htmlFor="amount" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Tutar (₺)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                            <Input
                                id="amount"
                                type="text"
                                inputMode="decimal"
                                placeholder="0,00"
                                value={amount}
                                onChange={handleAmountChange}
                                className="pl-8 text-lg font-medium h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* VAT Rate Selection */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            KDV Oranı
                        </Label>
                        <RadioGroup
                            value={vatRate}
                            onValueChange={(value) => setVatRate(value as VatRate)}
                            className="grid grid-cols-3 gap-3"
                        >
                            {[
                                { value: "1", label: "%1", description: "Temel gıda" },
                                { value: "10", label: "%10", description: "Gıda, tekstil" },
                                { value: "20", label: "%20", description: "Genel oran" }
                            ].map((rate) => (
                                <Label
                                    key={rate.value}
                                    htmlFor={`rate-${rate.value}`}
                                    className={`
                    flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${vatRate === rate.value
                                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={rate.value} id={`rate-${rate.value}`} className="sr-only" />
                                    <span className={`text-xl font-bold ${vatRate === rate.value ? "text-indigo-600" : "text-slate-700 dark:text-slate-300"}`}>
                                        {rate.label}
                                    </span>
                                    <span className="text-xs text-slate-500 mt-1">{rate.description}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* VAT Included/Excluded Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <div className="space-y-0.5">
                            <Label htmlFor="vat-toggle" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                KDV Dahil mi?
                            </Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {isVatIncluded
                                    ? "Girdiğiniz tutar KDV dahil"
                                    : "Girdiğiniz tutar KDV hariç"
                                }
                            </p>
                        </div>
                        <Switch
                            id="vat-toggle"
                            checked={isVatIncluded}
                            onCheckedChange={setIsVatIncluded}
                            className="data-[state=checked]:bg-indigo-600"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Results Card */}
            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-indigo-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Net Amount */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">KDV Hariç Tutar</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(result.netAmount)}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(result.netAmount.toFixed(2), "net")}
                                className="text-slate-600 hover:text-indigo-600"
                            >
                                {copied === "net" ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        {/* VAT Amount */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                            <div>
                                <p className="text-sm text-indigo-600 dark:text-indigo-400">KDV Tutarı (%{vatRate})</p>
                                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                                    {formatCurrency(result.vatAmount)}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(result.vatAmount.toFixed(2), "vat")}
                                className="text-indigo-600 hover:bg-indigo-100"
                            >
                                {copied === "vat" ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        <Separator />

                        {/* Total Amount */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                            <div>
                                <p className="text-sm text-indigo-100">KDV Dahil Toplam</p>
                                <p className="text-3xl font-bold">
                                    {formatCurrency(result.totalAmount)}
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.totalAmount.toFixed(2), "total")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "total" ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Info Card */}
            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        KDV Oranları Hakkında
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <span><strong>%1:</strong> Temel gıda maddeleri (ekmek, un, pirinç, süt vb.)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <span><strong>%10:</strong> Gıda ürünleri, tekstil, konaklama hizmetleri</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <span><strong>%20:</strong> Genel KDV oranı (çoğu mal ve hizmet)</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
