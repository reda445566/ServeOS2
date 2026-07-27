export interface MenuCategory {
  id: string;
  name: string;
  restaurantId: string;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  isActive: boolean;
  isSoftDeleted: boolean;
}



