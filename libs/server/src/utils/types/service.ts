export interface ServiceResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  data?: T | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
}
