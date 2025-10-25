import type { MatchResult } from '../domain/models'

export const mockResults: MatchResult[] = [
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
        matchedAlternatives: [
            {
                product: {
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
                differences: [
                    'Напряжение: 400V → 415V',
                    'Тип корпуса: модульный → стандартный'
                ]
            },
            {
                product: {
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
                confidence: 0.62,
                differences: ['Совпадение параметров: 3 из 4']
            },
            {
                product: {
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
                confidence: 0.55,
                differences: [
                    'Напряжение: 400V → 440V',
                    'Отключающая способность: 6kA → 10kA'
                ]
            },
            {
                product: {
                    id: 'SYS-CB-16A-1P-LITE',
                    name: 'Автоматический выключатель S-16A/1P Lite',
                    manufacturer: 'Systeme Electric',
                    parameters: {
                        current: '16A',
                        voltage: '380V',
                        poles: '1P',
                        breakingCapacity: '4.5kA'
                    }
                },
                confidence: 0.48,
                differences: [
                    'Напряжение: 400V → 380V',
                    'Отключающая способность: 6kA → 4.5kA'
                ]
            }
        ],
        status: 'success'
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
        matchedAlternatives: [
            {
                product: {
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
                differences: [
                    'Диапазон температур: -25°C...+40°C → -30°C...+55°C'
                ]
            },
            {
                product: {
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
                confidence: 0.67,
                differences: ['Характеристика тока: C → B']
            },
            {
                product: {
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
                confidence: 0.64,
                differences: ['Характеристика тока: C → D']
            },
            {
                product: {
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
                },
                confidence: 0.61,
                differences: ['Добавлена защита IP65']
            }
        ],
        status: 'success'
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
        matchedAlternatives: [
            {
                product: {
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
                differences: [
                    'Напряжение: 230V → 240V',
                    'Тип УЗО: AC → A'
                ]
            },
            {
                product: {
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
                confidence: 0.73,
                differences: ['Тип УЗО: AC совпадает']
            },
            {
                product: {
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
                confidence: 0.58,
                differences: ['Чувствительность: 30мА → 100мА']
            }
        ],
        status: 'success'
    }
]

export const mockApi = {
    processFile: async (file: File): Promise<MatchResult[]> => {
        await new Promise(res => setTimeout(res, 1500))
        return mockResults
    },
}
