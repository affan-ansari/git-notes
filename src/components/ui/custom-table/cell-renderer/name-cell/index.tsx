import { Avatar, Box, Typography } from '@mui/material';
import { NameCellProps } from './name-cell.types';

// import AvatarIcon from "../../../../../components/ui/avatar-icon";

import './name-cell.styles.scss';

const NameCell = ({ row }: NameCellProps) => {
    return (
        <Box className="name-cell__nameCol">
            <Avatar alt={row.owner.login} src={row.owner.avatar_url} />
            <Typography>{row.owner.login}</Typography>
        </Box>
    );
};

export default NameCell;
