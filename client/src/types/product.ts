export interface FlavorProfile {
  sweetness: number   // 0 to 10
  richness: number    // 0 to 10 (smoothness / body)
  freshness: number   // 0 to 10 (crisp / light)
  toasted: number     // 0 to 10 (warm / roasted)
  floral: number      // 0 to 10 (delicate aroma)
}

export interface BrewingGuide {
  waterTempC: number
  steepMinutes: number
  amountTsp: number
  simpleTip: string
}

export type TeaCategory = 'All' | 'Matcha' | 'Hojicha' | 'Genmaicha' | 'Sencha' | 'Black Tea' | 'Milk Tea'

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  imageUrl: string
  createdAtUtc?: string
  category: 'Matcha' | 'Hojicha' | 'Genmaicha' | 'Sencha' | 'Black Tea' | 'Milk Tea'
  caffeineLevel: 'None' | 'Low' | 'Medium' | 'High'
  tasteNotes: string[]
  tasteProfile: FlavorProfile
  brewingGuide: BrewingGuide
  featured?: boolean
  inStock?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}
