import React, { useRef, useState } from 'react'
import Section from "../Section.tsx"
import Button from "../Button.tsx"

type UploadPanelProps = {
    onFileUpload: (file: File) => void
}

export const UploadPanel = ({ onFileUpload }: UploadPanelProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<string[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (file: File | null) => {
        if (!file) return

        const validationErrors = validateFile(file)

        if (validationErrors.length === 0) {
            setSelectedFile(file)
            setErrors([])
        } else {
            setErrors(validationErrors)
        }
    }

    const validateFile = (file: File): string[] => {
        const errors: string[] = []
        const validTypes = ['.xlsx', '.xls', '.csv']
        const extension = file.name.split('.').pop()?.toLowerCase()

        if (!validTypes.includes(`.${extension}`)) {
            errors.push('Поддерживаются только файлы Excel и CSV')
        }

        if (file.size > 10 * 1024 * 1024) {
            errors.push('Размер файла не должен превышать 10MB')
        }

        return errors
    }

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile)
        }
    }

    const handleCancel = () => {

    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        handleFileSelect(file)
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <Section>
            <h2 className="text-2xl font-bold text-white mb-6">Загрузка таблицы</h2>

            <div
                className={`group border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors border-primary hover:bg-secondary-container hover:border-white
                ${isDragging ? 'bg-secondary-container border-white' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={e => handleFileSelect(e.target.files?.[0] || null)}
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                />

                <div className="space-y-6">
                    <svg className="mx-auto h-12 w-12 text-on-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>

                    <div>
                        <div className={`btn-primary inline group-hover:bg-primary/70 group-hover:text-on-dark
                        ${isDragging ? 'bg-primary/70 text-on-dark' : ''}`}>
                            Выбрать файл
                        </div>
                    </div>

                    <p className="text-sm text-on-dark group-hover:text-white transition-colors">
                        Поддерживаемые форматы: Excel (.xlsx, .xls), CSV. Можно перетащить файл сюда.
                    </p>
                </div>
            </div>

            {selectedFile && (
                <div className="mt-4 p-4 bg-secondary-container rounded-xl">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <p className="font-medium text-primary">{selectedFile.name}</p>
                            <p className="text-sm text-on-dark">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button onClick={handleUpload}>Подобрать аналоги</Button>
                            <Button
                                onClick={handleCancel}
                                variant="cancel"
                                icon={(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/>
                                    </svg>
                                )}></Button>
                        </div>
                    </div>
                </div>
            )}

            {errors.length > 0 && (
                <div className="mt-4 p-6 bg-error/10 rounded-xl">
                    <h3 className="text-error font-medium mb-2">Ошибки валидации:</h3>
                    <ul className="list-disc list-inside text-error">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Section>
    );
};

