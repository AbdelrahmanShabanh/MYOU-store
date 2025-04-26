export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface RootState {
  cart: {
    items: CartItem[];
    total: number;
  };
  wishlist: {
    items: WishlistItem[];
  };
  ui: {
    cartOpen: boolean;
    wishlistOpen: boolean;
    mobileMenuOpen: boolean;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  features?: string[];
  isSoldOut?: boolean;
} 