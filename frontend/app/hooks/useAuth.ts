import { useCallback, useState } from "react";
import { authService, type RegisterOwnerPayload } from "../services/auth.service";

interface LoginPayload {
  email: string;
  password: string;
}

function parseError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(payload.email, payload.password);
      return result;
    } catch (error) {
      setError(parseError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterOwnerPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.register(payload);
      return result;
    } catch (error) {
      setError(parseError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    login,
    register,
    setError,
  };
}
