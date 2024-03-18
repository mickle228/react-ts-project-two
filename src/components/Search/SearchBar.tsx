import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSearch } from "../../hoc";
import css from './SearchBar.module.css';

interface IFormInput {
    searchText: string;
}

const SearchBar: FC = () => {
    const [, setSearchText] = useState("");
    const { isSearchVisible, setSearchVisible } = useSearch(); // Додаємо setSearchVisible з контексту
    const { register, handleSubmit, reset } = useForm<IFormInput>();
    const navigate = useNavigate();

    const handleSearch: SubmitHandler<IFormInput> = (data) => {
        setSearchText(data.searchText);
        navigate(`movies?searchText=${encodeURIComponent(data.searchText)}`);
        reset();
        setSearchVisible(false); // Оновлюємо стан, щоб сховати пошукову форму
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
