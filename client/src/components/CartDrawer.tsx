import type { CartItem } from '../types/product'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: number, newQty: number) => void
  onRemoveItem: (productId: number) => void
  onClearCart: () => void
}

const FREE_SHIPPING_THRESHOLD = 50.0

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <h3 className="drawer-title">Your Tea Ritual</h3>
            <span className="drawer-item-count">
              ({items.reduce((acc, it) => acc + it.quantity, 0)} items)
            </span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="shipping-progress-box">
          <div className="shipping-text">
            {remainingForFreeShipping > 0 ? (
              <>
                Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>Complimentary Express Shipping</strong>
              </>
            ) : (
              <span className="shipping-unlocked">✨ You have unlocked Complimentary Express Shipping!</span>
            )}
          </div>
          <div className="shipping-track">
            <div
              className="shipping-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <span className="empty-cart-icon">🍵</span>
              <h4>Your bowl is empty</h4>
              <p>Explore our single-origin matchas and wild-harvested oolongs to begin your ceremony.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-row">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <span className="cart-item-origin">{product.origin ?? 'Artisan Micro-Lot'}</span>
                    <h4 className="cart-item-name">{product.name}</h4>
                    <span className="cart-item-price">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="cart-item-actions">
                      <div className="quantity-stepper">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="item-remove-btn"
                        onClick={() => onRemoveItem(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="summary-val">${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row shipping-row">
              <span>Shipping</span>
              <span className="summary-val">
                {remainingForFreeShipping === 0 ? 'FREE' : '$5.00'}
              </span>
            </div>
            <div className="summary-row total-row">
              <span>Total Estimate</span>
              <span className="total-val">
                ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 5.0)).toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-checkout"
              onClick={() => {
                alert('Thank you! Checkout integration will be linked in Phase 3.')
              }}
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              className="clear-cart-link"
              onClick={onClearCart}
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
