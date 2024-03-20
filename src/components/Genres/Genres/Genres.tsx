import React, {FC} from "react";

import {Genre} from "../Genre/Genre";
import css from './Genres.module.css'
import {useAppSelector} from "../../hooks";


const Genres: FC = () => {

    const { genres } = useAppSelector(state => state.genres);
    return (
        <div className={css.Wrapper}>
            {genres && genres.length >=1 && genres.map((genre) => (
                <Genre key={genre.id} genre={genre} />
            ))}
        </div>
    );
};

export {Genres};
