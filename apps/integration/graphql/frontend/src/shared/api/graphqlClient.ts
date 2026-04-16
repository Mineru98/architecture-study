const GRAPHQL_URL = '/api/graphql';

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function graphqlRequest<T = any>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}

export const queries = {
  products: `
    query {
      products {
        id name price category stock description imageUrl
      }
    }
  `,
  product: `
    query GetProduct($id: String!) {
      product(id: $id) {
        id name price category stock description imageUrl
      }
    }
  `,
  orders: `
    query GetOrders($userId: String) {
      orders(userId: $userId) {
        id items total status createdAt
      }
    }
  `,
  order: `
    query GetOrder($id: String!) {
      order(id: $id) {
        id items total status createdAt
      }
    }
  `,
  me: `
    query GetMe($token: String!) {
      me(token: $token)
    }
  `,
};

export const mutations = {
  createOrder: `
    mutation CreateOrder($userId: String!, $items: [String!]!, $total: Float!) {
      createOrder(userId: $userId, items: $items, total: $total) {
        id items total status createdAt
      }
    }
  `,
  updateOrderStatus: `
    mutation UpdateOrderStatus($id: String!, $status: String!) {
      updateOrderStatus(id: $id, status: $status) {
        id items total status createdAt
      }
    }
  `,
  login: `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `,
  createProduct: `
    mutation CreateProduct($name: String!, $description: String!, $price: Float!, $stock: Int!, $category: String!, $imageUrl: String) {
      createProduct(name: $name, description: $description, price: $price, stock: $stock, category: $category, imageUrl: $imageUrl) {
        id name price category stock
      }
    }
  `,
  updateProduct: `
    mutation UpdateProduct($id: String!, $name: String, $description: String, $price: Float, $stock: Int, $category: String) {
      updateProduct(id: $id, name: $name, description: $description, price: $price, stock: $stock, category: $category) {
        id name price category stock
      }
    }
  `,
};
