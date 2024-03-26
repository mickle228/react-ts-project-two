import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IGenre, IGenreResponse} from "../../interfaces";
import {genreService} from "../../services";

interface IState {
    genres: IGenre[],
    isDropdownVisible: boolean;
}

const initialState: IState = {
    genres: [],
    isDropdownVisible: false
};

const getAll = createAsyncThunk<IGenreResponse, void>(
    'genreSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {
        setDropdownVisible: (state, action) => {
            state.isDropdownVisible = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.genres = action.payload.genres
            })
})

const {reducer: genreReducer, actions} = genreSlice;

const genreActions = {
    ...actions,
    getAll
}

export {
    genreActions,
    genreReducer
}