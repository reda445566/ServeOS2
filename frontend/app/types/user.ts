export type UserRole = "OWNER" | "MANAGER" | "CASHIER" | "WAITER" | "CHEF";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  restaurantId: string;
  branchId?: string;
  createdAt?: string;
  updatedAt?: string;
}
