import {
  Calculator,
  Landmark,
  Heart,
  GraduationCap,
  Calendar,
  ArrowRightLeft,
  Percent,
  Banknote,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Coins,
  Receipt,
  FileText,
  Building2,
  Scale,
  Stamp,
  ClipboardList,
  Activity,
  Dumbbell,
  Droplets,
  Weight,
  Flame,
  Apple,
  Brain,
  Plus,
  Divide,
  Square,
  Box,
  BarChart3,
  FunctionSquare,
  Clock,
  CalendarDays,
  CalendarRange,
  Timer,
  Plane,
  Sun,
  Ruler,
  Thermometer,
  Gauge,
  HardDrive,
  Car,
  Sparkles,
  Star,
  Moon,
  LucideIcon
} from "lucide-react"

export type Tool = {
  name: string
  slug: string
  description: string
  icon: LucideIcon
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string
  icon: LucideIcon
  tools: Tool[]
}

export const categories: Category[] = [
  {
    id: "finans",
    name: "Finans",
    slug: "finans",
    description: "Kredi, mevduat, yatırım ve kişisel finans hesaplamaları",
    icon: Landmark,
    tools: [
      {
        name: "Kredi Hesaplama",
        slug: "kredi-hesaplama",
        description: "Aylık taksit ve toplam geri ödeme tutarını hesaplayın",
        icon: CreditCard
      },
      {
        name: "Mevduat Faizi Hesaplama",
        slug: "mevduat-faizi-hesaplama",
        description: "Vadeli mevduat getirinizi hesaplayın",
        icon: PiggyBank
      },
      {
        name: "Bileşik Faiz Hesaplama",
        slug: "bilesik-faiz-hesaplama",
        description: "Bileşik faiz ile yatırım getirinizi hesaplayın",
        icon: TrendingUp
      },
      {
        name: "Döviz Çevirici",
        slug: "doviz-cevirici",
        description: "Güncel kurlarla döviz çevirimi yapın",
        icon: Coins
      },
      {
        name: "Yatırım Getirisi (ROI)",
        slug: "yatirim-getirisi",
        description: "Yatırımlarınızın getirisini hesaplayın",
        icon: TrendingUp
      },
      {
        name: "Enflasyon Hesaplama",
        slug: "enflasyon-hesaplama",
        description: "Paranızın enflasyona göre değer kaybını hesaplayın",
        icon: Banknote
      },
      {
        name: "İşsizlik Maaşı Hesaplama",
        slug: "issizlik-maasi-hesaplama",
        description: "İşsizlik ödeneği tutarınızı hesaplayın",
        icon: Banknote
      },
      {
        name: "Rayiç Bedel Hesaplama",
        slug: "rayic-bedel-hesaplama",
        description: "Gayrimenkul resmi değer tahmini",
        icon: Building2
      },
      {
        name: "15 Günlük Maaş Farkı",
        slug: "15-gunluk-maas-farki-hesaplama",
        description: "Memur zam farkı hesaplayıcı",
        icon: Banknote
      },
      {
        name: "3600 Günle Emeklilik",
        slug: "3600-gunle-emeklilik-hesaplama",
        description: "Kısmi emeklilik şartları sorgulama",
        icon: Landmark
      },
      {
        name: "Asgari Ödeme Hesaplama",
        slug: "asgari-odeme-hesaplama",
        description: "Kredi kartı minimum ödeme tutarı",
        icon: CreditCard
      }
    ]
  },
  {
    id: "vergi-muhasebe",
    name: "Vergi & Muhasebe",
    slug: "vergi-muhasebe",
    description: "KDV, gelir vergisi ve muhasebe hesaplamaları",
    icon: Receipt,
    tools: [
      {
        name: "KDV Hesaplama",
        slug: "kdv-hesaplama",
        description: "KDV dahil/hariç tutar hesaplayın",
        icon: Percent
      },
      {
        name: "Gelir Vergisi Hesaplama",
        slug: "gelir-vergisi-hesaplama",
        description: "Aylık ve yıllık gelir verginizi hesaplayın",
        icon: FileText
      },
      {
        name: "ÖTV Hesaplama",
        slug: "otv-hesaplama",
        description: "Özel tüketim vergisi hesaplayın",
        icon: Receipt
      },
      {
        name: "Kurumlar Vergisi",
        slug: "kurumlar-vergisi",
        description: "Şirket kazancı üzerinden vergi hesaplayın",
        icon: Building2
      },
      {
        name: "Damga Vergisi",
        slug: "damga-vergisi",
        description: "Sözleşme ve belgeler için damga vergisi",
        icon: Stamp
      },
      {
        name: "Maliyet Hesaplama",
        slug: "maliyet-hesaplama",
        description: "Ürün ve hizmet maliyetlerini hesaplayın",
        icon: ClipboardList
      },
      {
        name: "MTV Hesaplama 2025",
        slug: "mtv-hesaplama",
        description: "Motorlu taşıtlar vergisi hesaplayın",
        icon: Receipt
      },
      {
        name: "Engelli Araç İndirimi",
        slug: "engelli-arac-indirimi",
        description: "ÖTV ve KDV muafiyeti hesaplayın",
        icon: Receipt
      }
    ]
  },
  {
    id: "saglik-spor",
    name: "Sağlık & Spor",
    slug: "saglik-spor",
    description: "Vücut kitle indeksi, kalori ve fitness hesaplamaları",
    icon: Heart,
    tools: [
      {
        name: "Vücut Kitle İndeksi (BMI)",
        slug: "vki-hesaplama",
        description: "Boy ve kilonuza göre VKİ hesaplayın",
        icon: Scale
      },
      {
        name: "Kalori Hesaplama",
        slug: "kalori-hesaplama",
        description: "Günlük kalori ihtiyacınızı hesaplayın",
        icon: Flame
      },
      {
        name: "İdeal Kilo Hesaplama",
        slug: "ideal-kilo-hesaplama",
        description: "Boyunuza göre ideal kilonuzu öğrenin",
        icon: Weight
      },
      {
        name: "Su İhtiyacı Hesaplama",
        slug: "su-ihtiyaci-hesaplama",
        description: "Günlük su tüketim miktarınızı hesaplayın",
        icon: Droplets
      },
      {
        name: "Bazal Metabolizma",
        slug: "bazal-metabolizma-hesaplama",
        description: "Dinlenme halinde harcadığınız kaloriyi hesaplayın",
        icon: Activity
      },
      {
        name: "Makro Hesaplama",
        slug: "makro-hesaplama",
        description: "Protein, karbonhidrat ve yağ ihtiyacınızı hesaplayın",
        icon: Apple
      },
      {
        name: "Cinsiyet Hesaplama",
        slug: "cinsiyet-hesaplama",
        description: "Çin takvimi ile bebek cinsiyeti tahmini",
        icon: Heart
      },
      {
        name: "1RM Hesaplama",
        slug: "1rm-hesaplama",
        description: "Tek tekrar maksimum güç hesaplayıcı",
        icon: Dumbbell
      },
      {
        name: "Promil Hesaplama",
        slug: "alkol-promil-hesaplama",
        description: "Alkol promil ve yasal sınır kontrolü",
        icon: Activity
      },
      {
        name: "Calpol Doz Hesaplama",
        slug: "calpol-doz-hesaplama",
        description: "Kiloya göre çocuk parasetamol dozu",
        icon: Activity
      },
      {
        name: "QTc Hesaplama",
        slug: "qtc-hesaplama",
        description: "Düzeltilmiş QT aralığı hesaplayıcı",
        icon: Activity
      }
    ]
  },
  {
    id: "matematik-egitim",
    name: "Matematik & Eğitim",
    slug: "matematik-egitim",
    description: "Yüzde, oran, geometri ve eğitim hesaplamaları",
    icon: GraduationCap,
    tools: [
      {
        name: "LGS Puan Hesaplama 2026",
        slug: "lgs-puan-hesaplama",
        description: "LGS sınavı puan ve yüzdelik dilim hesaplayın",
        icon: GraduationCap
      },
      {
        name: "Yüzde Hesaplama",
        slug: "yuzde-hesaplama",
        description: "Yüzde değerlerini kolayca hesaplayın",
        icon: Percent
      },
      {
        name: "Karekök Hesaplama",
        slug: "karekok-hesaplama",
        description: "Sayıların karekökünü hesaplayın",
        icon: FunctionSquare
      },
      {
        name: "Oran & Orantı",
        slug: "oran-oranti-hesaplama",
        description: "Oran ve orantı problemlerini çözün",
        icon: Scale
      },
      {
        name: "Alan Hesaplama",
        slug: "alan-hesaplama",
        description: "Geometrik şekillerin alanını hesaplayın",
        icon: Square
      },
      {
        name: "Ortalama Hesaplama",
        slug: "ortalama-hesaplama",
        description: "Sayıların ortalamasını hesaplayın",
        icon: BarChart3
      },
      {
        name: "TYT Net Hesaplama",
        slug: "tyt-net-hesaplama",
        description: "TYT doğru yanlış netinizi hesaplayın",
        icon: GraduationCap
      },
      {
        name: "AYT Net Hesaplama",
        slug: "ayt-net-hesaplama",
        description: "AYT alan testleri netinizi hesaplayın",
        icon: GraduationCap
      },
      {
        name: "GPA Hesaplama",
        slug: "gpa-hesaplama",
        description: "Genel not ortalaması hesaplayın",
        icon: BarChart3
      },
      {
        name: "İskonto Hesaplama",
        slug: "iskonto-hesaplama",
        description: "İndirimli fiyat ve tasarruf hesaplayın",
        icon: Percent
      }
    ]
  },
  {
    id: "zaman-takvim",
    name: "Zaman & Takvim",
    slug: "zaman-takvim",
    description: "Yaş, tarih farkı ve zaman hesaplamaları",
    icon: Calendar,
    tools: [
      {
        name: "Yaş Hesaplama",
        slug: "yas-hesaplama",
        description: "Doğum tarihinize göre yaşınızı hesaplayın",
        icon: CalendarDays
      },
      {
        name: "Gün Farkı Hesaplama",
        slug: "gun-farki-hesaplama",
        description: "İki tarih arasındaki gün farkını bulun",
        icon: CalendarRange
      },
      {
        name: "Tarih Ekleme/Çıkarma",
        slug: "tarih-ekleme",
        description: "Tarihe gün, ay veya yıl ekleyin",
        icon: Plus
      },
      {
        name: "Çalışma Günleri",
        slug: "calisma-gunleri-hesaplama",
        description: "İş günlerini hesaplayın",
        icon: Calendar
      },
      {
        name: "Zaman Dilimi Çevirici",
        slug: "zaman-dilimi-cevirici",
        description: "Farklı zaman dilimleri arasında çeviri yapın",
        icon: Clock
      },
      {
        name: "Kronometre",
        slug: "kronometre",
        description: "Online kronometre ve zamanlayıcı",
        icon: Timer
      },
      {
        name: "Saat Hesaplama",
        slug: "saat-hesaplama",
        description: "İki saat arasındaki farkı hesaplayın",
        icon: Clock
      }
    ]
  },
  {
    id: "donusturuculer",
    name: "Dönüştürücüler",
    slug: "donusturuculer",
    description: "Birim dönüştürme araçları",
    icon: ArrowRightLeft,
    tools: [
      {
        name: "Uzunluk Dönüştürücü",
        slug: "uzunluk-donusturucu",
        description: "Metre, feet, inç ve diğer uzunluk birimleri",
        icon: Ruler
      },
      {
        name: "Ağırlık Dönüştürücü",
        slug: "agirlik-donusturucu",
        description: "Kilogram, pound, ons ve diğer ağırlık birimleri",
        icon: Weight
      },
      {
        name: "Sıcaklık Dönüştürücü",
        slug: "sicaklik-donusturucu",
        description: "Celsius, Fahrenheit ve Kelvin çevirisi",
        icon: Thermometer
      },
      {
        name: "Hız Dönüştürücü",
        slug: "hiz-donusturucu",
        description: "Km/s, mil/s ve diğer hız birimleri",
        icon: Gauge
      },
      {
        name: "Alan Dönüştürücü",
        slug: "alan-donusturucu",
        description: "Metrekare, dönüm, hektar çevirisi",
        icon: Square
      },
      {
        name: "Veri Boyutu Dönüştürücü",
        slug: "veri-boyutu-donusturucu",
        description: "Byte, KB, MB, GB çevirisi",
        icon: HardDrive
      }
    ]
  },
  {
    id: "seyahat",
    name: "Seyahat",
    slug: "seyahat",
    description: "Taksi, yakıt ve gezi hesaplamaları",
    icon: Plane,
    tools: [
      {
        name: "Taksi Ücreti Hesaplama",
        slug: "taksi-ucreti-hesaplama",
        description: "İstanbul ve Ankara güncel taksi ücretleri",
        icon: Car
      },
      {
        name: "HYP Hesaplama",
        slug: "hyp-hesaplama",
        description: "Hız, yakıt ve para tasarrufu analizi",
        icon: Gauge
      }
    ]
  },
  {
    id: "astroloji",
    name: "Astroloji",
    slug: "astroloji",
    description: "Burç, yükselen ve gökyüzü hesaplamaları",
    icon: Sparkles,
    tools: [
      {
        name: "Güneş Burcu Hesaplama",
        slug: "astroloji",
        description: "Güneş burcu ve temel karakter analizi",
        icon: Sun
      },
      {
        name: "Juno Burç Hesaplama",
        slug: "astroloji/juno-hesaplama",
        description: "Ruh eşi ve evlilik burcu hesaplayın",
        icon: Star
      },
      {
        name: "Lilith Burcu Hesaplama",
        slug: "astroloji/lilith-hesaplama",
        description: "Kara Ay Lilith yerleşimini bulun",
        icon: Moon
      }
    ]
  }
]

export const siteConfig = {
  name: "HesaplamaMakinesi",
  description: "Türkiye'nin en kapsamlı online hesaplama platformu. Finans, vergi, sağlık, matematik ve daha fazlası için ücretsiz hesaplama araçları.",
  url: "https://hesaplamamakinesi.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/hesaplamamakinesi",
    github: "https://github.com/hesaplamamakinesi"
  }
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug)
}

export function getToolBySlug(categorySlug: string, toolSlug: string): Tool | undefined {
  const category = getCategoryBySlug(categorySlug)
  return category?.tools.find(tool => tool.slug === toolSlug)
}

export function getAllTools(): { tool: Tool; category: Category }[] {
  return categories.flatMap(category =>
    category.tools.map(tool => ({ tool, category }))
  )
}
