import useSWR from 'swr';
import moment from 'moment';
import StarIcon from '@mui/icons-material/Star';
import Spinner from '../../../../components/ui/spinner';
import SyntaxHighlighter from 'react-syntax-highlighter';
import GitStarIcon from '../../../../assets/svgComponents/GitStarIcon';
import GitForkIcon from '../../../../assets/svgComponents/GitForkIcon';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GistResponseErrorData } from '../../dashboard.types';
import { IPublicGistCardProps } from './public-gist-card.types';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { forkGist, isStarredGist, starGist, unStarGist } from '../../dashboard-service';

import './public-gist-card.styles.scss';

const PublicGistCard: React.FC<IPublicGistCardProps> = ({ gist }) => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isStarred, setIsStarred] = useState(false);
    const [starringGist, setStarringGist] = useState(false);
    const [forkingGist, setForkingGist] = useState(false);

    const { data, isLoading, isValidating } = useSWR(`/gists/${gist.id}/star`, isStarredGist);
    const loading = isLoading || isValidating;

    useEffect(() => {
        const key = Object.keys(gist.files)[0];
        fetch(gist.files[key].raw_url)
            .then((response) => response.text())
            .then((data) => {
                if (typeof data === 'object') {
                    data = JSON.stringify(data, null, 2);
                }
                const first10Lines = data.split('\n').slice(0, 10).join('\n');
                setCode(first10Lines);
            })
            .catch((error) => {
                console.error('Error fetching the Gist:', error);
            });
    }, [gist.files]);

    useEffect(() => {
        if (data) setIsStarred(true);
    }, [data]);

    const handleFork = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
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

    const handleStar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
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
            const err = error as Error;
            toast.error(err.message);
        }
        setStarringGist(false);
    };

    return (
        <Card
            className="public-gist-card__card"
            component={Box}
            onClick={() => navigate(`/gists/${gist.id}`)}
        >
            <Box className="public-gist-card__codeContainer">
                <Box className="public-gist-card__viewBox">
                    View <span>{Object.keys(gist.files)[0]}</span>
                </Box>

                <SyntaxHighlighter
                    customStyle={{ height: 200, fontSize: 'small', overflowX: 'hidden' }}
                    showLineNumbers
                >
                    {code}
                </SyntaxHighlighter>
            </Box>
            <CardContent className="public-gist-card__cardContent">
                <Avatar alt={gist.owner.login} src={gist.owner.avatar_url} />
                <Box>
                    <Typography component="div" className="global__overflowTextContent">
                        <span className="public-gist-card__text">{gist.owner.login}</span> /{' '}
                        <span className="public-gist-card__text public-gist-card__gistName">
                            {Object.keys(gist.files)[0]}
                        </span>
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="div">
                        {moment(gist.created_at).fromNow()}
                    </Typography>
                    <Typography
                        variant="caption"
                        component="div"
                        color="textSecondary"
                        className="global__overflowTextContent"
                    >
                        {gist.description ? gist.description : 'No description'}
                    </Typography>
                </Box>
                <Box className="public-gist-card__actions">
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
            </CardContent>
        </Card>
    );
};

export default PublicGistCard;
