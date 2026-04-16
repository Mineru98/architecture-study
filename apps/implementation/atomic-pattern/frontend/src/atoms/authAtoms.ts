import { atom } from './core';
import { User } from '../../../backend/src/entities/user.entity';

export const userAtom = atom<User | null>(null);
export const tokenAtom = atom<string>('');
