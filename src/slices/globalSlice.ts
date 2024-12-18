import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState = {
    searchQuery: '',
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setSearchQuery } = globalSlice.actions;

export const selectSearchQuery = (state: RootState) => state.global.searchQuery;

export default globalSlice.reducer;
