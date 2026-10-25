import { useEffect, useState } from 'react'
import type { Order, User } from '../types/auth'
import { fetchUserOrders } from '../services/authApi'
import { formatPrice } from '../utils/currency'

interface OrdersModalProps {
  isOpen: boolean
  user: User | null
  onClose: () => void
}

export function OrdersModal({ isOpen, user, onClose }: OrdersModalProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && user) {
      let isMounted = true
      setLoading(true)
      fetchUserOrders(user.id)
        .then((data) => {
          if (isMounted) {
            setOrders(data)
            setLoading(false)
          }
        })
        .catch(() => {
          if (isMounted) setLoading(false)
        })

      return () => {
        isMounted = false
      }
    }
  }, [isOpen, user])

  if (!isOpen || !user) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="orders-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Order History"
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="orders-modal-header">
          <div className="auth-icon-badge">
            <i className="bi bi-clock-history"></i>
          </div>
          <h3 className="auth-title">My Orders</h3>
          <p className="auth-subtitle">
            Order history for <strong>{user.name}</strong> ({user.email})
          </p>
        </div>

        <div className="orders-content-area">
          {loading ? (
            <div className="state-panel">
              <div className="soft-spinner"></div>
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-orders-view">
              <i className="bi bi-bag empty-orders-icon"></i>
              <h4>No orders yet</h4>
              <p>When you place an order, your details and receipts will appear here.</p>
              <button
                type="button"
                className="secondary-button"
                onClick={onClose}
              >
                Browse Our Teas
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-history-card">
                  <div className="order-card-header">
                    <div className="order-card-id-group">
                      <span className="order-number">Order #{order.id}</span>
                      <span className="order-date">
                        {new Date(order.createdAtUtc).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <span className="order-status-badge">
                      <i className="bi bi-check2-circle"></i>
                      {order.status}
                    </span>
                  </div>

                  <div className="order-items-compact-list">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="order-compact-item">
                        <span className="compact-item-name">
                          {it.quantity}x {it.productName}
                        </span>
                        <span className="compact-item-price">
                          {formatPrice(it.price * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-footer">
                    <span className="order-delivery-address">
                      <i className="bi bi-geo-alt"></i> {order.shippingAddress}
                    </span>
                    <span className="order-total-price">
                      Total: <strong>{formatPrice(order.totalAmount)}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
