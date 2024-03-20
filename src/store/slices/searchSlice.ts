import {createSlice} from "@reduxjs/toolkit";

interface State {
    isSearchVisible: boolean
}

const initialState:State= {
    isSearchVisible: false
};

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        toggleSearch: state => {
            state.isSearchVisible = !state.isSearchVisible;
        },
        setSearchVisible: (state, action) => {
            state.isSearchVisible = action.payload
        }
    }
})

const {reducer: searchReducer, actions} = searchSlice;

const searchActions = {
    ...actions
}

export {
    searchActions,
    searchReducer
}