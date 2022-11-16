import { createSlice } from "@reduxjs/toolkit";
import DataService from "../services/data.service";
import { AppDispatch } from "./store";

interface ICoordsState {
    ip: string;
    coords: { lat: number | null; lng: number | null };
    error: string | null;
}

const initial: ICoordsState = {
    ip: "",
    coords: { lat: null, lng: null },
    error: null,
};

const slice = createSlice({
    name: "coords",
    initialState: initial,
    reducers: {
        getIpAddressSuccess: (state, action) => {
            state.ip = action.payload;
        },

        getIpAddressError: (state, action) => {
            state.error = action.payload;
        },

        setCoordsSuccess: (state, action) => {
            state.coords = action.payload;
        },

        saveCoordsError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default slice.reducer;

const { getIpAddressSuccess, getIpAddressError, setCoordsSuccess, saveCoordsError } = slice.actions;

export const getIpAddress = () => async (dispatch: AppDispatch) => {
    try {
        const response: string = await DataService.getIpAddress();
        dispatch(getIpAddressSuccess(response));
    } catch (error) {
        dispatch(getIpAddressError((error as Error).message));
    }
};

export const setCoords = (value: any) => (dispatch: AppDispatch) => {
    dispatch(setCoordsSuccess(value));
};

export const saveCoords = (ip: string, lat: string, lng: string) => async (dispatch: AppDispatch) => {
    try {
        const response: string = await DataService.saveLocation(ip, lat, lng);
    } catch (error) {
        dispatch(saveCoordsError((error as Error).message));
    }
};
