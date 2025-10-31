import {useState} from 'react'
import {UploadPanel} from './components/panels/UploadPanel.tsx'
import {ResultPanel} from './components/panels/ResultPanel.tsx'
import {NotificationPanel} from './components/panels/NotificationPanel.tsx'
import {EditModal} from './components/modals/EditModal.tsx'
import Header from "./components/Header.tsx"
import type {MatchResult, Product} from "./domain/models.ts"
import {processFile} from "./domain/usecases/processFile.ts"
import * as XLSX from 'xlsx'
import Section from "./components/Section.tsx";

export default function App() {
    const [results, setResults] = useState<MatchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [editingItem, setEditingItem] = useState<MatchResult | null>(null)
    const [notifications, setNotifications] = useState<string[]>([])
    const [progress, setProgress] = useState(0)

    const handleFileUpload = async (file: File) => {
        setLoading(true)
        addNotification('Начата обработка файла')

        const updateProgress = (p: number) => {
            setProgress(p)
        }

        try {
            const results = await processFile(file, updateProgress)
            setResults(results)
            addNotification('Подбор аналогов завершен')
        } catch (e) {
            addNotification('Ошибка обработки файла ' + e)
        } finally {
            setLoading(false)
        }
    }

    const addNotification = (message: string) => {
        setNotifications(prev => [...prev, message])
        setTimeout(() => {
            setNotifications(prev => prev.filter(msg => msg !== message))
        }, 5000)
    }

    const handleUpdateBestMatch = (requestId: string, product: Product) => {
        setResults(prev => prev.map(item => {
            if (item.index !== requestId) return item

            const idx = item.matchedAlternatives.findIndex(alt => alt.product.id === product.id)
            if (idx === -1) return item

            const newAlternatives = [...item.matchedAlternatives]
            const [selected] = newAlternatives.splice(idx, 1)
            newAlternatives.unshift(selected)

            return {
                ...item,
                matchedAlternatives: newAlternatives
            }
        }))

        addNotification('Лучший аналог обновлен')
    }

    const handleClear = () => {
        setResults([])
        setProgress(0)
    }

    const handleDownload = () => {
        const data = results.map(item => {
            const match = item.matchedAlternatives[0]

            const combinedParams = Object.keys({...item.originalProduct.parameters, ...(match?.product.parameters ?? {})})
                .reduce((acc, key) => {
                    const orig = item.originalProduct.parameters[key]
                    const alt = match?.product.parameters?.[key]
                    acc[key] = alt !== undefined && orig !== alt ? `${orig} → ${alt}` : orig
                    return acc
                }, {} as Record<string, string | number>);

            return {
                '№': item.index,
                'Исходный ID': item.originalProduct.id,
                'Исходный название': item.originalProduct.name,
                'Исходный производитель': item.originalProduct.manufacturer,
                'Аналог ID': match?.product.id ?? '',
                'Аналог название': match?.product.name ?? '',
                'Аналог производитель': match?.product.manufacturer ?? '',
                ...combinedParams
            }
        })

        const worksheet = XLSX.utils.json_to_sheet(data)

        worksheet['!cols'] = Object.keys(data[0] ?? {}).map(key => ({
            wch: Math.max(
                key.length,
                ...data.map(row => String(row[key] ?? '').length)
            ) + 2
        }))

        const headers = [Object.keys(data[0] ?? {})]
        XLSX.utils.sheet_add_aoa(worksheet, headers, { origin: 'A1' })

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Номенклатура')

        XLSX.writeFile(workbook, 'Подобранная_номенклатура_Систэм_Электрик.xlsx')
    }

    return (
        <div className="min-h-screen bg-dark text-white p-3 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <Header />
                <UploadPanel onFileUpload={handleFileUpload} onClearClick={handleClear} />

                {loading && (
                    <Section>
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Обработка данных...</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                    </Section>
                )}

                {results.length > 0 && (
                    <ResultPanel
                        results={results}
                        onUpdateBestMatch={handleUpdateBestMatch}
                        onDownloadClick={handleDownload}
                    />
                )}

                <NotificationPanel messages={notifications} />

                {editingItem && (
                    <EditModal
                        item={editingItem}
                        onClose={() => setEditingItem(null)}
                        onSave={(updatedItem) => {
                            setResults(prev => prev.map(item =>
                                item.index === updatedItem.index ? updatedItem : item
                            ))
                            setEditingItem(null)
                            addNotification('Изменения сохранены')
                        }}
                    />
                )}
            </div>
        </div>
    )
}