import Link from "next/link"
import { Calculator, Mail, Phone, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { categories } from "@/config/site-data"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                <Calculator className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-white text-lg">
                                HesaplamaMakinesi
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 mb-4">
                            Türkiye&apos;nin en kapsamlı online hesaplama platformu.
                            Ücretsiz, hızlı ve güvenilir hesaplama araçları.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-indigo-400" />
                                <span>iletisim@hesaplamamakinesi.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Category Columns */}
                    {categories.slice(0, 4).map((category) => (
                        <div key={category.id}>
                            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <category.icon className="h-4 w-4 text-indigo-400" />
                                {category.name}
                            </h3>
                            <ul className="space-y-2">
                                {category.tools.slice(0, 5).map((tool) => (
                                    <li key={tool.slug}>
                                        <Link
                                            href={tool.externalUrl || `/${category.slug}/${tool.slug}`}
                                            target={tool.externalUrl ? "_blank" : undefined}
                                            rel={tool.externalUrl ? "noopener noreferrer" : undefined}
                                            className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                                        >
                                            {tool.name}{tool.externalUrl && " ↗"}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href={`/${category.slug}`}
                                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        Tümünü Gör →
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Additional Categories Row */}
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                    {categories.slice(4).map((category) => (
                        <div key={category.id}>
                            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <category.icon className="h-4 w-4 text-indigo-400" />
                                {category.name}
                            </h3>
                            <ul className="flex flex-wrap gap-x-4 gap-y-2">
                                {category.tools.map((tool) => (
                                    <li key={tool.slug}>
                                        <Link
                                            href={tool.externalUrl || `/${category.slug}/${tool.slug}`}
                                            target={tool.externalUrl ? "_blank" : undefined}
                                            rel={tool.externalUrl ? "noopener noreferrer" : undefined}
                                            className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                                        >
                                            {tool.name}{tool.externalUrl && " ↗"}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-8 bg-slate-800" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p className="text-slate-400">
                        © {currentYear} HesaplamaMakinesi. Tüm hakları saklıdır.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/gizlilik-politikasi"
                            className="text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                            Gizlilik Politikası
                        </Link>
                        <Link
                            href="/kullanim-sartlari"
                            className="text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                            Kullanım Şartları
                        </Link>
                        <Link
                            href="/iletisim"
                            className="text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                            İletişim
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
