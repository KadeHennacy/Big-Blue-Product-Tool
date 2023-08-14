import React, { useContext } from "react";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { ColorModeContext } from "../../../Theme";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { addLot } from "../../features/browse/browse";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { RootState } from "../../app/Store";

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
  const currentLotIndex = useSelector(
    (state: RootState) => state.browse.currentLotIndex
  );
  const currentLot = useSelector(
    (state: RootState) => state.browse.lots[currentLotIndex]
  );

  const products = currentLotIndex !== -1 && currentLot ? currentLot.items : [];

  const dispatch = useDispatch();

  const handleNewLot = () => {
    dispatch(addLot());
    navigate("/product");
  };

  const handleSubmit = async () => {
    if (!products.length) {
      console.warn("No products to export.");
      return;
    }

    // Extract the lastModified date from the current lot
    const lastModifiedTimestamp = currentLot ? currentLot.lastModified : null;
    if (!lastModifiedTimestamp) {
      console.warn("No last modified date found.");
      return;
    }

    // Convert the lastModified date to a formatted date string
    const date = new Date(Number(lastModifiedTimestamp));
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date
      .getFullYear()
      .toString()
      .slice(-2)}`;

    // Create CSV
    let csvContent =
      "NAME,SHORT_DESC,POINT_OF_SALE_DESC,LONG_DESC,SHIP_CLASS,PRICE,PRODUCT_TYPE,QTY\n";
    products.forEach((product) => {
      const pointOfSaleDesc = `"${product.category}" : "${product.imageName}"`;
      csvContent += `${product.name},${product.description},${pointOfSaleDesc},${product.description},"Big Blue Shipping",${product.price},"Generic",1\n`; // Added value 1 for QTY column
    });
    // Create a zip file
    const zip = new JSZip();

    // Add the CSV content to the zip with the formatted date appended
    zip.file(`products_${formattedDate}.csv`, csvContent);

    // Add images to the zip file
    for (const product of products) {
      // Extract the base name and original extension
      const [baseName, origExtension] = product.imageName.split(".");

      // Cange the extension to png
      const newImageName = `${baseName}.png`;

      const base64Image = product.image.split(",")[1];
      zip.file(newImageName, base64Image, { base64: true });
    }

    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Generate a filename for the zip with the formatted date appended
    const zipFilename = `lot_${formattedDate}_${currentLot.id}.zip`;

    // Trigger download
    saveAs(zipBlob, zipFilename);

    //Open email client

    const email = "bigbluethriftstore@gmail.com";
    const subject = `New lot with ${products.length} items`;
    const body = "Please find attached the details of the new lot."; // You can customize this message as needed
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const renderButtons = () => {
    switch (location.pathname) {
      case "/index.html":
        return (
          <>
            <Button color="inherit" sx={buttonStyle} onClick={handleNewLot}>
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
            <Button color="inherit" sx={buttonStyle} onClick={handleSubmit}>
              Submit
            </Button>
          </>
        );
      case "/browse":
        return (
          <Button color="inherit" sx={buttonStyle} onClick={handleNewLot}>
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
        <IconButton onClick={() => navigate("/index.html")}>
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
