import { Injectable, NotFoundException } from "@nestjs/common";
import { Product, seedProducts } from "./product.data";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  private readonly products: Product[] = [...seedProducts];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  update(id: string, dto: UpdateProductDto): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Product ${id} not found`);
    this.products[index] = { ...this.products[index], ...dto };
    return this.products[index];
  }
}
