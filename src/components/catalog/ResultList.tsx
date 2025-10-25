import {useState} from 'react'
import ExpandableContent from "../ExpandableContent.tsx"
import Badge from "../Badge.tsx"
import Button from "../Button.tsx"
import type {MatchResult, Product} from "../../Models.ts"

type ResultListProps = {
    results: MatchResult[]
    onEdit: (item: MatchResult) => void
    onUpdateBestMatch: (requestId: string, product: Product) => void
}

export function ResultList({
                               results,
                               onEdit,
                               onUpdateBestMatch
                           }: ResultListProps) {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

    const toggleItem = (requestId: string) => {
        const newExpanded = new Set(expandedItems)
        if (newExpanded.has(requestId)) {
            newExpanded.delete(requestId)
        } else {
            newExpanded.add(requestId)
        }
        setExpandedItems(newExpanded)
    }

    const getConfidenceColor = (confidence?: number) => {
        if (confidence == null) return 'bg-gray-700 text-gray-300 border border-gray-600'
        if (confidence >= 0.9) return 'bg-primary/20 text-primary border border-primary/30'
        if (confidence >= 0.7) return 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
        return 'bg-error/20 text-error border border-error/30'
    }

    const getConfidenceText = (confidence?: number) => {
        if (confidence == null) return '—'
        if (confidence >= 0.9) return 'Высокая'
        if (confidence >= 0.7) return 'Средняя'
        return 'Низкая'
    }

    return (
        <div>
            {results.map((item) => {
                const bestMatch = item.matchedAlternatives[0]
                const alternatives = item.matchedAlternatives.slice(1)

                return (
                    <div
                        key={item.tableRow}
                        className="border-dashed border-t-2 last:pb-0 border-primary overflow-hidden py-6"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className="bg-secondary-container px-3 py-1 rounded-lg border border-gray-700">
                                        <span className="text-sm font-medium text-white">
                                            №{item.tableRow}
                                        </span>
                                    </div>

                                    {bestMatch.confidence !== undefined && (
                                        <div className="flex items-center gap-3 shrink-0">
                                            <div className="text-sm font-medium text-white">
                                                Уверенность:
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${getConfidenceColor(bestMatch.confidence)}`}
                                            >
                                                {getConfidenceText(bestMatch.confidence)} • {(bestMatch.confidence * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    )}

                                    <Button
                                        onClick={() => onEdit(item)}
                                        variant="transparent"
                                        icon={(
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                        )}
                                        className="md:ml-auto"
                                    >
                                        Редактировать
                                    </Button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-y-3">
                                        <h4 className="text-sm font-semibold text-on-dark uppercase">
                                            Исходная позиция
                                        </h4>
                                        <div className="bg-secondary-container rounded-lg p-4 flex flex-col h-full">
                                            <p className="font-medium text-white mb-2 grow">
                                                {item.originalProduct.name}
                                            </p>
                                            <div className="space-y-1">
                                                {Object.entries(item.originalProduct.parameters).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between text-sm">
                                                        <span className="text-on-dark">{key}:</span>
                                                        <span className="text-on-dark font-medium">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {bestMatch && (
                                        <div className="flex flex-col gap-y-3">
                                            <h4 className="text-sm font-semibold text-on-dark uppercase">
                                                Лучший аналог
                                            </h4>
                                            <div className="bg-secondary-container rounded-lg p-4 flex flex-col h-full">
                                                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                                                    <p className="font-medium text-white">
                                                        {bestMatch.product.name}
                                                    </p>
                                                    <Badge>{bestMatch.product.manufacturer}</Badge>
                                                </div>
                                                <div className="space-y-1">
                                                    {Object.entries(bestMatch.product.parameters).map(([key, value]) => (
                                                        <div key={key} className="flex justify-between text-sm">
                                                            <span className="text-on-dark">{key}:</span>
                                                            <span className="text-on-dark font-medium">{value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {bestMatch.differences && bestMatch.differences.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-on-dark uppercase tracking-wide">
                                            Основные различия
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {bestMatch.differences.map((diff, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 bg-error/10 text-error text-sm rounded-lg border border-error/20"
                                                >
                                                    {diff}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {alternatives.length > 0 && (
                                    <div className="flex items-center justify-between flex-wrap gap-2 flex-row-reverse">
                                        <Button
                                            onClick={() => toggleItem(item.tableRow)}
                                            variant="rectangular"
                                            icon={(
                                                <svg
                                                    className={`w-4 h-4 transition-transform ${expandedItems.has(item.tableRow) ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            )}
                                        >
                                            {expandedItems.has(item.tableRow)
                                                ? 'Скрыть альтернативные варианты'
                                                : 'Показать альтернативные варианты'}
                                        </Button>
                                        <span className="text-sm text-on-dark">
                                            {alternatives.length} альтернативных вариантов
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <ExpandableContent open={expandedItems.has(item.tableRow)}>
                            <div className="flex items-center justify-between my-4">
                                <h4 className="font-semibold text-white text-lg">Альтернативные варианты</h4>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {alternatives.map((alt, index) => (
                                    <div className="bg-secondary-container rounded-lg p-4" key={index}>
                                        <div className="flex flex-wrap items-center justify-between mb-4 gap-x-4 gap-y-2">
                                            <p className="font-medium text-white">{alt.product.name}</p>
                                            <Button
                                                onClick={() => onUpdateBestMatch(item.tableRow, alt.product)}
                                                variant="rectangular"
                                                className="self-start w-full sm:w-auto"
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
                                        <div className="space-y-1 mb-3">
                                            {Object.entries(alt.product.parameters).map(([key, value]) => (
                                                <div key={key} className="flex justify-between text-sm">
                                                    <span className="text-on-dark">{key}:</span>
                                                    <span className="text-on-dark font-medium">{value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {alt.confidence !== undefined && (
                                            <div className="flex items-center justify-between flex-wrap gap-2">
                                                <div className="text-sm font-medium text-white">
                                                    Уверенность:
                                                </div>
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getConfidenceColor(alt.confidence)}`}>
                                                    {getConfidenceText(alt.confidence)} • {(alt.confidence * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        )}

                                        {alt.differences && alt.differences.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                <h5 className="text-sm font-medium text-white">
                                                    Различия с оригиналом
                                                </h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {alt.differences.map((diff, i) => (
                                                        <span key={i} className="px-3 py-2 bg-error/10 text-error text-sm rounded-lg border border-error/20">
                                                            {diff}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ExpandableContent>
                    </div>
                )
            })}
        </div>
    )
}