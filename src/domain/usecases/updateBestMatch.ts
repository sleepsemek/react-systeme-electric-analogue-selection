import { api } from '../../api'
import type { Product } from '../models'

export async function updateBestMatch(requestId: string, newProduct: Product) {
    await api.updateBestMatch(requestId, newProduct.id)
}
