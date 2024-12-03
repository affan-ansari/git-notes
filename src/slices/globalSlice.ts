import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState = {
    count: 0,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {},
});

// export const { setCurrentUser, clearCurrentUser } = authSlice.actions;

export const selectCount = (state: RootState) => state.global.count;

export default globalSlice.reducer;
