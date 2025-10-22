import React, { useState } from 'react';
import { ResultList } from '../catalog/ResultList.tsx';
import { FiltersPanel } from './FiltersPanel.tsx';
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
        <div className="bg-dark-container text-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Результаты подбора</h2>
                    <p className="text-on-dark text-sm mt-2">Найдено {filteredResults.length} вариантов</p>
                </div>
                <button className="btn-primary" type="button">Загрузить XLSX</button>
            </div>

            <FiltersPanel filters={filters} onFiltersChange={setFilters} />

            <ResultList
                results={filteredResults}
                onEdit={onEdit}
                onUpdateBestMatch={onUpdateBestMatch}
            />
        </div>
    );
};