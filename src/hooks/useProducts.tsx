import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import { Product, ScrappedProduct } from "../interfaces";

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  products: Product[];
  currentListProducts: Product[];
  updateFirstListProducts: (scrappedProducts: ScrappedProduct[]) => void;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentListProducts, setCurrentListProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get("products");
      setProducts(response.data.rows);
    }

    fetchProducts();
  }, []);

  const updateFirstListProducts = (productList: ScrappedProduct[]) => {
    const products: Product[] = [];

    for (let product of productList) {
      const name = product.description.trim();
      products.push({ name });
    }

    setCurrentListProducts(products);
  };

  return (
    <ProductsContext.Provider
      value={{ products, currentListProducts, updateFirstListProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  return context;
}
