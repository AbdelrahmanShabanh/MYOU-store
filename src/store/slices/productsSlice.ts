import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [
    {
      id: 'P001',
      name: 'Floral Scarf',
      description: 'Beautiful floral pattern scarf made from soft silk',
      price: 29.99,
      image: '/images/products/scarf-1.jpg',
      category: 'Scarves',
      stock: 3
    },
    {
      id: 'P002',
      name: 'Silk Kimono',
      description: 'Elegant silk kimono with traditional Japanese design',
      price: 89.99,
      image: '/images/products/kimono-1.jpg',
      category: 'Kimonos',
      stock: 2
    },
    {
      id: 'P003',
      name: 'Cotton Hijab',
      description: 'Comfortable and breathable cotton hijab',
      price: 19.99,
      image: '/images/products/hijab-1.jpg',
      category: 'Hijabs',
      stock: 4
    },
    {
      id: 'P004',
      name: 'Embroidered Shawl',
      description: 'Hand-embroidered shawl with intricate patterns',
      price: 49.99,
      image: '/images/products/shawl-1.jpg',
      category: 'Shawls',
      stock: 1
    },
    {
      id: 'P005',
      name: 'Casual Abaya',
      description: 'Modern casual abaya with comfortable fit',
      price: 79.99,
      image: '/images/products/abaya-1.jpg',
      category: 'Abayas',
      stock: 5
    }
  ],
  loading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    updateStock: (state, action: PayloadAction<{ id: string; stock: number }>) => {
      const product = state.items.find(p => p.id === action.payload.id);
      if (product) {
        product.stock = action.payload.stock;
      }
    }
  }
});

export const { setProducts, addProduct, updateProduct, deleteProduct, updateStock } = productsSlice.actions;
export default productsSlice.reducer; 