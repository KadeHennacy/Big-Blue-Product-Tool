// browseSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Assuming you have these type definitions somewhere in your code:

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  imageName: string;
};

export type Lot = {
  id: string;
  thumbnail: string;
  lastModified: string;
  items: Product[];
};

export type BrowseState = {
  lots: Lot[];
  currentLotIndex: number;
  currentProductIndex: number;
  isEditing: boolean;
};

const initialState: BrowseState = {
  lots: [],
  currentLotIndex: -1,
  currentProductIndex: -1,
  isEditing: false,
};

const browseSlice = createSlice({
  name: "browse",
  initialState,
  reducers: {
    addLot: (state) => {
      const newLot = {
        id: Date.now().toString(),
        thumbnail: "",
        lastModified: Date.now().toString(),
        items: [],
      };

      state.lots.push(newLot);
      state.currentLotIndex = state.lots.length - 1;
      state.isEditing = false;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.lots[state.currentLotIndex].items.push(action.payload);
      state.lots[state.currentLotIndex].lastModified = Date.now().toString();
      state.currentProductIndex =
        state.lots[state.currentLotIndex].items.length - 1;
      state.lots[state.currentLotIndex].thumbnail = action.payload.image;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.lots[state.currentLotIndex].items.splice(action.payload, 1);
      state.lots[state.currentLotIndex].lastModified = Date.now().toString();
    },
    deleteLot: (state, action: PayloadAction<number>) => {
      state.lots.splice(action.payload, 1);
    },
    setCurrentLotIndex: (state, action: PayloadAction<number>) => {
      state.currentLotIndex = action.payload;
    },
    setCurrentProductIndex: (state, action: PayloadAction<number>) => {
      state.currentProductIndex = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const productToUpdate =
        state.lots[state.currentLotIndex].items[state.currentProductIndex];
      if (productToUpdate) {
        state.lots[state.currentLotIndex].items[state.currentProductIndex] =
          action.payload;
        state.lots[state.currentLotIndex].lastModified = Date.now().toString();
      }
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const {
  addLot,
  addProduct,
  setCurrentLotIndex,
  updateProduct,
  setCurrentProductIndex,
  setEditing,
  deleteProduct,
  deleteLot,
} = browseSlice.actions;
export default browseSlice.reducer;
