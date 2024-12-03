import useSWR from 'swr';
import moment from 'moment';
import CustomTable from '../ui/custom-table';
import NotesIcon from '@mui/icons-material/Notes';
import NameCell from '../ui/custom-table/cell-renderer/name-cell';
import KeywordCell from '../ui/custom-table/cell-renderer/keyword-cell';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GistActionsCell from '../ui/custom-table/cell-renderer/gist-actions-cell';

import { useCallback, useState } from 'react';
import { IPublicGist } from './dashboard.types';
import { getPublicGists } from './dashboard-service';
import { Column } from '../ui/custom-table/custom-table.types';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import './dashboard.styles.scss';

const Dashboard = () => {
    const [viewStyle, setViewStyle] = useState<'list' | 'card'>('list');

    const { data, isLoading, isValidating } = useSWR(`/gists/public`, getPublicGists);
    const loading = isLoading || isValidating;

    const handleFork = useCallback(
        () => (gist: IPublicGist) => {
            console.log(gist.id);
        },
        []
    );
    const handleStar = useCallback(
        () => (gist: IPublicGist) => {
            console.log(gist.html_url);
        },
        []
    );

    const columns: Column<IPublicGist>[] = [
        {
            label: 'Name',
            width: '25%',
            render: NameCell,
        },
        {
            label: 'Notebook Name',
            width: '40%',
            render: (value, _) => {
                const key = Object.keys(value.row.files)[0];
                return <Box>{key}</Box>;
            },
        },
        {
            label: 'Keyword',
            width: '10%',
            render: KeywordCell,
        },
        {
            label: 'Updated',
            width: '20%',
            render: (value, _) => moment(value.row.updated_at).fromNow(),
        },
        {
            label: '',
            width: '5%',
            render: GistActionsCell,
            renderProps: { onFork: handleFork, onStar: handleStar },
        },
    ];
    return (
        <Box>
            <Box className="dashboard__headingBox">
                <Typography variant="h4">Public Gists</Typography>
                <ButtonGroup>
                    <Button
                        className={`dashboard__btnGroupBtn ${
                            viewStyle === 'card' ? 'dasboard__selectedViewBtn' : ''
                        }`}
                        onClick={() => setViewStyle('card')}
                    >
                        <NotesIcon />
                    </Button>
                    <Button
                        className={`dashboard__btnGroupBtn ${
                            viewStyle === 'list' ? 'dasboard__selectedViewBtn' : ''
                        }`}
                        onClick={() => setViewStyle('list')}
                    >
                        <FormatListBulletedIcon color="primary" />
                    </Button>
                </ButtonGroup>
            </Box>
            {viewStyle === 'list' ? (
                <CustomTable columns={columns} data={data ?? []} loading={loading} />
            ) : (
                <>CARD VIEW</>
            )}
        </Box>
    );
};

export default Dashboard;
