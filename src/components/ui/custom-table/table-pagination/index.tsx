import React from 'react';
import { Box, TablePagination } from '@mui/material';
import { TablePaginationControlsProps } from '../custom-table.types';

import './table-pagination.styles.scss';

const TablePaginationControls: React.FC<TablePaginationControlsProps> = ({
    count,
    currentPage,
    onPageChange,
}) => {
    return (
        <Box className="table-pagination__mainBox">
            <TablePagination
                count={count}
                rowsPerPage={8}
                component={'div'}
                page={currentPage}
                rowsPerPageOptions={[]}
                onPageChange={onPageChange}
            />
        </Box>
    );
};

export default TablePaginationControls;
