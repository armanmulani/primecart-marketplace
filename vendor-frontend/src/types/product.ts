export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    brand: string;
    thumbnail: string;
    images: string[];
    discountPercentage: number;
    rating: number;
    stock: number;
  }
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface ProductFilters {
    searchTerm: string;
    selectedCategory: string;
    sortBy: string;
  }