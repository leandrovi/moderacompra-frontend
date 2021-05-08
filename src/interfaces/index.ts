export interface Behaviour {
  id: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  id_behaviour: string;
}

export interface Status {
  id: string;
  description: "pending" | "open" | "closed";
}

export interface List {
  id: string;
  user_id: string;
  status_id: string;
}

export interface Product {
  id: string;
  name: string;
}

export interface Unity {
  id: string;
  description: string;
}

export interface ProductsQuantity {
  id: string;
  list_id: string;
  product_id: string;
  initial_quantity: number;
  final_quantity?: number;
  suggestion_quantity?: number;
  id_unity: string;
}
