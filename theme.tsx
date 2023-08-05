import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material";

export const tokens = {
  grey: {
    100: "#303030",
    200: "#444444",
    300: "#8f8f8f",
    400: "#bebebe",
    500: "#eeeeee",
    600: "#f1f1f1",
    700: "#f5f5f5",
    800: "#f8f8f8",
    900: "#ffffff",
  },
  indigo: {
    100: "#d7dadb",
    200: "#b0b4b7",
    300: "#888f93",
    400: "#61696f",
    500: "#39444b",
    600: "#2e363c",
    700: "#22292d",
    800: "#171b1e",
    900: "#0b0e0f",
  },
  success: {
    100: "#e6f0db",
    200: "#cde1b7",
    300: "#b4d192",
    400: "#9bc26e",
    500: "#82b34a",
    600: "#688f3b",
    700: "#4e6b2c",
    800: "#34481e",
    900: "#1a240f",
  },
  blue: {
    100: "#d3e7f5",
    200: "#a6cfeb",
    300: "#7ab7e1",
    400: "#4d9fd7",
    500: "#2187cd",
    600: "#1a6ca4",
    700: "#14517b",
    800: "#0d3652",
    900: "#071b29",
  },
  danger: {
    100: "#f8d3e0",
    200: "#f2a7c1",
    300: "#eb7aa3",
    400: "#e54e84",
    500: "#de2265",
    600: "#b21b51",
    700: "#85143d",
    800: "#590e28",
    900: "#2c0714",
  },
  teal: {
    100: "#dfecea",
    200: "#bfd8d5",
    300: "#9ec5bf",
    400: "#7eb1aa",
    500: "#5e9e95",
    600: "#4b7e77",
    700: "#385f59",
    800: "#263f3c",
    900: "#13201e",
  },
  red: {
    100: "#f6d1e8",
    200: "#eda3d1",
    300: "#e375bb",
    400: "#da47a4",
    500: "#d1198d",
    600: "#a71471",
    700: "#7d0f55",
    800: "#540a38",
    900: "#2a051c",
  },
  warning: {
    100: "#f7edd8",
    200: "#efdab1",
    300: "#e6c889",
    400: "#deb562",
    500: "#d6a33b",
    600: "#ab822f",
    700: "#806223",
    800: "#564118",
    900: "#2b210c",
  },
};
//Parameter 'mode' implicitly has an 'any' type.ts(7006)
export const themeSettings = (mode) => {
  const colors = tokens;
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              light: colors.blue[200],
              main: colors.blue[500],
              dark: colors.blue[700],
            },
            info: {
              main: colors.blue[600],
              light: colors.blue[900],
            },
            success: {
              main: colors.success[400],
              light: colors.success[900],
            },
            warning: {
              main: colors.warning[500],
              light: colors.warning[800],
            },
            danger: {
              main: colors.danger[500],
              light: colors.danger[900],
            },
            background: {
              default: colors.indigo[600],
              lightPaper: colors.indigo[700],
              darkPaper: colors.indigo[800],
            },
            text: {
              default: colors.grey[900],
              inverse: colors.grey[100],
            },
          }
        : {
            primary: {
              light: colors.red[800],
              main: colors.red[500],
              dark: colors.red[200],
            },
            info: {
              main: colors.blue[600],
              light: colors.blue[900],
            },
            success: {
              main: colors.success[400],
              light: colors.success[900],
            },
            warning: {
              main: colors.warning[500],
              light: colors.warning[800],
            },
            danger: {
              main: colors.danger[500],
              light: colors.danger[900],
            },
            background: {
              default: colors.grey[900],
              lightPaper: colors.grey[500],
              darkPaper: colors.grey[400],
            },
            text: {
              default: colors.grey[100],
              inverse: colors.grey[900],
            },
          }),
    },
    typography: {
      fontFamily: ["Open Sans", "Helvetica", "Arial", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            height: "fit-content",
          },
        },
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("mode", newMode);
      },
    }),
    [mode]
  );
  /* Argument of type '{ palette: { primary: { light: string; main: string; dark: string; }; info: { main: string; light: string; }; success: { main: string; light: string; }; warning: { main: string; light: string; }; danger: { main: string; light: string; }; background: { ...; }; text: { ...; }; mode: any; }; typography: { ...; }; compo...' is not assignable to parameter of type 'ThemeOptions'.
  The types of 'palette.text' are incompatible between these types.
  Type '{ default: string; inverse: string; }' has no properties in common with type 'Partial<TypeText>'.ts(2345)*/
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
