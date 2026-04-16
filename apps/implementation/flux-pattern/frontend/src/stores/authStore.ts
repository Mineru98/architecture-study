import { dispatcher } from '../dispatcher/AppDispatcher';

let user: any = null;
let token: string | null = null;
let error: string = '';
type Listener = () => void;
const listeners: Listener[] = [];

export const AuthStore = {
  getUser: () => user,
  getToken: () => token,
  getError: () => error,
  subscribe: (listener: Listener): (() => void) => {
    listeners.push(listener);
    return () => { const i = listeners.indexOf(listener); if (i >= 0) listeners.splice(i, 1); };
  },
  emitChange: () => listeners.forEach((l) => l()),
};

dispatcher.register((action: any) => {
  switch (action.type) {
    case 'LOGIN_START':
      error = '';
      AuthStore.emitChange();
      break;
    case 'LOGIN_SUCCESS':
      user = action.payload.user;
      token = action.payload.token;
      error = '';
      AuthStore.emitChange();
      break;
    case 'LOGIN_ERROR':
      user = null;
      token = null;
      error = action.payload.error;
      AuthStore.emitChange();
      break;
    case 'LOGOUT':
      user = null;
      token = null;
      error = '';
      AuthStore.emitChange();
      break;
  }
});
