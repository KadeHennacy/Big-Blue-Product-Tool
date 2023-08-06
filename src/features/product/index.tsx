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
} from "@mui/material";
import { addProduct } from "../browse/browse";
import { Product } from "../browse/browse";

interface ProductProps {
  lotId: number;
}

interface FormValues {
  name: string;
  description: string;
  category: string;
  price: number;
  image: File | null;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.number().required("Required").positive().integer(),
  image: Yup.mixed().required("A file is required"),
});

const Product: React.FC<ProductProps> = ({ lotId }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      image: null,
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        category: values.category,
        price: values.price,
        image: values.image ? values.image.name : "", // You might want to handle this differently, e.g., upload it to a server and get the URL
      };

      dispatch(addProduct(newProduct));

      console.log(`Product associated with lot: ${lotId}`);

      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
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
      <input
        id="image"
        name="image"
        type="file"
        onChange={(event) => {
          formik.setFieldValue(
            "image",
            event.currentTarget.files ? event.currentTarget.files[0] : null
          );
        }}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Save
      </Button>
    </form>
  );
};

export default Product;
