/**
 * Türkiye bordro hesabı — brütten nete, 12 aylık kümülatif tarifeyle.
 *
 * Eski hesaplayıcılar üç noktada hatalıydı:
 *   1. SGK primlerine prime esas kazanç TAVANI uygulanmıyordu (yüksek maaşlarda
 *      kesinti olduğundan fazla çıkıyordu).
 *   2. Asgari ücret gelir vergisi + damga vergisi İSTİSNASI hiç hesaba
 *      katılmıyordu; oysa istisna tüm çalışanlar için geçerlidir.
 *   3. Gelir vergisi yıllık matrahın tamamı üzerinden hesaplanıp 12'ye
 *      bölünüyordu; gerçekte vergi kümülatif matrah büyüdükçe ay ay artar.
 *
 * Burada 12 ay simüle edilerek her ayın gerçek neti hesaplanır.
 */

import {
    ASGARI_UCRET,
    DAMGA_VERGISI,
    GELIR_VERGISI_UCRET,
    SGK,
    gelirVergisiHesapla,
} from "@/lib/constants/tr-2026"

export type AylikBordro = {
    /** 1-12 */
    ay: number
    brut: number
    sgkIsci: number
    issizlikIsci: number
    gelirVergisiMatrahi: number
    kumulatifMatrah: number
    /** İstisna düşülmeden önceki gelir vergisi. */
    gelirVergisiHam: number
    /** Asgari ücret istisnası nedeniyle düşülen tutar. */
    gelirVergisiIstisnasi: number
    gelirVergisi: number
    damgaVergisiHam: number
    damgaVergisiIstisnasi: number
    damgaVergisi: number
    net: number
    marjinalOran: number
}

export type BordroSonucu = {
    aylar: AylikBordro[]
    /** Ocak ayı neti — "ilk ay ne alırım" sorusunun cevabı. */
    ilkAyNet: number
    /** Aralık ayı neti — vergi dilimi yükseldiği için genelde en düşük ay. */
    sonAyNet: number
    yillikBrut: number
    yillikNet: number
    yillikGelirVergisi: number
    yillikSgkIsci: number
    yillikIssizlikIsci: number
    yillikDamgaVergisi: number
    /** İşverene aylık toplam maliyet (teşviksiz). */
    aylikIsverenMaliyeti: number
}

/** Asgari ücretlinin aynı aydaki gelir vergisi — istisna tavanını verir. */
function asgariUcretIstisnaVergisi(ay: number): number {
    const aylikMatrah =
        ASGARI_UCRET.brutAylik * (1 - SGK.calisanSigortaPrimi - SGK.calisanIssizlikPrimi)
    const oncekiKumulatif = aylikMatrah * (ay - 1)
    const kumulatif = aylikMatrah * ay
    return (
        gelirVergisiHesapla(kumulatif, GELIR_VERGISI_UCRET).vergi -
        gelirVergisiHesapla(oncekiKumulatif, GELIR_VERGISI_UCRET).vergi
    )
}

/**
 * Sabit brüt maaş için 12 aylık bordro simülasyonu.
 *
 * @param brutAylik Aylık brüt ücret
 * @param baslangicAy Yıl içinde işe giriş ayı (1-12). Kümülatif matrah bu aydan başlar.
 */
export function bordroHesapla(brutAylik: number, baslangicAy = 1): BordroSonucu {
    const aylar: AylikBordro[] = []
    let kumulatifMatrah = 0

    for (let ay = baslangicAy; ay <= 12; ay++) {
        // SGK primleri prime esas kazanç tavanıyla sınırlıdır.
        const primMatrahi = Math.min(
            Math.max(brutAylik, SGK.pekAltSinirAylik),
            SGK.pekUstSinirAylik
        )
        const sgkIsci = primMatrahi * SGK.calisanSigortaPrimi
        const issizlikIsci = primMatrahi * SGK.calisanIssizlikPrimi

        const gelirVergisiMatrahi = Math.max(0, brutAylik - sgkIsci - issizlikIsci)
        const oncekiKumulatif = kumulatifMatrah
        kumulatifMatrah += gelirVergisiMatrahi

        const { marjinalOran } = gelirVergisiHesapla(kumulatifMatrah, GELIR_VERGISI_UCRET)
        const gelirVergisiHam =
            gelirVergisiHesapla(kumulatifMatrah, GELIR_VERGISI_UCRET).vergi -
            gelirVergisiHesapla(oncekiKumulatif, GELIR_VERGISI_UCRET).vergi

        // Asgari ücrete isabet eden kısım gelir vergisinden istisnadır.
        const istisnaTavani = asgariUcretIstisnaVergisi(ay - baslangicAy + 1)
        const gelirVergisiIstisnasi = Math.min(gelirVergisiHam, istisnaTavani)
        const gelirVergisi = gelirVergisiHam - gelirVergisiIstisnasi

        const damgaVergisiHam = brutAylik * DAMGA_VERGISI.ucret
        const damgaVergisiIstisnasi = Math.min(
            damgaVergisiHam,
            ASGARI_UCRET.brutAylik * DAMGA_VERGISI.ucret
        )
        const damgaVergisi = damgaVergisiHam - damgaVergisiIstisnasi

        const net = brutAylik - sgkIsci - issizlikIsci - gelirVergisi - damgaVergisi

        aylar.push({
            ay,
            brut: brutAylik,
            sgkIsci,
            issizlikIsci,
            gelirVergisiMatrahi,
            kumulatifMatrah,
            gelirVergisiHam,
            gelirVergisiIstisnasi,
            gelirVergisi,
            damgaVergisiHam,
            damgaVergisiIstisnasi,
            damgaVergisi,
            net,
            marjinalOran,
        })
    }

    const toplam = (secici: (a: AylikBordro) => number) =>
        aylar.reduce((sum, a) => sum + secici(a), 0)

    const primMatrahi = Math.min(Math.max(brutAylik, SGK.pekAltSinirAylik), SGK.pekUstSinirAylik)
    const aylikIsverenMaliyeti =
        brutAylik + primMatrahi * (SGK.isverenSigortaPrimi + SGK.isverenIssizlikPrimi)

    return {
        aylar,
        ilkAyNet: aylar[0]?.net ?? 0,
        sonAyNet: aylar[aylar.length - 1]?.net ?? 0,
        yillikBrut: toplam((a) => a.brut),
        yillikNet: toplam((a) => a.net),
        yillikGelirVergisi: toplam((a) => a.gelirVergisi),
        yillikSgkIsci: toplam((a) => a.sgkIsci),
        yillikIssizlikIsci: toplam((a) => a.issizlikIsci),
        yillikDamgaVergisi: toplam((a) => a.damgaVergisi),
        aylikIsverenMaliyeti,
    }
}

/** Netten brüte — ikili arama ile ters çözüm. */
export function nettenBrute(hedefNet: number, ay = 1): number {
    let alt = hedefNet
    let ust = hedefNet * 3
    for (let i = 0; i < 60; i++) {
        const orta = (alt + ust) / 2
        const net = bordroHesapla(orta).aylar[ay - 1]?.net ?? 0
        if (net < hedefNet) alt = orta
        else ust = orta
    }
    return (alt + ust) / 2
}
