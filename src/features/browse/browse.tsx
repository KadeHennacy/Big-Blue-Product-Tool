// browseSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Assuming you have these type definitions somewhere in your code:

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
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
  //   currentProductIndex: number;
};

const initialState: BrowseState = {
  lots: [],
  currentLotIndex: -1,
  //   currentProductIndex: -1,
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
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.lots[state.currentLotIndex].items.push(action.payload);
      state.lots[state.currentLotIndex].lastModified = Date.now().toString();
    },
  },
});

export const { addLot, addProduct } = browseSlice.actions;
export default browseSlice.reducer;
