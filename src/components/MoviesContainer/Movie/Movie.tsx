import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IMovie } from "../../../interfaces";
import { basePosterUrl } from "../../../constants";
import { Rating } from "../../Rating/Rating";
import css from './Movie.module.css';
import { PlayerImg } from "./PlayerImg";
import {useAppDispatch} from "../../hooks";
import {searchActions} from "../../../store";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie: FC<IProps> = ({ movie }) => {
    const { id, title, poster_path, vote_average } = movie;
    const navigate = useNavigate();
    const [shortenedTitle, setShortenedTitle] = useState('');
    const dispatch = useAppDispatch();
    let url;

    if (poster_path) {
        url = `${basePosterUrl}${poster_path}`;
    } else {
        url = 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';
    }

    useEffect(() => {
        if (title.length > 15) {
            setShortenedTitle(title.substring(0, 20) + "...");
        } else {
            setShortenedTitle(title);
        }
    }, [title]);

    const handleImageClick = () => {
        dispatch(searchActions.setSearchVisible(false))
        navigate(`/movie/${id}`, { state: { movie } });
    };

    return (
        <div className={css.MovieСontainer}>
            <div className={css.MovieCard}>
                <div className={css.ImageContainer} onClick={handleImageClick}>
                    <img src={url} alt={shortenedTitle} />
                    <PlayerImg />
                </div>
                <Rating vote_average={vote_average} />
                <div>{shortenedTitle}</div>
            </div>
        </div>
    );
};

export { Movie };
