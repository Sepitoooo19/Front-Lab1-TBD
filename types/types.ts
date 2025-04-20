

export interface Client {
  id: number;
  name: string;
  rut: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: number
  orderDate: string
  deliveryDate: string
  status: string
  products: number
  totalPrice: number
}