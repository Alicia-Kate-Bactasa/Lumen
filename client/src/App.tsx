import { useEffect, useMemo, useRef, useState } from 'react'
import type { CartItem, Product, TeaCategory } from './types/product'
import type { Order, User } from './types/auth'
import { initialMockProducts } from './data/mockProducts'
import { fetchProducts } from './services/api'
import { clearCurrentSession, getCurrentSession } from './services/authApi'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { AtelierPhilosophy } from './components/AtelierPhilosophy'
import { FlavorFilter } from './components/FlavorFilter'
import { ProductCard } from './components/ProductCard'
import { ProductModal } from './components/ProductModal'
import { CartDrawer } from './components/CartDrawer'
import { AiSommelierBanner } from './components/AiSommelierBanner'
import { ReviewsSection } from './components/ReviewsSection'
import { SampaguitaStar, LilyPetal, WaveDivider } from './components/FloralIcons'
import { Footer } from './components/Footer'
import { AuthModal } from './components/AuthModal'
import { CheckoutModal } from './components/CheckoutModal'
import { OrdersModal } from './components/OrdersModal'
import './App.css'

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialMockProducts)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: initialMockProducts[1], quantity: 1 }, // Hojicha starter item
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Auth & Account state
  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentSession().user)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [authMessage, setAuthMessage] = useState<string | null>(null)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false)
  const [pendingCheckoutAfterAuth, setPendingCheckoutAfterAuth] = useState(false)

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

  // Auth Operations
  const handleOpenAuth = (mode: 'login' | 'signup', message?: string) => {
    setAuthMode(mode)
    setAuthMessage(message || null)
    setIsAuthModalOpen(true)
  }

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user)
    setIsAuthModalOpen(false)

    if (pendingCheckoutAfterAuth) {
      setPendingCheckoutAfterAuth(false)
      setIsCartOpen(false)
      setIsCheckoutModalOpen(true)
    }
  }

  const handleLogout = () => {
    clearCurrentSession()
    setCurrentUser(null)
  }

  // Checkout flow: Account is required
  const handleCheckoutClick = () => {
    if (!currentUser) {
      setPendingCheckoutAfterAuth(true)
      handleOpenAuth('login', 'Please log in or create an account to place your order.')
      return
    }

    setIsCartOpen(false)
    setIsCheckoutModalOpen(true)
  }

  const handleOrderSuccess = (_order: Order) => {
    handleClearCart()
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
        user={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onGoHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenAuth={handleOpenAuth}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="content-container">
        <Hero
          onBrowseTeas={handleBrowseTeas}
          onOpenTeaFinder={handleOpenTeaFinder}
        />

        {/* The Atelier Philosophy & Unique Twist Swatches */}
        <AtelierPhilosophy />

        {/* Catalog Section */}
        <section ref={catalogSectionRef} className="tea-catalog-section">
          <div className="section-intro">
            <div className="botanical-eyebrow">
              <SampaguitaStar size={15} className="badge-flower" />
              <span>Artisanal Whole-Leaf Selection</span>
              <LilyPetal size={15} className="badge-flower" />
            </div>
            <h2 className="section-main-heading">Explore Teas for Every Day</h2>
            <p className="section-description">
              Stone-ground ceremonial Uji matcha, roasted hojicha, and fragrant whole-leaf botanicals.
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

        {/* Seamless Curved Wave: Creamy Off-White into Blush Pink Reviews */}
        <div className="section-wave-wrap wave-bg-offwhite">
          <WaveDivider colorClass="fill-blush" />
        </div>

        {/* Reviews: Notes from Matcha Lovers */}
        <ReviewsSection
          products={products}
          onSelectProduct={setSelectedProduct}
        />

        {/* Seamless Curved Wave: Blush Pink into Warm Peach AI Tea Guide */}
        <div className="section-wave-wrap wave-bg-blush">
          <WaveDivider colorClass="fill-peach" />
        </div>

        {/* AI Tea Finder Section */}
        <div ref={teaFinderRef} className="tea-finder-wrapper">
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
        isLoggedIn={!!currentUser}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckoutClick}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        message={authMessage}
        onClose={() => {
          setIsAuthModalOpen(false)
          setPendingCheckoutAfterAuth(false)
        }}
        onSuccess={handleAuthSuccess}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        user={currentUser}
        items={cartItems}
        onClose={() => setIsCheckoutModalOpen(false)}
        onOrderSuccess={handleOrderSuccess}
        onViewOrders={() => setIsOrdersModalOpen(true)}
      />

      <OrdersModal
        isOpen={isOrdersModalOpen}
        user={currentUser}
        onClose={() => setIsOrdersModalOpen(false)}
      />
    </div>
  )
}
