import { useState } from 'react'
import type { CartItem } from '../types/product'
import type { Order, User } from '../types/auth'
import { placeOrder } from '../services/authApi'
import { formatPrice } from '../utils/currency'

interface CheckoutModalProps {
  isOpen: boolean
  user: User | null
  items: CartItem[]
  onClose: () => void
  onOrderSuccess: (order: Order) => void
  onViewOrders: () => void
}

const FREE_SHIPPING_LIMIT = 45.0
const SHIPPING_FEE = 4.99

export function CheckoutModal({
  isOpen,
  user,
  items,
  onClose,
  onOrderSuccess,
  onViewOrders,
}: CheckoutModalProps) {
  const [shippingAddress, setShippingAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen || !user) return null

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const isFreeShipping = subtotal >= FREE_SHIPPING_LIMIT
  const shipping = isFreeShipping ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (items.length === 0) {
      setError('Your cart is empty.')
      return
    }

    setIsSubmitting(true)
    try {
      const order = await placeOrder({
        userId: user.id,
        shippingAddress: shippingAddress.trim() || 'Standard Delivery',
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
      })
      setPlacedOrder(order)
      onOrderSuccess(order)
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDone = () => {
    setPlacedOrder(null)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleDone}>
      <div
        className="checkout-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Order Checkout"
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={handleDone}
          aria-label="Close dialog"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {placedOrder ? (
          <div className="order-success-view">
            <div className="order-success-icon-badge">
              <i className="bi bi-check-lg"></i>
            </div>
            <h3 className="order-success-heading">Order Confirmed!</h3>
            <p className="order-success-lead">
              Thank you, <strong>{user.name}</strong>. Your tea order has been placed successfully.
            </p>

            <div className="order-details-box">
              <div className="order-detail-row">
                <span className="order-detail-label">Order Number</span>
                <span className="order-detail-value">#{placedOrder.id}</span>
              </div>
              <div className="order-detail-row">
                <span className="order-detail-label">Account</span>
                <span className="order-detail-value">{user.email}</span>
              </div>
              <div className="order-detail-row">
                <span className="order-detail-label">Delivery To</span>
                <span className="order-detail-value">{placedOrder.shippingAddress}</span>
              </div>
              <div className="order-detail-row">
                <span className="order-detail-label">Total Amount</span>
                <span className="order-detail-value font-bold">{formatPrice(placedOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="order-summary-items">
              <h4 className="order-items-heading">Items in this Order</h4>
              <ul className="order-items-list">
                {placedOrder.items.map((it, idx) => (
                  <li key={idx} className="order-item-row">
                    <span className="order-item-name">
                      {it.quantity}x {it.productName}
                    </span>
                    <span className="order-item-price">
                      {formatPrice(it.price * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-success-actions">
              <button
                type="button"
                className="primary-button"
                onClick={handleDone}
              >
                Continue Browsing
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  handleDone()
                  onViewOrders()
                }}
              >
                View Order History
              </button>
            </div>
          </div>
        ) : (
          <div className="checkout-content">
            <div className="checkout-modal-header">
              <div className="auth-icon-badge">
                <i className="bi bi-bag-check"></i>
              </div>
              <h3 className="auth-title">Complete Your Order</h3>
              <p className="auth-subtitle">
                Ordering as <strong>{user.name}</strong> ({user.email})
              </p>
            </div>

            {error && (
              <div className="auth-error-banner" role="alert">
                <i className="bi bi-exclamation-circle-fill"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="checkout-form">
              {/* Order Items Summary */}
              <div className="checkout-section">
                <h4 className="checkout-section-title">Order Items ({items.length})</h4>
                <div className="checkout-items-list">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="checkout-item-row">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="checkout-item-image"
                      />
                      <div className="checkout-item-info">
                        <span className="checkout-item-title">{product.name}</span>
                        <span className="checkout-item-meta">
                          Qty: {quantity} &times; {formatPrice(product.price)}
                        </span>
                      </div>
                      <span className="checkout-item-total">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="checkout-section">
                <h4 className="checkout-section-title">Delivery Address</h4>
                <div className="form-group">
                  <div className="input-wrapper">
                    <i className="bi bi-geo-alt input-icon"></i>
                    <input
                      type="text"
                      required
                      placeholder="Street address, city, postal code"
                      className="form-input"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="checkout-summary-box">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? 'Free Standard Shipping' : formatPrice(SHIPPING_FEE)}</span>
                </div>
                <div className="summary-line total-line">
                  <span>Total</span>
                  <span className="total-amount">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="primary-button checkout-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="button-spinner-text">
                    <span className="soft-spinner-sm"></span>
                    Placing order...
                  </span>
                ) : (
                  <>
                    <i className="bi bi-lock-fill"></i>
                    <span>Place Order &bull; {formatPrice(total)}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
