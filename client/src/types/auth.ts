export interface User {
  id: number
  name: string
  email: string
  createdAtUtc: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface OrderItem {
  id?: number
  productId: number
  productName: string
  price: number
  quantity: number
}

export interface Order {
  id: number
  userId: number
  totalAmount: number
  status: string
  shippingAddress: string
  createdAtUtc: string
  items: OrderItem[]
}

export interface CreateOrderData {
  userId: number
  shippingAddress: string
  items: {
    productId: number
    productName: string
    price: number
    quantity: number
  }[]
}
