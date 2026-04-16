import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { Order } from '../order.entity';
import { User } from '../user.entity';
export const entities = [Product, Order, User];
export { Product, Order, User };
