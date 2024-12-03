import { useMemo, useState } from 'react';
import { CustomTableProps } from './custom-table.types';
import {
    Box,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    CircularProgress,
} from '@mui/material';

import TablePaginationControls from './table-pagination';

import './custom-table.styles.scss';

const CustomTable = <T extends { [key: string]: any }>({
    columns,
    data,
    loading,
    paginationVariant = 'primary',
}: CustomTableProps<T>) => {
    const ROWS_PER_PAGE = 8;
    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page);
    };

    // const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
    const paginatedData = useMemo(() => {
        const start = page * ROWS_PER_PAGE;
        const end = start + ROWS_PER_PAGE;
        return data.slice(start, end);
    }, [data, page, ROWS_PER_PAGE]);

    return (
        <Box>
            <TableContainer component={Box} className="custom-table__tableBox">
                <Table aria-label="reusable table">
                    <TableHead className="custom-table__thead">
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align="left"
                                    sx={{ width: column.width, maxWidth: column.width }}
                                >
                                    <strong>{column.label}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Box>
                                        <CircularProgress />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
                                <TableRow key={row.id || rowIndex} hover>
                                    {columns.map((column, colIndex) => (
                                        <TableCell
                                            key={colIndex}
                                            align={column.align || 'left'}
                                            height={35}
                                        >
                                            {column.render ? (
                                                <column.render
                                                    {...column.renderProps}
                                                    row={row}
                                                    value={row[column.accessor as keyof T]}
                                                />
                                            ) : (
                                                row[column.accessor as keyof T]
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No data available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePaginationControls
                count={data.length}
                currentPage={page}
                onPageChange={handleChangePage}
            />
        </Box>
    );
};

export default CustomTable;
