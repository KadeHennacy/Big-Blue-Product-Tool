import React, { useContext } from "react";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { ColorModeContext } from "../../../theme";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useTheme } from "@mui/material/styles";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const buttonStyle = {
    fontSize: "0.75rem",
    width: "140px",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "12px",
    padding: "10px",
    backgroundColor: theme.palette.primary.light,
  };

  return (
    <AppBar position="static">
      <Toolbar
        style={{ justifyContent: "space-around", padding: "0", fontSize: 12 }}
      >
        <div>
          <Button color="inherit" sx={buttonStyle}>
            Browse Previous Lots
          </Button>
        </div>
        <div>
          <Button color="inherit" sx={{ ...buttonStyle, marginRight: 1 }}>
            Start New Lot
          </Button>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
