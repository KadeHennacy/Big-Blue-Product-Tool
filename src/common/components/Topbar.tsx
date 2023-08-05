import React, { useContext } from "react";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { ColorModeContext } from "../../../theme";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const buttonStyle = {
    fontSize: "0.75rem",
    width: "130px",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "12px",
    padding: "5px",
    marginX: "5px",
    backgroundColor: theme.palette.primary.light,
  };

  const renderButtons = () => {
    switch (location.pathname) {
      case "/":
        return (
          <>
            <Button
              color="inherit"
              sx={buttonStyle}
              onClick={() => navigate("/product")}
            >
              Start New Lot
            </Button>
            <Button
              color="inherit"
              sx={buttonStyle}
              onClick={() => navigate("/browse")}
            >
              Browse Lots
            </Button>
          </>
        );
      case "/product":
        return (
          <Button
            color="inherit"
            sx={buttonStyle}
            onClick={() => navigate("/lot")}
          >
            <ArrowBackIosIcon /> Lot Overview
          </Button>
        );
      case "/lot":
        return (
          <>
            <Button
              color="inherit"
              sx={buttonStyle}
              onClick={() => navigate("/browse")}
            >
              <ArrowBackIosIcon /> Browse Lots
            </Button>
            <Button color="inherit" sx={buttonStyle}>
              Submit
            </Button>
          </>
        );
      case "/browse":
        return (
          <Button
            color="inherit"
            sx={buttonStyle}
            onClick={() => navigate("/product")}
          >
            New Lot
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar
        style={{ justifyContent: "space-around", padding: "0", fontSize: 12 }}
      >
        <IconButton onClick={() => navigate("/")}>
          <HomeOutlinedIcon />
        </IconButton>
        <div>{renderButtons()}</div>
        <div>
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
