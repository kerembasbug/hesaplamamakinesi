"use client"

import { useState, useEffect, useCallback } from "react"
import { Receipt, Copy, Check, Calculator, Car } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

type EngineType = "benzin" | "dizel" | "hibrit" | "elektrik"
type EngineSize = "1600" | "2000" | "2500" | "2500plus"

// 2024 ÖTV Oranları (Benzin/LPG)
const otvRates: Record<EngineSize, number[]> = {
    "1600": [0.45, 0.50, 0.80],    // 0-130k, 130k-215k, 215k+
    "2000": [0.45, 0.50, 0.80],
    "2500": [0.80, 0.80, 0.80],
    "2500plus": [2.20, 2.20, 2.20]
}

const priceLimits = [130000, 215000]

interface CalculationResult {
    basePrice: number
    otvRate: number
    otvAmount: number
    priceWithOtv: number
    kdvAmount: number
    totalPrice: number
}

export function OtvCalculator() {
    const [basePrice, setBasePrice] = useState<string>("")
    const [engineSize, setEngineSize] = useState<EngineSize>("1600")
    const [engineType, setEngineType] = useState<EngineType>("benzin")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateOTV = useCallback(() => {
        const price = parseFloat(basePrice.replace(/,/g, "."))

        if (isNaN(price) || price <= 0) {
            setResult(null)
            return
        }

        // Elektrikli araçlar için farklı hesaplama
        if (engineType === "elektrik") {
            const otvRate = price <= 1400000 ? 0.10 : price <= 2100000 ? 0.40 : 0.50
            const otvAmount = price * otvRate
            const priceWithOtv = price + otvAmount
            const kdvAmount = priceWithOtv * 0.20
            const totalPrice = priceWithOtv + kdvAmount

            setResult({
                basePrice: price,
                otvRate: otvRate * 100,
                otvAmount: Math.round(otvAmount * 100) / 100,
                priceWithOtv: Math.round(priceWithOtv * 100) / 100,
                kdvAmount: Math.round(kdvAmount * 100) / 100,
                totalPrice: Math.round(totalPrice * 100) / 100
            })
            return
        }

        // Benzin/Dizel/Hibrit araçlar
        let rateIndex = 0
        if (price > priceLimits[1]) rateIndex = 2
        else if (price > priceLimits[0]) rateIndex = 1

        const otvRate = otvRates[engineSize][rateIndex]
        const otvAmount = price * otvRate
        const priceWithOtv = price + otvAmount
        const kdvAmount = priceWithOtv * 0.20
        const totalPrice = priceWithOtv + kdvAmount

        setResult({
            basePrice: price,
            otvRate: otvRate * 100,
            otvAmount: Math.round(otvAmount * 100) / 100,
            priceWithOtv: Math.round(priceWithOtv * 100) / 100,
            kdvAmount: Math.round(kdvAmount * 100) / 100,
            totalPrice: Math.round(totalPrice * 100) / 100
        })
    }, [basePrice, engineSize, engineType])

    useEffect(() => {
        calculateOTV()
    }, [calculateOTV])

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
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

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Car className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">ÖTV Hesaplama</CardTitle>
                            <CardDescription className="text-orange-100">
                                Araç ÖTV ve toplam satış fiyatını hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="basePrice" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Araç Matrah Fiyatı (ÖTV-KDV Hariç) (₺)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                            <Input
                                id="basePrice"
                                type="text"
                                inputMode="decimal"
                                placeholder="500.000"
                                value={basePrice}
                                onChange={(e) => setBasePrice(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="pl-8 h-12 text-lg border-slate-300 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Yakıt Tipi
                        </Label>
                        <RadioGroup
                            value={engineType}
                            onValueChange={(value) => setEngineType(value as EngineType)}
                            className="grid grid-cols-4 gap-2"
                        >
                            {[
                                { value: "benzin", label: "Benzin" },
                                { value: "dizel", label: "Dizel" },
                                { value: "hibrit", label: "Hibrit" },
                                { value: "elektrik", label: "Elektrik" }
                            ].map((type) => (
                                <Label
                                    key={type.value}
                                    htmlFor={`type-${type.value}`}
                                    className={`
                    flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all text-sm
                    ${engineType === type.value
                                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={type.value} id={`type-${type.value}`} className="sr-only" />
                                    <span className={engineType === type.value ? "text-orange-600 font-medium" : "text-slate-700 dark:text-slate-300"}>
                                        {type.label}
                                    </span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>

                    {engineType !== "elektrik" && (
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Motor Hacmi
                            </Label>
                            <RadioGroup
                                value={engineSize}
                                onValueChange={(value) => setEngineSize(value as EngineSize)}
                                className="grid grid-cols-4 gap-2"
                            >
                                {[
                                    { value: "1600", label: "1600cc altı" },
                                    { value: "2000", label: "1600-2000cc" },
                                    { value: "2500", label: "2000-2500cc" },
                                    { value: "2500plus", label: "2500cc üstü" }
                                ].map((size) => (
                                    <Label
                                        key={size.value}
                                        htmlFor={`size-${size.value}`}
                                        className={`
                      flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all text-xs
                      ${engineSize === size.value
                                                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                                                : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                            }
                    `}
                                    >
                                        <RadioGroupItem value={size.value} id={`size-${size.value}`} className="sr-only" />
                                        <span className={engineSize === size.value ? "text-orange-600 font-medium" : "text-slate-700 dark:text-slate-300"}>
                                            {size.label}
                                        </span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    )}
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-orange-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Matrah (Vergisiz) Fiyat</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(result.basePrice)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-orange-600">
                                    <span>ÖTV (%{result.otvRate})</span>
                                    <span>+{formatCurrency(result.otvAmount)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>ÖTV Dahil Fiyat</span>
                                    <span>{formatCurrency(result.priceWithOtv)}</span>
                                </div>
                                <div className="flex justify-between text-blue-600">
                                    <span>KDV (%20)</span>
                                    <span>+{formatCurrency(result.kdvAmount)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            <div>
                                <p className="text-sm text-orange-100">Toplam Satış Fiyatı</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.totalPrice)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.totalPrice.toFixed(0), "total")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "total" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-sm">
                            <p className="text-orange-700 dark:text-orange-300">
                                <strong>Vergi Yükü:</strong> Toplam fiyatın %{((result.otvAmount + result.kdvAmount) / result.totalPrice * 100).toFixed(1)}&apos;i vergidir.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
