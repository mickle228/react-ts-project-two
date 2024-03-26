import React, { FC, PropsWithChildren, useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Tooltip from '@mui/material/Tooltip';

import { IMovie } from "../../interfaces";
import {useAppDispatch} from "../hooks";
import {movieActions} from "../../store";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const LikeButton: FC<IProps> = ({ movie }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const likedMovies = localStorage.getItem('likedMovies');
        if (likedMovies) {
            const updatedLikedMovies = JSON.parse(likedMovies) as IMovie[];
            setIsLiked(updatedLikedMovies.some((likedMovie: IMovie) => likedMovie.id === movie.id));
        }
    }, [movie, dispatch]);

    const toggleLike = () => {
        const likedMovies = localStorage.getItem('likedMovies');
        if (likedMovies) {
            const updatedLikedMovies = JSON.parse(likedMovies) as IMovie[];
            const updatedIsLiked = !isLiked;
            setIsLiked(updatedIsLiked);
            const index = updatedLikedMovies.findIndex((likedMovie: IMovie) => likedMovie.id === movie.id);
            if (updatedIsLiked && index === -1) {
                updatedLikedMovies.push(movie);
            } else if (!updatedIsLiked && index !== -1) {
                updatedLikedMovies.splice(index, 1);
            }
            localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
        } else {
            setIsLiked(true);
            localStorage.setItem('likedMovies', JSON.stringify([movie]));
        }
        dispatch(movieActions.toogleLike())
    };

    return (
        <Tooltip title="Add to favourites">
        <div onClick={toggleLike}>
            {isLiked ? (
                <img width="50" height="50" src="https://img.icons8.com/fluency/50/like.png" alt="like"/>
            ) : (
                <img width="50" height="50" src="https://img.icons8.com/material-rounded/50/FFFFFF/like--v1.png" alt="like--v1"/>
            )}
        </div>
        </Tooltip>
    );
};

export { LikeButton };
