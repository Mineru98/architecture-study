import { Injectable } from '@nestjs/common';
import { ProductService } from '../products/product.service';
import { OrderService } from '../orders/order.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RpcService {
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService,
  ) {}

  async route(method: string, params: any) {
    const [domain, action] = method.split('.');

    switch (domain) {
      case 'products':
        return this.handleProducts(action, params);
      case 'orders':
        return this.handleOrders(action, params);
      case 'auth':
        return this.handleAuth(action, params);
      default:
        throw new Error(`Unknown domain: ${domain}`);
    }
  }

  private async handleProducts(action: string, params: any) {
    switch (action) {
      case 'list':
        return this.productService.findAll(params.category, params.page);
      case 'getDetail':
        return this.productService.findOne(params.id);
      default:
        throw new Error(`Unknown products action: ${action}`);
    }
  }

  private async handleOrders(action: string, params: any) {
    switch (action) {
      case 'create':
        return this.orderService.create(params.userId, params.items, params.total);
      case 'list':
        return this.orderService.findAll(params.userId);
      default:
        throw new Error(`Unknown orders action: ${action}`);
    }
  }

  private async handleAuth(action: string, params: any) {
    switch (action) {
      case 'login':
        return this.authService.login(params.email, params.password);
      case 'me':
        return this.authService.me(params.userId);
      default:
        throw new Error(`Unknown auth action: ${action}`);
    }
  }
}
