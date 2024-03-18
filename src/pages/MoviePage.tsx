import {FC, PropsWithChildren} from "react";

import {MovieDetails} from "../components";

interface IProps extends PropsWithChildren {

}

const MoviePage: FC<IProps> = () => {
    return (
        <div>
            <MovieDetails/>
        </div>
    );
};

export {MoviePage};