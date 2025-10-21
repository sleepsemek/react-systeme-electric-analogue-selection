import React from 'react';
import type { MatchResult } from '../../App.tsx';

interface ExportPanelProps {
    results: MatchResult[];
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ results }) => {
    const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
        console.log(`Exporting ${results.length} items as ${format}`);
    };

    const exportButtons = [
        { format: 'csv' as const, label: 'CSV', color: 'from-green-500 to-green-600', icon: '📊' },
        { format: 'excel' as const, label: 'Excel', color: 'from-blue-500 to-blue-600', icon: '📈' },
        { format: 'pdf' as const, label: 'PDF', color: 'from-red-500 to-red-600', icon: '📄' }
    ];

    return (
        <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">{results.length} результатов</p>
                        <p className="text-xs text-gray-500">Готовы к экспорту</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {exportButtons.map(({ format, label, color, icon }) => (
                        <button
                            key={format}
                            onClick={() => handleExport(format)}
                            className={`bg-gradient-to-r ${color} text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2`}
                        >
                            <span>{icon}</span>
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};