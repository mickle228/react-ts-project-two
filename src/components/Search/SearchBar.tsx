import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import { useSearch } from "../../hoc";
import css from './SearchBar.module.css';
import {useAppDispatch, useAppSelector} from "../hooks";
import {searchActions} from "../../store";

interface IFormInput {
    searchText: string;
}

const SearchBar: FC = () => {
    const [, setSearchText] = useState("");
    // const { isSearchVisible, setSearchVisible } = useSearch();
    const { register, handleSubmit, reset } = useForm<IFormInput>();
    const navigate = useNavigate();
    const {isSearchVisible} = useAppSelector(state => state.search)
    const dispatch = useAppDispatch();

    const handleSearch: SubmitHandler<IFormInput> = (data) => {
        setSearchText(data.searchText);
        navigate(`movies?searchText=${encodeURIComponent(data.searchText)}`);
        reset();
        // setSearchVisible(false); // Оновлюємо стан, щоб сховати пошукову форму
        dispatch(searchActions.toggleSearch())
    };

    return (
        <div>
            {isSearchVisible && (
                <div className={css.SearchContainer}>
                    <form onSubmit={handleSubmit(handleSearch)}>
                        <input
                            type="text"
                            className={css.SearchInput}
                            {...register("searchText")}
                        />
                        <button type="submit" className={css.SearchButton}>Пошук</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export { SearchBar };
