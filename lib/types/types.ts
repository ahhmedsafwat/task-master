// Response type definition for better type safety
export interface AuthResponse {
  status: "error" | "success" | null;
  message: string | null;
  errors?: Record<string, string[]>;
  redirectTo?: string;
}
