import { api } from '../../api'
import type { MatchResult } from '../models'

export async function processFile(file: File, onProgress?: (p: number) => void): Promise<MatchResult[]> {
    onProgress?.(0)
    const results = await api.processFile(file)
    onProgress?.(100)
    return results
}
