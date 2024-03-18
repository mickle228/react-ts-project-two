import React, { FC } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {ICustomPaginationProps} from "../../interfaces";


const CustomPagination: FC<ICustomPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Stack spacing={2} direction="row" justifyContent="center">
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                boundaryCount={2}
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'inherit',
                        marginBottom: 5,
                        '&:hover': {
                            backgroundColor: 'blue',
                            color: 'white',
                        },
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: 'blue',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'darkblue',
                        },
                        '& .MuiButtonBase-root': {
                            color: 'white',
                        },
                    }
                }}
            />
        </Stack>
    );
};

export {CustomPagination};
