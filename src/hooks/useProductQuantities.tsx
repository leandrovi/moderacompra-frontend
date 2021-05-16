import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useProducts } from "./useProducts";

import { Product, ProductQuantity, ScrappedProduct } from "../interfaces";

interface ProductQuantitiesProviderProps {
  children: ReactNode;
}

interface ProductQuantitiesContextData {
  productQuantities: ProductQuantity[];
  count: number;
  updateFirstListProductQuantities: (
    scrappedProducts: ScrappedProduct[]
  ) => void;
}

const ProductQuantitiesContext = createContext<ProductQuantitiesContextData>(
  {} as ProductQuantitiesContextData
);

export function ProductQuantitiesProvider({
  children,
}: ProductQuantitiesProviderProps) {
  const [productQuantities, setProductQuantities] = useState<ProductQuantity[]>(
    []
  );
  const [count, setCount] = useState(0);

  const updateFirstListProductQuantities = (
    scrappedProducts: ScrappedProduct[]
  ) => {
    const productQuantities: ProductQuantity[] = [];

    for (let scrappedProduct of scrappedProducts) {
      const initial_quantity = scrappedProduct.quantity;
      const unity = { description: scrappedProduct.unity_measure.trim() };
      const product = { name: scrappedProduct.description.trim() };

      const productQuantity = { initial_quantity, unity, product };
      productQuantities.push(productQuantity);
    }

    setProductQuantities(productQuantities);
    setCount(productQuantities.length);
  };

  return (
    <ProductQuantitiesContext.Provider
      value={{ productQuantities, updateFirstListProductQuantities, count }}
    >
      {children}
    </ProductQuantitiesContext.Provider>
  );
}

export function useProductQuantities() {
  const context = useContext(ProductQuantitiesContext);
  return context;
}
