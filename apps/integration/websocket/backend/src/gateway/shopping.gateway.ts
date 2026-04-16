import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProductService } from '../products/product.service';
import { OrderService } from '../orders/order.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ShoppingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getProducts')
  async handleGetProducts(client: Socket, payload: { category?: string }) {
    const products = await this.productService.findAll(payload?.category);
    client.emit('products', products);
  }

  @SubscribeMessage('getProduct')
  async handleGetProduct(client: Socket, payload: { id: string }) {
    const product = await this.productService.findOne(payload.id);
    client.emit('product', product);
  }

  @SubscribeMessage('createOrder')
  async handleCreateOrder(client: Socket, payload: { userId: string; items: any[]; total: number }) {
    const order = await this.orderService.create(payload.userId, payload.items, payload.total);

    // Real-time order status updates pushed from server
    client.emit('orderCreated', order);

    // Simulate status progression
    setTimeout(async () => {
      await this.orderService.updateStatus(order.id, 'confirmed');
      client.emit('orderStatusUpdate', { orderId: order.id, status: 'confirmed' });
    }, 2000);

    setTimeout(async () => {
      await this.orderService.updateStatus(order.id, 'shipped');
      client.emit('orderStatusUpdate', { orderId: order.id, status: 'shipped' });
    }, 5000);
  }

  @SubscribeMessage('getOrders')
  async handleGetOrders(client: Socket, payload: { userId: string }) {
    const orders = await this.orderService.findAll(payload.userId);
    client.emit('orders', orders);
  }
}
