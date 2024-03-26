import React, {FC, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {Badge} from "@mui/material";

import {basePosterUrl} from "../../../constants";
import {Rating} from "../../Rating/Rating";
import css from "./MovieDetails.module.css";
import {Movies} from "../Movies/Movies";
import {movieActions} from "../../../store";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {LikeButton} from "../../LikeButton/LikeButton";
import {TrailerModal} from "../../TrailerModal/TrailerModal";


const MovieDetails: FC = () => {
    const {state} = useLocation();
    const {id} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genres);
    window.scrollTo({ top: 0, behavior: 'auto' });
    dispatch(movieActions.getTrailer({id}))
    useEffect(() => {
        const fetchMovie = async () => {
            let movieData;
            if (state && state.movie) {
                movieData = state.movie;
            } else {
                const response = await dispatch(movieActions.getById({id}));
                movieData = response.payload;
            }
            setMovie(movieData);
        };

        fetchMovie();
    }, [state, id, dispatch]);

    const back = () => {
        navigate(-1);
    };

    if (!movie || !genres || genres.length === 0) {
        return <div>Loading...</div>;
    }

    const {title, poster_path, vote_average, overview, release_date} = movie;
    let url;

    if (poster_path) {
        url = `${basePosterUrl}${poster_path}`;
    } else {
        url = 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';
    }

    const getGenreNames = (genreIds: number[]) => {
        if (!Array.isArray(genreIds)) return [];

        return genreIds.slice(0, 4).map((genreId: number) => {
            const genre = genres.find((g) => g.id === genreId);
            return genre ? genre.name : "Unknown";
        });
    };

    const genreIds = Array.isArray(movie.genres)
        ? movie.genres.map((genre: { id: number }) => genre.id)
        : movie.genre_ids;

    const genreNames: string[] = getGenreNames(genreIds);

    const watchTrailer = () => {
        dispatch(movieActions.setTrailerStatus(true))
    }

    return (
        <div>
            <button onClick={back} className={css.TopLeftButton}>BACK</button>
            <div className={css.MovieDetailsContainer}>
                <div className={css.TitleWrapper}>
                    <div className={css.MovieTitle}>{title}</div>
                </div>
                <div className={css.MovieInfoContainer}>
                    <div>
                        <Badge
                            badgeContent={<LikeButton key={movie.id} movie={movie}/>}
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "red",
                                    height: 55,
                                    transform: 'translate(-1.2vw, 0.1vh)'
                                }
                            }}
                        >
                            <img className={css.MoviePoster} src={url} alt={title}/>
                        </Badge>
                    </div>
                    <div className={css.MovieInfo}>
                        <div className={css.MovieInfoItem}>
                            <span>Rating:</span>
                            <Rating vote_average={vote_average}/>
                        </div>
                        <div className={css.MovieInfoItem}>
                            <span>Release Date: </span>
                            <div>{release_date}</div>
                        </div>
                        <div className={css.MovieInfoItem}>
                            <span>Genres: </span>
                            <div>
                                {genreNames.map((genreName, index) => (
                                    <React.Fragment key={index}>
                                        <NavLink to={`/movies?genreId=${genreIds[index]}`} className={css.Btn}
                                                 style={{color: "inherit"}}>
                                            {genreName}
                                        </NavLink>
                                        {index !== genreNames.length - 1 && ", "}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className={css.MovieInfoItem}>
                            <button className={css.TrailerButton} onClick={watchTrailer}>Trailer</button>
                            <TrailerModal/>
                        </div>
                    </div>
                </div>
                <div className={css.MovieOverview}>Overview</div>
                <div className={css.MovieOverview}>{overview}</div>
                <h1 className={css.Recommended}>Recommended movies</h1>
            </div>
            <Movies key={movie.id} genreIds={genreIds}/>
        </div>
    );
};

export {MovieDetails};
