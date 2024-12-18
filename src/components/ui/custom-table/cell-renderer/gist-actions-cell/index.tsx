import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { GistActionsCellProps } from './gist-actions-cell.types';
import { GistResponseErrorData } from '../../../../../components/dashboard/dashboard.types';
import {
    forkGist,
    isStarredGist,
    starGist,
    unStarGist,
} from '../../../../../components/dashboard/dashboard-service';

import useSWR from 'swr';
import StarIcon from '@mui/icons-material/Star';
import Spinner from '../../../../../components/ui/spinner';
import GitForkIcon from '../../../../../assets/svgComponents/GitForkIcon';
import GitStarIcon from '../../../../../assets/svgComponents/GitStarIcon';

import './gist-actions-cell.styles.scss';

const GistActionsCell = ({ row: gist }: GistActionsCellProps) => {
    const { data, isLoading, isValidating } = useSWR(`/gists/${gist.id}/star`, isStarredGist);
    const loading = isLoading || isValidating;

    const [isStarred, setIsStarred] = useState(false);
    const [starringGist, setStarringGist] = useState(false);
    const [forkingGist, setForkingGist] = useState(false);

    useEffect(() => {
        if (data) setIsStarred(true);
    }, [data]);

    const handleFork = async () => {
        setForkingGist(true);
        try {
            await forkGist(gist.id);
            toast.success('Gist forked successfully!');
        } catch (error) {
            const err = error as AxiosError;
            const errData = err.response?.data as GistResponseErrorData;
            toast.error(errData?.message ?? err.message ?? 'Something went wrong');
        }
        setForkingGist(false);
    };

    const handleStar = async () => {
        setStarringGist(true);
        try {
            if (isStarred) {
                await unStarGist(gist.id);
                toast.success('Gist unstarred successfully!');
            } else {
                await starGist(gist.id);
                toast.success('Gist starred successfully!');
            }
            setIsStarred((prev) => !prev);
        } catch (error) {
            const err = error as AxiosError;
            const errData = err.response?.data as GistResponseErrorData;
            toast.error(errData?.message ?? err.message ?? 'Something went wrong');
        }
        setStarringGist(false);
    };

    return (
        <Box className="gist-actions-cell__btnBox">
            {forkingGist ? (
                <Spinner />
            ) : (
                <IconButton onClick={handleFork}>
                    <GitForkIcon />
                </IconButton>
            )}
            {starringGist || loading ? (
                <Spinner />
            ) : (
                <IconButton onClick={handleStar}>
                    {isStarred ? <StarIcon color="primary" /> : <GitStarIcon />}
                </IconButton>
            )}
        </Box>
    );
};

export default GistActionsCell;
