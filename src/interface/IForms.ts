import { AlertColor } from "@mui/material";

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ContentRegistrerProps {
  showSnackbar: (message: string, severity: AlertColor) => void;
}
