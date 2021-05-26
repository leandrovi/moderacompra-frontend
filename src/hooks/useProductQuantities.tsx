import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useProducts } from "./useProducts";

import { ProductQuantity, ScrappedProduct } from "../interfaces";

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

  removeProductQuantity: (productQuantity: ProductQuantity) => void;
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

  const { addProductToCurrentList, removeProductFromCurrentList } =
    useProducts();

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

    // If the product already exists in our list, we update it
    if (productQuantityExists) {
      const index = updatedProductQuantities.indexOf(productQuantityExists);

      if (initialName !== selectedName) {
        productQuantityExists.product = {
          name: selectedName,
        };
      }

      productQuantityExists.initial_quantity = quantity;
      productQuantityExists.unity = {
        description: unity,
      };

      updatedProductQuantities[index] = productQuantityExists;
    } else {
      // If not, we push it to the list
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

    // Either we update it or push it, we update our products state
    addProductToCurrentList({
      oldProduct: {
        name: initialName,
      },
      newProduct: {
        name: selectedName,
      },
    });

    setProductQuantities(updatedProductQuantities);
  };

  const removeProductQuantity = (productQuantity: ProductQuantity) => {
    const updatedProductQuantities = [...productQuantities];

    const productQuantityExists = updatedProductQuantities.find(
      (item) => item.product?.name === productQuantity.product?.name
    );

    const index = updatedProductQuantities.indexOf(productQuantity);

    if (productQuantityExists) {
      updatedProductQuantities.splice(index, 1);
    }

    setProductQuantities(updatedProductQuantities);

    if (productQuantity.product) {
      removeProductFromCurrentList(productQuantity.product);
    }
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
        removeProductQuantity,
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
