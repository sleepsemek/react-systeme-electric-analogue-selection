import React from 'react';

interface FiltersPanelProps {
    filters: {
        manufacturer: string;
        confidence: number;
        search: string;
    };
    onFiltersChange: (filters: unknown) => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, onFiltersChange }) => {
    return (
        <div className="p-6">
            <div className="flex flex-wrap gap-6 items-stretch">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Производитель
                    </label>
                    <select
                        value={filters.manufacturer}
                        onChange={(e) => onFiltersChange({ ...filters, manufacturer: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                        <option value="">Все производители</option>
                        <option value="Systeme Electric">Systeme Electric</option>
                        <option value="ABB">ABB</option>
                        <option value="Schneider Electric">Schneider Electric</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[250px] flex flex-col">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Совпадение: {(filters.confidence * 100).toFixed(0)}%
                    </label>
                    <div className="flex-1 flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={filters.confidence}
                            onChange={(e) => onFiltersChange({ ...filters, confidence: parseFloat(e.target.value) })}
                            className="w-full bg-blue-100 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                        />
                    </div>
                </div>

                <div className="flex-1 min-w-[300px]">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Поиск
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                            placeholder="Поиск по наименованию..."
                            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};