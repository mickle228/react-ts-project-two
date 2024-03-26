import React, { FC, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import css from "./Movies.module.css";
import { IPaginationData, IProps } from "../../../interfaces";
import { Genres } from "../../Genres/Genres/Genres";
import { Movie } from "../Movie/Movie";
import { CustomPagination } from "../../Pagination/CustomPagination";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { movieActions} from "../../../store";

const Movies: FC<IProps> = ({ genreIds }) => {
    const [prevNext, setPrevNext] = useState<IPaginationData>({ currentPage: 1, onPageChange: () => {} });
    const location = useLocation();
    const searchText = new URLSearchParams(location.search).get("searchText") || "";
    const genreId = new URLSearchParams(location.search).get("genreId") || "";
    const liked = new URLSearchParams(location.search).get("liked") || "";
    const [query, setQuery] = useSearchParams({ page: '1' });
    const dispatch = useAppDispatch();
    const { movies, like } = useAppSelector(state => state.movies);
    let totalPages = 491;

    useEffect(() => {
        const fetchData = async () => {
            const page = parseInt(query.get('page') || '1').toString();
            if (searchText) {
                dispatch(movieActions.getByName({ searchText, page }));
            } else if (genreId) {
                const genreIds = [+genreId];
                dispatch(movieActions.getByGenreIds({ genreIds, page }));
            } else if (genreIds && genreIds.length > 0) {
                dispatch(movieActions.getByGenreIds({ genreIds, page }));
            } else if (liked) {
                dispatch(movieActions.getLikedMovies());
            } else {
                dispatch(movieActions.getAll({ page }));
            }

            setPrevNext({
                currentPage: +page,
                onPageChange: handlePageChange
            });
        };

        fetchData();
    }, [searchText, query, genreId, genreIds, dispatch, like]);

    const handlePageChange = (page: number): void => {
        const currentParams = new URLSearchParams(location.search);
        currentParams.set('page', page.toString());
        setQuery(currentParams);
    };

    const deleteLikes = () => {
        localStorage.removeItem('likedMovies')
        dispatch(movieActions.toogleLike())
    }

    return (
        <div>
            {!genreIds && !liked && genreId && <Genres />}
            {(movies?.length === 0 || !movies) &&
                <h1 className={css.Liked}>There are no liked movies. You can explore them and add here</h1>
            }
            <div className={css.deleteWrapper}>
                {liked && (movies?.length === 0 || movies) && <button className={css.delete} onClick={deleteLikes}> Delete all liked movies</button>}
            </div>
            <div className={css.Wrapper}>
                <div className={css.Episodes}>
                    {movies && movies.map((movie) => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
            {!genreIds && !liked && (
                <div className={css.PaginationContainer}>
                    <CustomPagination
                        currentPage={prevNext.currentPage}
                        onPageChange={prevNext.onPageChange}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    );
};

export { Movies };
