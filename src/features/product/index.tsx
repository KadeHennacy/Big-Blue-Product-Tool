import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Box,
} from "@mui/material";
import { addProduct, updateProduct } from "../browse/browse";
import { Product } from "../browse/browse";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { RootState } from "../../app/Store";
import { type } from "os";

interface ProductProps {
  lotId: number;
}

interface FormValues {
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  imageName: string;
}
const patternTwoDigitsAfterDecimal = /^\d+(\.\d{0,2})?$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.string()
    .required("Required")
    .test("is-positive", "Price must be positive", (value) => {
      const numberValue = parseFloat(value);
      return numberValue > 0;
    })
    .test("two-decimal", "Price must have 2 decimal points or less", (value) =>
      patternTwoDigitsAfterDecimal.test(value)
    ),
  image: Yup.string()
    .required("An image is required")
    .test("fileType", "Unsupported File Format", (value) => {
      if (value) {
        const supportedPrefixes = [
          "data:image/jpg;",
          "data:image/jpeg;",
          "data:image/gif;",
          "data:image/png;",
        ];
        return supportedPrefixes.some((prefix) => value.startsWith(prefix));
      }
      return false;
    }),
});

const Product: React.FC = () => {
  const dispatch = useDispatch();
  const currentLotIndex = useSelector(
    (state: RootState) => state.browse.currentLotIndex
  );
  const currentProductIndex = useSelector(
    (state: RootState) => state.browse.currentProductIndex
  );
  const currentProduct = useSelector(
    (state: RootState) =>
      state.browse.lots[currentLotIndex].items[currentProductIndex]
  );
  const isEditing = useSelector((state: RootState) => state.browse.isEditing);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "png", // or "PNG" or other file types
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const formik = useFormik({
    initialValues:
      isEditing && currentProduct
        ? currentProduct
        : {
            name: "",
            description: "",
            category: "",
            price: "",
            image: "",
            imageName: "",
          },
    validationSchema,
    onSubmit: (values: FormValues) => {
      const newProduct: Product = {
        id: isEditing ? currentProduct.id : Date.now().toString(),
        name: values.name,
        description: values.description,
        category: values.category,
        price: values.price,
        image: values.image,
        imageName: values.imageName,
      };

      if (isEditing) {
        console.log(
          `Updating product ${currentProduct.id} current lot ${currentLotIndex} current product ${currentProductIndex}`
        );
        dispatch(updateProduct(newProduct));
        navigate("/lot");
      } else {
        console.log(
          `adding product current lot ${currentLotIndex} current product ${currentProductIndex}`
        );
        dispatch(addProduct(newProduct));
        handleOpenSnackbar();
      }

      formik.resetForm();
      console.log("Form submitted");
    },
    enableReinitialize: true,
  });

  const inputStyle = {
    marginBottom: "1rem",
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Item saved successfully"
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            height: "79vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={
              formik.touched.name && typeof formik.errors.name === "string"
                ? formik.errors.name
                : ""
            }
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            // helperText={formik.touched.description && formik.errors.description}
            helperText={
              formik.touched.description &&
              typeof formik.errors.description === "string"
                ? formik.errors.description
                : ""
            }
          />
          <FormControl fullWidth>
            <InputLabel sx={{ top: -1 }} id="category-label">
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Bottoms">Bottoms</MenuItem>
              <MenuItem value="Clearance">Clearance</MenuItem>
              <MenuItem value="Dresses">Dresses</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
              <MenuItem value="Home & Personal Care">
                Home & Personal Care
              </MenuItem>
              <MenuItem value="Kitchenware">Kitchenware</MenuItem>
              <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
              <MenuItem value="Outerwear">Outerwear</MenuItem>
              <MenuItem value="Professional Wear">Professional Wear</MenuItem>
              <MenuItem value="School Supplies">School Supplies</MenuItem>
              <MenuItem value="Shoes">Shoes</MenuItem>
              <MenuItem value="Sporting Goods">Sporting Goods</MenuItem>
              <MenuItem value="Tops">Tops</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={
              formik.touched.price && typeof formik.errors.price === "string"
                ? formik.errors.price
                : ""
            }
          />
          <TextField
            id="image"
            name="image"
            type="file"
            label="Image"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={async (event) => {
              const input = event.target as HTMLInputElement;
              const file = input.files ? input.files[0] : null;
              if (file) {
                const resizedImage = await resizeFile(file);
                formik.setFieldValue("image", resizedImage);
                formik.setFieldValue("imageName", file.name);
              }
            }}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={
              formik.touched.image && typeof formik.errors.image === "string"
                ? formik.errors.image
                : ""
            }
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Product;
