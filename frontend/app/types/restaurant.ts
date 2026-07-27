export interface Restaurant {
  id: string;
  name: string;
  ownerId?: string;
  settings?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}
