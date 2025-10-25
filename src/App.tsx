import { useState } from 'react'
import { UploadPanel } from './components/panels/UploadPanel.tsx'
import { ResultPanel } from './components/panels/ResultPanel.tsx'
import { NotificationPanel } from './components/panels/NotificationPanel.tsx'
import { EditModal } from './components/modals/EditModal.tsx'
import Header from "./components/Header.tsx"
import type { MatchResult, Product } from "./domain/models.ts"
import { processFile } from "./domain/usecases/processFile.ts"
import * as XLSX from 'xlsx'

export default function App() {
    const [results, setResults] = useState<MatchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [editingItem, setEditingItem] = useState<MatchResult | null>(null)
    const [notifications, setNotifications] = useState<string[]>([])

    const handleFileUpload = async (file: File) => {
        setLoading(true)
        addNotification('Начата обработка файла')

        try {
            const results = await processFile(file, p => console.log(`Progress: ${p}`))
            setResults(results)
            addNotification('Подбор аналогов завершен')
        } catch (e) {
            addNotification('Ошибка обработки файла')
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
            if (item.tableRow !== requestId) return item

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

    const handleDownload = () => {
        const data = results.map(item => {
            const best = item.matchedAlternatives[0]

            return {
                '№': item.tableRow,
                'Оригинальный ID': item.originalProduct.id,
                'Оригинальное название': item.originalProduct.name,
                'Оригинальный производитель': item.originalProduct.manufacturer,
                ...item.originalProduct.parameters,
                'Выбранный аналог ID': best?.product.id ?? '',
                'Выбранный аналог название': best?.product.name ?? '',
                'Выбранный аналог производитель': best?.product.manufacturer ?? '',
                ...best?.product.parameters
            }
        })

        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Номенклатура')

        XLSX.writeFile(workbook, 'Подобранные_аналоги_систэм_электрик.xlsx')
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
                                item.tableRow === updatedItem.tableRow ? updatedItem : item
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