import React from 'react';

import css from './Movie.module.css'

const PlayerImg = () => {
    return (
        <svg
            className={css.PlayIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="80px"
            height="80px"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" />
        </svg>
    );
};

export  {PlayerImg};