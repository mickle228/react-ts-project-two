import React from "react";
import {NavLink} from "react-router-dom";

import { IGenre } from "../../../interfaces";
import css from './Genre.module.css'
import {useAppDispatch} from "../../hooks";
import {genreActions} from "../../../store";

const Genre = ({ genre }: { genre: IGenre }) => {
    const { id, name } = genre;
    const dispatch = useAppDispatch();
    const changeVisible = () => {
        dispatch(genreActions.setDropdownVisible(false))
    }

    return (
        <div className={css.Wrapper}>
            <NavLink onClick={changeVisible}
                className={`${css.Btn} ${window.location.search.includes(`genreId=${id}`) ? css.active : ''}`}
                to={`?genreId=${encodeURIComponent(id)}`}
            >
                {name}
            </NavLink>
        </div>
    );
};

export  {Genre};


