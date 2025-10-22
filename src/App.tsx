import { useState } from 'react';
import { UploadPanel } from './components/panels/UploadPanel.tsx';
import { ResultPanel } from './components/panels/ResultPanel.tsx';
import { NotificationPanel } from './components/panels/NotificationPanel.tsx';
import { EditModal } from './components/modals/EditModal.tsx';
import Header from "./components/Header.tsx";

export interface Product {
    id: string;
    name: string;
    manufacturer: string;
    parameters: Record<string, string | number>;
}

export interface MatchResult {
    tableRow: string;
    originalProduct: Product;
    bestMatch: Product;
    confidence: number;
    differences: string[];
    status: 'success' | 'warning' | 'error';
    alternatives: Product[];
}

export default function App() {
    const [results, setResults] = useState<MatchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState<MatchResult | null>(null);
    const [notifications, setNotifications] = useState<string[]>([]);

    const handleFileUpload = async (file: File) => {
        setLoading(true);
        addNotification('Начата обработка файла');

        setTimeout(() => {
            const mockResults: MatchResult[] = [
                {
                    tableRow: '1',
                    originalProduct: {
                        id: '1',
                        name: 'Автоматический выключатель 16А',
                        manufacturer: 'Competitor A',
                        parameters: { current: '16A', voltage: '400V' }
                    },
                    bestMatch: {
                        id: 'SYS-001',
                        name: 'Автоматический выключатель S-16A',
                        manufacturer: 'Systeme Electric',
                        parameters: { current: '16A', voltage: '415V' }
                    },
                    confidence: 0.74,
                    differences: ['Напряжение: 390V → 415V'],
                    status: 'success',
                    alternatives: [
                        {
                            id: '1',
                            name: 'Автоматический выключатель 16А',
                            manufacturer: 'Competitor A',
                            parameters: { current: '16A', voltage: '400V' }
                        },
                        {
                            id: '1',
                            name: 'Автоматический выключатель 16А',
                            manufacturer: 'Competitor A',
                            parameters: { current: '16A', voltage: '400V' }
                        },
                    ]
                },
                {
                    tableRow: '2',
                    originalProduct: {
                        id: '1',
                        name: 'Автоматический выключатель 16А',
                        manufacturer: 'Competitor A',
                        parameters: { current: '16A', voltage: '400V' }
                    },
                    bestMatch: {
                        id: 'SYS-001',
                        name: 'Автоматический выключатель S-16A',
                        manufacturer: 'Systeme Electric',
                        parameters: { current: '16A', voltage: '415V' }
                    },
                    confidence: 0.92,
                    differences: ['Напряжение: 400V → 415V'],
                    status: 'success',
                    alternatives: [
                        {
                            id: '1',
                            name: 'Автоматический выключатель 16А',
                            manufacturer: 'Competitor A',
                            parameters: { current: '16A', voltage: '400V' }
                        },
                        {
                            id: '1',
                            name: 'Автоматический выключатель 16А',
                            manufacturer: 'Competitor A',
                            parameters: { current: '16A', voltage: '400V' }
                        },
                    ]
                },
                {
                    tableRow: '3',
                    originalProduct: {
                        id: '1',
                        name: 'Автоматический выключатель 16А',
                        manufacturer: 'Competitor A',
                        parameters: { current: '16A', voltage: '400V' }
                    },
                    bestMatch: {
                        id: 'SYS-001',
                        name: 'Автоматический выключатель S-16A',
                        manufacturer: 'Systeme Electric',
                        parameters: { current: '16A', voltage: '415V' }
                    },
                    confidence: 0.92,
                    differences: ['Напряжение: 400V → 415V'],
                    status: 'success',
                    alternatives: []
                }
            ];

            setResults(mockResults);
            setLoading(false);
            addNotification('Подбор аналогов завершен');
        }, 2000);
    };

    const addNotification = (message: string) => {
        setNotifications(prev => [...prev, message]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(msg => msg !== message));
        }, 5000);
    };

    const updateBestMatch = (requestId: string, newBestMatch: Product) => {
        setResults(prev => prev.map(item =>
            item.tableRow === requestId
                ? { ...item, bestMatch: newBestMatch }
                : item
        ));
        addNotification('Лучший аналог обновлен');
    };

    return (
        <div className="min-h-screen bg-dark text-white p-6">
            <div className="max-w-7xl mx-auto">
                <Header />
                <UploadPanel onFileUpload={handleFileUpload} />

                {loading && (
                    <div className="mt-8">
                        <div className="bg-dark-container rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Обработка данных...</span>
                                <span className="text-sm font-medium">50%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full w-1/2"></div>
                            </div>
                        </div>
                    </div>
                )}

                {results.length > 0 && (
                    <ResultPanel
                        results={results}
                        onEdit={setEditingItem}
                        onUpdateBestMatch={updateBestMatch}
                    />
                )}

                <NotificationPanel messages={notifications} />

                {editingItem && (
                    <EditModal
                        item={editingItem}
                        onClose={() => setEditingItem(null)}
                        onSave={(updatedItem) => {
                            setResults(prev => prev.map(item =>
                                item.tableRow === updatedItem.requestId ? updatedItem : item
                            ));
                            setEditingItem(null);
                            addNotification('Изменения сохранены');
                        }}
                    />
                )}
            </div>
        </div>
    );
}