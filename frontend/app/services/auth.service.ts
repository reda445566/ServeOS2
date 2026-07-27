const handleResponse = async (response: Response) => {
  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const message = json?.message || response.statusText || "Request failed.";
    throw new Error(message);
  }

  return json;
};

export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    return handleResponse(response);
  },
  register: async (payload: unknown) => {
    const response = await fetch("/api/auth/register-owner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  },
};
