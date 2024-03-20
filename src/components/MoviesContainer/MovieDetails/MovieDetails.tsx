import React, {FC, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {Badge} from "@mui/material";

import {basePosterUrl} from "../../../constants";
import {Rating} from "../../Rating/Rating";
import css from "./MovieDetails.module.css";
import {Movies} from "../Movies/Movies";
import {movieActions} from "../../../store";
import {useAppDispatch, useAppSelector} from "../../hooks";


const MovieDetails: FC = () => {
    const {state} = useLocation();
    const {id} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genres);

    useEffect(() => {
        const fetchMovie = async () => {
            let movieData;
            if (state && state.movie) {
                movieData = state.movie;
            } else {
                const response = await dispatch(movieActions.getById({id}));
                movieData = response.payload;
                console.log(movieData);
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
    const url = `${basePosterUrl}${poster_path}`;

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

    return (
        <div>
            <button onClick={back} className={css.TopLeftButton}>BACK</button>
            <div className={css.MovieDetailsContainer}>
                <div className={css.MovieTitle}>{title}</div>
                <div className={css.MovieInfoContainer}>
                    <div>
                        <Badge
                            badgeContent={genreNames.join(", ")}
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "snow",
                                    backgroundColor: "#3d2cd1",
                                    height: 30
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
