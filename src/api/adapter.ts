import type { BackendAPI } from './index'
import type { MatchResult } from '../domain/models'

export const api: BackendAPI = {
    async processFile(file) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/match', { method: 'POST', body: formData })
        if (!response.ok) throw new Error('Ошибка при обработке файла')
        return response.json() as Promise<MatchResult[]>
    },

    async updateBestMatch(requestId, productId) {
        await fetch(`/api/match/${requestId}/best`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId })
        })
    }
}
