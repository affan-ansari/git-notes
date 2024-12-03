import { Chip } from '@mui/material';
import { KeywordCellProps } from './keyword-cell.types';

const KeywordCell = ({ row }: KeywordCellProps) => {
    const key = Object.keys(row.files)[0];
    const file = row.files[key];
    return <Chip label={file.language ?? file.type} color="primary" />;
};

export default KeywordCell;
