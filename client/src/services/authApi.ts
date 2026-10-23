import type { AuthResponse, CreateOrderData, LoginData, Order, RegisterData, User } from '../types/auth'

const API_BASE_URL = '/api'
const STORAGE_USER_KEY = 'lumen_current_user'
const STORAGE_TOKEN_KEY = 'lumen_auth_token'
const STORAGE_USERS_KEY = 'lumen_local_users'
const STORAGE_ORDERS_KEY = 'lumen_local_orders'

// In-browser mock storage helpers for offline / standalone mode
interface LocalUserRecord {
  id: number
  name: string
  email: string
  passwordHash: string
  createdAtUtc: string
}

function getStoredUsers(): LocalUserRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveStoredUsers(users: LocalUserRecord[]) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users))
  } catch {
    // Ignore storage errors
  }
}

function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveStoredOrders(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders))
  } catch {
    // Ignore storage errors
  }
}

// Current session helpers
export function getCurrentSession(): { user: User | null; token: string | null } {
  try {
    const userRaw = localStorage.getItem(STORAGE_USER_KEY)
    const token = localStorage.getItem(STORAGE_TOKEN_KEY)
    if (userRaw) {
      return { user: JSON.parse(userRaw), token }
    }
  } catch {
    // Ignore error
  }
  return { user: null, token: null }
}

export function saveCurrentSession(user: User, token: string) {
  try {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
    localStorage.setItem(STORAGE_TOKEN_KEY, token)
  } catch {
    // Ignore storage errors
  }
}

export function clearCurrentSession() {
  try {
    localStorage.removeItem(STORAGE_USER_KEY)
    localStorage.removeItem(STORAGE_TOKEN_KEY)
  } catch {
    // Ignore storage errors
  }
}

// Register
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || 'Failed to sign up.')
    }

    saveCurrentSession(result.user, result.token)
    return result
  } catch (error: any) {
    // If backend provided a specific error message, throw it
    if (error.name !== 'AbortError' && error.message && !error.message.includes('fetch') && !error.message.includes('Failed to fetch')) {
      throw error
    }

    // Fallback: Local offline registration
    const users = getStoredUsers()
    const emailLower = data.email.trim().toLowerCase()
    if (users.some((u) => u.email.toLowerCase() === emailLower)) {
      throw new Error('An account with this email already exists.')
    }

    const newUser: User = {
      id: Date.now(),
      name: data.name.trim(),
      email: emailLower,
      createdAtUtc: new Date().toISOString(),
    }

    const localRecord: LocalUserRecord = {
      ...newUser,
      passwordHash: btoa(data.password),
    }

    users.push(localRecord)
    saveStoredUsers(users)

    const token = `local-token-${Date.now()}`
    const authRes: AuthResponse = { user: newUser, token }
    saveCurrentSession(newUser, token)
    return authRes
  }
}

// Login
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || 'Invalid email or password.')
    }

    saveCurrentSession(result.user, result.token)
    return result
  } catch (error: any) {
    if (error.name !== 'AbortError' && error.message && !error.message.includes('fetch') && !error.message.includes('Failed to fetch')) {
      throw error
    }

    // Fallback: Local offline authentication
    const users = getStoredUsers()
    const emailLower = data.email.trim().toLowerCase()
    const found = users.find((u) => u.email.toLowerCase() === emailLower)

    if (!found || found.passwordHash !== btoa(data.password)) {
      throw new Error('Invalid email or password.')
    }

    const user: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      createdAtUtc: found.createdAtUtc,
    }

    const token = `local-token-${Date.now()}`
    const authRes: AuthResponse = { user, token }
    saveCurrentSession(user, token)
    return authRes
  }
}

// Create Order
export async function placeOrder(orderData: CreateOrderData): Promise<Order> {
  const session = getCurrentSession()
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (session.token) {
      headers['Authorization'] = `Bearer ${session.token}`
    }

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || 'Failed to place order.')
    }

    return result
  } catch (error: any) {
    if (error.name !== 'AbortError' && error.message && !error.message.includes('fetch') && !error.message.includes('Failed to fetch')) {
      throw error
    }

    // Fallback: Local offline order placement
    const orders = getStoredOrders()
    const subtotal = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal >= 45.0 ? 0 : 4.99
    const totalAmount = subtotal + shipping

    const newOrder: Order = {
      id: Math.floor(100000 + Math.random() * 900000),
      userId: orderData.userId,
      totalAmount,
      status: 'Confirmed',
      shippingAddress: orderData.shippingAddress || 'Standard Delivery',
      createdAtUtc: new Date().toISOString(),
      items: orderData.items.map((it, idx) => ({
        id: idx + 1,
        productId: it.productId,
        productName: it.productName,
        price: it.price,
        quantity: it.quantity,
      })),
    }

    orders.unshift(newOrder)
    saveStoredOrders(orders)
    return newOrder
  }
}

// Get User Orders
export async function fetchUserOrders(userId: number): Promise<Order[]> {
  const session = getCurrentSession()
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const headers: Record<string, string> = {}
    if (session.token) {
      headers['Authorization'] = `Bearer ${session.token}`
    }

    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
      headers,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error('Could not fetch orders from server.')
    }

    return await response.json()
  } catch {
    // Fallback to local stored orders
    const orders = getStoredOrders()
    return orders.filter((o) => o.userId === userId)
  }
}
