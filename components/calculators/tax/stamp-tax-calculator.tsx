"use client"

import { useState, useEffect, useCallback } from "react"
import { Stamp, Copy, Check, Calculator, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type DocumentType = "contract" | "salary" | "tender" | "receipt" | "custom"

// 2024 Damga Vergisi Oranları
const stampTaxRates: Record<DocumentType, { rate: number; description: string }> = {
    contract: { rate: 0.00948, description: "Sözleşmeler (binde 9.48)" },
    salary: { rate: 0.00759, description: "Ücret ödemeleri (binde 7.59)" },
    tender: { rate: 0.00569, description: "İhale kararları (binde 5.69)" },
    receipt: { rate: 0.00948, description: "Makbuzlar (binde 9.48)" },
    custom: { rate: 0.00948, description: "Özel oran giriniz" }
}

interface CalculationResult {
    documentValue: number
    taxRate: number
    stampTax: number
}

export function StampTaxCalculator() {
    const [documentValue, setDocumentValue] = useState<string>("")
    const [documentType, setDocumentType] = useState<DocumentType>("contract")
    const [customRate, setCustomRate] = useState<string>("9.48")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const calculateStampTax = useCallback(() => {
        const value = parseFloat(documentValue.replace(/,/g, "."))

        if (isNaN(value) || value <= 0) {
            setResult(null)
            return
        }

        let rate: number
        if (documentType === "custom") {
            rate = parseFloat(customRate.replace(/,/g, ".")) / 1000
            if (isNaN(rate)) rate = 0.00948
        } else {
            rate = stampTaxRates[documentType].rate
        }

        const stampTax = value * rate

        setResult({
            documentValue: value,
            taxRate: rate * 1000,
            stampTax: Math.round(stampTax * 100) / 100
        })
    }, [documentValue, documentType, customRate])

    useEffect(() => {
        calculateStampTax()
    }, [calculateStampTax])

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 2
        }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result.stampTax.toFixed(2))
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error("Kopyalama başarısız:", err)
            }
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Stamp className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Damga Vergisi Hesaplama</CardTitle>
                            <CardDescription className="text-violet-100">
                                Sözleşme ve belgeler için damga vergisi hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="documentValue" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Belge/Sözleşme Bedeli (₺)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                            <Input
                                id="documentValue"
                                type="text"
                                inputMode="decimal"
                                placeholder="100.000"
                                value={documentValue}
                                onChange={(e) => setDocumentValue(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="pl-8 h-12 text-lg border-slate-300 focus:border-violet-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Belge Türü
                        </Label>
                        <RadioGroup
                            value={documentType}
                            onValueChange={(value) => setDocumentType(value as DocumentType)}
                            className="space-y-2"
                        >
                            {Object.entries(stampTaxRates).map(([key, { description }]) => (
                                <Label
                                    key={key}
                                    htmlFor={`doc-${key}`}
                                    className={`
                    flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${documentType === key
                                            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={key} id={`doc-${key}`} />
                                    <span className={documentType === key ? "text-violet-600 font-medium" : "text-slate-700 dark:text-slate-300"}>
                                        {description}
                                    </span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>

                    {documentType === "custom" && (
                        <div className="space-y-2">
                            <Label htmlFor="customRate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Özel Oran (Binde)
                            </Label>
                            <div className="relative">
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">‰</span>
                                <Input
                                    id="customRate"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="9.48"
                                    value={customRate}
                                    onChange={(e) => setCustomRate(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-8 h-12 border-slate-300 focus:border-violet-500"
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-violet-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Belge Bedeli</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(result.documentValue)}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Damga Vergisi Oranı</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">
                                    ‰{result.taxRate.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                            <div>
                                <p className="text-sm text-violet-100">Ödenecek Damga Vergisi</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.stampTax)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={copyToClipboard}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-violet-500 mt-0.5" />
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p className="font-medium text-slate-900 dark:text-white mb-2">Damga Vergisi Oranları (2024)</p>
                            <ul className="space-y-1">
                                <li>• Sözleşmeler, taahhütnameler: Binde 9.48</li>
                                <li>• Maaş, ücret, ikramiye: Binde 7.59</li>
                                <li>• İhale kararları: Binde 5.69</li>
                                <li>• Kira sözleşmeleri: Binde 1.89</li>
                                <li>• Beyannameler, bildiriler: Maktu tutar</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
