import { atom } from './core';
import { Order } from '../../../backend/src/entities/order.entity';

export const ordersAtom = atom<Order[]>([]);
export const orderLoadingAtom = atom<boolean>(false);
