import { useEffect, useMemo, useRef, useState } from 'react'
import type { CartItem, Product } from './types/product'
import { initialMockProducts } from './data/mockProducts'
import { fetchProducts } from './services/api'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FlavorFilter } from './components/FlavorFilter'
import { ProductCard } from './components/ProductCard'
import { ProductModal } from './components/ProductModal'
import { CartDrawer } from './components/CartDrawer'
import { AiSommelierBanner } from './components/AiSommelierBanner'
import { Footer } from './components/Footer'
import './App.css'

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialMockProducts)
  const [isLiveApi, setIsLiveApi] = useState(false)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Provide a sample starter item in the cart to showcase functionality immediately
    { product: initialMockProducts[0], quantity: 1 },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFlavorNote, setSelectedFlavorNote] = useState('All Profiles')
  const [sortBy, setSortBy] = useState('featured')

  const catalogRef = useRef<HTMLDivElement>(null)
  const sommelierRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      setLoading(true)
      const res = await fetchProducts()
      if (isMounted) {
        setProducts(res.products)
        setIsLiveApi(res.isLiveApi)
        setLoading(false)
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (productId: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    )
  }

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  // Navigation Scrolling
  const handleScrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToSommelier = () => {
    sommelierRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchesName = p.name.toLowerCase().includes(q)
          const matchesOrigin = p.origin?.toLowerCase().includes(q)
          const matchesCultivar = p.cultivar?.toLowerCase().includes(q)
          const matchesNotes = p.flavorNotes?.some((n) => n.toLowerCase().includes(q))
          if (!matchesName && !matchesOrigin && !matchesCultivar && !matchesNotes) {
            return false
          }
        }
        // Flavor note filter
        if (selectedFlavorNote !== 'All Profiles') {
          if (!p.flavorNotes?.includes(selectedFlavorNote)) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        // featured default
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      })
  }, [products, selectedCategory, searchQuery, selectedFlavorNote, sortBy])

  return (
    <div className="lumen-app">
      <Header
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSommelier={handleScrollToSommelier}
        activeNav={selectedCategory}
        onSelectNav={(cat) => {
          setSelectedCategory(cat)
          handleScrollToCatalog()
        }}
        isLiveApi={isLiveApi}
      />

      <main className="main-content">
        <Hero
          onScrollToCatalog={handleScrollToCatalog}
          onOpenSommelier={handleScrollToSommelier}
        />

        {/* Catalog Section */}
        <section ref={catalogRef} className="catalog-section">
          <div className="catalog-header">
            <span className="section-eyebrow">The Reserve Collection</span>
            <h2 className="section-title">Single-Origin Harvests & Blends</h2>
            <p className="section-subtitle">
              Sourced in micro-batches with complete terroir traceability and flavor-mapped profiles.
            </p>
          </div>

          <FlavorFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFlavorNote={selectedFlavorNote}
            onSelectFlavorNote={setSelectedFlavorNote}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={filteredProducts.length}
          />

          {loading ? (
            <div className="catalog-loading">
              <span className="loading-spinner"></span>
              <p>Preparing the infusion...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="catalog-empty">
              <span className="empty-symbol">🍃</span>
              <h3>No matching teas found</h3>
              <p>Try clearing your flavor note filter or search query to explore other harvests.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                  setSelectedFlavorNote('All Profiles')
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </section>

        {/* AI Sommelier Integration Section */}
        <div ref={sommelierRef}>
          <AiSommelierBanner
            products={products}
            onSelectProduct={setSelectedProduct}
          />
        </div>
      </main>

      <Footer />

      {/* Overlays */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  )
}
