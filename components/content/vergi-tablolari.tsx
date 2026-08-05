import {
    ASGARI_UCRET,
    DAMGA_VERGISI,
    GELIR_VERGISI_UCRET,
    GELIR_VERGISI_UCRET_DISI,
    KDV_ORANLARI,
    KURUMLAR_VERGISI,
    SGK,
    SON_GUNCELLEME,
    VERGI_YILI,
    type VergiDilimi,
} from "@/lib/constants/tr-2026"

/**
 * İçerik bloklarında kullanılan tablolar. Rakamlar lib/constants/tr-2026.ts'ten
 * geldiği için sayfa metinlerine elle yazılmış eski değerler oluşmaz.
 */

const tl = (n: number) => n.toLocaleString("tr-TR")

function DilimTablosu({ tarife }: { tarife: VergiDilimi[] }) {
    return (
        <div className="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Yıllık Kümülatif Matrah</th>
                        <th>Vergi Oranı</th>
                    </tr>
                </thead>
                <tbody>
                    {tarife.map((dilim, index) => {
                        const alt = index === 0 ? 0 : tarife[index - 1].ustSinir
                        return (
                            <tr key={dilim.ustSinir}>
                                <td>
                                    {Number.isFinite(dilim.ustSinir)
                                        ? `${tl(alt)} - ${tl(dilim.ustSinir)} TL`
                                        : `${tl(alt)} TL üzeri`}
                                </td>
                                <td>%{Math.round(dilim.oran * 100)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

/** Ücret gelirleri için gelir vergisi tarifesi. */
export function UcretVergiDilimleri() {
    return <DilimTablosu tarife={GELIR_VERGISI_UCRET} />
}

/** Kira, serbest meslek gibi ücret dışı gelirler için tarife. */
export function UcretDisiVergiDilimleri() {
    return <DilimTablosu tarife={GELIR_VERGISI_UCRET_DISI} />
}

export function AsgariUcretTablosu() {
    return (
        <div className="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>{VERGI_YILI} Asgari Ücret</th>
                        <th>Brüt</th>
                        <th>Net</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aylık</td>
                        <td>{tl(ASGARI_UCRET.brutAylik)} TL</td>
                        <td>{tl(ASGARI_UCRET.netAylik)} TL</td>
                    </tr>
                    <tr>
                        <td>Günlük</td>
                        <td>{tl(ASGARI_UCRET.brutGunluk)} TL</td>
                        <td>{tl(ASGARI_UCRET.netGunluk)} TL</td>
                    </tr>
                    <tr>
                        <td>Saatlik (brüt)</td>
                        <td>{tl(ASGARI_UCRET.brutSaatlik)} TL</td>
                        <td>—</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export function SgkParametreleri() {
    return (
        <div className="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>{VERGI_YILI} SGK Parametresi</th>
                        <th>Değer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prime esas kazanç alt sınırı (aylık)</td>
                        <td>{tl(SGK.pekAltSinirAylik)} TL</td>
                    </tr>
                    <tr>
                        <td>Prime esas kazanç üst sınırı (aylık)</td>
                        <td>{tl(SGK.pekUstSinirAylik)} TL</td>
                    </tr>
                    <tr>
                        <td>Çalışan sigorta primi</td>
                        <td>%{SGK.calisanSigortaPrimi * 100}</td>
                    </tr>
                    <tr>
                        <td>Çalışan işsizlik primi</td>
                        <td>%{SGK.calisanIssizlikPrimi * 100}</td>
                    </tr>
                    <tr>
                        <td>İşveren sigorta primi</td>
                        <td>%{SGK.isverenSigortaPrimi * 100} (teşvikli %{SGK.isverenSigortaPrimiTesvikli * 100})</td>
                    </tr>
                    <tr>
                        <td>İşveren işsizlik primi</td>
                        <td>%{SGK.isverenIssizlikPrimi * 100}</td>
                    </tr>
                    <tr>
                        <td>Ücrette damga vergisi</td>
                        <td>binde {(DAMGA_VERGISI.ucret * 1000).toLocaleString("tr-TR")}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export function KdvOranlariTablosu() {
    return (
        <div className="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>KDV Oranı</th>
                        <th>Uygulama Alanları</th>
                    </tr>
                </thead>
                <tbody>
                    {KDV_ORANLARI.map((satir) => (
                        <tr key={satir.etiket}>
                            <td className="font-semibold">{satir.etiket}</td>
                            <td>{satir.alan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function KurumlarVergisiTablosu() {
    const satirlar = [
        { ad: "Genel oran", oran: KURUMLAR_VERGISI.genel },
        { ad: "Banka, sigorta ve finans kuruluşları", oran: KURUMLAR_VERGISI.finans },
        { ad: "İhracat kazançları (5 puan indirimli)", oran: KURUMLAR_VERGISI.ihracat },
        { ad: "Sanayi sicil belgeli üretim kazançları (1 puan indirimli)", oran: KURUMLAR_VERGISI.uretim },
    ]
    return (
        <div className="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>{VERGI_YILI} Kurumlar Vergisi</th>
                        <th>Oran</th>
                    </tr>
                </thead>
                <tbody>
                    {satirlar.map((satir) => (
                        <tr key={satir.ad}>
                            <td>{satir.ad}</td>
                            <td>%{(satir.oran * 100).toLocaleString("tr-TR")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

/** Sayfa altına konan güncellik ve kaynak notu — E-E-A-T sinyali. */
export function GuncellemeNotu({ kaynakAdi, kaynakUrl }: { kaynakAdi?: string; kaynakUrl?: string }) {
    const tarih = new Date(SON_GUNCELLEME).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    return (
        <p className="text-sm">
            <strong>Veri güncelliği:</strong> Bu sayfadaki tutar ve oranlar {VERGI_YILI} yılı için geçerlidir.
            Son güncelleme: {tarih}.
            {kaynakAdi && kaynakUrl ? (
                <>
                    {" "}
                    Kaynak:{" "}
                    <a href={kaynakUrl} target="_blank" rel="noopener">
                        {kaynakAdi}
                    </a>
                    .
                </>
            ) : null}
        </p>
    )
}
