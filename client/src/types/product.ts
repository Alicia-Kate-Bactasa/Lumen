export interface FlavorProfile {
  umami: number       // 0 to 10
  sweetness: number   // 0 to 10
  vegetal: number     // 0 to 10 (grassy / fresh green)
  floral: number      // 0 to 10
  bitterness: number  // 0 to 10
  roastiness: number  // 0 to 10
}

export interface BrewingGuide {
  waterTempC: number
  steepSeconds: number
  leafRatioGrams: number
  waterVolumeMl: number
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  imageUrl: string
  createdAtUtc?: string
  // Enhanced Tea Domain fields
  category?: 'Matcha' | 'Green Tea' | 'Oolong' | 'Black Tea' | 'Herbal'
  origin?: string
  cultivar?: string
  harvestSeason?: string
  flavorNotes?: string[]
  flavorProfile?: FlavorProfile
  brewingGuide?: BrewingGuide
  featured?: boolean
  inStock?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}
