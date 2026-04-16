export class ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;

  isAvailable(): boolean { return this.stock > 0; }
  decreaseStock(qty: number): void { this.stock = Math.max(0, this.stock - qty); }
}
