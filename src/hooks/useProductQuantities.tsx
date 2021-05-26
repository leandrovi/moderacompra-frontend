import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useProducts } from "./useProducts";

import { Product, ProductQuantity, ScrappedProduct } from "../interfaces";

interface UpdateProductQuantityAmount {
  amount: number;
  name: string;
}

interface UpdateProductQuantityCheck {
  checked: boolean;
  name: string;
}

interface ProductQuantitiesProviderProps {
  children: ReactNode;
}

interface UpdateSingleProduct {
  initialName: string;
  selectedName: string;
  quantity: number;
  unity: string;
}

interface ProductQuantitiesContextData {
  productQuantities: ProductQuantity[];
  count: number;

  updateFirstListProductQuantities: (
    scrappedProducts: ScrappedProduct[]
  ) => void;

  updateProductQuantityAmount: ({
    amount,
    name,
  }: UpdateProductQuantityAmount) => void;

  updateProductQuantityCheck: ({
    checked,
    name,
  }: UpdateProductQuantityCheck) => void;

  updateSingleProduct: ({
    initialName,
    selectedName,
    quantity,
    unity,
  }: UpdateSingleProduct) => void;
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

  const { addProductToCurrentList } = useProducts();

  const updateFirstListProductQuantities = (
    scrappedProducts: ScrappedProduct[]
  ) => {
    const productQuantities: ProductQuantity[] = [];

    for (let scrappedProduct of scrappedProducts) {
      const initial_quantity = scrappedProduct.quantity;
      const unity = { description: scrappedProduct.unity_measure.trim() };
      const product = { name: scrappedProduct.description.trim() };

      const productQuantity = {
        initial_quantity,
        unity,
        product,
        checked: false,
      };
      productQuantities.push(productQuantity);
    }

    setProductQuantities(productQuantities);
    setCount(productQuantities.length);
  };

  const updateProductQuantityAmount = ({
    amount,
    name,
  }: UpdateProductQuantityAmount) => {
    if (amount <= 0) return;

    const updatedProductQuantities = [...productQuantities];

    const productQuantityExists = updatedProductQuantities.find(
      (item) => item.product?.name === name
    );

    if (productQuantityExists) {
      productQuantityExists.initial_quantity = amount;
      setProductQuantities(updatedProductQuantities);
    } else {
      throw Error("Erro na alteração de quantidade do produto");
    }
  };

  const updateProductQuantityCheck = ({
    checked,
    name,
  }: UpdateProductQuantityCheck) => {
    const updatedProductQuantities = [...productQuantities];

    const productQuantityExists = updatedProductQuantities.find(
      (item) => item.product?.name === name
    );

    if (productQuantityExists) {
      productQuantityExists.checked = checked;
      setProductQuantities(updatedProductQuantities);
    } else {
      throw Error("Erro na alteração de quantidade do produto");
    }
  };

  const updateSingleProduct = ({
    initialName,
    selectedName,
    quantity,
    unity,
  }: UpdateSingleProduct) => {
    const updatedProductQuantities = [...productQuantities];

    const productQuantityExists = updatedProductQuantities.find(
      (item) => item.product?.name === initialName
    );

    if (productQuantityExists) {
      const index = updatedProductQuantities.indexOf(productQuantityExists);

      if (initialName !== selectedName) {
        productQuantityExists.product = {
          name: selectedName,
        };

        addProductToCurrentList({
          oldProduct: {
            name: initialName,
          },
          newProduct: {
            name: selectedName,
          },
        });
      }

      productQuantityExists.initial_quantity = quantity;
      productQuantityExists.unity = {
        description: unity,
      };

      updatedProductQuantities[index] = productQuantityExists;
    } else {
      updatedProductQuantities.push({
        initial_quantity: quantity,
        unity: {
          description: unity,
        },
        product: {
          name: selectedName,
        },
        checked: false,
      });
    }

    setProductQuantities(updatedProductQuantities);
  };

  return (
    <ProductQuantitiesContext.Provider
      value={{
        productQuantities,
        updateFirstListProductQuantities,
        count,
        updateProductQuantityAmount,
        updateProductQuantityCheck,
        updateSingleProduct,
      }}
    >
      {children}
    </ProductQuantitiesContext.Provider>
  );
}

export function useProductQuantities() {
  const context = useContext(ProductQuantitiesContext);
  return context;
}
