import {createContext, FC, PropsWithChildren, ReactNode, useContext, useState} from "react";

import {ISearchContextType, ISearchProviderProps} from "../interfaces";


interface IProps extends PropsWithChildren {
    children: ReactNode;
}
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
const SearchContext = createContext<ISearchContextType | undefined>(undefined);
const SearchProvider: FC<IProps> = ({ children }: ISearchProviderProps) => {
    const [isSearchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    return (
        <SearchContext.Provider value={{ isSearchVisible, toggleSearch, setSearchVisible }}>
            {children}
        </SearchContext.Provider>
    );
};

export {SearchProvider};