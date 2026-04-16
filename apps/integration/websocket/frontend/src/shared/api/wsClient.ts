import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io('http://localhost:3001', { transports: ['websocket'] });
    socket.on('connect', () => console.log('WebSocket connected'));
    socket.on('disconnect', () => console.log('WebSocket disconnected'));
  }
  return socket;
}

export function emit(event: string, data: any): void {
  getSocket().emit(event, data);
}

export function on(event: string, callback: (...args: any[]) => void): void {
  getSocket().on(event, callback);
}

export function off(event: string, callback?: (...args: any[]) => void): void {
  getSocket().off(event, callback);
}
