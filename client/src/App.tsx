import { useEffect, useMemo, useRef, useState } from 'react'
import type { CartItem, Product, TeaCategory } from './types/product'
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
    { product: initialMockProducts[1], quantity: 1 }, // Hojicha starter item
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<TeaCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTaste, setSelectedTaste] = useState('All Tastes')
  const [sortBy, setSortBy] = useState('featured')

  const catalogSectionRef = useRef<HTMLDivElement>(null)
  const teaFinderRef = useRef<HTMLDivElement>(null)

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

  // Smooth scroll
  const handleBrowseTeas = () => {
    catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOpenTeaFinder = () => {
    teaFinderRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Filter & sort logic
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
          const matchesCategory = p.category.toLowerCase().includes(q)
          const matchesDesc = p.description.toLowerCase().includes(q)
          const matchesTaste = p.tasteNotes.some((t) => t.toLowerCase().includes(q))
          if (!matchesName && !matchesCategory && !matchesDesc && !matchesTaste) {
            return false
          }
        }

        // Taste filter
        if (selectedTaste !== 'All Tastes') {
          const tasteKey = selectedTaste.toLowerCase()
          const hasMatchingNote = p.tasteNotes.some((t) =>
            t.toLowerCase().includes(tasteKey) ||
            (tasteKey.includes('warm') && (t.toLowerCase().includes('toasted') || t.toLowerCase().includes('warm') || t.toLowerCase().includes('roasted'))) ||
            (tasteKey.includes('fresh') && (t.toLowerCase().includes('fresh') || t.toLowerCase().includes('green') || t.toLowerCase().includes('crisp'))) ||
            (tasteKey.includes('creamy') && (t.toLowerCase().includes('cream') || t.toLowerCase().includes('smooth') || t.toLowerCase().includes('vanilla'))) ||
            (tasteKey.includes('smooth') && (t.toLowerCase().includes('smooth') || t.toLowerCase().includes('gentle')))
          )
          if (!hasMatchingNote) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      })
  }, [products, selectedCategory, searchQuery, selectedTaste, sortBy])

  return (
    <div className="app-layout">
      <Header
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTeaFinder={handleOpenTeaFinder}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat)
          handleBrowseTeas()
        }}
        isLiveApi={isLiveApi}
      />

      <main className="content-container">
        <Hero
          onBrowseTeas={handleBrowseTeas}
          onOpenTeaFinder={handleOpenTeaFinder}
        />

        {/* Catalog Section */}
        <section ref={catalogSectionRef} className="tea-catalog-section">
          <div className="section-intro">
            <span className="section-label">Our Tea Lineup</span>
            <h2 className="section-main-heading">Explore Teas for Every Day</h2>
            <p className="section-description">
              Find fresh Japanese green teas, cozy roasted blends, and comforting milk tea favorites.
            </p>
          </div>

          <FlavorFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTaste={selectedTaste}
            onSelectTaste={setSelectedTaste}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={filteredProducts.length}
          />

          {loading ? (
            <div className="state-panel">
              <div className="soft-spinner"></div>
              <p>Loading fresh teas...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="state-panel">
              <i className="bi bi-cup empty-icon"></i>
              <h3>No teas found</h3>
              <p>Try clearing your search text or choosing All Teas above.</p>
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                  setSelectedTaste('All Tastes')
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="tea-card-grid">
              {filteredProducts.map((tea) => (
                <ProductCard
                  key={tea.id}
                  product={tea}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </section>

        {/* AI Tea Finder Section */}
        <div ref={teaFinderRef}>
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
