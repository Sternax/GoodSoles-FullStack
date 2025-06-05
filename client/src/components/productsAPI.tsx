import axios from 'axios';
const API_URL = 'http://localhost:8080/';

export interface Product {
  id: number;
  brand: string;
  model: string;
  price: number;
  image: string;
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>('/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw new Error('An unexpected error occurred while fetching products.');
  }
};

export const addProduct = async (
  product: Omit<Product, 'id'>,
): Promise<void> => {
  try {
    await apiClient.post('/products', product);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw new Error('An unexpected error occurred while adding the product.');
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/products/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw new Error('An unexpected error occurred while deleting the product.');
  }
};
