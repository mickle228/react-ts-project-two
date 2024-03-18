import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../../interfaces";
import {basePosterUrl} from "../../../constants";
import {Rating} from "../../Rating/Rating";
import css from './Movie.module.css';
import {PlayerImg} from "./PlayerImg";
import {useSearch} from "../../../hoc";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average} = movie;
    const url = `${basePosterUrl}${poster_path}`;
    const navigate = useNavigate();
    const [shortenedTitle, setShortenedTitle] = useState('');
    const {setSearchVisible} = useSearch();

    useEffect(() => {
        if (title.length > 15) {
            setShortenedTitle(title.substring(0, 20) + "...");
        } else {
            setShortenedTitle(title);
        }
    }, [title]);

    const handleImageClick = () => {
        setSearchVisible(false)
        navigate(`/movie/${id}`, {state: {movie}});
    };

    return (
        <div className={css.MovieСontainer}>
            <div className={css.MovieCard}>
                <div  onClick={handleImageClick} className={css.ImgBox}>
                    <img src={url} alt={shortenedTitle}/>
                    <div className={css.PlayImg}>
                        <PlayerImg/>
                    </div>
                </div>
                <Rating vote_average={vote_average}/>
                <div>{shortenedTitle}</div>
            </div>
        </div>
    );
};

export {Movie};