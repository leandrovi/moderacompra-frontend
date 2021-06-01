import React, { createContext, ReactNode, useContext, useState } from "react";

import {
  List,
  Product,
  ProductQuantity,
  ScrappedProduct,
  Unity,
} from "../interfaces";
import { useAxios } from "./useAxios";

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
  isFirstList: boolean;
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
  updateFinalProductQuantities: (productQttts: ProductQuantity[]) => void;
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
      const unity = {
        description: scrappedProduct.unity_measure.trim().toLowerCase(),
      };
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
    const updatedProductQuantities = [...newProductQuantities];

    const productQuantityExists = updatedProductQuantities.find(
      (item) => item.product?.name === name
    );

    if (productQuantityExists) {
      productQuantityExists.checked = checked;
      setNewProductQuantities(updatedProductQuantities);

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
    const api = await useAxios();

    const response = await api.get(
      `/product-quantities/lists/${list_id}?order=created_at,desc`
    );

    const normalizedProductQuantities = response.data.rows.map((item: any) => ({
      ...item,
      checked: false,
    }));

    if (normalizedProductQuantities !== productQuantities) {
      setProductQuantities(normalizedProductQuantities);
      setNewProductQuantities(normalizedProductQuantities);
      setCount(normalizedProductQuantities.length);
      setAllChecked(false);
    }
  };

  const createBatchProductQuantities = async ({
    list,
    products,
  }: CreateBatchProductQuantities) => {
    const api = await useAxios();

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
          initial_quantity: Number(productQuantity.initial_quantity),
          unity: productQuantity.unity,
        };

        createProductQuantitiesPayload.push(payloadItem);
      }

      const response = await api.post(
        "/product-quantities/batch",
        createProductQuantitiesPayload
      );

      const normalizedProductQuantities = response.data.map(
        (item: ProductQuantity) => {
          const fullProduct = products.find(
            (product) => product.id === item.product_id
          );

          const productQuantity = createProductQuantitiesPayload.find(
            (payload) => payload.product_id === item.product_id
          );

          return {
            ...item,
            product: fullProduct,
            unity: {
              id: item.id_unity,
              description: productQuantity?.unity.description,
            },
            checked: false,
          };
        }
      );

      setNewProductQuantities(normalizedProductQuantities);
      setProductQuantities(normalizedProductQuantities);
      setCount(normalizedProductQuantities.length);
      setAllChecked(false);
    } catch (err) {
      console.log(err);
      throw Error("Não foi possível salvar os produtos da lista.");
    }
  };

  const generateSuggestions = async (): Promise<ProductQuantity[]> => {
    try {
      const api = await useAxios();

      const consideredProducts = [...newProductQuantities];
      const normalized = consideredProducts.map((productQuantity) => {
        return {
          id: productQuantity.id as string,
          list_id: productQuantity.list_id as string,
          product_id: productQuantity.product_id as string,
          name: productQuantity.product?.name as string,
          initial_quantity: Number(productQuantity.initial_quantity),
          suggestion_quantity: Number(productQuantity.suggestion_quantity),
          final_quantity: Number(productQuantity.final_quantity),
          unity: productQuantity.unity,
        };
      });

      const response = await api.put("/product-quantities/close", normalized);

      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const updateProductQuantities = async (productQtts: ProductQuantity[]) => {
    setProductQuantities(productQtts);
    setNewProductQuantities(productQtts);
    setCount(productQtts.length);
    setAllChecked(false);
  };

  const updateFinalProductQuantities = async (
    productQtts: ProductQuantity[]
  ) => {
    const pQuantities = [...newProductQuantities];

    const normalizedProductQuantities: ProductQuantity[] = pQuantities.map(
      (item) => {
        const productQuantity = productQtts.find(
          (productQtt) => productQtt.id === item.id
        ) as ProductQuantity;

        return {
          ...productQuantity,
          initial_quantity: Number(productQuantity.initial_quantity),
          final_quantity: Number(productQuantity.final_quantity),
          suggestion_quantity: Number(productQuantity.suggestion_quantity),
          product: item.product,
          unity: item.unity,
        };
      }
    );

    setProductQuantities(normalizedProductQuantities);
    setNewProductQuantities(normalizedProductQuantities);
    setCount(normalizedProductQuantities.length);
    setAllChecked(false);
  };

  const updateNewProductQuantities = (newProductQtts: ProductQuantity[]) => {
    setNewProductQuantities(newProductQtts);
    setAllChecked(false);
  };

  const useSuggestedProductQuantitiesForNewList = () => {
    const currentProductQuantities = [...productQuantities];

    const suggestedProductQuantities: ProductQuantity[] =
      currentProductQuantities.map(
        (productQuantity) =>
          ({
            initial_quantity: Number(productQuantity.suggestion_quantity),
            suggestion_quantity: 0,
            final_quantity: 0,
            product: productQuantity.product,
            unity: productQuantity.unity,
            checked: false,
          } as ProductQuantity)
      );

    setNewProductQuantities(suggestedProductQuantities);
    setAllChecked(false);
  };

  const addSingleProductQuantity = ({
    product,
    quantity,
    unity,
  }: AddSingleProductQuantity) => {
    const updatedNewProductQuantities = [...newProductQuantities];

    updatedNewProductQuantities.push({
      initial_quantity: Number(quantity),
      unity: { description: unity },
      product,
      checked: false,
    });

    setNewProductQuantities(updatedNewProductQuantities);
    setAllChecked(false);
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
        ...productQuantityExists,
        initial_quantity: Number(quantity),
        unity: { description: unity },
        product: product !== newProduct ? newProduct : product,
        checked: false,
      };
    }

    setNewProductQuantities(updatedNewProductQuantities);
    setAllChecked(false);
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
        checked: false,
      };
    }

    setNewProductQuantities(updatedNewProductQuantities);
    setAllChecked(false);
  };

  const updateBatchProductQuantities = async (products: Product[]) => {
    const api = await useAxios();

    const updatedProductQuantities = [...newProductQuantities];
    const updateProductQuantitiesPayload: UpdateProductQuantityPayload[] = [];

    console.log(
      "Updated New Product Quantities inside Batch:",
      updatedProductQuantities
    );

    for (const productQuantity of updatedProductQuantities) {
      const product = products.find(
        (item) => item.name === productQuantity.product?.name
      );

      const payloadItem: UpdateProductQuantityPayload = {
        id: productQuantity.id as string,
        list_id: productQuantity.list_id as string,
        product_id: product
          ? (product.id as string)
          : (productQuantity.product_id as string),
        name: product
          ? (product.name as string)
          : (productQuantity.product?.name as string),
        initial_quantity: Number(productQuantity.initial_quantity),
        unity: productQuantity.unity,
      };

      updateProductQuantitiesPayload.push(payloadItem);
    }

    const response = await api.put(
      "/product-quantities/batch",
      updateProductQuantitiesPayload
    );

    const normalizedProductQuantities = response.data.map(
      (item: ProductQuantity) => {
        const fullProduct = products.find(
          (product) => product.id === item.product_id
        );

        const productQuantity = updateProductQuantitiesPayload.find(
          (payload) => payload.product_id === item.product_id
        );

        return {
          ...item,
          product: fullProduct,
          unity: {
            id: item.id_unity,
            description: productQuantity?.unity.description,
          },
          checked: false,
        };
      }
    );

    setAllChecked(false);
    setNewProductQuantities(normalizedProductQuantities);
    setProductQuantities(normalizedProductQuantities);
    setCount(normalizedProductQuantities.length);
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
        updateFinalProductQuantities,
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
