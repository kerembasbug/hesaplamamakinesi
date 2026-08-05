"use client"

import { useState, useEffect, useCallback } from "react"
import { FileText, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { bordroHesapla } from "@/lib/payroll"
import {
    ASGARI_UCRET,
    DAMGA_VERGISI,
    GELIR_VERGISI_UCRET,
    SGK,
    VERGI_YILI,
    guncellemeEtiketi,
} from "@/lib/constants/tr-2026"

interface CalculationResult {
    grossSalary: number
    sgkEmployee: number
    unemploymentEmployee: number
    stampTax: number
    incomeTax: number
    incomeTaxExemption: number
    netSalary: number
    taxBracket: number
    yearlyIncomeTax: number
    yearlyNet: number
    lastMonthNet: number
    employerCost: number
}

export function IncomeTaxCalculator() {
    const [grossSalary, setGrossSalary] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateIncomeTax = useCallback(() => {
        const gross = parseFloat(grossSalary.replace(/\./g, "").replace(/,/g, "."))

        if (isNaN(gross) || gross <= 0) {
            setResult(null)
            return
        }

        // 12 ay simüle edilir: gelir vergisi kümülatif matrah büyüdükçe artar,
        // SGK primleri tavanla sınırlıdır ve asgari ücret istisnası düşülür.
        const bordro = bordroHesapla(gross)
        const ocak = bordro.aylar[0]

        setResult({
            grossSalary: gross,
            sgkEmployee: ocak.sgkIsci,
            unemploymentEmployee: ocak.issizlikIsci,
            stampTax: ocak.damgaVergisi,
            incomeTax: ocak.gelirVergisi,
            incomeTaxExemption: ocak.gelirVergisiIstisnasi,
            netSalary: ocak.net,
            taxBracket: Math.round(ocak.marjinalOran * 100),
            yearlyIncomeTax: bordro.yillikGelirVergisi,
            yearlyNet: bordro.yillikNet,
            lastMonthNet: bordro.sonAyNet,
            employerCost: bordro.aylikIsverenMaliyeti,
        })
    }, [grossSalary])

    useEffect(() => {
        calculateIncomeTax()
    }, [calculateIncomeTax])

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

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Gelir Vergisi Hesaplama</CardTitle>
                            <CardDescription className="text-blue-100">
                                Brüt maaşınızdan net maaşınızı ve vergi kesintilerinizi hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="grossSalary" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Brüt Maaş (₺)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                            <Input
                                id="grossSalary"
                                type="text"
                                inputMode="decimal"
                                placeholder="50.000"
                                value={grossSalary}
                                onChange={(e) => setGrossSalary(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="pl-8 h-12 text-lg border-slate-300 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-blue-500" />
                            Maaş Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Brüt Maaş</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(result.grossSalary)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-red-600">
                                    <span>SGK İşçi Payı (%14)</span>
                                    <span>-{formatCurrency(result.sgkEmployee)}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>İşsizlik Sigortası (%1)</span>
                                    <span>-{formatCurrency(result.unemploymentEmployee)}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>Damga Vergisi (binde 7,59)</span>
                                    <span>-{formatCurrency(result.stampTax)}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>Gelir Vergisi (%{result.taxBracket} dilimi)</span>
                                    <span>-{formatCurrency(result.incomeTax)}</span>
                                </div>
                                {result.incomeTaxExemption > 0 && (
                                    <div className="flex justify-between text-emerald-600">
                                        <span>Asgari ücret gelir vergisi istisnası</span>
                                        <span>+{formatCurrency(result.incomeTaxExemption)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                            <div>
                                <p className="text-sm text-green-100">Net Maaş (Ele Geçen)</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.netSalary)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.netSalary.toFixed(2), "net")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "net" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Aralık ayı neti</p>
                                <p className="font-semibold text-slate-900 dark:text-white">{formatCurrency(result.lastMonthNet)}</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Kümülatif matrah büyüdükçe vergi dilimi yükselir, net maaş yıl içinde düşer.
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Aylık işveren maliyeti</p>
                                <p className="font-semibold text-slate-900 dark:text-white">{formatCurrency(result.employerCost)}</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Brüt + işveren SGK (%20,5) + işsizlik (%2), teşviksiz.
                                </p>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>Vergi dilimi:</strong> Ocak ayında %{result.taxBracket} dilimindesiniz.
                                Yıllık toplam gelir vergisi {formatCurrency(result.yearlyIncomeTax)}, yıllık net{" "}
                                {formatCurrency(result.yearlyNet)} olur.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p className="font-medium text-slate-900 dark:text-white mb-1">
                                {VERGI_YILI} Gelir Vergisi Dilimleri (ücret gelirleri)
                            </p>
                            <ul className="space-y-1">
                                {GELIR_VERGISI_UCRET.map((dilim, index) => {
                                    const alt = index === 0 ? 0 : GELIR_VERGISI_UCRET[index - 1].ustSinir
                                    const bicim = (n: number) => n.toLocaleString("tr-TR")
                                    return (
                                        <li key={dilim.oran}>
                                            {Number.isFinite(dilim.ustSinir)
                                                ? `${bicim(alt)} - ${bicim(dilim.ustSinir)} TL`
                                                : `${bicim(alt)} TL üzeri`}
                                            : %{Math.round(dilim.oran * 100)}
                                        </li>
                                    )
                                })}
                            </ul>
                            <p className="mt-3">
                                Hesaplamaya dahil edilenler: SGK işçi payı %{SGK.calisanSigortaPrimi * 100}, işsizlik
                                %{SGK.calisanIssizlikPrimi * 100}, damga vergisi binde{" "}
                                {(DAMGA_VERGISI.ucret * 1000).toLocaleString("tr-TR")}, prime esas kazanç tavanı{" "}
                                {SGK.pekUstSinirAylik.toLocaleString("tr-TR")} TL ve brüt asgari ücret{" "}
                                {ASGARI_UCRET.brutAylik.toLocaleString("tr-TR")} TL üzerinden gelir/damga vergisi
                                istisnası.
                            </p>
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{guncellemeEtiketi()}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
