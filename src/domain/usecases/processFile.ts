import { api } from '../../api'
import * as XLSX from 'xlsx'
import type { MatchResult } from '../models'

export async function processFile(file: File, onProgress?: (p: number) => void): Promise<MatchResult[]> {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = XLSX.utils.sheet_to_json<Record<string, any>>(sheet)

    console.log(json)

    const rowsAsStrings = json.map(row =>
        Object.entries(row)
            .map(([k, v]) => `${k}: ${v}`)
            .filter(v => v.length > 0)
            .join(' ')

        // Object.values(row)
        //     .map(v => String(v ?? '').trim())
        //     .filter(v => v.length > 0)
        //     .join(' ')
    )

    let progress = 0
    const progressInterval = setInterval(() => {
        progress = Math.min(progress + 10, 95)
        onProgress?.(progress)
    }, 300)

    try {
        const results = await api.processFile(rowsAsStrings)

        onProgress?.(100)
        clearInterval(progressInterval)

        return results
    } catch (err) {
        clearInterval(progressInterval)
        onProgress?.(0)
        throw err
    }
}
