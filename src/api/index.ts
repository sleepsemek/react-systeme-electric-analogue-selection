import {type MatchResult, normalizeResults} from '../domain/models'

export const baseUrl = 'http://localhost:3100'

export const api: BackendAPI = {
    async processFile(rows: string[]): Promise<MatchResult[]> {
        const response = await fetch(`${baseUrl}/api/match`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rows }),
        })

        if (!response.ok) {
            throw new Error('Ошибка при обращении к серверу')
        }

        const serverResults = await response.json()
        return normalizeResults(serverResults)
    },
}

export interface BackendAPI {
    processFile(rows: string[]): Promise<MatchResult[]>
}
