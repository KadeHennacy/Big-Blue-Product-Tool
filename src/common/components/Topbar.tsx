import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import logo from "../../assets/logo.svg";
import darkLogo from "../../assets/darkLogo.svg";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();
  const colors = tokens;
  const colorMode = useContext(ColorModeContext);
  const StyledImg = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;

  return (
    <Box
      p={1}
      px={3}
      display="flex"
      justifyContent="space-between"
      backgroundColor={theme.palette.primary.dark}
      boxShadow={location.pathname === "/login" ? 5 : 0}
      borderBottom={`2px solid ${theme.palette.primary.light}`}
    >
      <Box
        display="flex"
        maxHeight={50}
        sx={{ width: "50%", objectFit: "contain" }}
      >
        {/* here is a link to / */}
        <Link to="/">
          <StyledImg
            src={theme.palette.mode === "dark" ? logo : darkLogo}
            alt="logo"
          />
        </Link>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {token ? (
          <>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>{" "}
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
