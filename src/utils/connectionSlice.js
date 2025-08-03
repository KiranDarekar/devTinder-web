
import { createSlice } from "@reduxjs/toolkit";

const connectionSlice  = createSlice({
    name: 'connection',
    initialState:null,
    reducers: {
        addConnection: (state, action) =>{
            console.log("addConnections -", action.payload);
            return action.payload;
        },
        removeConnection: () =>{
            return null;
        }
    }
});

export const { addConnection, removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;