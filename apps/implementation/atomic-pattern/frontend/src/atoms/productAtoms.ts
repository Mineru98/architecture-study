import { atom } from './core';
import { Product } from '../../../backend/src/entities/product.entity';

export const productListAtom = atom<Product[]>([]);
export const selectedProductAtom = atom<Product | null>(null);
export const categoryFilterAtom = atom<string>('');
export const loadingAtom = atom<boolean>(false);
