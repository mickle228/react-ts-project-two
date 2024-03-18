import React, { FC, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import css from "./Movies.module.css";
import {IMovie, IPaginationData, IProps} from "../../../interfaces";
import { movieService } from "../../../services";
import { Genres } from "../../Genres/Genres/Genres";
import { Movie } from "../Movie/Movie";
import {CustomPagination} from "../../Pagination/CustomPagination";

const Movies: FC<IProps> = ({ genreIds }) => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [prevNext, setPrevNext] = useState<IPaginationData>({ currentPage: 1, onPageChange: () => {} });
    const location = useLocation();
    const searchText = new URLSearchParams(location.search).get("searchText") || "";
    const genreId = new URLSearchParams(location.search).get("genreId") || "";
    const [query, setQuery] = useSearchParams({ page: '1' });
    const totalPages = 500;

    useEffect(() => {
        const fetchData = async () => {
            const page = parseInt(query.get('page') || '1').toString();
            let responseData;

            if (searchText) {
                responseData = await movieService.getByName(searchText, page);
            } else if (genreId) {
                responseData = await movieService.getByGenreIds([+genreId], page)
            } else if (genreIds && genreIds.length > 0) {
                responseData = await movieService.getByGenreIds(genreIds, page)
            } else {
                responseData = await movieService.getAll(page);
            }

            const { data } = responseData;

            setMovies(data.results);
            setPrevNext({
                currentPage: data.page,
                onPageChange: handlePageChange
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        fetchData();
    }, [searchText, query, genreId, genreIds,]);

    const handlePageChange = (page: number):void => {
        const currentParams = new URLSearchParams(location.search);
        currentParams.set('page', page.toString());
        setQuery(currentParams);
    };

    return (
        <div>
            {!genreIds && <Genres />}
            <div className={css.Wrapper}>
                <div className={css.Episodes}>
                    {movies.map((movie) => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
            {!genreIds && (
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
