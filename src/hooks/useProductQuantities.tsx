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

interface UpdateProductQuantityPayload {
  id: string;
  list_id: string;
  product_id: string;
  name: string;
  initial_quantity: number;
  unity: Unity;
}

interface AddSingleProductQuantity {
  product: Product;
  quantity: number;
  unity: string;
}

interface UpdateSingleProductQuantity {
  product: Product;
  newProduct: Product;
  quantity: number;
  unity: string;
}

interface UpdateSingleProductFinalQuantity {
  id: string;
  final_quantity: number;
}

interface ProductQuantitiesProviderProps {
  children: ReactNode;
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

  removeProductQuantity: (productQuantity: ProductQuantity) => void;

  createBatchProductQuantities: ({
    list,
    products,
  }: CreateBatchProductQuantities) => Promise<void>;

  fetchProductQuantities: (list_id: string) => Promise<void>;
  generateSuggestions: () => Promise<ProductQuantity[]>;
  updateProductQuantities: (productQttts: ProductQuantity[]) => void;
  updateNewProductQuantities: (productQttts: ProductQuantity[]) => void;
  useSuggestedProductQuantitiesForNewList: () => void;
  addSingleProductQuantity: (data: AddSingleProductQuantity) => void;
  updateSingleProductQuantity: (data: UpdateSingleProductQuantity) => void;

  updateSingleProductFinalQuantity: (
    data: UpdateSingleProductFinalQuantity
  ) => void;

  updateBatchProductQuantities: (products: Product[]) => Promise<void>;
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

    const updatedProductQuantities = [...newProductQuantities];

    const productQuantityExists = updatedProductQuantities.find(
      (item) => item.product?.name === name
    );

    if (productQuantityExists) {
      productQuantityExists.initial_quantity = amount;
      setNewProductQuantities(updatedProductQuantities);
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
      throw Error("Erro ao marcar produto como finalizado");
    }

    const uncheckedProducts = updatedProductQuantities.find(
      (item) => !item.checked
    );

    if (!uncheckedProducts) {
      setAllChecked(true);
    }
  };

  const removeProductQuantity = (productQuantity: ProductQuantity) => {
    const updatedProductQuantities = [...newProductQuantities];

    const productQuantityExists = updatedProductQuantities.find(
      (item) => item.product?.name === productQuantity.product?.name
    );

    const index = updatedProductQuantities.indexOf(productQuantity);

    if (productQuantityExists) {
      updatedProductQuantities.splice(index, 1);
    }

    setNewProductQuantities(updatedProductQuantities);
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
      const currentProductQuantities = [...newProductQuantities];
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
      setNewProductQuantities([]);
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

  const updateNewProductQuantities = (newProductQtts: ProductQuantity[]) => {
    setNewProductQuantities(newProductQtts);
  };

  const useSuggestedProductQuantitiesForNewList = () => {
    const suggestedProductQuantities: ProductQuantity[] = productQuantities.map(
      (productQuantity) =>
        ({
          initial_quantity: productQuantity.suggestion_quantity,
          suggestion_quantity: 0,
          final_quantity: 0,
          product: productQuantity.product,
          unity: productQuantity.unity,
          checked: false,
        } as ProductQuantity)
    );

    setNewProductQuantities(suggestedProductQuantities);
  };

  const addSingleProductQuantity = ({
    product,
    quantity,
    unity,
  }: AddSingleProductQuantity) => {
    const updatedNewProductQuantities = [...newProductQuantities];

    updatedNewProductQuantities.push({
      initial_quantity: quantity,
      unity: { description: unity },
      product,
    });

    setNewProductQuantities(updatedNewProductQuantities);
  };

  const updateSingleProductQuantity = ({
    product,
    newProduct,
    quantity,
    unity,
  }: UpdateSingleProductQuantity) => {
    const updatedNewProductQuantities = [...newProductQuantities];

    const productQuantityExists = updatedNewProductQuantities.find(
      (item) => item.product?.name === product.name
    );

    if (productQuantityExists) {
      const index = updatedNewProductQuantities.indexOf(productQuantityExists);

      updatedNewProductQuantities[index] = {
        initial_quantity: quantity,
        unity: { description: unity },
        product: product !== newProduct ? newProduct : product,
      };
    }

    setNewProductQuantities(updatedNewProductQuantities);
  };

  const updateSingleProductFinalQuantity = ({
    id,
    final_quantity,
  }: UpdateSingleProductFinalQuantity) => {
    const updatedNewProductQuantities = [...newProductQuantities];

    const productQuantityExists = updatedNewProductQuantities.find(
      (item) => item.id === id
    );

    if (productQuantityExists) {
      const index = updatedNewProductQuantities.indexOf(productQuantityExists);

      updatedNewProductQuantities[index] = {
        ...productQuantityExists,
        final_quantity,
      };
    }

    setNewProductQuantities(updatedNewProductQuantities);
  };

  const updateBatchProductQuantities = async (products: Product[]) => {
    const updatedProductQuantities = [...newProductQuantities];
    const updateProductQuantitiesPayload: UpdateProductQuantityPayload[] = [];

    for (const productQuantity of updatedProductQuantities) {
      const product = products.find(
        (item) => item.name === productQuantity.product?.name
      ) as Product;

      const payloadItem: UpdateProductQuantityPayload = {
        id: productQuantity.id as string,
        list_id: productQuantity.list_id as string,
        product_id: product.id as string,
        name: product.name,
        initial_quantity: productQuantity.initial_quantity,
        unity: productQuantity.unity,
      };

      updateProductQuantitiesPayload.push(payloadItem);
    }

    const response = await api.put(
      "/product-quantities/batch",
      updateProductQuantitiesPayload
    );

    setProductQuantities(response.data);
    setCount(response.data.length);
    setNewProductQuantities([]);
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
        removeProductQuantity,
        createBatchProductQuantities,
        fetchProductQuantities,
        generateSuggestions,
        updateProductQuantities,
        updateNewProductQuantities,
        useSuggestedProductQuantitiesForNewList,
        addSingleProductQuantity,
        updateSingleProductQuantity,
        updateSingleProductFinalQuantity,
        updateBatchProductQuantities,
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
