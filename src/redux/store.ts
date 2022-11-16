import { configureStore, combineReducers } from "@reduxjs/toolkit";
import coord from "./coordSlice";
import locations from "./locationsSlice";
const rootReducer = combineReducers({ coord: coord, locations: locations });

export const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
