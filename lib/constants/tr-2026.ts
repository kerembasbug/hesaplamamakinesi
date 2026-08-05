/**
 * 2026 yılı Türkiye vergi, ücret ve SGK parametreleri — TEK KAYNAK.
 *
 * Tüm hesaplayıcılar bu dosyadan okur. Bir değeri güncellerken:
 *   1. Resmî kaynağı (Resmî Gazete / GİB / SGK genelgesi / ÇSGB) doğrula
 *   2. `kaynak` alanını güncelle
 *   3. SON_GUNCELLEME tarihini güncelle
 *   4. lib/content-meta.ts içinde etkilenen sayfaların tarihini güncelle
 *
 * Yanlış rakam, hesaplama sitesinde en pahalı hatadır: kullanıcı bir kez
 * yanlış sonuç görürse geri gelmez.
 */

export const VERGI_YILI = 2026
export const SON_GUNCELLEME = "2026-08-05"

/** Sayfalarda gösterilen kaynak etiketi. */
export type Kaynak = { ad: string; url: string }

export const KAYNAKLAR = {
    resmiGazete: { ad: "Resmî Gazete", url: "https://www.resmigazete.gov.tr/" },
    gib: { ad: "Gelir İdaresi Başkanlığı", url: "https://www.gib.gov.tr/" },
    sgk: { ad: "Sosyal Güvenlik Kurumu", url: "https://www.sgk.gov.tr/" },
    csgb: { ad: "Çalışma ve Sosyal Güvenlik Bakanlığı", url: "https://www.csgb.gov.tr/" },
} as const satisfies Record<string, Kaynak>

/* ------------------------------------------------------------------ ASGARİ ÜCRET */

export const ASGARI_UCRET = {
    /** 1 Ocak 2026'dan itibaren geçerli aylık brüt asgari ücret. */
    brutAylik: 33030.0,
    /** Bekâr, çocuksuz çalışan için aylık net asgari ücret. */
    netAylik: 28075.5,
    brutGunluk: 1101.0,
    netGunluk: 935.85,
    brutSaatlik: 146.8,
    kaynak: KAYNAKLAR.csgb,
} as const

/* ------------------------------------------------------------------------- SGK */

export const SGK = {
    /** Prime esas kazanç aylık alt sınırı (= brüt asgari ücret). */
    pekAltSinirAylik: 33030.0,
    /** Prime esas kazanç aylık üst sınırı. 2026'da alt sınırın 9 katı. */
    pekUstSinirAylik: 297270.0,
    pekAltSinirGunluk: 1101.0,
    pekUstSinirGunluk: 9909.0,

    /** Çalışan kesintileri. */
    calisanSigortaPrimi: 0.14,
    calisanIssizlikPrimi: 0.01,

    /** İşveren payları (5 puanlık teşvik uygulanmadan). */
    isverenSigortaPrimi: 0.205,
    isverenIssizlikPrimi: 0.02,
    /** 5510 sayılı Kanun teşviki uygulanınca işveren SGK payı. */
    isverenSigortaPrimiTesvikli: 0.155,

    kaynak: KAYNAKLAR.sgk,
} as const

/* ------------------------------------------------------------- GELİR VERGİSİ */

export type VergiDilimi = {
    /** Bu dilimin üst sınırı (kümülatif matrah). Son dilimde Infinity. */
    ustSinir: number
    oran: number
}

/**
 * 2026 gelir vergisi tarifesi.
 *
 * Ücret gelirleri ile ücret dışı gelirler 3. dilimden itibaren ayrışır:
 * ücrette 400.000–1.500.000 aralığı %27 iken, diğer gelirlerde bu aralık
 * 400.000–1.000.000'dur.
 */
export const GELIR_VERGISI_UCRET: VergiDilimi[] = [
    { ustSinir: 190000, oran: 0.15 },
    { ustSinir: 400000, oran: 0.2 },
    { ustSinir: 1500000, oran: 0.27 },
    { ustSinir: 5300000, oran: 0.35 },
    { ustSinir: Number.POSITIVE_INFINITY, oran: 0.4 },
]

export const GELIR_VERGISI_UCRET_DISI: VergiDilimi[] = [
    { ustSinir: 190000, oran: 0.15 },
    { ustSinir: 400000, oran: 0.2 },
    { ustSinir: 1000000, oran: 0.27 },
    { ustSinir: 5300000, oran: 0.35 },
    { ustSinir: Number.POSITIVE_INFINITY, oran: 0.4 },
]

export const GELIR_VERGISI_KAYNAK = KAYNAKLAR.gib

/**
 * Kümülatif matrah üzerinden gelir vergisini hesaplar.
 *
 * @param matrah      Yıllık kümülatif vergi matrahı
 * @param tarife      Kullanılacak dilim listesi
 * @returns           Toplam vergi ve son dilimin oranı
 */
export function gelirVergisiHesapla(
    matrah: number,
    tarife: VergiDilimi[] = GELIR_VERGISI_UCRET
): { vergi: number; marjinalOran: number } {
    if (matrah <= 0) return { vergi: 0, marjinalOran: tarife[0].oran }

    let kalan = matrah
    let oncekiSinir = 0
    let vergi = 0
    let marjinalOran = tarife[0].oran

    for (const dilim of tarife) {
        const dilimGenisligi = dilim.ustSinir - oncekiSinir
        const buDilimde = Math.min(kalan, dilimGenisligi)
        if (buDilimde <= 0) break
        vergi += buDilimde * dilim.oran
        marjinalOran = dilim.oran
        kalan -= buDilimde
        oncekiSinir = dilim.ustSinir
        if (kalan <= 0) break
    }

    return { vergi, marjinalOran }
}

/* ------------------------------------------------------------- DAMGA VERGİSİ */

export const DAMGA_VERGISI = {
    /** Ücret ödemelerinde uygulanan oran: binde 7,59. */
    ucret: 0.00759,
    /** Ticari sözleşmeler: binde 9,48. */
    sozlesme: 0.00948,
    /** Kira mukavelenameleri: binde 1,89. */
    kira: 0.00189,
    kaynak: KAYNAKLAR.resmiGazete,
} as const

/* ------------------------------------------------------ ASGARİ ÜCRET İSTİSNASI */

/**
 * Tüm çalışanların ücretinin asgari ücrete denk gelen kısmı gelir vergisinden
 * ve damga vergisinden istisnadır. Bu yüzden asgari ücretin üzerindeki ücretlerde
 * de istisna tutarı kadar vergi düşülür.
 */
export const ASGARI_UCRET_ISTISNASI = {
    /** İstisnaya esas brüt tutar (= brüt asgari ücret). */
    brutMatrah: ASGARI_UCRET.brutAylik,
    aktif: true,
} as const

/* --------------------------------------------------------- KIDEM TAZMİNATI */

/**
 * Kıdem tazminatı tavanı yılda iki kez güncellenir. Aşağıdaki tutarlar
 * gelir vergisinden istisna tavanlardır.
 */
export const KIDEM_TAZMINATI = {
    tavanIlkYariyil: 64948.77,
    tavanIkinciYariyil: 73729.87,
    kaynak: KAYNAKLAR.csgb,
} as const

/** Bugünün tarihine göre geçerli kıdem tavanı. */
export function guncelKidemTavani(tarih: Date = new Date()): number {
    const yil = tarih.getFullYear()
    if (yil > VERGI_YILI) return KIDEM_TAZMINATI.tavanIkinciYariyil
    return tarih.getMonth() >= 6
        ? KIDEM_TAZMINATI.tavanIkinciYariyil
        : KIDEM_TAZMINATI.tavanIlkYariyil
}

/* ------------------------------------------------------------ KURUMLAR VERGİSİ */

export const KURUMLAR_VERGISI = {
    genel: 0.25,
    /** Banka, sigorta ve finans kuruluşları. */
    finans: 0.3,
    /** İhracat kazançları — 5 puan indirimli. */
    ihracat: 0.2,
    /** Sanayi sicil belgeli üretim kazançları — 1 puan indirimli. */
    uretim: 0.24,
    /** İlk kez halka açılan kurumlarda 5 yıl boyunca 2 puan indirim. */
    halkaArzIndirimiPuan: 0.02,
    kaynak: KAYNAKLAR.gib,
} as const

/* ------------------------------------------------------------------------ KDV */

export const KDV_ORANLARI = [
    { oran: 0.01, etiket: "%1", alan: "Temel gıda (ekmek, un, pirinç, süt, yumurta), gazete, dergi" },
    { oran: 0.1, etiket: "%10", alan: "Gıda ürünleri, tekstil, konaklama, sağlık hizmetleri, tarım ürünleri" },
    { oran: 0.2, etiket: "%20", alan: "Genel oran — elektronik, otomobil, mobilya, profesyonel hizmetler" },
] as const

export const KDV_KAYNAK = KAYNAKLAR.gib

/* --------------------------------------------------------------------- İŞSİZLİK */

export const ISSIZLIK_MAASI = {
    /** Son 4 aylık prime esas günlük kazanç ortalamasının yüzdesi. */
    oran: 0.4,
    /** Ödenek, brüt asgari ücretin %80'ini aşamaz. */
    ustSinirCarpani: 0.8,
    kaynak: KAYNAKLAR.csgb,
} as const

/** Gösterim için: "2026 verileri · Son güncelleme: 5 Ağustos 2026" */
export function guncellemeEtiketi(): string {
    const tarih = new Date(SON_GUNCELLEME)
    return `${VERGI_YILI} verileri · Son güncelleme: ${tarih.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })}`
}
