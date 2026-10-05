import type { Product } from '../types/product'
import { initialMockProducts } from '../data/mockProducts'

const API_BASE_URL = '/api'

export async function fetchProducts(): Promise<{ products: Product[]; isLiveApi: boolean }> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2500)

    const response = await fetch(`${API_BASE_URL}/products`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }

    const data: Product[] = await response.json()
    if (Array.isArray(data) && data.length > 0) {
      // Merge with default tea mock metadata if raw product model is minimal
      const enriched = data.map((item, index) => {
        const fallback = initialMockProducts[index % initialMockProducts.length]
        return {
          ...fallback,
          ...item,
          flavorProfile: item.flavorProfile ?? fallback.flavorProfile,
          brewingGuide: item.brewingGuide ?? fallback.brewingGuide,
          flavorNotes: item.flavorNotes ?? fallback.flavorNotes,
        }
      })
      return { products: enriched, isLiveApi: true }
    }

    return { products: initialMockProducts, isLiveApi: true }
  } catch (error) {
    console.info('API unreachable or empty; utilizing artisan fallback catalog:', error)
    return { products: initialMockProducts, isLiveApi: false }
  }
}

export async function createProduct(product: Partial<Product>): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to create product:', error)
    return null
  }
}
