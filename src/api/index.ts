import type { MatchResult } from '../domain/models'
import { mockApi } from "./mockAdapter.ts";

export interface BackendAPI {
    processFile(file: File): Promise<MatchResult[]>
    updateBestMatch(requestId: string, productId: string): Promise<void>
}

// export const api: BackendAPI = {
//     processFile: async (file) => {
//         const { mockResults } = await import('./mockAdapter')
//         return mockResults
//     },
//     updateBestMatch: async (requestId, productId) => {
//         console.log('Mock update', requestId, productId)
//     }
// }

export const api = mockApi
