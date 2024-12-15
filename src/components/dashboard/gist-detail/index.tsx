import useSWR from 'swr';
import GistHeading from './gist-heading';
import SyntaxHighlighter from 'react-syntax-highlighter';
import GitStarIcon from '../../../assets/svgComponents/GitStarIcon';
import GitForkIcon from '../../../assets/svgComponents/GitForkIcon';

import { useParams } from 'react-router-dom';
import { getGist } from '../dashboard-service';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import './gist-detail.styles.scss';

const GistDetail = () => {
    const { id: gistId } = useParams();

    const { data: gist, isLoading, isValidating } = useSWR(`gists/${gistId}`, getGist);
    const loading = isLoading || isValidating;
    const code = gist?.files[Object.keys(gist.files)[0]].content ?? '';

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
                        <Button
                            className="gist-detail__actionBtn"
                            startIcon={<GitForkIcon pathColor="white" />}
                            variant="contained"
                        >
                            Fork
                        </Button>
                        <Box className="gist-detail__actionBtnCount">{gist?.forks.length ?? 0}</Box>
                    </Box>
                    <Box className="gist-detail__actionBtnBox">
                        <Button
                            className="gist-detail__actionBtn"
                            startIcon={<GitStarIcon pathColor="white" />}
                            variant="contained"
                        >
                            Star
                        </Button>
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
