const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

type ApiErrorItem = {
  field?: string;
  message: string;
};

type ApiErrorBody = {
  message?: string;
  errors?: ApiErrorItem[];
};

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const body = json as ApiErrorBody | null;
    if (body?.errors?.length) {
      const details = body.errors.map((item) => item.message).join(" ");
      throw new Error(details || body.message || "Request failed.");
    }
    throw new Error(body?.message || response.statusText || "Request failed.");
  }

  return json as T;
}
