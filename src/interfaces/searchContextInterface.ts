export interface ISearchContextType {
    isSearchVisible: boolean;
    toggleSearch: () => void;
    setSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
}