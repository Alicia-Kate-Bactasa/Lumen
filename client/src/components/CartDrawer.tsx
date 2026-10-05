import type { CartItem } from '../types/product'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: number, newQty: number) => void
  onRemoveItem: (productId: number) => void
  onClearCart: () => void
}

const FREE_SHIPPING_LIMIT = 45.0

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
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - subtotal)
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_LIMIT) * 100)
  const totalItemCount = items.reduce((acc, it) => acc + it.quantity, 0)

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Drawer Header */}
        <div className="drawer-header-bar">
          <div className="drawer-title-group">
            <i className="bi bi-bag"></i>
            <h3 className="drawer-heading">Your Cart</h3>
            <span className="drawer-count-pill">
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="shipping-banner">
          <div className="shipping-message">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more to get <strong>Free Standard Shipping</strong>
              </span>
            ) : (
              <span className="shipping-success">
                <i className="bi bi-check-circle-fill"></i> You unlocked Free Standard Shipping!
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-content-area">
          {items.length === 0 ? (
            <div className="empty-cart-view">
              <i className="bi bi-bag-heart empty-cart-symbol"></i>
              <h4>Your cart is empty</h4>
              <p>Explore our friendly tea collection to find your new favorite cup.</p>
              <button
                type="button"
                className="primary-button"
                onClick={onClose}
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="cart-list">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-card">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="cart-card-image"
                  />
                  <div className="cart-card-details">
                    <span className="cart-card-category">{product.category}</span>
                    <h4 className="cart-card-name">{product.name}</h4>
                    <span className="cart-card-price">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="cart-card-controls">
                      <div className="stepper-group">
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="stepper-number">{quantity}</span>
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => onRemoveItem(product.id)}
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <i className="bi bi-trash3"></i>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="drawer-summary-footer">
            <div className="summary-line">
              <span>Subtotal</span>
              <span className="summary-amount">${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span className="summary-amount">
                {remainingForFreeShipping === 0 ? 'Free' : '$4.99'}
              </span>
            </div>
            <div className="summary-line total-line">
              <span>Total</span>
              <span className="total-amount">
                ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 4.99)).toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="checkout-action-button"
              onClick={() => {
                alert('Checkout will connect to your payment processor in Phase 3.')
              }}
            >
              <i className="bi bi-lock-fill"></i>
              <span>Proceed to Checkout</span>
            </button>

            <button
              type="button"
              className="empty-cart-button"
              onClick={onClearCart}
            >
              Empty cart
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
