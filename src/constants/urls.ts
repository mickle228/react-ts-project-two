const baseURL ='https://api.themoviedb.org/3'
const basePosterUrl = 'https://image.tmdb.org/t/p/w500'

const movies = '/discover/movie'
const genres = '/genre/movie/list'


const urls = {
    movies:{
        base:movies,
        byId:(id:number):string=>`/movie/${id}`,
        byName:(name:string):string=>`/search/movie?query=${name}`,
        byGenres:(ids:number[]):string=>`${movies}?with_genres=${ids.join(',')}`
    },
    genres:{
        base:genres
    }
}

export {
    baseURL,
    basePosterUrl,
    urls
}

