import { Snackbar, Alert } from "@mui/material";
import { SnackbarState } from "@/hooks/useSnackbar";



interface CustomSnackbarProps {
  snackbar: SnackbarState;
  onClose: () => void;
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  snackbar,
  onClose,
}) => {
  return (
    <Snackbar 
      open={snackbar.open} 
      autoHideDuration={6000} 
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};
