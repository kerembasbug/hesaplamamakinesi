/**
 * Küratörlü dönüşüm çiftleri ve her çift için sayfa üretilecek değerler.
 *
 * Kartezyen çarpım BİLEREK kullanılmıyor: 8 uzunluk birimi arasındaki tüm
 * çiftler × tüm değerler binlerce ince içerikli sayfa üretir ve index bloat
 * yaratır. Bunun yerine gerçekten aranan çiftler ve gerçekten aranan değerler
 * elle seçildi; `app/birim/[slug]` rotası `dynamicParams = false` ile bu
 * listenin dışındaki her slug'ı 404'e düşürüyor.
 */

export type Pair = {
    kategori: string
    from: string
    to: string
    /** Sayfa üretilecek değerler. */
    degerler: number[]
    /**
     * "Günlük Hayatta" bölümü. Her değer için farklı, bağlama özgü bir paragraf
     * üretir — sayfaların birbirinin kopyası olmamasının ana kaynağı.
     */
    gunlukHayat: (value: number, result: number) => string
    /** Çifte özel ek SSS maddeleri. */
    ekSorular?: (value: number, result: number) => { question: string; answer: string }[]
}

const fmt = (n: number, digits = 2) =>
    n.toLocaleString("tr-TR", { maximumFractionDigits: digits, minimumFractionDigits: 0 })

export const pairs: Pair[] = [
    // ---------------------------------------------------------------- UZUNLUK
    {
        kategori: "uzunluk",
        from: "cm",
        to: "feet",
        degerler: [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200],
        gunlukHayat: (v, r) => {
            const feetInt = Math.floor(r)
            const inches = Math.round((r - feetInt) * 12)
            const boyNotu =
                v < 160
                    ? "Bu boy, Türkiye'de yetişkin kadın ortalamasının altında kalır."
                    : v < 172
                      ? "Bu boy, Türkiye'de yetişkin kadın ortalamasının üzerinde, erkek ortalamasının hemen altındadır."
                      : v < 182
                        ? "Bu boy, Türkiye'de yetişkin erkek ortalamasına yakındır."
                        : "Bu boy, Türkiye ortalamasının belirgin şekilde üzerindedir ve çoğu kapı boşluğuna (genellikle 200 cm) yaklaşır."
            return `${v} santimetre, İngilizce konuşulan ülkelerde ${feetInt} feet ${inches} inç şeklinde okunur. ${boyNotu} Pasaport başvurusu, yurt dışı iş başvurusu veya uluslararası spor lisansı gibi belgelerde boy alanı feet-inç isterse ${v} cm yerine ${feetInt}'${inches}" yazmanız gerekir. Havacılıkta ve inşaat projelerinde de aynı dönüşüm kullanılır.`
        },
    },
    {
        kategori: "uzunluk",
        from: "feet",
        to: "cm",
        degerler: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12],
        gunlukHayat: (v, r) => {
            const baglam =
                v <= 2
                    ? "Bu ölçü, bir masa yüksekliğinin altında kalan kısa mesafeler için kullanılır."
                    : v <= 6
                      ? "Bu ölçü, insan boyu aralığına denk gelir; İngilizce kaynaklarda kişi boyları çoğunlukla bu aralıkta verilir."
                      : v <= 10
                        ? "Bu ölçü, standart bir oda tavan yüksekliği civarındadır."
                        : "Bu ölçü, iki kat yüksekliğine yaklaşır ve mimari çizimlerde kat aralığı olarak geçer."
            return `${v} feet, metrik sistemde ${fmt(r)} santimetre yapar. ${baglam} Feet birimi Türkiye'de resmî olarak kullanılmasa da uçak irtifası, tırmanış yüksekliği, dalış derinliği ve yurt dışı emlak ilanlarında sık karşınıza çıkar. Bir feet tam olarak 30,48 santimetredir; bu değer 1959'da imzalanan uluslararası yarda ve pound anlaşmasıyla sabitlenmiştir.`
        },
    },
    {
        kategori: "uzunluk",
        from: "cm",
        to: "inc",
        degerler: [10, 15, 20, 25, 30, 40, 50, 55, 60, 70, 80],
        gunlukHayat: (v, r) => {
            const baglam =
                v <= 20
                    ? "Bu ölçü, bir telefon veya küçük tablet ekranının köşegenine yakındır."
                    : v <= 40
                      ? "Bu ölçü, dizüstü bilgisayar ve monitör ekranı köşegenleri aralığındadır."
                      : v <= 60
                        ? "Bu ölçü, küçük ve orta boy televizyon köşegenlerine denk gelir."
                        : "Bu ölçü, büyük ekran televizyonların köşegen aralığındadır."
            return `${v} santimetre ${fmt(r)} inçe eşittir. ${baglam} Ekran boyutları her zaman köşegen üzerinden ölçülür; yani 55 inçlik bir televizyonun genişliği 55 inç değil, köşegeni 55 inçtir. Türkiye'de mobilya ve giysi ölçüleri santimetre ile verilirken ekran, jant, boru çapı ve bisiklet tekerleği inç ile ifade edilir. Bir inç tam olarak 2,54 santimetredir.`
        },
    },
    {
        kategori: "uzunluk",
        from: "inc",
        to: "cm",
        degerler: [5, 10, 13, 15, 17, 24, 27, 32, 43, 50, 55, 65],
        gunlukHayat: (v, r) => {
            const baglam =
                v <= 13
                    ? "Bu köşegen, tablet ve küçük dizüstü bilgisayar sınıfına girer."
                    : v <= 27
                      ? "Bu köşegen, dizüstü bilgisayar ve masaüstü monitör sınıfına girer."
                      : v <= 43
                        ? "Bu köşegen, yatak odası ve küçük salon televizyonları için tipiktir."
                        : "Bu köşegen, ana salon televizyonu sınıfındadır ve genellikle 2,5–3 metrelik izleme mesafesi önerilir."
            return `${v} inç, ${fmt(r)} santimetreye karşılık gelir. ${baglam} Televizyon veya monitör alırken bu dönüşümü bilmek, cihazın TV ünitenize sığıp sığmayacağını hesaplamanızı sağlar — ancak unutmayın, ${fmt(r)} cm köşegen ölçüsüdür; 16:9 ekranda gerçek genişlik yaklaşık ${fmt(r * 0.871)} cm, yüksekliği ise yaklaşık ${fmt(r * 0.49)} cm olur. Çerçeve payı için birkaç santimetre daha ekleyin.`
        },
    },
    {
        kategori: "uzunluk",
        from: "metre",
        to: "feet",
        degerler: [1, 2, 3, 5, 10, 15, 20, 25, 50, 100],
        gunlukHayat: (v, r) =>
            `${v} metre ${fmt(r)} feet eder. ${
                v <= 3
                    ? "Bu yükseklik, standart bir oda tavanı civarındadır."
                    : v <= 20
                      ? "Bu yükseklik, birkaç katlı bir binaya denk gelir."
                      : "Bu mesafe, çok katlı bir yapı veya olimpik havuz uzunluğu ölçeğindedir."
            } Uçuş irtifası, dalış derinliği ve tırmanış yüksekliği gibi uluslararası veriler feet cinsinden yayınlandığı için metre karşılığını bilmek işe yarar. Örneğin bir uçağın 10.000 feet irtifası yaklaşık 3.048 metredir. Bir metre tam olarak 3,280839895 feet'tir.`,
    },
    {
        kategori: "uzunluk",
        from: "feet",
        to: "metre",
        degerler: [1, 3, 5, 6, 10, 20, 30, 50, 100, 1000],
        gunlukHayat: (v, r) =>
            `${v} feet ${fmt(r)} metredir. ${
                v <= 10
                    ? "Bu ölçü, gündelik ev içi mesafeler aralığındadır."
                    : v <= 100
                      ? "Bu ölçü, bina yüksekliği veya arsa cephesi ölçeğindedir."
                      : "Bu ölçü, havacılıkta irtifa raporlamasında kullanılan ölçektedir."
            } Feet'ten metreye geçmek için değeri 0,3048 ile çarpmak yeterlidir. Havacılıkta irtifalar feet ile verilir çünkü uluslararası sivil havacılık standardı bu birimi kullanır; deniz seviyesinden yüksekliği metre ile takip eden ülkelerde bile kokpit göstergeleri feet gösterir.`,
    },
    {
        kategori: "uzunluk",
        from: "km",
        to: "mil",
        degerler: [1, 2, 3, 5, 10, 21, 42, 50, 100, 200],
        gunlukHayat: (v, r) =>
            `${v} kilometre ${fmt(r)} mile eşittir. ${
                v === 21
                    ? "21 km, yarı maraton mesafesine (21,0975 km) çok yakındır; bu da yaklaşık 13,1 mil demektir."
                    : v === 42
                      ? "42 km, maraton mesafesine (42,195 km) çok yakındır; koşu dünyasında bu mesafe 26,2 mil olarak bilinir."
                      : v <= 5
                        ? "Bu mesafe, günlük yürüyüş ve kısa şehir içi ulaşım ölçeğindedir."
                        : "Bu mesafe, şehirlerarası yolculuk ölçeğindedir."
            } ABD ve Birleşik Krallık'ta yol tabelaları, araç hız göstergeleri ve koşu uygulamaları mil kullanır. Kara mili tam olarak 1.609,344 metredir — deniz mili (1.852 m) ile karıştırılmamalıdır.`,
    },
    {
        kategori: "uzunluk",
        from: "mil",
        to: "km",
        degerler: [1, 2, 3, 5, 10, 13, 20, 26, 50, 100],
        gunlukHayat: (v, r) =>
            `${v} mil ${fmt(r)} kilometre eder. ${
                v === 13
                    ? "13 mil, yarı maraton mesafesinin (13,1 mil) neredeyse tamıdır."
                    : v === 26
                      ? "26 mil, maraton mesafesinin (26,2 mil) neredeyse tamıdır."
                      : v <= 5
                        ? "Bu mesafe, kısa bir şehir içi sürüş ya da uzun bir yürüyüş ölçeğindedir."
                        : "Bu mesafe, şehirlerarası sürüş ölçeğindedir."
            } ABD'de kiraladığınız bir araçta hız göstergesi mil/saat gösteriyorsa, 60 mph'nin yaklaşık 97 km/s olduğunu bilmek hız limitlerini takip etmenizi kolaylaştırır. Mili kilometreye çevirmek için 1,609344 ile çarpmak yeterlidir.`,
    },
    {
        kategori: "uzunluk",
        from: "mm",
        to: "cm",
        degerler: [1, 5, 10, 15, 20, 25, 50, 100, 200, 500],
        gunlukHayat: (v, r) =>
            `${v} milimetre ${fmt(r)} santimetredir. ${
                v <= 10
                    ? "Bu ölçek, vida çapı, kağıt kalınlığı ve yağış miktarı gibi küçük ölçümlerde kullanılır."
                    : v <= 100
                      ? "Bu ölçek, teknik çizim ve mobilya imalatında yaygın kullanılan aralıktır."
                      : "Bu ölçek, inşaat ve marangozlukta levha kalınlığı veya kesit ölçüsü olarak geçer."
            } Milimetreden santimetreye geçmek için sayıyı 10'a bölmek yeterlidir — virgülü bir basamak sola kaydırmak da aynı sonucu verir. Meteorolojide "${v} mm yağış" ifadesi, düz bir yüzeyde biriken su yüksekliğini anlatır; ${v} mm yağış metrekareye ${v} litre su düştüğü anlamına gelir.`,
    },
    {
        kategori: "uzunluk",
        from: "metre",
        to: "cm",
        degerler: [1, 2, 3, 5, 10, 15, 20, 50, 100, 200],
        gunlukHayat: (v, r) =>
            `${v} metre ${fmt(r, 0)} santimetre eder. ${
                v <= 3
                    ? "Bu ölçü, oda içi mesafeler ve mobilya yerleşimi için kullanılır."
                    : v <= 20
                      ? "Bu ölçü, daire cephesi veya bahçe ölçüsü ölçeğindedir."
                      : "Bu ölçü, arsa ve saha ölçüleri ölçeğindedir."
            } Metreden santimetreye geçmek için 100 ile çarpmak yeterlidir. Halı, perde veya parke alırken satıcı metre ile ölçüm yaparken siz santimetre ile not almış olabilirsiniz; bu dönüşüm yanlış kesim kaynaklı maddi kayıpları önler.`,
    },

    // --------------------------------------------------------------- AĞIRLIK
    {
        kategori: "agirlik",
        from: "kg",
        to: "gram",
        degerler: [1, 2, 3, 5, 10, 15, 20, 25, 50, 100],
        gunlukHayat: (v, r) =>
            `${v} kilogram ${fmt(r, 0)} gramdır. ${
                v <= 3
                    ? "Bu ağırlık, mutfakta un, şeker veya et alımlarında sık karşılaşılan miktardır."
                    : v <= 25
                      ? "Bu ağırlık, kargo paketi veya bagaj ölçeğindedir; çoğu havayolu ekonomi sınıfta 20–23 kg bagaj hakkı verir."
                      : "Bu ağırlık, toplu alım ve sanayi paketi ölçeğindedir."
            } Kilogramdan grama geçmek için 1.000 ile çarpmak yeterlidir. Tarif ölçülerinde gram kullanmak kilogramdan daha güvenilirdir; özellikle pastacılıkta 10 gramlık sapma bile sonucu değiştirebilir.`,
    },
    {
        kategori: "agirlik",
        from: "gram",
        to: "kg",
        degerler: [100, 250, 500, 750, 1000, 1500, 2000, 2500, 5000, 10000],
        gunlukHayat: (v, r) =>
            `${fmt(v, 0)} gram ${fmt(r, 3)} kilogramdır. ${
                v <= 500
                    ? "Bu miktar, tek seferlik bir yemek tarifi ölçeğindedir."
                    : v <= 2000
                      ? "Bu miktar, market paketi ölçeğindedir."
                      : "Bu miktar, toplu alım veya haftalık alışveriş ölçeğindedir."
            } Gramdan kilograma geçmek için 1.000'e bölmek yeterlidir. Kargo firmaları desi hesabında ağırlığı kilogram üzerinden aldığı için gram cinsinden bilinen paket ağırlığını çevirmek gerekir; 1.000 gramın altındaki paketler genelde 1 kg olarak yuvarlanır.`,
    },
    {
        kategori: "agirlik",
        from: "kg",
        to: "pound",
        degerler: [1, 5, 10, 20, 30, 50, 60, 70, 80, 90, 100],
        gunlukHayat: (v, r) =>
            `${v} kilogram ${fmt(r)} pound eder. ${
                v <= 10
                    ? "Bu ağırlık, bagaj el çantası veya küçük paket ölçeğindedir."
                    : v >= 50 && v <= 100
                      ? "Bu ağırlık, yetişkin vücut ağırlığı aralığındadır; ABD kaynaklı fitness ve sağlık içeriklerinde kilonuzu pound olarak bulmanız gerekir."
                      : "Bu ağırlık, ağırlık antrenmanı ve yük taşıma ölçeğindedir."
            } Kilogramdan pound'a geçmek için 2,20462 ile çarpmak yeterlidir. ABD'de doktor muayenesinde, spor salonu ekipmanlarında ve havayolu bagaj limitlerinde pound kullanılır; 1 pound tam olarak 0,45359237 kilogramdır.`,
    },
    {
        kategori: "agirlik",
        from: "pound",
        to: "kg",
        degerler: [1, 5, 10, 20, 45, 50, 100, 135, 150, 200, 225],
        gunlukHayat: (v, r) =>
            `${v} pound ${fmt(r)} kilogramdır. ${
                v === 45
                    ? "45 pound, olimpik halter barının standart ağırlığıdır (20,4 kg); Türkiye'deki salonlarda bu bar genellikle 20 kg olarak satılır."
                    : v === 135 || v === 225
                      ? "Bu değer, ABD kaynaklı ağırlık antrenmanı programlarında sık geçen bir bar yüklemesidir."
                      : v <= 20
                        ? "Bu ağırlık, dambıl ve küçük yük ölçeğindedir."
                        : "Bu ağırlık, vücut ağırlığı veya ağır yük ölçeğindedir."
            } Pound'dan kilograma geçmek için 0,453592 ile çarpın. İngilizce antrenman programlarını uygularken bu dönüşümü yapmazsanız yükü yaklaşık iki kat fazla hesaplama riskiniz vardır.`,
    },
    {
        kategori: "agirlik",
        from: "ton",
        to: "kg",
        degerler: [1, 2, 3, 5, 10, 15, 20, 25, 50, 100],
        gunlukHayat: (v, r) =>
            `${v} ton ${fmt(r, 0)} kilogramdır. ${
                v <= 3
                    ? "Bu ağırlık, bir binek otomobil ya da küçük kamyonet ölçeğindedir."
                    : v <= 20
                      ? "Bu ağırlık, kamyon yükü ölçeğindedir; Türkiye'de tek dingilli kamyonlarda azami yük sınırları bu aralıktadır."
                      : "Bu ağırlık, TIR dorsesi veya konteyner ölçeğindedir."
            } Metrik tondan kilograma geçmek için 1.000 ile çarpmak yeterlidir. Metrik tonu ABD'de kullanılan "short ton" (907,18 kg) ve İngiltere'deki "long ton" (1.016,05 kg) ile karıştırmayın; uluslararası nakliye belgelerinde hangi ton olduğunu teyit edin.`,
    },
    {
        kategori: "agirlik",
        from: "kg",
        to: "ton",
        degerler: [500, 1000, 1500, 2000, 2500, 5000, 10000, 20000, 50000, 100000],
        gunlukHayat: (v, r) =>
            `${fmt(v, 0)} kilogram ${fmt(r, 3)} tondur. ${
                v <= 2000
                    ? "Bu ağırlık, binek araç ölçeğindedir."
                    : v <= 20000
                      ? "Bu ağırlık, ticari araç ve kamyon yükü ölçeğindedir."
                      : "Bu ağırlık, ağır nakliye ve endüstriyel sevkiyat ölçeğindedir."
            } Kilogramdan tona geçmek için 1.000'e bölmek yeterlidir. Nakliye faturalarında ve hurda/geri dönüşüm alım fiyatlarında birim ton üzerinden verildiği için kilogram cinsinden bilinen ağırlığı çevirmek maliyet hesabının ilk adımıdır.`,
    },
    {
        kategori: "agirlik",
        from: "gram",
        to: "mg",
        degerler: [1, 2, 5, 10, 20, 50, 100, 250, 500, 1000],
        gunlukHayat: (v, r) =>
            `${v} gram ${fmt(r, 0)} miligramdır. ${
                v <= 10
                    ? "Bu ölçek, ilaç dozajı ve besin takviyesi etiketlerinde kullanılan aralıktır."
                    : v <= 100
                      ? "Bu ölçek, vitamin ve mineral günlük alım miktarlarında geçer."
                      : "Bu ölçek, gıda etiketlerindeki besin değeri tablolarında görülür."
            } Gramdan miligrama geçmek için 1.000 ile çarpın. İlaç dozajlarında gram ile miligramı karıştırmak bin katlık hataya yol açar; reçetede yazan birimi mutlaka teyit edin ve dozaj konusunda hekiminize danışın.`,
    },
    {
        kategori: "agirlik",
        from: "kg",
        to: "ons",
        degerler: [1, 2, 3, 5, 10, 15, 20, 25, 50, 100],
        gunlukHayat: (v, r) =>
            `${v} kilogram ${fmt(r)} ons eder. ${
                v <= 3
                    ? "Bu ölçek, mutfak tariflerinde İngilizce kaynaklardan çeviri yaparken sık kullanılır."
                    : "Bu ölçek, toplu gıda alımı ve paketleme hesaplarında geçer."
            } Kilogramdan onsa geçmek için 35,274 ile çarpın. Buradaki ons, gıda ölçüsü olan "avoirdupois ons"tur (28,3495 gram). Altın ve gümüş fiyatlarında kullanılan "troy ons" farklıdır ve 31,1035 grama denk gelir — yatırım hesaplarında bu ayrımı gözden kaçırmayın.`,
    },

    // --------------------------------------------------------------- SICAKLIK
    {
        kategori: "sicaklik",
        from: "santigrat",
        to: "fahrenheit",
        degerler: [0, 10, 18, 20, 25, 30, 35, 36, 37, 38, 40, 100],
        gunlukHayat: (v, r) =>
            `${v} santigrat derece ${fmt(r, 1)} Fahrenheit derecedir. ${
                v === 0
                    ? "0 °C suyun donma noktasıdır ve Fahrenheit ölçeğinde 32'ye denk gelir."
                    : v === 37
                      ? "37 °C normal insan vücut sıcaklığıdır; ABD'de bu değer 98,6 °F olarak bilinir."
                      : v === 38
                        ? "38 °C, tıbbi olarak ateş kabul edilen eşiktir."
                        : v === 100
                          ? "100 °C, deniz seviyesinde suyun kaynama noktasıdır ve 212 °F'ye eşittir."
                          : v <= 20
                            ? "Bu sıcaklık, serin bir bahar günü ya da klimalı iç mekân aralığındadır."
                            : "Bu sıcaklık, sıcak bir yaz günü aralığındadır."
            } ABD'ye seyahat ederken veya Amerikan tariflerindeki fırın sıcaklığını ayarlarken bu dönüşüme ihtiyaç duyarsınız. Formül basittir: değeri 1,8 ile çarpıp 32 ekleyin.`,
    },
    {
        kategori: "sicaklik",
        from: "fahrenheit",
        to: "santigrat",
        degerler: [32, 50, 60, 70, 75, 80, 90, 98, 100, 180, 350, 212],
        gunlukHayat: (v, r) =>
            `${v} Fahrenheit derece ${fmt(r, 1)} santigrat derecedir. ${
                v === 32
                    ? "32 °F suyun donma noktasıdır."
                    : v === 98
                      ? "98 °F, normal insan vücut sıcaklığına çok yakındır (98,6 °F = 37 °C)."
                      : v === 212
                        ? "212 °F, deniz seviyesinde suyun kaynama noktasıdır."
                        : v === 350
                          ? "350 °F, Amerikan tariflerinde en sık geçen fırın sıcaklığıdır; Türkiye'de fırınınızı yaklaşık 175–180 °C'ye ayarlamalısınız."
                          : v >= 180
                            ? "Bu değer, fırın sıcaklığı aralığındadır."
                            : "Bu değer, gündelik hava sıcaklığı aralığındadır."
            } Fahrenheit'tan santigrada geçmek için 32 çıkarıp 1,8'e bölün. Amerikan yemek tariflerini uygularken bu dönüşümü atlamak, yemeğin yanmasına ya da çiğ kalmasına yol açar.`,
    },
    {
        kategori: "sicaklik",
        from: "santigrat",
        to: "kelvin",
        degerler: [0, 10, 20, 25, 30, 37, 50, 100, 200, 500],
        gunlukHayat: (v, r) =>
            `${v} santigrat derece ${fmt(r, 2)} Kelvindir. ${
                v === 0
                    ? "0 °C, tam olarak 273,15 K'dir; bu değer Kelvin ölçeğinin suyla ilişkili referans noktasıdır."
                    : v === 25
                      ? "25 °C (298,15 K), kimyada standart oda koşulu olarak kabul edilen sıcaklıktır."
                      : v === 100
                        ? "100 °C (373,15 K), deniz seviyesinde suyun kaynama noktasıdır."
                        : "Bu değer, laboratuvar ve mühendislik hesaplarında Kelvin cinsinden ifade edilir."
            } Santigrattan Kelvine geçmek için 273,15 eklemek yeterlidir; ölçek aralıkları aynı olduğu için çarpma gerekmez. Kelvin bir mutlak ölçek olduğundan "derece Kelvin" denmez, sadece "Kelvin" denir ve ° işareti kullanılmaz.`,
    },
    {
        kategori: "sicaklik",
        from: "kelvin",
        to: "santigrat",
        degerler: [100, 200, 250, 273, 300, 310, 350, 400, 500, 1000],
        gunlukHayat: (v, r) =>
            `${v} Kelvin ${fmt(r, 2)} santigrat derecedir. ${
                v === 273
                    ? "273 K, suyun donma noktasının (273,15 K) hemen altındadır."
                    : v === 300
                      ? "300 K, yaklaşık 27 °C'dir ve sıcak bir yaz gününe denk gelir."
                      : v === 310
                        ? "310 K, yaklaşık 37 °C ile insan vücut sıcaklığına denk gelir."
                        : v <= 250
                          ? "Bu değer, dondurucu sıcaklıklarının çok altındadır."
                          : "Bu değer, yüksek sıcaklık uygulamaları aralığındadır."
            } Kelvinden santigrada geçmek için 273,15 çıkarmak yeterlidir. Kelvin ölçeği mutlak sıfırdan (0 K = −273,15 °C) başlar; negatif Kelvin değeri fiziksel olarak mümkün değildir.`,
    },
]

/** Çift anahtarı: "uzunluk:cm:feet" */
export function pairKey(pair: Pick<Pair, "kategori" | "from" | "to">): string {
    return `${pair.kategori}:${pair.from}:${pair.to}`
}

const pairIndex = new Map(pairs.map((p) => [`${p.from}:${p.to}`, p]))

export function findPair(from: string, to: string): Pair | undefined {
    return pairIndex.get(`${from}:${to}`)
}

/** Aynı kategorideki diğer çiftler — iç link önerileri için. */
export function relatedPairs(pair: Pair, limit = 3): Pair[] {
    return pairs
        .filter((p) => p.kategori === pair.kategori && !(p.from === pair.from && p.to === pair.to))
        .slice(0, limit)
}

/** Ters çift varsa döner (feet→cm için cm→feet gibi). */
export function reversePair(pair: Pair): Pair | undefined {
    return findPair(pair.to, pair.from)
}
