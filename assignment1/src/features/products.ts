import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/products";

const api = import.meta.env.VITE_BASE_API;

const initialState: { isLoading: boolean; value: Product[] } = {
  isLoading: false,
  value: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.value = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const productIndex = state.value.findIndex((prod) => prod.id === action.payload.id);
      if (productIndex !== -1) state.value[productIndex] = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const getProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`${api}`);
    const data = await response.json();
    data && data.length > 0 && dispatch(setProducts(data));
  } catch (err: any) {
    console.log(err.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const updateProductWithAPI = (updatedProduct: Product) => async (dispatch: Dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`${api}/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (response.status === 200) {
      dispatch(updateProduct(updatedProduct));
    }
    console.log(response);
  } catch (err: any) {
    console.log(err);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const { setProducts, updateProduct, setIsLoading } = productSlice.actions;
export default productSlice.reducer;
