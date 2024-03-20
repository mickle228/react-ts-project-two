import React from "react";
import {NavLink, useNavigate} from "react-router-dom";

import { IGenre } from "../../../interfaces";
import css from './Genre.module.css'

const Genre = ({ genre }: { genre: IGenre }) => {
    const { id, name } = genre;
    const navigate = useNavigate();

    return (
        <div className={css.Wrapper}>
            <NavLink
                className={`${css.Btn} ${window.location.search.includes(`genreId=${id}`) ? css.active : ''}`}
                to={`?genreId=${encodeURIComponent(id)}`}
            >
                {name}
            </NavLink>
        </div>
    );
};

export  {Genre};


