export  interface CompleteProfileData {
  email: string;
  phone: string;
  password?: string;
}

export interface CompleteProfileResult {
  success: boolean;
  error?: string;
  fieldErrors?: {
    phone?: string;
    password?: string;
  };
}