import {FC} from "react";
import YouTube from "react-youtube";

import {useAppSelector} from "../hooks";

const Trailer: FC = () => {
    const {trailers} = useAppSelector(state => state.movies)
    console.log(trailers)
    const opts = {
        height: '590',
        width: '800',
        playerVars: {
            autoplay: 1,
        },
    };
    return <YouTube videoId={trailers?.key} opts={opts}/>;
};

export {Trailer};