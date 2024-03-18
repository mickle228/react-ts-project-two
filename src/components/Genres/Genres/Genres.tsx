import React, {FC, PropsWithChildren, useEffect, useState} from "react";

import {IGenre} from "../../../interfaces";
import {genreService} from "../../../services";
import {Genre} from "../Genre/Genre";
import css from './Genres.module.css'

interface IProps extends PropsWithChildren {
}

const Genres: FC<IProps> = () => {

    const [genres, setGenres] = useState<IGenre[]>([])
    useEffect(() => {
        genreService.getAll().then(({ data }) => setGenres(data.genres));
    }, []);
    return (
        <div className={css.Wrapper}>
            {genres.map((genre) => (
                <Genre key={genre.id} genre={genre} />
            ))}
        </div>
    );
};

export {Genres};
