import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface CustomSnackbarProps {
  snackbar: SnackbarState;
  onClose: () => void;
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  snackbar,
  onClose,
}) => {
  return (
    <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export const useSnackbar = (initialState?: Partial<SnackbarState>) => {
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
    ...initialState,
  });

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
};
