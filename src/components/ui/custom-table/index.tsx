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

import './custom-table.styles.scss';

const CustomTable = <T extends { [key: string]: any }>({
    columns,
    data,
    loading,
}: CustomTableProps<T>) => {
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
                        ) : data.length > 0 ? (
                            data.map((row, rowIndex) => (
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
        </Box>
    );
};

export default CustomTable;
