import { AlertColor } from "@mui/material";

export interface ILoginFormData {
  email: string;
  password: string;
  fieldErrors: {
    email?: string;
    password?: string;
  };
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;  
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showSnackbar: (message: string, severity: AlertColor) => void;
}


export interface SocialMediaLoginProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
}