import {FC, PropsWithChildren} from "react";

import {Movies} from "../components";
import {genreActions} from "../store";
import {useAppDispatch} from "../components/hooks";

interface IProps extends PropsWithChildren {

}

const MoviesPage: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    dispatch(genreActions.getAll());
    return (
        <div>
            <Movies/>
        </div>
    );
};

export {MoviesPage};