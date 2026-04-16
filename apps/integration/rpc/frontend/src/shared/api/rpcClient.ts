import axios from 'axios';

let requestId = 1;

const rpcClient = axios.create({
  baseURL: '/api',
});

rpcClient.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const { token } = JSON.parse(authData);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
  }
  return config;
});

export async function call(method: string, params: any = {}) {
  const response = await rpcClient.post('/rpc', {
    jsonrpc: '2.0',
    method,
    params,
    id: requestId++,
  });
  if (response.data.error) {
    throw new Error(response.data.error.message);
  }
  return response.data.result;
}

export default rpcClient;
