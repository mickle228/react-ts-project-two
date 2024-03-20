import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IGenreResponse} from "../interfaces";

const genreService = {
    getAll:():IRes<IGenreResponse> => apiService.get(urls.genres.base),
}

export {
    genreService
}
