export const useApi = () => {
  const baseURL = 'http://localhost:3001/api'
  
  const getHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }
  
  const handleResponse = async (response) => {
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'API error occurred')
    }
    return response.json()
  }
  
  return {
    // Auth
    async register(data) {
      const response = await fetch(`${baseURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    
    async login(data) {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    
    async getMe() {
      const response = await fetch(`${baseURL}/auth/me`, {
        headers: getHeaders()
      })
      return handleResponse(response)
    },
    
    // Orders / Loads
    async getOrders() {
      const response = await fetch(`${baseURL}/orders`, {
        headers: getHeaders()
      })
      return handleResponse(response)
    },
    
    async getOrder(id) {
      const response = await fetch(`${baseURL}/orders/${id}`, {
        headers: getHeaders()
      })
      return handleResponse(response)
    },
    
    async createOrder(data) {
      const response = await fetch(`${baseURL}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    
    async updateOrder(id, data) {
      const response = await fetch(`${baseURL}/orders/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    
    async deleteOrder(id) {
      const response = await fetch(`${baseURL}/orders/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      })
      return handleResponse(response)
    },
    
    async assignDriver(orderId, driverId) {
      const response = await fetch(`${baseURL}/orders/${orderId}/assign-driver`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ driverId })
      })
      return handleResponse(response)
    },
    
    // Yangi: Shartnoma yaratish (taklif berish)
    async createContract(orderId, data) {
      console.log('Calling createContract API:', orderId, data)
      const response = await fetch(`${baseURL}/orders/${orderId}/contract`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    
    // Yangi: Shartnomani qabul qilish
    async acceptContract(orderId) {
      const response = await fetch(`${baseURL}/orders/${orderId}/contract/accept`, {
        method: 'POST',
        headers: getHeaders()
      })
      return handleResponse(response)
    },
    
    // Yangi: Xabar yuborish
    async sendMessage(orderId, message) {
      const response = await fetch(`${baseURL}/orders/${orderId}/contract/message`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ message })
      })
      return handleResponse(response)
    },
    
    // Drivers
    async getDrivers(params = {}) {
      const query = new URLSearchParams(params).toString()
      const url = query ? `${baseURL}/drivers?${query}` : `${baseURL}/drivers`
      const response = await fetch(url, {
        headers: getHeaders()
      })
      return handleResponse(response)
    },
    
    async getDriver(id) {
      const response = await fetch(`${baseURL}/drivers/${id}`, {
        headers: getHeaders()
      })
      return handleResponse(response)
    },
    
    // Users
    async getUsers() {
      const response = await fetch(`${baseURL}/users`, {
        headers: getHeaders()
      })
      return handleResponse(response)
    }
  }
}