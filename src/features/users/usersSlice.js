import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Robert '},
    {id: '1', name: 'Fermin'},
    {id: '2', name: 'Gavira'}
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export const selectAllUsers = (state) => state.users;

// export {} = userSlice.actions;

export default userSlice.reducer;