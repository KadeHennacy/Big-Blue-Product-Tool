import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteLot, setCurrentLotIndex } from "./browse";
import { Box, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { RootState } from "../../app/Store";

const Browse: React.FC = () => {
  const lots = useSelector((state: RootState) => state.browse.lots);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<number | null>(
    null
  );
  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleLotClick = (index: number) => {
    dispatch(setCurrentLotIndex(index));
    navigate("/lot");
  };

  function formatDate(timestampString: string) {
    const date = new Date(Number(timestampString));

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  return (
    <Box sx={{ padding: 3 }}>
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
                dispatch(deleteLot(productToDelete));
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
      <h2
        style={{
          marginBottom: "5px",
          paddingBottom: "5px",
          borderBottom: "1px solid #ccc",
        }}
      >
        All Lots
      </h2>
      {lots.map((lot, index) => (
        <Box key={lot.id} onClick={() => handleLotClick(index)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc",
              paddingY: 1,
            }}
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
                  src={lot.thumbnail}
                  alt={`Thumbnail for lot ${lot.id}`}
                />
              </Box>
              <Box>
                <h3>{formatDate(lot.lastModified)}</h3>
                <p>Lot ID: {lot.id}</p>
                <p>Number of Items: {lot.items.length}</p>
              </Box>
            </Box>
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
  );
};

export default Browse;
