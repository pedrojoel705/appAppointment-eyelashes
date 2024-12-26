import React from "react";
import { Button } from "@mui/material";

interface ContainedButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

const ContainedButton: React.FC<ContainedButtonProps> = ({
  onClick,
  disabled = false,
  label,
}) => {
  return (
    <Button
      variant='contained'
      onClick={onClick}
      disabled={disabled}
      sx={{
        mt: 2,
        width: {
          xs: "60%",
          sm: "30%",
        },
        backgroundColor: "#c4b8b0",
        ":hover": { backgroundColor: "#a08d81" },
      }}>
      {label}
    </Button>
  );
};

export default ContainedButton;
