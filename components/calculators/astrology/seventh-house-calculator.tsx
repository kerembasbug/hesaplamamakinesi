"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Users, Sparkles } from "lucide-react"

type ZodiacSign = {
    name: string
    symbol: string
    element: string
    ruling: string
    partnerSign: string
    traits: string[]
}

const zodiacSigns: ZodiacSign[] = [
    { name: "Koç", symbol: "♈", element: "Ateş", ruling: "Mars", partnerSign: "Terazi", traits: ["Lider", "Bağımsız", "Tutkulu"] },
    { name: "Boğa", symbol: "♉", element: "Toprak", ruling: "Venüs", partnerSign: "Akrep", traits: ["Sadık", "Güvenilir", "Duyusal"] },
    { name: "İkizler", symbol: "♊", element: "Hava", ruling: "Merkür", partnerSign: "Yay", traits: ["İletişimci", "Meraklı", "Çok yönlü"] },
    { name: "Yengeç", symbol: "♋", element: "Su", ruling: "Ay", partnerSign: "Oğlak", traits: ["Koruyucu", "Duygusal", "Şefkatli"] },
    { name: "Aslan", symbol: "♌", element: "Ateş", ruling: "Güneş", partnerSign: "Kova", traits: ["Karizmatik", "Cömert", "Sadık"] },
    { name: "Başak", symbol: "♍", element: "Toprak", ruling: "Merkür", partnerSign: "Balık", traits: ["Analitik", "Yardımsever", "Titiz"] },
    { name: "Terazi", symbol: "♎", element: "Hava", ruling: "Venüs", partnerSign: "Koç", traits: ["Uyumlu", "Adil", "Romantik"] },
    { name: "Akrep", symbol: "♏", element: "Su", ruling: "Plüton", partnerSign: "Boğa", traits: ["Tutkulu", "Sadık", "Yoğun"] },
    { name: "Yay", symbol: "♐", element: "Ateş", ruling: "Jüpiter", partnerSign: "İkizler", traits: ["Maceracı", "Özgür", "İyimser"] },
    { name: "Oğlak", symbol: "♑", element: "Toprak", ruling: "Satürn", partnerSign: "Yengeç", traits: ["Sorumlu", "Hırslı", "Güvenilir"] },
    { name: "Kova", symbol: "♒", element: "Hava", ruling: "Uranüs", partnerSign: "Aslan", traits: ["Yenilikçi", "Bağımsız", "İnsancıl"] },
    { name: "Balık", symbol: "♓", element: "Su", ruling: "Neptün", partnerSign: "Başak", traits: ["Romantik", "Empatik", "Hayalperest"] },
]

// 7. Ev yorumları
const seventhHouseInterpretations: { [key: string]: { title: string; description: string; partner: string; advice: string } } = {
    "Koç": {
        title: "Koç 7. Ev",
        description: "7. eviniz Koç burcunda olduğunda, ilişkilerinizde heyecan, tutku ve rekabet ararsınız. Dinamik ve enerjik partnerler sizi çeker.",
        partner: "Cesur, bağımsız ve girişken bir partner ararsınız. İlişkinizde liderlik pozisyonunu paylaşmak önemlidir.",
        advice: "Sabırlı olun ve partnerin de söz hakkı olduğunu unutmayın. Rekabeti sevgi ile dengeleyin."
    },
    "Boğa": {
        title: "Boğa 7. Ev",
        description: "7. eviniz Boğa burcunda olduğunda, istikrarlı, güvenilir ve maddi güvence sağlayan ilişkiler ararsınız.",
        partner: "Sadık, duyusal ve ayakları yere basan bir partner ideal. Finansal istikrar önemli bir faktör.",
        advice: "Değişime açık olun ve rutine takılıp kalmamaya özen gösterin."
    },
    "İkizler": {
        title: "İkizler 7. Ev",
        description: "7. eviniz İkizler burcunda olduğunda, entelektüel bağ ve iletişim ilişkilerinizin merkezindedir.",
        partner: "Zeki, konuşkan ve sosyal bir partner ararsınız. Fikir alışverişi yapabileceğiniz biri ideal.",
        advice: "Derinlik arayın, sadece yüzeysel iletişimle yetinmeyin."
    },
    "Yengeç": {
        title: "Yengeç 7. Ev",
        description: "7. eviniz Yengeç burcunda olduğunda, duygusal bağ ve aile odaklı ilişkiler ararsınız.",
        partner: "Şefkatli, koruyucu ve yuva kurmak isteyen bir partner ideal. Duygusal güvenlik öncelikli.",
        advice: "Aşırı bağımlılıktan kaçının ve partnerin bireyselliğine saygı gösterin."
    },
    "Aslan": {
        title: "Aslan 7. Ev",
        description: "7. eviniz Aslan burcunda olduğunda, gösterişli, tutkulu ve sadık ilişkiler ararsınız.",
        partner: "Karizmatik, cömert ve size hayranlık duyan bir partner ararsınız. Romantizm önemli.",
        advice: "Partneri de parlatın, tüm ilgiyi kendinize çekmeyin."
    },
    "Başak": {
        title: "Başak 7. Ev",
        description: "7. eviniz Başak burcunda olduğunda, pratik, düzenli ve yardımsever ilişkiler ararsınız.",
        partner: "Organize, sağlık bilincine sahip ve detaycı bir partner ideal. Günlük hayatta uyum önemli.",
        advice: "Mükemmeliyetçilikten vazgeçin ve partnerin kusurlarını kabul edin."
    },
    "Terazi": {
        title: "Terazi 7. Ev",
        description: "7. eviniz Terazi burcunda olduğunda, dengeli, uyumlu ve estetik ilişkiler ararsınız. Bu, 7. ev için en güçlü yerleşimdir.",
        partner: "Zarif, diplomatik ve estetik anlayışı yüksek bir partner ararsınız. Eşitlik esastır.",
        advice: "Kendi görüşlerinizi de ifade edin, sadece uyum için taviz vermeyin."
    },
    "Akrep": {
        title: "Akrep 7. Ev",
        description: "7. eviniz Akrep burcunda olduğunda, derin, yoğun ve dönüştürücü ilişkiler ararsınız.",
        partner: "Tutkulu, sadık ve duygusal derinliğe sahip bir partner ararsınız. Gizem çekici.",
        advice: "Güven sorunlarıyla yüzleşin ve kontrol ihtiyacını dengeleyin."
    },
    "Yay": {
        title: "Yay 7. Ev",
        description: "7. eviniz Yay burcunda olduğunda, özgürlük, macera ve felsefi bağ ilişkilerinizde önemli.",
        partner: "Maceracı, iyimser ve entelektüel bir partner ararsınız. Birlikte seyahat ve öğrenme.",
        advice: "Bağlanma korkusuyla yüzleşin ve ilişkide köklenmekten korkmayın."
    },
    "Oğlak": {
        title: "Oğlak 7. Ev",
        description: "7. eviniz Oğlak burcunda olduğunda, ciddi, sorumlu ve uzun vadeli ilişkiler ararsınız.",
        partner: "Olgun, hırslı ve sorumluluk sahibi bir partner ideal. Statü önemli olabilir.",
        advice: "Duygulara da yer açın, sadece pratik konulara odaklanmayın."
    },
    "Kova": {
        title: "Kova 7. Ev",
        description: "7. eviniz Kova burcunda olduğunda, özgün, entelektüel ve geleneksel olmayan ilişkiler ararsınız.",
        partner: "Yenilikçi, bağımsız ve sosyal vizyona sahip bir partner ararsınız. Arkadaşlık temeli önemli.",
        advice: "Duygusal yakınlığı reddetmeyin, mesafe koruma ihtiyacını dengeleyin."
    },
    "Balık": {
        title: "Balık 7. Ev",
        description: "7. eviniz Balık burcunda olduğunda, ruhani, romantik ve empatik ilişkiler ararsınız.",
        partner: "Sanatsal, empatik ve spiritüel bir partner ideal. Ruh eşi konsepti önemli.",
        advice: "Gerçekçi beklentiler oluşturun, partneri idealize etmeyin."
    }
}

export function SeventhHouseCalculator() {
    const [birthDate, setBirthDate] = useState<string>("")
    const [birthHour, setBirthHour] = useState<string>("")
    const [result, setResult] = useState<{
        risingSign: ZodiacSign
        seventhHouseSign: ZodiacSign
        interpretation: typeof seventhHouseInterpretations["Koç"]
    } | null>(null)

    const getSunSign = (month: number, day: number): number => {
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 0
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 1
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 2
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 3
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 4
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 5
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 6
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 7
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 8
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 9
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 10
        return 11
    }

    const calculate = () => {
        if (!birthDate || !birthHour) return

        const date = new Date(birthDate)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = parseInt(birthHour) || 0

        const sunSignIndex = getSunSign(month, day)

        // Yükselen burç hesaplama (basitleştirilmiş)
        const risingOffset = Math.floor(hour / 2)
        const risingIndex = (sunSignIndex + risingOffset) % 12

        // 7. ev = Yükselen + 6 (karşı burç)
        const seventhHouseIndex = (risingIndex + 6) % 12

        const risingSign = zodiacSigns[risingIndex]
        const seventhHouseSign = zodiacSigns[seventhHouseIndex]
        const interpretation = seventhHouseInterpretations[seventhHouseSign.name]

        setResult({
            risingSign,
            seventhHouseSign,
            interpretation
        })
    }

    const getElementColor = (element: string) => {
        switch (element) {
            case "Ateş": return "from-red-500 to-orange-500"
            case "Toprak": return "from-amber-600 to-yellow-600"
            case "Hava": return "from-sky-500 to-cyan-500"
            case "Su": return "from-blue-600 to-indigo-600"
            default: return "from-purple-500 to-pink-500"
        }
    }

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Heart className="h-6 w-6 text-pink-500" />
                        7. Ev Hesaplama
                    </CardTitle>
                    <CardDescription>
                        Doğum tarihi ve saatinizi girerek 7. evinizi ve evlilik/ortaklık burcunuzu öğrenin
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="birthDate">Doğum Tarihi</Label>
                            <Input
                                id="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthHour">Doğum Saati</Label>
                            <Select value={birthHour} onValueChange={setBirthHour}>
                                <SelectTrigger id="birthHour">
                                    <SelectValue placeholder="Saat seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hours.map((h) => (
                                        <SelectItem key={h} value={h}>{h}:00</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="p-3 bg-pink-50 dark:bg-pink-950 rounded-lg text-sm text-pink-800 dark:text-pink-200">
                        <strong>💡 7. Ev Nedir?</strong> Astrolojide evlilik, ciddi ilişkiler ve iş ortaklıklarını
                        temsil eden evdir. Karşı yükselen burcunuzda yer alır.
                    </div>

                    <Button onClick={calculate} className="w-full" size="lg">
                        7. Evimi Hesapla
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <div className="space-y-6">
                    {/* Ana Sonuç */}
                    <Card className="border-2 border-pink-200 dark:border-pink-800 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950">
                        <CardHeader className="text-center">
                            <p className="text-sm text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                                7. Eviniz
                            </p>
                            <div className="text-6xl my-2">{result.seventhHouseSign.symbol}</div>
                            <CardTitle className={`text-4xl bg-gradient-to-r ${getElementColor(result.seventhHouseSign.element)} bg-clip-text text-transparent`}>
                                {result.seventhHouseSign.name}
                            </CardTitle>
                            <CardDescription className="text-lg">
                                {result.seventhHouseSign.element} elementi • Yönetici: {result.seventhHouseSign.ruling}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {/* Yorum Kartı */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-500" />
                                {result.interpretation.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-slate-700 dark:text-slate-300">
                                    {result.interpretation.description}
                                </p>
                            </div>

                            <div className="bg-pink-50 dark:bg-pink-950 rounded-lg p-4">
                                <h4 className="font-semibold flex items-center gap-2 mb-2">
                                    <Heart className="h-4 w-4 text-pink-500" />
                                    İdeal Partner Özellikleri
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {result.interpretation.partner}
                                </p>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4">
                                <h4 className="font-semibold flex items-center gap-2 mb-2">
                                    <Sparkles className="h-4 w-4 text-purple-500" />
                                    İlişki Tavsiyesi
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {result.interpretation.advice}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Karşılaştırma */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader className="text-center pb-2">
                                <p className="text-sm text-slate-500">⬆️ Yükselen Burç (1. Ev)</p>
                                <div className="text-3xl my-1">{result.risingSign.symbol}</div>
                                <CardTitle className="text-xl">{result.risingSign.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-sm text-slate-600 dark:text-slate-400">
                                Kendinizi nasıl sunduğunuz, fiziksel görünümünüz
                            </CardContent>
                        </Card>

                        <Card className="border-pink-200 dark:border-pink-800">
                            <CardHeader className="text-center pb-2">
                                <p className="text-sm text-pink-600 dark:text-pink-400">💍 7. Ev (Evlilik)</p>
                                <div className="text-3xl my-1">{result.seventhHouseSign.symbol}</div>
                                <CardTitle className="text-xl text-pink-700 dark:text-pink-300">
                                    {result.seventhHouseSign.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-sm text-slate-600 dark:text-slate-400">
                                Partnerinizde aradığınız özellikler
                            </CardContent>
                        </Card>
                    </div>

                    {/* Doğal Partner */}
                    <Card className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-950 dark:to-pink-950">
                        <CardContent className="flex items-center justify-center gap-4 py-6">
                            <Users className="h-8 w-8 text-pink-600" />
                            <div className="text-center">
                                <p className="text-sm text-pink-600 dark:text-pink-400">Doğal Partner Burcu</p>
                                <p className="text-2xl font-bold text-pink-800 dark:text-pink-200">
                                    {result.seventhHouseSign.partnerSign}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
