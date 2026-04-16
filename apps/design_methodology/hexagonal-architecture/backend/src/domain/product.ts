export class ProductDomain {
  id: string; name: string; description: string; price: number; stock: number; category: string; imageUrl: string;
  isAvailable(): boolean { return this.stock > 0; }
}
