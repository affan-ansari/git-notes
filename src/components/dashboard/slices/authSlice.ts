import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { UserCredential } from '@firebase/auth-types';

interface ICurrentUser extends UserCredential {
    accessToken: string;
}

interface IAuthState {
    currentUser: ICurrentUser | null;
}

const initialState: IAuthState = {
    currentUser: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = { ...action.payload.user, accessToken: action.payload.token };
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
            localStorage.clear();
        },
    },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export default authSlice.reducer;
