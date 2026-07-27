export type OrderType = "DINE_IN" | "TAKEAWAY" | "DELIVERY";
export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "SERVED" | "CANCELLED";
export type PaymentMethod = "CASH" | "CARD" | "WALLET";

export interface OrderItem {
  id: string;
  menuItemId: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  branchId: string;
  tableId?: string;
  creatorId: string;
  waiterId?: string;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  deliveryFee?: number;
  subtotal?: number;
  tax?: number;
  serviceCharge?: number;
  total?: number;
  items: OrderItem[];
}
