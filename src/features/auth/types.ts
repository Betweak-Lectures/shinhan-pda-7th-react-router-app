export interface SignupPayload {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupFormData extends SignupPayload {
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export type LoginFormData = LoginPayload;
