import React, { FC, PropsWithChildren } from "react";
import {useNavigate} from "react-router-dom";

import css from './Header.module.css'
import { Switcher } from "../Switcher/Switcher";
// import {useSearch} from "../../hoc";
import {AccountMenu} from "../AccountMenu/AccountMenu";
import {useAppDispatch} from "../hooks";
import {searchActions} from "../../store";

interface IProps extends PropsWithChildren {}

const Header: FC<IProps> = () => {
    // const { toggleSearch } = useSearch();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleNavigate = ():void => {
        navigate('/movies');
    };
    const toggleSearch = ():void => {
        dispatch(searchActions.toggleSearch())
    };

    return (
        <div className={css.Header}>
            {/*<SimpleMenu/>*/}
            <div className={css.IMovies} onClick={handleNavigate}>IMovies <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/clapperboard.png" alt="clapperboard"/></div>
            <div className={css.Theme}>
                <div className={css.Search} onClick={toggleSearch}>
                    Search
                </div>
                Theme
                <div className={css.Toggle}><Switcher/></div>
                <AccountMenu/>
            </div>
        </div>
    );
};

export { Header };
