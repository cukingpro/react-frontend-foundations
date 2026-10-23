export interface Student {
  id: number;
  name: string;
  email: string;
  score?: number;
}
export interface User {
  id: number;
  name: string;
  email: string;
}
export interface Post {
  id: number;
  title: string;
  body: string;
}
export type Product = { id: string; name: string; price: number };
export type CartItem = { product: Product; quantity: number };
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
