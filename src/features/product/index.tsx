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

interface ProductProps {
  lotId: number;
}

interface FormValues {
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}
const patternTwoDigitsAfterDecimal = /^\d+(\.\d{0,2})?$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.number()
    .required("Required")
    .positive()
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
  const currentLotIndex = useSelector((state) => state.browse.currentLotIndex);
  const currentProductIndex = useSelector(
    (state) => state.browse.currentProductIndex
  );
  const currentProduct = useSelector(
    (state) => state.browse.lots[currentLotIndex].items[currentProductIndex]
  );
  const isEditing = useSelector((state) => state.browse.isEditing);
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
        800,
        800,
        "jpg", // or "PNG" or other file types
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
            image: null,
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
            helperText={formik.touched.name && formik.errors.name}
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
            helperText={formik.touched.description && formik.errors.description}
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
              {/* Add your categories here */}
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
              <MenuItem value="category3">Category 3</MenuItem>
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
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            id="image"
            name="image"
            type="file"
            label="Image"
            accept="image/*"
            InputLabelProps={{
              shrink: true,
            }}
            // onChange={(event) => {
            //   formik.setFieldValue(
            //     "image",
            //     event.currentTarget.files ? event.currentTarget.files[0] : null
            //   );
            // }}
            onChange={async (event) => {
              const file = event.currentTarget.files
                ? event.currentTarget.files[0]
                : null;
              if (file) {
                const resizedImage = await resizeFile(file);
                formik.setFieldValue("image", resizedImage);
              }
            }}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
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
