import React, {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

import css from './Header.module.css'
import {Switcher} from "../Switcher/Switcher";
import {AccountMenu} from "../AccountMenu/AccountMenu";
import {useAppDispatch, useAppSelector} from "../hooks";
import {genreActions, searchActions} from "../../store";
import {Badge} from "@mui/material";
import {Genres} from "../Genres/Genres/Genres";

interface IProps extends PropsWithChildren {
}

const Header: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {isDropdownVisible} = useAppSelector(state => state.genres)
    const navigate = useNavigate();
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies'));
    const {like} = useAppSelector(state => state.movies)

    const handleNavigate = (): void => {
        navigate('/movies');
    };
    const toggleSearch = (): void => {
        dispatch(searchActions.toggleSearch())
    };
    const navMovies = (): void => {
        navigate('/movies?liked=true');
    };
    const handleMouseEnter = () => {
        dispatch(genreActions.setDropdownVisible(true))
    };

    const handleMouseLeave = () => {
        dispatch(genreActions.setDropdownVisible(false))
    };

    return (
        <div className={css.Header}>
            <Tooltip title="Home page">
                <div className={css.IMovies} onClick={handleNavigate}>IMovies <img width="30" height="30"
                                                                                   src="https://img.icons8.com/ios-filled/50/clapperboard.png"
                                                                                   alt="clapperboard"/></div>
            </Tooltip>
            <div className={css.Theme}>
                    <div    className={css.GenresButton}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                        Genres
                        <div className={css.DropdownMenu}>
                            {isDropdownVisible && <Genres />}
                        </div>
                    </div>
                <Tooltip title="Search movies">
                    <div className={css.Search} onClick={toggleSearch}>
                        Search
                    </div>
                </Tooltip>
                Theme
                <Tooltip title="Change theme">
                    <div className={css.Toggle}><Switcher/></div>
                </Tooltip>
                <Tooltip title="Liked movies">
                    <div className={css.Fav} onClick={navMovies}>
                        <Badge badgeContent={likedMovies?.length} color="info">
                            <img width="40" height="40" src="https://img.icons8.com/3d-fluency/50/like--v6.png"
                                 alt="like--v6"/>
                        </Badge>
                    </div>
                </Tooltip>
                <AccountMenu/>
            </div>
        </div>
    );
};

export {Header};
