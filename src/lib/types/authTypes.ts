export interface LoginResponse {
  refresh: string;
  access: string;
  user_uuid: string;
  email_verified: boolean;
  is_staff: boolean;
}
