import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {IMovie, IResponse} from "../../interfaces";
import {AxiosError} from "axios";
import {movieService} from "../../services";

interface IState {
    movies: IMovie[],
    page: number,
    genreIds: number[],
    movie: {}
}

const initialState: IState = {
    movies: [],
    page: null,
    genreIds: null,
    movie: null
};

const getAll = createAsyncThunk<IResponse, {page:string}>(
    'movieSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)
const getByGenreIds = createAsyncThunk<IResponse, {page:string, genreIds: number[]}>(
    'movieSlice/getByGenreIds',
    async ({page, genreIds}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getByGenreIds(genreIds, page)
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)
const getByName = createAsyncThunk<IResponse, {page:string, searchText: string}>(
    'movieSlice/getByGenreIds',
    async ({page, searchText}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getByName(searchText, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)
const getById = createAsyncThunk<IResponse, {id: string}>(
    'movieSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getById(+id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)


const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.movie = action.payload
                console.log(action.payload)
            })
            .addMatcher(isFulfilled(getAll, getByGenreIds, getByName), (state, action) => {
                state.movies = action.payload.results
                state.page = action.payload.page
            })
})

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getAll,
    getByGenreIds,
    getByName,
    getById
}

export {
    movieActions,
    movieReducer
}