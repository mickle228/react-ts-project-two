export interface IPaginationData {
    currentPage: number;
    onPageChange: (page: number) => void;
}