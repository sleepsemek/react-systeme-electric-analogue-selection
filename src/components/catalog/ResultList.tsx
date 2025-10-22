import { useState } from 'react';
import type { MatchResult, Product } from '../../App.tsx';

interface ResultListProps {
    results: MatchResult[];
    onEdit: (item: MatchResult) => void;
    onUpdateBestMatch: (requestId: string, product: Product) => void;
}

export function ResultList(
    {
        results,
        onEdit,
        onUpdateBestMatch
    }: ResultListProps
){
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleItem = (requestId: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(requestId)) {
            newExpanded.delete(requestId);
        } else {
            newExpanded.add(requestId);
        }
        setExpandedItems(newExpanded);
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.9) return 'bg-primary/20 text-primary border border-primary/30';
        if (confidence >= 0.7) return 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30';
        return 'bg-error/20 text-error border border-error/30';
    };

    const getConfidenceText = (confidence: number) => {
        if (confidence >= 0.9) return 'Высокая';
        if (confidence >= 0.7) return 'Средняя';
        return 'Низкая';
    };

    return (
        <div>
            {results.map((item) => (
                <div
                    key={item.tableRow}
                    className="bg-dark-container border-t border-on-dark/50 overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-secondary-container px-3 py-1 rounded-lg border border-gray-700">
                                            <span className="text-sm font-medium text-on-dark">
                                                Строка #{item.tableRow}
                                            </span>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getConfidenceColor(item.confidence)}`}>
                                            {getConfidenceText(item.confidence)} • {(item.confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-primary hover:text-primary-darker text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary-container transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => toggleItem(item.tableRow)}
                                            className="text-on-dark hover:text-white text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary-container transition-colors"
                                        >
                                            <svg className={`w-4 h-4 transition-transform ${expandedItems.has(item.tableRow) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                            {expandedItems.has(item.tableRow) ? 'Скрыть' : 'Подробнее'}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-on-dark uppercase tracking-wide">
                                            Исходный продукт
                                        </h4>
                                        <div className="bg-secondary-container rounded-lg p-4">
                                            <p className="font-medium text-white mb-2">{item.originalProduct.name}</p>
                                            <div className="space-y-1">
                                                {Object.entries(item.originalProduct.parameters).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between text-sm">
                                                        <span className="text-on-dark/50">{key}:</span>
                                                        <span className="text-on-dark font-medium">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-on-dark uppercase tracking-wide">
                                            Лучший аналог
                                        </h4>
                                        <div className="bg-secondary-container rounded-lg p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <p className="font-medium text-white">{item.bestMatch.name}</p>
                                                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                                                    {item.bestMatch.manufacturer}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                {Object.entries(item.bestMatch.parameters).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between text-sm">
                                                        <span className="text-on-dark/50">{key}:</span>
                                                        <span className="text-on-dark font-medium">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {item.differences.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-on-dark uppercase tracking-wide">
                                            Основные различия
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.differences.map((diff, index) => (
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
                            </div>
                        </div>
                    </div>

                    {expandedItems.has(item.tableRow) && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-semibold text-white text-lg">Альтернативные варианты</h4>
                                <span className="text-sm text-on-dark/50 bg-dark-container px-3 py-1 rounded-full">
                                    {item.alternatives.length} вариантов
                                </span>
                            </div>

                            <div className="space-y-4">
                                {item.alternatives.map((alternative, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-secondary-container rounded-lg"
                                    >
                                        <div className="flex-1 mb-4 lg:mb-0 lg:mr-6">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                                <p className="font-medium text-white">{alternative.name}</p>
                                                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                                                    {alternative.manufacturer}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                                {Object.entries(alternative.parameters).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between text-sm">
                                                        <span className="text-on-dark/50">{key}:</span>
                                                        <span className="text-on-dark font-medium">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onUpdateBestMatch(item.tableRow, alternative)}
                                            className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Выбрать лучшим
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};