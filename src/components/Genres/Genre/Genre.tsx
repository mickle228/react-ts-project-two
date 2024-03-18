import React from "react";
import { useNavigate } from "react-router-dom";

import { IGenre } from "../../../interfaces";
import css from './Genre.module.css'

const Genre = ({ genre }: { genre: IGenre }) => {
    const { id, name } = genre;
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`?genreId=${encodeURIComponent(id)}`);
    };
    return (
        <div className={css.Wrapper}>
            <button className={css.Btn} onClick={handleButtonClick}>{name}</button>
        </div>
    );
};

export  {Genre};


