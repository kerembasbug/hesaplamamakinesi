/**
 * Birim kayıt defteri — programatik dönüşüm sayfalarının ve dönüştürücü
 * bileşenlerinin tek veri kaynağı.
 *
 * ÖNEMLİ: birim `slug` değerleri URL'de kullanılıyor ve tire İÇEREMEZ.
 * `/birim/cm-feet-cevirici` slug'ı tireyle ikiye bölünerek çözülüyor.
 */

export type UnitSystem = "metrik" | "emperyal" | "mutlak"

export type Unit = {
    /** URL parçası — tire içermez. Örn. "cm", "feet", "kg". */
    slug: string
    /** Tam Türkçe ad. Örn. "Santimetre". */
    ad: string
    /**
     * Başlık, arama kelimesi ve düz metinde kullanılan kısa ad — Türkçe arama
     * diline uygun olmalı ("pound", "santigrat"), SI sembolü değil.
     */
    kisaltma: string
    /**
     * Sayısal gösterimde kullanılan sembol ("lb", "°C"). Verilmezse kisaltma
     * kullanılır. Başlıklarda ASLA kullanılmaz; kimse "70 kg kaç lb" aramaz.
     */
    sembol?: string
    /** Cümle içinde çoğul/ekli kullanım. Örn. "santimetre". */
    okunus: string
    /** Türkçe arama varyasyonları — içerikte geçirmek için. */
    varyasyonlar: string[]
    sistem: UnitSystem
    /** Bir cümlelik birim tanımı — içerik bloklarında kullanılır. */
    tanim: string
    /** Baz birime çarpan (doğrusal birimler için). */
    factor?: number
    /** Doğrusal olmayan birimler (sıcaklık) için dönüşüm fonksiyonları. */
    toBase?: (value: number) => number
    fromBase?: (value: number) => number
}

export type UnitCategory = {
    slug: string
    ad: string
    /** Baz birimin slug'ı. */
    bazBirim: string
    /** Sitedeki genel dönüştürücü sayfası — iç link için. */
    converterPath: string
    /** Kategori giriş paragrafı. */
    aciklama: string
    units: Unit[]
}

export const unitCategories: UnitCategory[] = [
    {
        slug: "uzunluk",
        ad: "Uzunluk",
        bazBirim: "metre",
        converterPath: "/donusturuculer/uzunluk-donusturucu",
        aciklama:
            "Uzunluk birimleri, iki nokta arasındaki mesafeyi ölçer. Türkiye metrik sistemi kullanır; buna karşın ekran boyutları inç, havacılık ve İngilizce kaynaklar feet ve mil ile ifade edilir.",
        units: [
            {
                slug: "km",
                ad: "Kilometre",
                kisaltma: "km",
                okunus: "kilometre",
                varyasyonlar: ["km", "kilometre"],
                sistem: "metrik",
                tanim: "Kilometre, bin metreye eşit metrik uzunluk birimidir ve şehirlerarası mesafelerde kullanılır.",
                factor: 1000,
            },
            {
                slug: "metre",
                ad: "Metre",
                kisaltma: "m",
                okunus: "metre",
                varyasyonlar: ["m", "metre"],
                sistem: "metrik",
                tanim: "Metre, Uluslararası Birim Sistemi'nin (SI) temel uzunluk birimidir ve ışığın boşlukta 1/299.792.458 saniyede aldığı yol olarak tanımlanır.",
                factor: 1,
            },
            {
                slug: "cm",
                ad: "Santimetre",
                kisaltma: "cm",
                okunus: "santimetre",
                varyasyonlar: ["cm", "santimetre", "santim"],
                sistem: "metrik",
                tanim: "Santimetre, metrenin yüzde biridir ve boy, mobilya, giysi ölçülerinde en sık kullanılan birimdir.",
                factor: 0.01,
            },
            {
                slug: "mm",
                ad: "Milimetre",
                kisaltma: "mm",
                okunus: "milimetre",
                varyasyonlar: ["mm", "milimetre"],
                sistem: "metrik",
                tanim: "Milimetre, metrenin binde biridir ve teknik çizim, imalat ve yağış ölçümünde standart birimdir.",
                factor: 0.001,
            },
            {
                slug: "mil",
                ad: "Mil",
                kisaltma: "mil",
                okunus: "mil",
                varyasyonlar: ["mil", "mile", "kara mili"],
                sistem: "emperyal",
                tanim: "Kara mili, tam olarak 1.609,344 metreye eşittir ve ABD ile Birleşik Krallık'ta yol mesafelerinde kullanılır.",
                factor: 1609.344,
            },
            {
                slug: "yarda",
                ad: "Yarda",
                kisaltma: "yarda",
                okunus: "yarda",
                varyasyonlar: ["yarda", "yard"],
                sistem: "emperyal",
                tanim: "Yarda, tam olarak 0,9144 metredir; üç feet'e eşittir ve kumaş ile Amerikan futbolu sahasında kullanılır.",
                factor: 0.9144,
            },
            {
                slug: "feet",
                ad: "Feet",
                kisaltma: "feet",
                okunus: "feet",
                varyasyonlar: ["feet", "fit", "ft", "ayak"],
                sistem: "emperyal",
                tanim: "Feet (ayak), tam olarak 0,3048 metredir; havacılıkta irtifa, İngilizce kaynaklarda ise boy ölçüsü olarak kullanılır.",
                factor: 0.3048,
            },
            {
                slug: "inc",
                ad: "İnç",
                kisaltma: "inç",
                okunus: "inç",
                varyasyonlar: ["inç", "inc", "inch", "parmak"],
                sistem: "emperyal",
                tanim: "İnç, tam olarak 2,54 santimetredir; televizyon, monitör ve telefon ekranı boyutlarının standart birimidir.",
                factor: 0.0254,
            },
        ],
    },
    {
        slug: "agirlik",
        ad: "Ağırlık",
        bazBirim: "kg",
        converterPath: "/donusturuculer/agirlik-donusturucu",
        aciklama:
            "Ağırlık (kütle) birimleri bir cismin madde miktarını ölçer. Türkiye'de kilogram ve gram kullanılır; İngilizce tarifler ve fitness kaynakları pound ile ons kullanır.",
        units: [
            {
                slug: "ton",
                ad: "Ton",
                kisaltma: "ton",
                okunus: "ton",
                varyasyonlar: ["ton", "metrik ton"],
                sistem: "metrik",
                tanim: "Metrik ton, bin kilograma eşittir ve yük taşımacılığı ile sanayi üretiminde kullanılır.",
                factor: 1000,
            },
            {
                slug: "kg",
                ad: "Kilogram",
                kisaltma: "kg",
                okunus: "kilogram",
                varyasyonlar: ["kg", "kilogram", "kilo"],
                sistem: "metrik",
                tanim: "Kilogram, SI'nin temel kütle birimidir ve 2019'dan bu yana Planck sabiti üzerinden tanımlanmaktadır.",
                factor: 1,
            },
            {
                slug: "gram",
                ad: "Gram",
                kisaltma: "gram",
                okunus: "gram",
                varyasyonlar: ["gr", "gram"],
                sistem: "metrik",
                tanim: "Gram, kilogramın binde biridir ve mutfak tariflerinde en sık kullanılan ağırlık birimidir.",
                factor: 0.001,
            },
            {
                slug: "mg",
                ad: "Miligram",
                kisaltma: "mg",
                okunus: "miligram",
                varyasyonlar: ["mg", "miligram"],
                sistem: "metrik",
                tanim: "Miligram, gramın binde biridir ve ilaç dozajı ile besin takviyelerinde standart birimdir.",
                factor: 0.000001,
            },
            {
                slug: "pound",
                ad: "Pound",
                kisaltma: "pound",
                sembol: "lb",
                okunus: "pound",
                varyasyonlar: ["pound", "lb", "libre"],
                sistem: "emperyal",
                tanim: "Pound (avoirdupois), tam olarak 0,45359237 kilogramdır ve ABD'de vücut ağırlığı ile gıda ambalajlarında kullanılır.",
                factor: 0.45359237,
            },
            {
                slug: "ons",
                ad: "Ons",
                kisaltma: "ons",
                sembol: "oz",
                okunus: "ons",
                varyasyonlar: ["ons", "oz", "ounce"],
                sistem: "emperyal",
                tanim: "Ons, pound'un on altıda biridir (28,349523125 gram) ve İngilizce mutfak tariflerinde sık geçer.",
                factor: 0.028349523125,
            },
        ],
    },
    {
        slug: "sicaklik",
        ad: "Sıcaklık",
        bazBirim: "santigrat",
        converterPath: "/donusturuculer/sicaklik-donusturucu",
        aciklama:
            "Sıcaklık birimleri doğrusal çarpanla değil, kaydırma içeren formüllerle dönüşür. Türkiye Celsius (santigrat) kullanır; ABD Fahrenheit, bilim dünyası Kelvin kullanır.",
        units: [
            {
                slug: "santigrat",
                ad: "Santigrat",
                kisaltma: "santigrat",
                sembol: "°C",
                okunus: "santigrat derece",
                varyasyonlar: ["celsius", "santigrat", "derece", "°C"],
                sistem: "metrik",
                tanim: "Santigrat (Celsius) ölçeğinde suyun donma noktası 0, kaynama noktası 100 derecedir.",
                toBase: (v) => v,
                fromBase: (v) => v,
            },
            {
                slug: "fahrenheit",
                ad: "Fahrenheit",
                kisaltma: "Fahrenheit",
                sembol: "°F",
                okunus: "Fahrenheit derece",
                varyasyonlar: ["fahrenheit", "°F"],
                sistem: "emperyal",
                tanim: "Fahrenheit ölçeğinde suyun donma noktası 32, kaynama noktası 212 derecedir; ABD'de günlük hava durumunda kullanılır.",
                toBase: (v) => ((v - 32) * 5) / 9,
                fromBase: (v) => (v * 9) / 5 + 32,
            },
            {
                slug: "kelvin",
                ad: "Kelvin",
                kisaltma: "Kelvin",
                sembol: "K",
                okunus: "Kelvin",
                varyasyonlar: ["kelvin", "K"],
                sistem: "mutlak",
                tanim: "Kelvin, mutlak sıfırdan (−273,15 °C) başlayan SI sıcaklık birimidir ve derece işareti kullanılmaz.",
                toBase: (v) => v - 273.15,
                fromBase: (v) => v + 273.15,
            },
        ],
    },
]

const categoryBySlug = new Map(unitCategories.map((c) => [c.slug, c]))
const unitIndex = new Map<string, { unit: Unit; category: UnitCategory }>()
for (const category of unitCategories) {
    for (const unit of category.units) {
        if (unit.slug.includes("-")) {
            throw new Error(`Birim slug'ı tire içeremez: ${unit.slug}`)
        }
        unitIndex.set(`${category.slug}:${unit.slug}`, { unit, category })
    }
}

export function getUnitCategory(slug: string): UnitCategory | undefined {
    return categoryBySlug.get(slug)
}

export function getUnit(categorySlug: string, unitSlug: string): Unit | undefined {
    return unitIndex.get(`${categorySlug}:${unitSlug}`)?.unit
}

/** Bir değeri aynı kategori içinde iki birim arasında dönüştürür. */
export function convert(category: UnitCategory, from: Unit, to: Unit, value: number): number {
    const base = from.toBase ? from.toBase(value) : value * (from.factor ?? 1)
    return to.fromBase ? to.fromBase(base) : base / (to.factor ?? 1)
}

/** Bir birimin diğerine oranı (doğrusal kategoriler için "1 X = ? Y"). */
export function ratio(category: UnitCategory, from: Unit, to: Unit): number {
    return convert(category, from, to, 1)
}

/** Sayısal gösterimde kullanılacak sembol; tanımlı değilse kısaltma. */
export function unitSymbol(unit: Unit): string {
    return unit.sembol ?? unit.kisaltma
}
