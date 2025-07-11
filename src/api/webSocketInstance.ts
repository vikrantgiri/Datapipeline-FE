type MessageCallback = (data: string) => void

let socket: WebSocket | null = null
let listeners: MessageCallback[] = []

const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
const WS_URL = `${wsProtocol}://${window.location.host}:8000/api/v1`

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
