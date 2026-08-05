import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ExternalLink } from "lucide-react"

import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { PairConverter } from "@/components/calculators/converter/pair-converter"
import { buildMetadata } from "@/lib/seo"
import { calculatorSchema, faqSchema, howToSchema } from "@/lib/schema"
import { convert, unitSymbol } from "@/lib/units/registry"
import { formatResult, formatShort, trNumber } from "@/lib/units/format"
import { DIAGRAM_HEIGHT, DIAGRAM_WIDTH } from "@/lib/units/diagram"
import { relatedPairs, reversePair } from "@/lib/units/pairs"
import {
    allUnitSlugs,
    hubPath,
    neighbourValues,
    resolveSlug,
    valuePath,
    type Resolved,
} from "@/lib/units/routes"
import {
    authoritySource,
    faqItems,
    formulaText,
    howToSteps,
    hubDescription,
    hubFaqItems,
    hubTitle,
    isLinear,
    unitTitleLabel,
    valueDescription,
    valueTitle,
} from "@/lib/units/content"

export const dynamicParams = false

export function generateStaticParams() {
    return allUnitSlugs().map((slug) => ({ slug }))
}

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const resolved = resolveSlug(slug)
    if (!resolved) return {}

    const ctx = { category: resolved.category, from: resolved.from, to: resolved.to, pair: resolved.pair }

    if (resolved.type === "value") {
        const title = valueTitle(ctx, resolved.value)
        return buildMetadata({
            title,
            description: valueDescription(ctx, resolved.value),
            keywords: [
                `${trNumber(resolved.value)} ${resolved.from.kisaltma} kaç ${resolved.to.kisaltma}`,
                `${resolved.from.kisaltma} ${resolved.to.kisaltma} çevirme`,
                `${resolved.from.ad} ${resolved.to.ad} dönüşümü`,
                ...resolved.from.varyasyonlar.map((v) => `${resolved.value} ${v} kaç ${resolved.to.kisaltma}`),
            ],
            path: `/birim/${slug}`,
        })
    }

    return buildMetadata({
        title: hubTitle(ctx),
        description: hubDescription(ctx),
        keywords: [
            `${resolved.from.kisaltma} ${resolved.to.kisaltma} çevirici`,
            `${resolved.from.ad} ${resolved.to.ad} çevirme`,
            `${resolved.from.kisaltma} ${resolved.to.kisaltma} dönüştürücü`,
            `${resolved.from.ad} ${resolved.to.ad} tablosu`,
        ],
        path: `/birim/${slug}`,
    })
}

export default async function BirimPage({ params }: PageProps) {
    const { slug } = await params
    const resolved = resolveSlug(slug)
    if (!resolved) notFound()

    return resolved.type === "value" ? (
        <ValuePage resolved={resolved} slug={slug} />
    ) : (
        <HubPage resolved={resolved} slug={slug} />
    )
}

/* -------------------------------------------------------------- değer sayfası */

function ValuePage({ resolved, slug }: { resolved: Extract<Resolved, { type: "value" }>; slug: string }) {
    const { category, from, to, pair, value } = resolved
    const ctx = { category, from, to, pair }
    const result = convert(category, from, to, value)
    const path = `/birim/${slug}`

    const steps = howToSteps(ctx, value)
    const faqs = faqItems(ctx, value)
    const neighbours = neighbourValues(pair, value)
    const reverse = reversePair(pair)
    const related = relatedPairs(pair)
    const source = authoritySource(category)
    const factor = convert(category, from, to, 1)
    const reverseFactor = convert(category, to, from, 1)
    const title = valueTitle(ctx, value)

    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={[
                    calculatorSchema({
                        name: title,
                        description: valueDescription(ctx, value),
                        path,
                        applicationCategory: "UtilitiesApplication",
                    }),
                    howToSchema(`${trNumber(value)} ${from.kisaltma} nasıl ${to.kisaltma} yapılır?`, steps),
                    faqSchema(faqs),
                ]}
            />

            <Breadcrumb
                items={[
                    { name: "Dönüştürücüler", path: "/donusturuculer" },
                    { name: `${unitTitleLabel(from)} ${unitTitleLabel(to)} Çevirici`, path: hubPath(pair) },
                    { name: title },
                ]}
            />

            <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>

            {/* Doğrudan cevap — odak kelime içeriğin ilk %10'unda geçer */}
            <div className="mb-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/40">
                <p className="text-sm font-medium uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                    Kısa cevap
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                    {trNumber(value)} {unitSymbol(from)} = {formatResult(result)} {unitSymbol(to)}
                </p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    <strong>
                        {trNumber(value)} {from.kisaltma} kaç {to.kisaltma}
                    </strong>{" "}
                    sorusunun cevabı {formatResult(result)} {to.kisaltma}&apos;dir. Günlük kullanımda{" "}
                    {formatShort(result)} {to.kisaltma} olarak yuvarlayabilirsiniz.
                </p>
            </div>

            <PairConverter
                categorySlug={category.slug}
                fromSlug={from.slug}
                toSlug={to.slug}
                defaultValue={value}
            />

            <article className="prose prose-slate dark:prose-invert mt-12 max-w-none">
                <h2>
                    {trNumber(value)} {unitTitleLabel(from)} Kaç {unitTitleLabel(to)} Eder?
                </h2>
                <p>
                    {trNumber(value)} {from.okunus}, {formatResult(result)} {to.okunus} değerine karşılık gelir.
                    Bu dönüşüm {isLinear(category) ? "sabit bir katsayıya" : "sabit bir formüle"} dayanır ve
                    ölçüm koşullarından bağımsız olarak her zaman aynı sonucu verir. Kullanılan formül:{" "}
                    <strong>{formulaText(ctx)}</strong>
                </p>
                {isLinear(category) && (
                    <p>
                        Katsayı şudur: 1 {from.kisaltma} = {formatResult(factor)} {to.kisaltma}. Ters yönde ise 1{" "}
                        {to.kisaltma} = {formatResult(reverseFactor)} {from.kisaltma} olur. Bu iki sayı birbirinin
                        çarpmaya göre tersidir; birini bilmeniz diğerini hesaplamanız için yeterlidir.
                    </p>
                )}

                <h2>
                    {trNumber(value)} {unitTitleLabel(from)} Değerini {unitTitleLabel(to)} Cinsine Çevirme Adımları
                </h2>
                <ol>
                    {steps.map((step) => (
                        <li key={step.name}>
                            <strong>{step.name}:</strong> {step.text}
                        </li>
                    ))}
                </ol>

                <h2>
                    Görsel Karşılaştırma: {trNumber(value)} {unitTitleLabel(from)} Kaç {unitTitleLabel(to)}
                </h2>
                <p>
                    Aşağıdaki skala, {trNumber(value)} {from.kisaltma} değerinin yakın değerler arasında nerede
                    durduğunu ve her birinin {to.okunus} karşılığını gösterir. Üst satır {from.ad}, alt satır {to.ad}{" "}
                    değerleridir.
                </p>
                <img
                    src={`/gorseller/birim/${slug}.svg`}
                    alt={`${trNumber(value)} ${from.kisaltma} kaç ${to.kisaltma} — ${from.ad} ${to.ad} dönüşüm skalası`}
                    width={DIAGRAM_WIDTH}
                    height={DIAGRAM_HEIGHT}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                />

                <h2>
                    {from.ad} ve {to.ad} Arasındaki Fark
                </h2>
                <p>{from.tanim}</p>
                <p>{to.tanim}</p>
                <p>
                    {from.sistem === to.sistem
                        ? `Her iki birim de ${from.sistem === "metrik" ? "metrik" : from.sistem === "emperyal" ? "emperyal" : "mutlak"} sistemin parçasıdır; bu yüzden aralarındaki dönüşüm tam sayı katlarına yakındır.`
                        : `${from.ad} ${from.sistem === "metrik" ? "metrik" : from.sistem === "emperyal" ? "emperyal" : "mutlak"} sisteme, ${to.ad} ise ${to.sistem === "metrik" ? "metrik" : to.sistem === "emperyal" ? "emperyal" : "mutlak"} sisteme aittir. Türkiye 1931'den bu yana metrik sistemi kullanır; emperyal birimlerle karşılaşmanızın nedeni bu birimlerin ABD ve Birleşik Krallık kaynaklı içeriklerde, teknik standartlarda ve uluslararası sektörlerde hâlâ yaygın olmasıdır.`}{" "}
                    {category.aciklama}
                </p>

                <h2>
                    {trNumber(value)} {unitTitleLabel(from)} Civarı Değerler Tablosu
                </h2>
                <p>
                    Aradığınız tam değer bu değilse, en sık aranan yakın değerler ve karşılıkları aşağıdadır. Her
                    satır kendi ayrıntılı sayfasına bağlanır.
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>{from.ad}</th>
                                <th>{to.ad}</th>
                                <th>Sayfa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>
                                        {trNumber(value)} {unitSymbol(from)}
                                    </strong>
                                </td>
                                <td>
                                    <strong>
                                        {formatResult(result)} {unitSymbol(to)}
                                    </strong>
                                </td>
                                <td>Bu sayfa</td>
                            </tr>
                            {neighbours.map((v) => (
                                <tr key={v}>
                                    <td>
                                        {trNumber(v)} {unitSymbol(from)}
                                    </td>
                                    <td>
                                        {formatResult(convert(category, from, to, v))} {unitSymbol(to)}
                                    </td>
                                    <td>
                                        <Link href={valuePath(pair, v)}>
                                            {trNumber(v)} {from.kisaltma} kaç {to.kisaltma}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2>
                    Ters Dönüşüm: {to.ad} Cinsinden {from.ad}
                </h2>
                <p>
                    Aynı hesabı ters yönde yapmak isterseniz {formatResult(result)} {to.kisaltma} değerini{" "}
                    {formatResult(reverseFactor)} ile{" "}
                    {isLinear(category) ? "çarparak" : "ilgili formülü uygulayarak"} {trNumber(value)}{" "}
                    {from.kisaltma} sonucuna geri dönersiniz.{" "}
                    {reverse ? (
                        <>
                            Ters yöndeki dönüşümler için{" "}
                            <Link href={hubPath(reverse)}>
                                {to.kisaltma} {from.kisaltma} çevirici
                            </Link>{" "}
                            sayfasını kullanabilirsiniz.
                        </>
                    ) : (
                        <>
                            Yukarıdaki çeviricide yer değiştirme düğmesine basarak ters yönde hesap yapabilirsiniz.
                        </>
                    )}
                </p>

                <h2>Günlük Hayatta {trNumber(value)} {unitTitleLabel(from)}</h2>
                <p>{pair.gunlukHayat(value, result)}</p>

                <h2>
                    {trNumber(value)} {unitTitleLabel(from)} Kaç {unitTitleLabel(to)}? Sıkça Sorulan Sorular
                </h2>
                {faqs.map((faq) => (
                    <div key={faq.question}>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}

                <h2>İlgili Dönüşüm Araçları</h2>
                <ul>
                    <li>
                        <Link href={hubPath(pair)}>
                            {from.kisaltma} {to.kisaltma} çevirici
                        </Link>{" "}
                        — tüm değerler için dönüşüm tablosu
                    </li>
                    <li>
                        <Link href={category.converterPath}>{category.ad} dönüştürücü</Link> — kategorideki tüm
                        birimler arasında serbest dönüşüm
                    </li>
                    {related.map((p) => (
                        <li key={`${p.from}-${p.to}`}>
                            <Link href={hubPath(p)}>
                                {p.from} {p.to} çevirici
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href={source.url} target="_blank" rel="noopener">
                        {source.label} <ExternalLink className="inline h-3 w-3" aria-hidden="true" />
                    </a>{" "}
                    — birim tanımları Uluslararası Ölçü ve Tartı Bürosu&apos;nun (BIPM) resmî tanımlarına dayanır.
                </p>
            </article>
        </div>
    )
}

/* ----------------------------------------------------------------- hub sayfası */

function HubPage({ resolved, slug }: { resolved: Extract<Resolved, { type: "hub" }>; slug: string }) {
    const { category, from, to, pair } = resolved
    const ctx = { category, from, to, pair }
    const path = `/birim/${slug}`
    const faqs = hubFaqItems(ctx)
    const reverse = reversePair(pair)
    const related = relatedPairs(pair)
    const source = authoritySource(category)
    const factor = convert(category, from, to, 1)
    const reverseFactor = convert(category, to, from, 1)

    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={[
                    calculatorSchema({
                        name: `${from.ad} ${to.ad} Çevirici`,
                        description: hubDescription(ctx),
                        path,
                        applicationCategory: "UtilitiesApplication",
                        featureList: pair.degerler.map(
                            (v) => `${trNumber(v)} ${from.kisaltma} = ${formatShort(convert(category, from, to, v))} ${to.kisaltma}`
                        ),
                    }),
                    faqSchema(faqs),
                ]}
            />

            <Breadcrumb
                items={[
                    { name: "Dönüştürücüler", path: "/donusturuculer" },
                    { name: `${unitTitleLabel(from)} ${unitTitleLabel(to)} Çevirici` },
                ]}
            />

            <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                {unitTitleLabel(from)} {unitTitleLabel(to)} Çevirici
            </h1>
            <p className="mb-8 text-slate-600 dark:text-slate-400">
                <strong>
                    {from.ad} {to.ad} çevirici
                </strong>{" "}
                ile istediğiniz değeri anında dönüştürün.{" "}
                {isLinear(category)
                    ? `1 ${from.kisaltma} = ${formatResult(factor)} ${to.kisaltma}.`
                    : `Dönüşüm ${formulaText(ctx)} formülüyle yapılır.`}
            </p>

            <PairConverter categorySlug={category.slug} fromSlug={from.slug} toSlug={to.slug} defaultValue={1} />

            <article className="prose prose-slate dark:prose-invert mt-12 max-w-none">
                <h2>
                    {from.ad} {to.ad} Çevirme Nasıl Yapılır?
                </h2>
                <p>
                    {from.ad} değerini {to.okunus} cinsine çevirmek için <strong>{formulaText(ctx)}</strong>{" "}
                    formülünü kullanırsınız.{" "}
                    {isLinear(category)
                        ? `Yani elinizdeki ${from.kisaltma} değerini ${formatResult(factor)} ile çarpmanız yeterlidir. Ters yönde ise 1 ${to.kisaltma} = ${formatResult(reverseFactor)} ${from.kisaltma} katsayısı geçerlidir.`
                        : `Sıcaklık ölçekleri farklı sıfır noktalarından başladığı için basit çarpma yeterli değildir; kaydırma terimi de hesaba katılmalıdır.`}
                </p>

                <h2>
                    {from.ad} {to.ad} Dönüşüm Tablosu
                </h2>
                <p>
                    En sık aranan {from.kisaltma} değerleri ve {to.okunus} karşılıkları aşağıdadır. Her satır, o
                    değerin ayrıntılı hesap sayfasına bağlanır.
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>{from.ad}</th>
                                <th>{to.ad}</th>
                                <th>Ayrıntılı hesap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pair.degerler.map((v) => (
                                <tr key={v}>
                                    <td>
                                        {trNumber(v)} {unitSymbol(from)}
                                    </td>
                                    <td>
                                        {formatResult(convert(category, from, to, v))} {unitSymbol(to)}
                                    </td>
                                    <td>
                                        <Link href={valuePath(pair, v)}>
                                            {trNumber(v)} {from.kisaltma} kaç {to.kisaltma}{" "}
                                            <ArrowRight className="inline h-3 w-3" aria-hidden="true" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2>Görsel Skala</h2>
                <img
                    src={`/gorseller/birim/${slug}.svg`}
                    alt={`${from.ad} ${to.ad} çevirici — dönüşüm skalası`}
                    width={DIAGRAM_WIDTH}
                    height={DIAGRAM_HEIGHT}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                />

                <h2>{from.ad} Nedir?</h2>
                <p>{from.tanim}</p>

                <h2>{to.ad} Nedir?</h2>
                <p>{to.tanim}</p>
                <p>{category.aciklama}</p>

                <h2>Sıkça Sorulan Sorular</h2>
                {faqs.map((faq) => (
                    <div key={faq.question}>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}

                <h2>İlgili Çevirici Araçları</h2>
                <ul>
                    {reverse && (
                        <li>
                            <Link href={hubPath(reverse)}>
                                {to.kisaltma} {from.kisaltma} çevirici
                            </Link>{" "}
                            — ters yön
                        </li>
                    )}
                    <li>
                        <Link href={category.converterPath}>{category.ad} dönüştürücü</Link> — kategorideki tüm
                        birimler
                    </li>
                    {related.map((p) => (
                        <li key={`${p.from}-${p.to}`}>
                            <Link href={hubPath(p)}>
                                {p.from} {p.to} çevirici
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href={source.url} target="_blank" rel="noopener">
                        {source.label} <ExternalLink className="inline h-3 w-3" aria-hidden="true" />
                    </a>
                </p>
            </article>
        </div>
    )
}
