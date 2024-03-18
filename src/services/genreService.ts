import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IGenreResponse} from "../interfaces";

const genreService = {
    getAll:(page="1"):IRes<IGenreResponse> => apiService.get(urls.genres.base, {params: {page}}),
}

export {
    genreService
}
