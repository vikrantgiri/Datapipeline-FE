type MessageCallback = (data: string) => void

let socket: WebSocket | null = null
let listeners: MessageCallback[] = []

const WS_URL = import.meta.env.VITE_BASE_WEBSOCKET_URL
export const createWebSocket = (run_id: string): WebSocket => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(WS_URL + `/logs?run_id=${run_id}`)

    socket.onopen = () => {
      console.log('✅ WebSocket connected')
    }

    socket.onmessage = (event: MessageEvent) => {
      listeners.forEach(callback => callback(event.data))
    }

    socket.onclose = () => {
      console.log('❌ WebSocket disconnected')
    }

    socket.onerror = (error: Event) => {
      console.error('⚠️ WebSocket error:', error)
    }
  }

  return socket
}

export const addMessageListener = (callback: MessageCallback): void => {
  listeners.push(callback)
}

export const removeMessageListener = (callback: MessageCallback): void => {
  listeners = listeners.filter(cb => cb !== callback)
}

export const closeWebSocket = (): void => {
  if (socket) {
    socket.close()
  }
}
