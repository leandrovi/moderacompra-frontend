import React, { createContext, ReactNode, useContext, useState } from "react";

import {
  List,
  Product,
  ProductQuantity,
  ScrappedProduct,
  Unity,
} from "../interfaces";

import api from "../services/api";

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
  final_quantity?: number;
}

interface CreateBatchProductQuantities {
  list: List;
  products: Product[];
}

interface CreateProductQuantityPayload {
  list_id: string;
  product_id: string;
  name: string;
  initial_quantity: number;
  unity: Unity;
}

interface ProductQuantitiesContextData {
  productQuantities: ProductQuantity[];
  newProductQuantities: ProductQuantity[];
  count: number;
  allChecked: boolean;

  generateScrappedProductQuantities: (
    scrappedProducts: ScrappedProduct[]
  ) => ProductQuantity[];

  updateNewProductQuantityAmount: ({
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

  createBatchProductQuantities: ({
    list,
    products,
  }: CreateBatchProductQuantities) => Promise<void>;

  fetchProductQuantities: (list_id: string) => Promise<void>;

  generateSuggestions: () => Promise<ProductQuantity[]>;

  updateProductQuantities: (productQttts: ProductQuantity[]) => void;
  updateNewProductQuantities: (productQttts: ProductQuantity[]) => void;
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
  const [newProductQuantities, setNewProductQuantities] = useState<
    ProductQuantity[]
  >([]);

  const [count, setCount] = useState(0);
  const [allChecked, setAllChecked] = useState(false);

  const generateScrappedProductQuantities = (
    scrappedProducts: ScrappedProduct[]
  ) => {
    const newProductQtts: ProductQuantity[] = [];

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

      newProductQtts.push(productQuantity);
    }

    return newProductQtts;
  };

  const updateNewProductQuantityAmount = ({
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

      if (checked === false) {
        setAllChecked(false);
      }
    } else {
      throw Error("Erro na alteração de quantidade do produto");
    }

    const uncheckedProducts = updatedProductQuantities.find(
      (item) => !item.checked
    );

    if (!uncheckedProducts) {
      setAllChecked(true);
    }
  };

  const updateSingleProduct = ({
    initialName,
    selectedName,
    quantity,
    unity,
    final_quantity = 0,
  }: UpdateSingleProduct) => {
    console.log("vou atualizar...");
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
      productQuantityExists.final_quantity = final_quantity;

      updatedProductQuantities[index] = productQuantityExists;
      console.log(updatedProductQuantities);
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
        final_quantity,
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

  const fetchProductQuantities = async (list_id: string) => {
    const response = await api.get(
      `/product-quantities/lists/${list_id}?order=created_at,desc`
    );

    if (response.data !== productQuantities) {
      setProductQuantities(response.data.rows);
    }
  };

  const createBatchProductQuantities = async ({
    list,
    products,
  }: CreateBatchProductQuantities) => {
    try {
      const currentProductQuantities = [...productQuantities];
      const createProductQuantitiesPayload: CreateProductQuantityPayload[] = [];

      for (const productQuantity of currentProductQuantities) {
        const product = products.find(
          (item) => item.name === productQuantity.product?.name
        ) as Product;

        const payloadItem: CreateProductQuantityPayload = {
          list_id: list.id as string,
          product_id: product.id as string,
          name: product.name,
          initial_quantity: productQuantity.initial_quantity,
          unity: productQuantity.unity,
        };

        createProductQuantitiesPayload.push(payloadItem);
      }

      const response = await api.post(
        "/product-quantities/batch",
        createProductQuantitiesPayload
      );

      setProductQuantities(response.data);
      setCount(response.data.length);
    } catch (err) {
      console.log(err);
      throw Error("Não foi possível salvar os produtos da lista.");
    }
  };

  const generateSuggestions = async (): Promise<ProductQuantity[]> => {
    const response = await api.put(
      "/product-quantities/close",
      productQuantities
    );
    return response.data;
  };

  const updateProductQuantities = async (productQtts: ProductQuantity[]) => {
    setProductQuantities(productQtts);
    setCount(productQtts.length);
  };

  const updateNewProductQuantities = async (
    newProductQtts: ProductQuantity[]
  ) => {
    setNewProductQuantities(newProductQtts);
  };

  return (
    <ProductQuantitiesContext.Provider
      value={{
        productQuantities,
        newProductQuantities,
        count,
        allChecked,
        generateScrappedProductQuantities,
        updateNewProductQuantityAmount,
        updateProductQuantityCheck,
        updateSingleProduct,
        removeProductQuantity,
        createBatchProductQuantities,
        fetchProductQuantities,
        generateSuggestions,
        updateProductQuantities,
        updateNewProductQuantities,
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
