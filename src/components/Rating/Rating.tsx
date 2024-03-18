import {FC, PropsWithChildren} from "react";
import StarRatings from 'react-star-ratings';

interface IProps extends PropsWithChildren {
    vote_average: number;
}

const Rating: FC<IProps> = ({vote_average}) => {
    return (
        <div>
            <StarRatings
                rating={vote_average}
                starRatedColor="blue"
                numberOfStars={10}
                starDimension="1vw"
                starSpacing="4px"
            />
        </div>
    );
};

export {Rating};