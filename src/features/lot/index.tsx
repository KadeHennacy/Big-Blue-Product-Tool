import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentProductIndex,
  setEditing,
  deleteProduct,
} from "../browse/browse"; // Import the action
import { Box, IconButton, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { wrap } from "module";
import { RootState } from "../../app/Store";

const Lot: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLotIndex = useSelector(
    (state: RootState) => state.browse.currentLotIndex
  );
  const lot = useSelector(
    (state: RootState) => state.browse.lots[currentLotIndex]
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<number | null>(
    null
  );
  const theme = useTheme();

  const handleProductClick = (productIndex: number) => {
    dispatch(setCurrentProductIndex(productIndex));
    dispatch(setEditing(true));
    navigate("/product");
  };

  const handleNewProductClick = () => {
    dispatch(setEditing(false));
    navigate("/product");
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              if (productToDelete !== null) {
                dispatch(deleteProduct(productToDelete));
              }
              handleCloseDeleteDialog();
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <IconButton
          color="primary"
          sx={{
            backgroundColor: "primary.main",
            boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.2)",
            width: 50,
            height: 50,
          }}
          onClick={() => {
            handleNewProductClick();
          }}
        >
          <AddIcon
            sx={{
              color: "text.primary",
            }}
          />
        </IconButton>
      </Box>
      <Box>
        <h2
          style={{
            marginBottom: "5px",
            paddingBottom: "5px",
            borderBottom: "1px solid #ccc",
          }}
        >
          Products in Lot {currentLotIndex + 1}
        </h2>
        {lot?.items.map((product, index) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc",
              paddingY: 1,
            }}
            key={product.id}
            onClick={() => handleProductClick(index)}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  overflow: "hidden",
                  marginRight: 2,
                }}
              >
                <img
                  style={{
                    objectFit: "cover",
                    display: "block",
                    height: "100%",
                    width: "100%",
                  }}
                  src={product.image}
                  alt={product.name}
                />
              </Box>
              <Box>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
              </Box>
            </Box>
            <Box>
              <DeleteIcon
                sx={{
                  color: theme.palette.error.main,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setProductToDelete(index);
                  handleOpenDeleteDialog();
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Lot;
