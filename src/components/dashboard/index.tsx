import useSWR from 'swr';
import moment from 'moment';
import CustomTable from '../ui/custom-table';
import PublicGistsCards from './public-gists-cards';
import PublicGistsHeader from './public-gists-header';
import NameCell from '../ui/custom-table/cell-renderer/name-cell';
import PublicGistsPaginationControls from './public-gists-pagination';
import KeywordCell from '../ui/custom-table/cell-renderer/keyword-cell';
import GistActionsCell from '../ui/custom-table/cell-renderer/gist-actions-cell';

import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { IPublicGist } from './dashboard.types';
import { getPublicGists } from './dashboard-service';
import { Column } from '../ui/custom-table/custom-table.types';

import './dashboard.styles.scss';

const Dashboard = () => {
    const [viewStyle, setViewStyle] = useState<'list' | 'card'>('list');
    const [page, setPage] = useState(1);
    const PER_PAGE = 8;

    const { data, isLoading, isValidating } = useSWR(
        `/gists/public?page=${page}&per_page=${PER_PAGE}`,
        getPublicGists
    );
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
                return <Box className="global__overflowTextContent">{key}</Box>;
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
            <PublicGistsHeader viewStyle={viewStyle} setViewStyle={setViewStyle} />
            {viewStyle === 'list' ? (
                <CustomTable columns={columns} data={data ?? []} loading={loading} />
            ) : (
                <PublicGistsCards gists={data ?? []} loading={loading} />
            )}
            <PublicGistsPaginationControls page={page} setPage={setPage} variant={viewStyle} />
        </Box>
    );
};

export default Dashboard;
