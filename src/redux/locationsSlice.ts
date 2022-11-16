import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import DataService from "../services/data.service";
import { ILocation } from "../models/location";
//{ id: string; ip: string; coord_x: string; coord_y: string; created_at: string; updated_at: string }

interface ILocationsState {
    locationsList: ILocation[];
    error: string | null;
}

const initial: ILocationsState = {
    locationsList: [],
    error: null,
};

const slice = createSlice({
    name: "locations",
    initialState: initial,
    reducers: {
        getLocationsSuccess: (state, action) => {
            state.locationsList = action.payload;
            state.error = null;
        },
        getLocationsError: (state, action) => {
            state.locationsList = [];
            state.error = action.payload;
        },
    },
});

export default slice.reducer;

const { getLocationsSuccess, getLocationsError } = slice.actions;

export const getLocationsList = (ip: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await DataService.getLocationsByIp(ip);
        dispatch(getLocationsSuccess(response));
    } catch (error) {
        dispatch(getLocationsError((error as Error).message));
    }
};
