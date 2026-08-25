export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Message {
  id: number;
  content: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  user?: User;
  messages?: Message[];
}
