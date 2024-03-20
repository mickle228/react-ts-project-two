import {configureStore} from "@reduxjs/toolkit";
import {genreReducer, movieReducer, searchReducer} from "./slices";

const store = configureStore({
    reducer: {
        movies: movieReducer,
        genres: genreReducer,
        search: searchReducer
    }
});

export {
    store
}