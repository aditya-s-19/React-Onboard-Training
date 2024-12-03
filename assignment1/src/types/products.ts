import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, any>;
