/**
 * Dönüşüm sayfalarının metin bloklarını üretir.
 *
 * Amaç, her sayfanın kendi sayılarıyla yazılmış, birbirinin kopyası olmayan
 * içerik üretmek: formüller gerçek değerlerle, SSS cevapları hesaplanmış
 * sonuçlarla, "günlük hayatta" bölümü çifte özel metinle doldurulur.
 */

import { convert, type Unit, type UnitCategory } from "@/lib/units/registry"
import { formatResult, formatShort, trNumber } from "@/lib/units/format"
import type { Pair } from "@/lib/units/pairs"

export type UnitContext = {
    category: UnitCategory
    from: Unit
    to: Unit
    pair: Pair
}

/** Sıcaklık dışındaki kategoriler sabit çarpanla dönüşür. */
export function isLinear(category: UnitCategory): boolean {
    return category.slug !== "sicaklik"
}

/** "0,0328084 ile çarpın" ya da "(°C × 1,8) + 32" gibi insan okunur formül. */
export function formulaText({ category, from, to }: UnitContext): string {
    if (isLinear(category)) {
        const factor = convert(category, from, to, 1)
        return `${from.kisaltma} × ${formatResult(factor)} = ${to.kisaltma}`
    }
    if (from.slug === "santigrat" && to.slug === "fahrenheit") return "(°C × 1,8) + 32 = °F"
    if (from.slug === "fahrenheit" && to.slug === "santigrat") return "(°F − 32) ÷ 1,8 = °C"
    if (from.slug === "santigrat" && to.slug === "kelvin") return "°C + 273,15 = K"
    if (from.slug === "kelvin" && to.slug === "santigrat") return "K − 273,15 = °C"
    return `${from.kisaltma} → ${to.kisaltma}`
}

/** Gerçek sayılarla yazılmış adım adım hesap — HowTo şemasını da besler. */
export function howToSteps(ctx: UnitContext, value: number): { name: string; text: string }[] {
    const { category, from, to } = ctx
    const result = convert(category, from, to, value)

    if (isLinear(category)) {
        const factor = convert(category, from, to, 1)
        return [
            {
                name: "Dönüşüm katsayısını belirleyin",
                text: `1 ${from.kisaltma} = ${formatResult(factor)} ${to.kisaltma}. Bu katsayı sabittir ve uluslararası tanımlarla belirlenmiştir.`,
            },
            {
                name: "Değeri katsayıyla çarpın",
                text: `${trNumber(value)} × ${formatResult(factor)} = ${formatResult(result)}`,
            },
            {
                name: "Sonucu birimiyle yazın",
                text: `${trNumber(value)} ${from.kisaltma} = ${formatResult(result)} ${to.kisaltma}. Günlük kullanımda ${formatShort(result)} ${to.kisaltma} olarak yuvarlayabilirsiniz.`,
            },
        ]
    }

    if (from.slug === "santigrat" && to.slug === "fahrenheit") {
        return [
            { name: "Değeri 1,8 ile çarpın", text: `${trNumber(value)} × 1,8 = ${formatResult(value * 1.8)}` },
            { name: "Sonuca 32 ekleyin", text: `${formatResult(value * 1.8)} + 32 = ${formatResult(result)}` },
            { name: "Birimi yazın", text: `${trNumber(value)} °C = ${formatResult(result)} °F` },
        ]
    }
    if (from.slug === "fahrenheit" && to.slug === "santigrat") {
        return [
            { name: "Değerden 32 çıkarın", text: `${trNumber(value)} − 32 = ${formatResult(value - 32)}` },
            { name: "Sonucu 1,8'e bölün", text: `${formatResult(value - 32)} ÷ 1,8 = ${formatResult(result)}` },
            { name: "Birimi yazın", text: `${trNumber(value)} °F = ${formatResult(result)} °C` },
        ]
    }
    if (from.slug === "santigrat" && to.slug === "kelvin") {
        return [
            { name: "Değere 273,15 ekleyin", text: `${trNumber(value)} + 273,15 = ${formatResult(result)}` },
            { name: "Birimi yazın", text: `${trNumber(value)} °C = ${formatResult(result)} K. Kelvin'de derece işareti kullanılmaz.` },
        ]
    }
    return [
        { name: "Değerden 273,15 çıkarın", text: `${trNumber(value)} − 273,15 = ${formatResult(result)}` },
        { name: "Birimi yazın", text: `${trNumber(value)} K = ${formatResult(result)} °C` },
    ]
}

/**
 * Kısaltması bir SI sembolü değil de sözcük olan birimler. Başlıklarda bunlar
 * büyük harfle başlar ("180 cm Kaç Feet?"), semboller olduğu gibi kalır
 * ("70 kg", "0 °C") — sembolleri büyütmek yazım hatası olur.
 */
const SOZCUK_KISALTMALAR = new Set(["feet", "mil", "yarda", "inç", "ton", "ons", "pound", "santigrat"])

/** Başlıklarda kullanılacak birim etiketi. */
export function unitTitleLabel(unit: Unit): string {
    if (!SOZCUK_KISALTMALAR.has(unit.kisaltma)) return unit.kisaltma
    return unit.kisaltma.charAt(0).toLocaleUpperCase("tr-TR") + unit.kisaltma.slice(1)
}

/** Sayfanın odak kelimesi. Başlık, açıklama ve ilk paragrafta aynen geçer. */
export function focusKeyword(ctx: UnitContext, value: number): string {
    return `${trNumber(value)} ${ctx.from.kisaltma} kaç ${ctx.to.kisaltma}`
}

export function valueTitle(ctx: UnitContext, value: number): string {
    return `${trNumber(value)} ${unitTitleLabel(ctx.from)} Kaç ${unitTitleLabel(ctx.to)}?`
}

export function valueDescription(ctx: UnitContext, value: number): string {
    const result = convert(ctx.category, ctx.from, ctx.to, value)
    const base = `${trNumber(value)} ${ctx.from.kisaltma} kaç ${ctx.to.kisaltma} eder? Cevap: ${formatShort(result)} ${ctx.to.kisaltma}. Formül, adım adım hesap, dönüşüm tablosu ve ücretsiz ${ctx.from.ad}–${ctx.to.ad} çevirici bu sayfada.`

    // Kısa birim adlarında (feet→metre gibi) açıklama 120 karakterin altında
    // kalabiliyor; arama sonucunda kırpılmadan görünmesi için tamamlanıyor.
    if (base.length >= 120) return base
    return `${base} Anında sonuç alın, kayıt gerekmez.`
}

export function hubTitle(ctx: UnitContext): string {
    const kisa = `${unitTitleLabel(ctx.from)} ${unitTitleLabel(ctx.to)} Çevirici`
    const uzun = `${ctx.from.ad} ${ctx.to.ad}`
    // Etiket zaten tam adla aynıysa ("Santigrat Fahrenheit") ek yapmak hem
    // gereksiz tekrar olur hem başlığı 70 karakter sınırının üstüne taşır.
    if (kisa.toLocaleLowerCase("tr-TR").includes(uzun.toLocaleLowerCase("tr-TR"))) return kisa
    return `${kisa} - ${uzun}`
}

export function hubDescription(ctx: UnitContext): string {
    const factor = convert(ctx.category, ctx.from, ctx.to, 1)
    const oran = isLinear(ctx.category)
        ? `1 ${ctx.from.kisaltma} = ${formatShort(factor)} ${ctx.to.kisaltma}.`
        : `Kaydırmalı formülle hesaplanır.`
    return `${ctx.from.ad} ${ctx.to.ad} çevirici: ${oran} Ücretsiz online dönüştürücü, hazır dönüşüm tablosu ve formül açıklaması ile anında sonuç alın.`
}

/** Sayfaya özel SSS. Cevaplar hesaplanmış gerçek sayılar içerir. */
export function faqItems(ctx: UnitContext, value: number): { question: string; answer: string }[] {
    const { category, from, to, pair } = ctx
    const result = convert(category, from, to, value)
    const one = convert(category, from, to, 1)
    const reverseOne = convert(category, to, from, 1)

    const base = [
        {
            question: `${trNumber(value)} ${from.kisaltma} kaç ${to.kisaltma} eder?`,
            answer: `${trNumber(value)} ${from.kisaltma}, tam olarak ${formatResult(result)} ${to.kisaltma} eder. Günlük kullanımda ${formatShort(result)} ${to.kisaltma} olarak yuvarlanabilir.`,
        },
        {
            question: `${from.ad} ${to.ad} dönüşüm formülü nedir?`,
            answer: `${formulaText(ctx)}. ${
                isLinear(category)
                    ? `Yani her ${from.kisaltma} değerini ${formatResult(one)} ile çarparak ${to.kisaltma} karşılığını bulabilirsiniz.`
                    : `Sıcaklık ölçekleri farklı sıfır noktalarına sahip olduğu için basit çarpma yeterli değildir.`
            }`,
        },
        {
            question: `1 ${to.kisaltma} kaç ${from.kisaltma} eder?`,
            answer: `1 ${to.kisaltma} = ${formatResult(reverseOne)} ${from.kisaltma}. Bu, ters yöndeki dönüşümün katsayısıdır.`,
        },
        {
            question: `${from.ad} ve ${to.ad} birimleri nerelerde kullanılır?`,
            answer: `${from.tanim} ${to.tanim}`,
        },
    ]

    const extra = pair.ekSorular?.(value, result) ?? []
    return [...base, ...extra]
}

export function hubFaqItems(ctx: UnitContext): { question: string; answer: string }[] {
    const { category, from, to, pair } = ctx
    const one = convert(category, from, to, 1)
    const reverseOne = convert(category, to, from, 1)
    const firstValue = pair.degerler[0]
    const lastValue = pair.degerler[pair.degerler.length - 1]

    return [
        {
            question: `1 ${from.kisaltma} kaç ${to.kisaltma} eder?`,
            answer: `1 ${from.kisaltma} = ${formatResult(one)} ${to.kisaltma}.`,
        },
        {
            question: `1 ${to.kisaltma} kaç ${from.kisaltma} eder?`,
            answer: `1 ${to.kisaltma} = ${formatResult(reverseOne)} ${from.kisaltma}.`,
        },
        {
            question: `${from.ad} ${to.ad} çevirme nasıl yapılır?`,
            answer: `${formulaText(ctx)} formülünü kullanın. Örneğin ${trNumber(firstValue)} ${from.kisaltma} = ${formatResult(convert(category, from, to, firstValue))} ${to.kisaltma}, ${trNumber(lastValue)} ${from.kisaltma} = ${formatResult(convert(category, from, to, lastValue))} ${to.kisaltma}.`,
        },
        {
            question: `${from.ad} birimi nedir?`,
            answer: from.tanim,
        },
        {
            question: `${to.ad} birimi nedir?`,
            answer: to.tanim,
        },
    ]
}

/** Birimlerin kaynağı olarak gösterilecek otorite bağlantısı (dofollow dış link). */
export function authoritySource(category: UnitCategory): { label: string; url: string } {
    if (category.slug === "sicaklik") {
        return {
            label: "BIPM — SI temel birimi: kelvin",
            url: "https://www.bipm.org/en/si-base-units/kelvin",
        }
    }
    if (category.slug === "agirlik") {
        return {
            label: "BIPM — SI temel birimi: kilogram",
            url: "https://www.bipm.org/en/si-base-units/kilogram",
        }
    }
    return {
        label: "BIPM — SI temel birimi: metre",
        url: "https://www.bipm.org/en/si-base-units/metre",
    }
}
