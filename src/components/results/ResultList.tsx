import { useState } from 'react'
import ExpandableContent from "../ExpandableContent.tsx"
import Button from "../Button.tsx"
import type { MatchResult, Product } from "../../domain/models.ts"
import { ConfidenceBadge } from "../ConfidenceBadge.tsx"

type ResultListProps = {
    results: MatchResult[]
    onEdit: (item: MatchResult) => void
    onUpdateBestMatch: (requestId: string, product: Product) => void
}

export function ResultList({ results, onEdit, onUpdateBestMatch }: ResultListProps) {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

    const toggleItem = (requestId: string) => {
        const newExpanded = new Set(expandedItems)
        newExpanded.has(requestId) ? newExpanded.delete(requestId) : newExpanded.add(requestId)
        setExpandedItems(newExpanded)
    }

    const renderComparisonRow = (
        key: string,
        original: any,
        alternative: any,
    ) => {
        const isDifferent = original !== alternative
        const arrowColor = isDifferent ? 'text-error' : 'text-primary'

        return (
            <tr className={`border-b border-primary/30 last:border-b-0 ${isDifferent ? 'bg-error/5' : ''}`}>
                <td className="bg-primary/5 px-4 py-3 text-base font-medium text-on-dark bg-surface-dark/30 whitespace-nowrap">
                    {key}
                </td>

                <td
                    className={`
                        w-1/2 px-4 py-3 text-sm text-center font-medium border-l border-primary/20 relative
                        ${isDifferent ? 'text-error' : 'text-on-dark'}
                    `}
                >
                    {original ?? '—'}
                    <svg className={`${arrowColor} absolute top-1/2 right-[-14px] -translate-y-1/2`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26"><title>Arrow-right-thick SVG Icon</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 12l-7-9v4.99L3 8v8h11v5z"/></svg>
                </td>

                <td className={`w-1/2 px-4 py-3 text-sm text-center font-medium ${isDifferent ? 'text-error font-semibold' : 'text-on-dark'}`}>
                    {alternative ?? '—'}
                </td>
            </tr>
        )
    }

    const renderComparisonTable = (
        item: MatchResult,
        product: Product
    ) => {
        const allKeys = new Set([
            ...Object.keys(item.originalProduct.parameters),
            ...Object.keys(product.parameters),
            'price'
        ])

        return (
            <div className="relative">
                <div className="rounded-xl overflow-auto transition-all duration-200 bg-secondary-container shadow-sm shadow-white/10">
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="border-b border-primary bg-primary/20">
                            <th className="px-4 py-3 text-base font-semibold text-on-dark text-left w-fit">
                                Параметр
                            </th>
                            <th className="px-4 py-3 text-base font-semibold text-on-dark text-left border-l border-primary/20 w-1/2">
                                {item.originalProduct.name}
                            </th>
                            <th className="px-4 py-3 text-base font-semibold text-on-dark text-left border-l border-primary/20 w-1/2">
                                {product.name}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {[...allKeys].map((key) => {
                            const orig = key === 'price'
                                ? (item.originalProduct as any).price
                                : item.originalProduct.parameters[key]
                            const alt = key === 'price'
                                ? (product as any).price
                                : product.parameters[key]
                            return renderComparisonRow(key, orig, alt)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div className="">
            {results.map((item) => {
                const bestMatch = item.matchedAlternatives[0]
                const alternatives = item.matchedAlternatives.slice(1)

                return (
                    <section key={item.index} className="border-t-2 border-primary border-dashed not-last:mb-4">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-3 my-4">
                                <div className="px-3 py-1.5 rounded-lg border border-primary/50">
                                    <span className="text-sm font-bold text-white">
                                        Позиция №{item.index}
                                    </span>
                                </div>
                                {bestMatch.confidence !== undefined && (
                                    <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-on-dark/80">
                                                Уверенность:
                                            </span>
                                        <ConfidenceBadge confidence={bestMatch.confidence} />
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={() => onEdit(item)}
                                variant="transparent"
                                icon={(
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                )}
                                className="ml-auto"
                            >
                                Редактировать
                            </Button>
                        </div>
                        <div className="mb-4">
                            {renderComparisonTable(item, bestMatch.product, bestMatch.confidence, false)}
                        </div>

                        {alternatives.length > 0 && (
                            <div>
                                <Button
                                    onClick={() => toggleItem(item.index)}
                                    variant="rectangular"
                                    className="w-full justify-center"
                                    icon={(
                                        <svg
                                            className={`w-4 h-4 transition-transform ${expandedItems.has(item.index) ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                                        </svg>
                                    )}
                                >
                                    {expandedItems.has(item.index)
                                        ? 'Скрыть альтернативы'
                                        : `Показать ${alternatives.length} альтернатив${alternatives.length > 1 ? 'ы' : 'у'}`}
                                </Button>

                                <ExpandableContent open={expandedItems.has(item.index)}>
                                    <div className="space-y-6 mb-4">
                                        {alternatives.map((alt, idx) => (
                                            <div key={idx} className="bg-surface-dark/50 rounded-xl">
                                                <div className="flex items-start justify-between gap-4 mb-4">
                                                    <div className="flex-1">
                                                        <h5 className="font-semibold text-white my-2">
                                                            Альтернатива {idx + 1}
                                                        </h5>
                                                        <p className="text-on-dark/70 text-sm">
                                                            {alt.product.name}
                                                        </p>
                                                        {alt.confidence !== undefined && (
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <span className="text-sm text-on-dark/70">Уверенность:</span>
                                                                <ConfidenceBadge confidence={alt.confidence} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Button
                                                        onClick={() => onUpdateBestMatch(item.index, alt.product)}
                                                        variant="rectangular"
                                                        className="shrink-0 mt-auto"
                                                        icon={(
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor"
                                                                 viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        )}
                                                    >
                                                        Выбрать лучшим
                                                    </Button>
                                                </div>
                                                {renderComparisonTable(item, alt.product, alt.confidence, true)}
                                            </div>
                                        ))}
                                    </div>
                                </ExpandableContent>
                            </div>
                        )}
                    </section>
                )
            })}
        </div>
    )
}