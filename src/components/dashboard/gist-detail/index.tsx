import useSWR from 'swr';
import GistHeading from './gist-heading';
import StarIcon from '@mui/icons-material/Star';
import SyntaxHighlighter from 'react-syntax-highlighter';
import GitStarIcon from '../../../assets/svgComponents/GitStarIcon';
import GitForkIcon from '../../../assets/svgComponents/GitForkIcon';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GistResponseErrorData } from '../dashboard.types';
import { Box, CircularProgress, Typography } from '@mui/material';
import { forkGist, getGist, isStarredGist, starGist, unStarGist } from '../dashboard-service';

import './gist-detail.styles.scss';

const GistDetail = () => {
    const { id: gistId } = useParams();
    const [isStarred, setIsStarred] = useState(false);
    const [starringGist, setStarringGist] = useState(false);
    const [forkingGist, setForkingGist] = useState(false);

    const { data: gist, isLoading, isValidating } = useSWR(`gists/${gistId}`, getGist);
    const loading = isLoading || isValidating;
    const code = gist?.files[Object.keys(gist.files)[0]].content ?? '';

    const {
        data: starredData,
        isLoading: isLoadingStarred,
        isValidating: isValidatingStarred,
    } = useSWR(`/gists/${gistId}/star`, isStarredGist);
    const loadingStarred = isLoadingStarred || isValidatingStarred;

    const handleFork = async () => {
        if (gistId) {
            setForkingGist(true);
            try {
                await forkGist(gistId);
                toast.success('Gist forked successfully!');
            } catch (error) {
                const err = error as AxiosError;
                const errData = err.response?.data as GistResponseErrorData;
                toast.error(errData?.message ?? err.message ?? 'Something went wrong');
            }
            setForkingGist(false);
        }
    };

    const handleStar = async () => {
        if (gistId) {
            setStarringGist(true);
            try {
                if (isStarred) {
                    await unStarGist(gistId);
                    toast.success('Gist unstarred successfully!');
                } else {
                    await starGist(gistId);
                    toast.success('Gist starred successfully!');
                }
                setIsStarred((prev) => !prev);
            } catch (error) {
                const err = error as AxiosError;
                const errData = err.response?.data as GistResponseErrorData;
                toast.error(errData?.message ?? err.message ?? 'Something went wrong');
            }
            setStarringGist(false);
        }
    };

    useEffect(() => {
        if (starredData) setIsStarred(true);
    }, [starredData]);

    if (loading) {
        return (
            <Box className="gist-detail__loadingBox">
                <CircularProgress disableShrink />
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Box className="gist-detail__header" mb={4}>
                {gist && <GistHeading gist={gist} />}
                <Box className="gist-detail__actionBtnGroup">
                    <Box className="gist-detail__actionBtnBox">
                        <LoadingButton
                            loadingPosition="start"
                            className="gist-detail__actionBtn"
                            startIcon={<GitForkIcon pathColor="white" />}
                            variant="contained"
                            onClick={handleFork}
                            loading={forkingGist}
                        >
                            Fork
                        </LoadingButton>
                        <Box className="gist-detail__actionBtnCount">{gist?.forks.length ?? 0}</Box>
                    </Box>
                    <Box className="gist-detail__actionBtnBox">
                        <LoadingButton
                            className="gist-detail__actionBtn"
                            startIcon={isStarred ? <StarIcon /> : <GitStarIcon pathColor="white" />}
                            variant="contained"
                            onClick={handleStar}
                            loadingPosition="start"
                            loading={starringGist || loadingStarred}
                        >
                            Star
                        </LoadingButton>
                        <Box className="gist-detail__actionBtnCount">0</Box>
                    </Box>
                </Box>
            </Box>
            <Box className="gist-detail__codeBox">
                {gist && (
                    <Typography className="gist-detail__fileName" color="primary">
                        {Object.keys(gist?.files)[0]}
                    </Typography>
                )}
                <SyntaxHighlighter
                    customStyle={{
                        height: '100%',
                        fontSize: 'small',
                        border: '1px solid #E3E3E3',
                        borderBottomRightRadius: 4,
                        borderBottomLeftRadius: 4,
                    }}
                    showLineNumbers
                >
                    {code}
                </SyntaxHighlighter>
            </Box>
        </Box>
    );
};

export default GistDetail;
