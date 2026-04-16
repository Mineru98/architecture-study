import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateProductDto {
  @IsOptional() @IsString() id?: string;
  @IsString() name: string;
  @IsString() description: string;
  @IsNumber() price: number;
  @IsNumber() stock: number;
  @IsString() category: string;
  @IsOptional() @IsString() imageUrl?: string;
}
