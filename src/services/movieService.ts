import {IRes} from "../types";
import {IResponse} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {ITrailerResponse} from "../interfaces/trailerResponse";

const movieService = {
    getAll:(page="1"):IRes<IResponse> => apiService.get(urls.movies.base, {params: {page}}),
    getById:(id:number):IRes<IResponse> => apiService.get(urls.movies.byId(id)),
    getByName:(name:string, page="1"):IRes<IResponse> => apiService.get(urls.movies.byName(name), {params: {page}}),
    getByGenreIds:(ids:number[], page="1"):IRes<IResponse> => apiService.get(urls.movies.byGenres(ids), {params: {page}}),
    getTrailer:(id:number):IRes<ITrailerResponse> => apiService.get(urls.movies.trailer(id))
}

export {
    movieService
}