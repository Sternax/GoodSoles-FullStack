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
