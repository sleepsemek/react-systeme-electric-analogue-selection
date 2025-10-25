import { useState } from 'react';
import { UploadPanel } from './components/panels/UploadPanel.tsx';
import { ResultPanel } from './components/panels/ResultPanel.tsx';
import { NotificationPanel } from './components/panels/NotificationPanel.tsx';
import { EditModal } from './components/modals/EditModal.tsx';
import Header from "./components/Header.tsx";

export type Product = {
    id: string
    name: string
    manufacturer: string
    parameters: Record<string, string | number>
}

export type MatchResult = {
    tableRow: string
    originalProduct: Product
    bestMatch: Product
    confidence: number
    differences: string[]
    status: 'success' | 'warning' | 'error'
    alternatives: Product[]
}

export default function App() {
    const [results, setResults] = useState<MatchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [editingItem, setEditingItem] = useState<MatchResult | null>(null)
    const [notifications, setNotifications] = useState<string[]>([])

    const handleFileUpload = async (file: File) => {
        setLoading(true)
        addNotification('Начата обработка файла')

        setTimeout(() => {
            const mockResults: MatchResult[] = [
                {
                    tableRow: '1',
                    originalProduct: {
                        id: 'CB-16A-001',
                        name: 'Автоматический выключатель 16А 1P',
                        manufacturer: 'Competitor A',
                        parameters: {
                            current: '16A',
                            voltage: '400V',
                            poles: '1P',
                            breakingCapacity: '6kA'
                        }
                    },
                    bestMatch: {
                        id: 'SYS-CB-16A-1P',
                        name: 'Автоматический выключатель S-16A/1P',
                        manufacturer: 'Systeme Electric',
                        parameters: {
                            current: '16A',
                            voltage: '415V',
                            poles: '1P',
                            breakingCapacity: '6kA'
                        }
                    },
                    confidence: 0.74,
                    differences: ['Напряжение: 400V → 415V', 'Тип корпуса: модульный → стандартный'],
                    status: 'success',
                    alternatives: [
                        {
                            id: 'SYS-CB-16A-1P-M',
                            name: 'Автоматический выключатель S-16A/1P модульный',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '400V',
                                poles: '1P',
                                breakingCapacity: '6kA'
                            }
                        },
                        {
                            id: 'SYS-CB-16A-1P-PRO',
                            name: 'Автоматический выключатель S-16A/1P Professional',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '440V',
                                poles: '1P',
                                breakingCapacity: '10kA'
                            }
                        },
                        {
                            id: 'SYS-CB-16A-1P-LITE',
                            name: 'Автоматический выключатель S-16A/1P Lite',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '380V',
                                poles: '1P',
                                breakingCapacity: '4.5kA'
                            }
                        }
                    ]
                },
                {
                    tableRow: '2',
                    originalProduct: {
                        id: 'CB-32A-003',
                        name: 'Трехполюсный автомат 32А',
                        manufacturer: 'Competitor B',
                        parameters: {
                            current: '32A',
                            voltage: '690V',
                            poles: '3P',
                            characteristic: 'C'
                        }
                    },
                    bestMatch: {
                        id: 'SYS-CB-32A-3P-C',
                        name: 'Автоматический выключатель S-32A/3P характеристика C',
                        manufacturer: 'Systeme Electric',
                        parameters: {
                            current: '32A',
                            voltage: '690V',
                            poles: '3P',
                            characteristic: 'C'
                        }
                    },
                    confidence: 0.92,
                    differences: ['Диапазон температур: -25°C...+40°C → -30°C...+55°C'],
                    status: 'success',
                    alternatives: [
                        {
                            id: 'SYS-CB-32A-3P-B',
                            name: 'Автоматический выключатель S-32A/3P характеристика B',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '32A',
                                voltage: '690V',
                                poles: '3P',
                                characteristic: 'B'
                            }
                        },
                        {
                            id: 'SYS-CB-32A-3P-D',
                            name: 'Автоматический выключатель S-32A/3P характеристика D',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '32A',
                                voltage: '690V',
                                poles: '3P',
                                characteristic: 'D'
                            }
                        },
                        {
                            id: 'SYS-CB-32A-3P-C-IP65',
                            name: 'Автоматический выключатель S-32A/3P IP65',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '32A',
                                voltage: '690V',
                                poles: '3P',
                                characteristic: 'C',
                                protection: 'IP65'
                            }
                        }
                    ]
                },
                {
                    tableRow: '3',
                    originalProduct: {
                        id: 'RCD-025',
                        name: 'УЗО 25А 30мА',
                        manufacturer: 'Competitor C',
                        parameters: {
                            current: '25A',
                            voltage: '230V',
                            sensitivity: '30mA',
                            poles: '2P'
                        }
                    },
                    bestMatch: {
                        id: 'SYS-RCD-25A-30mA-2P',
                        name: 'Устройство защитного отключения S-25A/30mA/2P',
                        manufacturer: 'Systeme Electric',
                        parameters: {
                            current: '25A',
                            voltage: '240V',
                            sensitivity: '30mA',
                            poles: '2P'
                        }
                    },
                    confidence: 0.88,
                    differences: ['Напряжение: 230V → 240V', 'Тип УЗО: AC → A'],
                    status: 'success',
                    alternatives: [
                        {
                            id: 'SYS-RCD-25A-30mA-2P-AC',
                            name: 'УЗО S-25A/30mA/2P тип AC',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '25A',
                                voltage: '230V',
                                sensitivity: '30mA',
                                poles: '2P',
                                type: 'AC'
                            }
                        },
                        {
                            id: 'SYS-RCD-25A-100mA-2P',
                            name: 'УЗО S-25A/100mA/2P',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '25A',
                                voltage: '240V',
                                sensitivity: '100mA',
                                poles: '2P'
                            }
                        },
                        {
                            id: 'SYS-RCD-40A-30mA-2P',
                            name: 'УЗО S-40A/30mA/2P',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '40A',
                                voltage: '240V',
                                sensitivity: '30mA',
                                poles: '2P'
                            }
                        }
                    ]
                },
                {
                    tableRow: '4',
                    originalProduct: {
                        id: 'CONT-REL-001',
                        name: 'Контактор 9А 230V',
                        manufacturer: 'Competitor D',
                        parameters: {
                            current: '9A',
                            voltage: '230V',
                            coils: '1',
                            power: '2.2kW'
                        }
                    },
                    bestMatch: {
                        id: 'SYS-CONT-9A-230V',
                        name: 'Контактор S-9A 230V AC',
                        manufacturer: 'Systeme Electric',
                        parameters: {
                            current: '9A',
                            voltage: '240V',
                            coils: '1',
                            power: '2.5kW'
                        }
                    },
                    confidence: 0.79,
                    differences: ['Напряжение: 230V → 240V', 'Мощность: 2.2kW → 2.5kW', 'Степень защиты: IP20 → IP40'],
                    status: 'success',
                    alternatives: [
                        {
                            id: 'SYS-CONT-9A-230V-IP20',
                            name: 'Контактор S-9A 230V AC IP20',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '9A',
                                voltage: '230V',
                                coils: '1',
                                power: '2.2kW',
                                protection: 'IP20'
                            }
                        },
                        {
                            id: 'SYS-CONT-12A-230V',
                            name: 'Контактор S-12A 230V AC',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '12A',
                                voltage: '240V',
                                coils: '1',
                                power: '3kW'
                            }
                        },
                        {
                            id: 'SYS-CONT-9A-24V',
                            name: 'Контактор S-9A 24V DC',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '9A',
                                voltage: '24V',
                                coils: '1',
                                power: '2.2kW'
                            }
                        },
                        {
                            id: 'SYS-CONT-9A-400V',
                            name: 'Контактор S-9A 400V AC',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '9A',
                                voltage: '400V',
                                coils: '1',
                                power: '4kW'
                            }
                        }
                    ]
                },
                {
                    tableRow: '5',
                    originalProduct: {
                        id: 'TERM-BLOCK-010',
                        name: 'Клеммная колодка 10A',
                        manufacturer: 'Competitor E',
                        parameters: {
                            current: '10A',
                            voltage: '300V',
                            section: '2.5mm²',
                            poles: '1'
                        }
                    },
                    bestMatch: {
                        id: 'SYS-TERM-10A-300V',
                        name: 'Клеммная колодка S-10A 300V',
                        manufacturer: 'Systeme Electric',
                        parameters: {
                            current: '10A',
                            voltage: '300V',
                            section: '2.5mm²',
                            poles: '1'
                        }
                    },
                    confidence: 0.95,
                    differences: ['Материал: полиамид → поликарбонат'],
                    status: 'success',
                    alternatives: [
                        {
                            id: 'SYS-TERM-10A-600V',
                            name: 'Клеммная колодка S-10A 600V',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '10A',
                                voltage: '600V',
                                section: '2.5mm²',
                                poles: '1'
                            }
                        },
                        {
                            id: 'SYS-TERM-16A-300V',
                            name: 'Клеммная колодка S-16A 300V',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '300V',
                                section: '4mm²',
                                poles: '1'
                            }
                        },
                        {
                            id: 'SYS-TERM-10A-300V-2P',
                            name: 'Клеммная колодка S-10A 300V 2-полюсная',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '10A',
                                voltage: '300V',
                                section: '2.5mm²',
                                poles: '2'
                            }
                        }
                    ]
                },
                {
                    tableRow: '6',
                    originalProduct: {
                        id: 'TIMER-DIG-001',
                        name: 'Цифровой таймер 16А',
                        manufacturer: 'Competitor F',
                        parameters: {
                            current: '16A',
                            voltage: '230V',
                            programming: '24 часа',
                            accuracy: '±1 сек/день'
                        }
                    },
                    bestMatch: {
                        id: 'SYS-TIMER-16A-230V-DIG',
                        name: 'Цифровой таймер S-16A 230V',
                        manufacturer: 'Systeme Electric',
                        parameters: {
                            current: '16A',
                            voltage: '240V',
                            programming: '7 дней',
                            accuracy: '±0.5 сек/день'
                        }
                    },
                    confidence: 0.82,
                    differences: ['Напряжение: 230V → 240V', 'Программирование: 24 часа → 7 дней', 'Точность: ±1 сек/день → ±0.5 сек/день'],
                    status: 'success',
                    alternatives: [
                        {
                            id: 'SYS-TIMER-16A-230V-ANALOG',
                            name: 'Аналоговый таймер S-16A 230V',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '230V',
                                programming: '24 часа',
                                accuracy: '±2 сек/день'
                            }
                        },
                        {
                            id: 'SYS-TIMER-10A-230V-DIG',
                            name: 'Цифровой таймер S-10A 230V',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '10A',
                                voltage: '230V',
                                programming: '7 дней',
                                accuracy: '±0.5 сек/день'
                            }
                        },
                        {
                            id: 'SYS-TIMER-16A-24V-DIG',
                            name: 'Цифровой таймер S-16A 24V DC',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '24V',
                                programming: '7 дней',
                                accuracy: '±0.5 сек/день'
                            }
                        }
                    ]
                },
                {
                    tableRow: '7',
                    originalProduct: {
                        id: 'SOCKET-IP44-016',
                        name: 'Розетка 16А IP44',
                        manufacturer: 'Competitor G',
                        parameters: {
                            current: '16A',
                            voltage: '250V',
                            protection: 'IP44',
                            type: 'Schuko'
                        }
                    },
                    bestMatch: {
                        id: 'SYS-SOCK-16A-IP44',
                        name: 'Розетка влагозащищенная S-16A IP44',
                        manufacturer: 'Systeme Electric',
                        parameters: {
                            current: '16A',
                            voltage: '250V',
                            protection: 'IP44',
                            type: 'Schuko'
                        }
                    },
                    confidence: 0.96,
                    differences: ['Материал крышки: ABS → поликарбонат'],
                    status: 'success',
                    alternatives: [
                        {
                            id: 'SYS-SOCK-16A-IP55',
                            name: 'Розетка влагозащищенная S-16A IP55',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '250V',
                                protection: 'IP55',
                                type: 'Schuko'
                            }
                        },
                        {
                            id: 'SYS-SOCK-16A-IP44-USB',
                            name: 'Розетка S-16A IP44 с USB',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '250V',
                                protection: 'IP44',
                                type: 'Schuko+USB'
                            }
                        },
                        {
                            id: 'SYS-SOCK-32A-IP44',
                            name: 'Розетка влагозащищенная S-32A IP44',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '32A',
                                voltage: '250V',
                                protection: 'IP44',
                                type: 'Industrial'
                            }
                        }
                    ]
                },
                {
                    tableRow: '8',
                    originalProduct: {
                        id: 'PUSH-BUTTON-002',
                        name: 'Кнопка пуска 10А',
                        manufacturer: 'Competitor H',
                        parameters: {
                            current: '10A',
                            voltage: '600V',
                            color: 'черный',
                            illumination: 'нет'
                        }
                    },
                    bestMatch: {
                        id: 'SYS-PB-10A-600V-GREEN',
                        name: 'Кнопка управления S-10A 600V зеленая',
                        manufacturer: 'Systeme Electric',
                        parameters: {
                            current: '10A',
                            voltage: '600V',
                            color: 'зеленый',
                            illumination: 'есть'
                        }
                    },
                    confidence: 0.71,
                    differences: ['Цвет: черный → зеленый', 'Подсветка: нет → есть', 'Степень защиты: IP54 → IP65'],
                    status: 'success',
                    alternatives: [
                        {
                            id: 'SYS-PB-10A-600V-RED',
                            name: 'Кнопка управления S-10A 600V красная',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '10A',
                                voltage: '600V',
                                color: 'красный',
                                illumination: 'есть'
                            }
                        },
                        {
                            id: 'SYS-PB-10A-600V-BLACK',
                            name: 'Кнопка управления S-10A 600V черная',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '10A',
                                voltage: '600V',
                                color: 'черный',
                                illumination: 'нет'
                            }
                        },
                        {
                            id: 'SYS-PB-16A-600V-GREEN',
                            name: 'Кнопка управления S-16A 600V зеленая',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '16A',
                                voltage: '600V',
                                color: 'зеленый',
                                illumination: 'есть'
                            }
                        },
                        {
                            id: 'SYS-PB-10A-230V-GREEN',
                            name: 'Кнопка управления S-10A 230V зеленая',
                            manufacturer: 'Systeme Electric',
                            parameters: {
                                current: '10A',
                                voltage: '230V',
                                color: 'зеленый',
                                illumination: 'есть'
                            }
                        }
                    ]
                }
            ]

            setResults(mockResults)
            setLoading(false)
            addNotification('Подбор аналогов завершен')
        }, 2000)
    }

    const addNotification = (message: string) => {
        setNotifications(prev => [...prev, message])
        setTimeout(() => {
            setNotifications(prev => prev.filter(msg => msg !== message))
        }, 5000)
    }

    const updateBestMatch = (requestId: string, newBestMatch: Product) => {
        setResults(prev => prev.map(item =>
            item.tableRow === requestId
                ? { ...item, bestMatch: newBestMatch }
                : item
        ))
        addNotification('Лучший аналог обновлен')
    }

    return (
        <div className="min-h-screen bg-dark text-white p-6">
            <div className="max-w-7xl mx-auto">
                <Header />
                <UploadPanel onFileUpload={handleFileUpload} />

                {loading && (
                    <div className="mb-8">
                        <div className="bg-dark-container rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Обработка данных...</span>
                                <span className="font-medium">50%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full w-1/2"></div>
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
                                item.tableRow === updatedItem.tableRow ? updatedItem : item
                            ))
                            setEditingItem(null)
                            addNotification('Изменения сохранены')
                        }}
                    />
                )}
            </div>
        </div>
    );
}