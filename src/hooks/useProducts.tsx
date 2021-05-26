import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import { Product, ScrappedProduct } from "../interfaces";

interface AddProductToCurrentList {
  oldProduct: Product;
  newProduct: Product;
}

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  products: Product[];
  currentListProducts: Product[];

  updateFirstListProducts: (scrappedProducts: ScrappedProduct[]) => void;

  addProductToCurrentList: ({
    oldProduct,
    newProduct,
  }: AddProductToCurrentList) => void;

  removeProductFromCurrentList: (product: Product) => void;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]); // Empty in first list
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

  const addProductToCurrentList = ({
    oldProduct,
    newProduct,
  }: AddProductToCurrentList) => {
    const updatedProducts = [...products];
    const updatedCurrentProducts = [...currentListProducts];

    // We check if is a new product, not persisted in the database yet
    const newProductExists = updatedProducts.find(
      (item) => item.name === newProduct.name
    );

    // If the old product exists, is an update.. if not, is a new product
    const currentProductExists = updatedCurrentProducts.find(
      (item) => item.name === oldProduct.name
    );

    if (!newProductExists) {
      updatedProducts.push(newProduct);
      setProducts(updatedProducts);
    }

    if (currentProductExists) {
      const index = updatedCurrentProducts.indexOf(currentProductExists);
      updatedCurrentProducts[index] = newProduct;
    } else {
      updatedCurrentProducts.push(newProduct);
    }

    setCurrentListProducts(updatedCurrentProducts);
  };

  const removeProductFromCurrentList = (product: Product) => {
    const updatedCurrentProducts = [...currentListProducts];
    updatedCurrentProducts.splice(updatedCurrentProducts.indexOf(product));
    setCurrentListProducts(updatedCurrentProducts);

    console.log("Product Removed:", product);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        currentListProducts,
        updateFirstListProducts,
        addProductToCurrentList,
        removeProductFromCurrentList,
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
