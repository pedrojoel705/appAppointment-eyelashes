import { Button } from "@mui/material";

interface ContainedButtonProps {
  accionText: string;
  text: string;
  loading: boolean;
}

export const ButtonContained = ({ loading, accionText, text }: ContainedButtonProps) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginLeft: "25%",
      }}
      disabled={loading}
    >
      {loading ? accionText : text}
    </Button>
  );
};


