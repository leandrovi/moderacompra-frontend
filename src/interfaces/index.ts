export interface Behaviour {
  id?: string;
  description: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password_hash?: string;
  created_at: Date;
  updated_at: Date;
  picture?: string;
  id_behaviour?: Behaviour;
}

export interface Status {
  id?: string;
  description: "pendente" | "em aberto" | "finalizada";
}

export interface Unity {
  id?: string;
  description: string;
}

export interface Product {
  id?: string;
  name: string;
}

export interface ProductQuantity {
  id?: string;
  list_id?: string;
  ListId?: string;
  initial_quantity: number;
  final_quantity?: number;
  suggestion_quantity?: number;
  unity: Unity;
  id_unity?: string;
  product_id?: string;
  product?: Product;
  createdAt?: Date;
  updatedAt?: Date;
  checked?: boolean;
}

export interface List {
  id: string;
  user_id: string;
  id_status?: number;
  status: Status;
  product_quantities?: ProductQuantity[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ScrappedProduct {
  description: string;
  code: string;
  quantity: number;
  unity_measure: string;
  unitary_value: number;
}
