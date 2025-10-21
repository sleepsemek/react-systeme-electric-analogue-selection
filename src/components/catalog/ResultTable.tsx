import React, { useState } from 'react';
import type { MatchResult, Product } from '../../App.tsx';

interface ResultTableProps {
    results: MatchResult[];
    onEdit: (item: MatchResult) => void;
    onUpdateBestMatch: (requestId: string, product: Product) => void;
}

export const ResultTable: React.FC<ResultTableProps> = ({
                                                            results,
                                                            onEdit,
                                                            onUpdateBestMatch
                                                        }) => {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const toggleRow = (requestId: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(requestId)) {
            newExpanded.delete(requestId);
        } else {
            newExpanded.add(requestId);
        }
        setExpandedRows(newExpanded);
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.9) return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
        if (confidence >= 0.7) return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
        return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    };

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-y border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Запрос
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Наименование
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Лучший аналог
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Совпадение
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Действия
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {results.map((item) => (
                        <React.Fragment key={item.requestId}>
                            <tr className="hover:bg-blue-50/30 transition-colors duration-150 group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-gray-900">#{item.requestId}</div>
                                </td>

                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.originalProduct.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {Object.entries(item.originalProduct.parameters).map(([key, value]) =>
                                                `${key}: ${value}`
                                            ).join(', ')}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.bestMatch.name}</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-xs text-gray-500">{item.bestMatch.manufacturer}</span>
                                            <span className="mx-2 text-gray-300">•</span>
                                            <span className="text-xs text-gray-500">
                                                    {Object.entries(item.bestMatch.parameters).map(([key, value]) =>
                                                        `${key}: ${value}`
                                                    ).join(', ')}
                                                </span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col gap-2">
                                            <span className={`inline-flex w-20 justify-center px-2.5 py-1.5 text-xs font-semibold rounded-full ${getConfidenceColor(item.confidence)}`}>
                                                {(item.confidence * 100).toFixed(1)}%
                                            </span>
                                        {item.differences.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {item.differences.slice(0, 2).map((diff, index) => (
                                                    <span key={index} className="inline-block px-2 py-1 text-xs bg-amber-50 text-amber-700 rounded border border-amber-200">
                                                            {diff}
                                                        </span>
                                                ))}
                                                {item.differences.length > 2 && (
                                                    <span className="inline-block px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded border border-gray-200">
                                                            +{item.differences.length - 2}
                                                        </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => toggleRow(item.requestId)}
                                            className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center gap-1"
                                        >
                                            <svg className={`w-4 h-4 transition-transform ${expandedRows.has(item.requestId) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                            {expandedRows.has(item.requestId) ? 'Скрыть' : 'Подробнее'}
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {expandedRows.has(item.requestId) && (
                                <tr className="bg-gray-50/50">
                                    <td colSpan={6} className="px-6 py-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-gray-900 text-sm">Альтернативные варианты</h4>
                                                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                                                        {item.alternatives.length} вариантов
                                                    </span>
                                            </div>

                                            <div className="grid gap-3">
                                                {item.alternatives.map((alternative, index) => (
                                                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <p className="font-medium text-gray-900">{alternative.name}</p>
                                                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                                                        {alternative.manufacturer}
                                                                    </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600">
                                                                {Object.entries(alternative.parameters).map(([key, value]) =>
                                                                    `${key}: ${value}`
                                                                ).join(', ')}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => onUpdateBestMatch(item.requestId, alternative)}
                                                            className="ml-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
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
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};