import React, { useState } from 'react';
import { ResultTable } from '../catalog/ResultTable.tsx';
import { FiltersPanel } from './FiltersPanel.tsx';
import { ExportPanel } from './ExportPanel.tsx';
import type {MatchResult, Product} from "../../App.tsx";

interface ResultPanelProps {
    results: MatchResult[];
    onEdit: (item: MatchResult) => void;
    onUpdateBestMatch: (requestId: string, product: Product) => void;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
                                                            results,
                                                            onEdit,
                                                            onUpdateBestMatch
                                                        }) => {
    const [filters, setFilters] = useState({
        manufacturer: '',
        confidence: 0,
        search: ''
    });

    const filteredResults = results.filter(item => {
        return (
            (filters.manufacturer === '' ||
                item.bestMatch.manufacturer.includes(filters.manufacturer)) &&
            item.confidence >= filters.confidence &&
            (filters.search === '' ||
                item.originalProduct.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                item.bestMatch.name.toLowerCase().includes(filters.search.toLowerCase()))
        );
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Результаты подбора</h2>
                <p className="text-gray-500 text-sm mt-1">Найдено {filteredResults.length} вариантов</p>
            </div>

            <FiltersPanel filters={filters} onFiltersChange={setFilters} />

            <ResultTable
                results={filteredResults}
                onEdit={onEdit}
                onUpdateBestMatch={onUpdateBestMatch}
            />

            <ExportPanel results={filteredResults} />
        </div>
    );
};