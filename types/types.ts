

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
  clientId: Client
  dealerId: Dealer
  totalPrice: number
}

export interface Dealer {
  id: number
  name: string
  rut: string
  phone: string
  email: string
  plate: string
  vehicle: string
}

export interface Company {
  id: number
  name: string
  phone: string
  email: string
 
}