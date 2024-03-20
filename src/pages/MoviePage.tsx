import {FC, PropsWithChildren} from "react";

import {MovieDetails} from "../components";
import {useAppDispatch} from "../components/hooks";
import {genreActions} from "../store";

interface IProps extends PropsWithChildren {

}

const MoviePage: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    dispatch(genreActions.getAll());
    return (
        <div>
            <MovieDetails/>
        </div>
    );
};

export {MoviePage};