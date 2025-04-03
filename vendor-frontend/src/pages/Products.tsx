import React, { useState, useEffect, ChangeEvent } from 'react';

interface Product {
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

interface ProductFilters {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
}

interface SortOptions {
  'price-low': (a: Product, b: Product) => number;
  'price-high': (a: Product, b: Product) => number;
  'rating': (a: Product, b: Product) => number;
  '': (a: Product, b: Product) => number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<ProductFilters>({
    searchTerm: '',
    selectedCategory: '',
    sortBy: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products?limit=100');
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const sortOptions: SortOptions = {
    'price-low': (a, b) => a.price - b.price,
    'price-high': (a, b) => b.price - a.price,
    'rating': (a, b) => b.rating - a.rating,
    '': () => 0
  };

  const filteredProducts: Product[] = products
    .filter(product => 
      product.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      (filters.selectedCategory ? product.category === filters.selectedCategory : true)
    )
    .sort(sortOptions[filters.sortBy as keyof SortOptions]);

  const categories: string[] = Array.from(new Set(products.map(product => product.category)));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Exclusive Products</h1>
          <p className="text-lg opacity-90">Discover our premium collection of high-quality products</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={filters.searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setFilters({ ...filters, searchTerm: e.target.value })}
              />
              <svg className="absolute right-3 top-3 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.selectedCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                setFilters({ ...filters, selectedCategory: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.sortBy}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800 truncate" title={product.title}>
                    {product.title}
                  </h2>
                  <span className="text-sm font-semibold text-indigo-600">{product.brand}</span>
                </div>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                  {product.description}
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      ${product.price}
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 fill-current ${
                              i < Math.round(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm ml-2">
                        ({product.rating})
                      </span>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300">
                    Add to Cart
                  </button>
                </div>
                {product.stock < 10 && (
                  <div className="mt-2 text-sm text-red-600">
                    Only {product.stock} left in stock!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;