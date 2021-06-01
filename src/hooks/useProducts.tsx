import React, { createContext, ReactNode, useContext, useState } from "react";

import { Product, ProductQuantity, ScrappedProduct } from "../interfaces";
import { useAxios } from "./useAxios";

interface AddProductToCurrentList {
  oldProduct: Product;
  newProduct: Product;
}

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  products: Product[];
  fetchProducts: () => Promise<void>;
  verifyNewProducts: (productQuantities: ProductQuantity[]) => Product[];
  createBatchProducts: (newProducts: Product[]) => Promise<Product[]>;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const api = await useAxios();

    const response = await api.get("products");
    setProducts(response.data.rows);
  };

  const verifyNewProducts = (productQuantities: ProductQuantity[]) => {
    const incomingProducts = productQuantities.map(
      (item) => item.product as Product
    );

    const newProducts: Product[] = [];

    incomingProducts.map((incomingProduct) => {
      const productExists = products.find(
        (product) => product.name === incomingProduct.name
      );

      if (!productExists) {
        newProducts.push(incomingProduct);
      }
    });

    return newProducts;
  };

  const createBatchProducts = async (
    newProducts: Product[]
  ): Promise<Product[]> => {
    try {
      const api = await useAxios();

      const response = await api.post("/products/batch", newProducts);
      const updatedProducts = [...products, ...response.data];

      setProducts(updatedProducts);

      return updatedProducts;
    } catch (err) {
      console.log(err);
      throw Error("Erro ao salvar os produtos da lista");
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        verifyNewProducts,
        createBatchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  return context;
}
