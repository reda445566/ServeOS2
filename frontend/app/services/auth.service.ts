import { apiRequest } from "./api";

export interface RegisterOwnerPayload {
  restaurantName: string;
  ownerEmail: string;
  ownerPassword: string;
  branchName: string;
}

type AuthApiData = {
  user?: {
    id: string;
    email: string;
    role: string;
    restaurantId?: string | null;
    branchId?: string | null;
  };
  token?: string;
};

type AuthApiResponse = {
  success: boolean;
  message: string;
  data: AuthApiData;
};

export const authService = {
  login: async (email: string, password: string) => {
    const result = await apiRequest<AuthApiResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return result.data;
  },

  register: async (payload: RegisterOwnerPayload) => {
    const result = await apiRequest<AuthApiResponse>("/api/auth/register-owner", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return result.data;
  },

  getCurrentUser: async () => {
    const result = await apiRequest<{ success: boolean; data: { user: AuthApiData["user"] } }>("/api/auth/me");
    return result.data.user;
  },
};
