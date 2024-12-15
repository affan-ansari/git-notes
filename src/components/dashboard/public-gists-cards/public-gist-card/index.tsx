import moment from 'moment';
import SyntaxHighlighter from 'react-syntax-highlighter';
import GitStarIcon from '../../../../assets/svgComponents/GitStarIcon';
import GitForkIcon from '../../../../assets/svgComponents/GitForkIcon';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPublicGistCardProps } from './public-gist-card.types';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';

import './public-gist-card.styles.scss';

const PublicGistCard: React.FC<IPublicGistCardProps> = ({ gist }) => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');

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

    return (
        <Card
            className="public-gist-card__card"
            component={Box}
            onClick={() => navigate(`gists/${gist.id}`)}
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
                    <IconButton onClick={() => console.log('start icon')}>
                        <GitStarIcon />
                    </IconButton>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('fork icon');
                        }}
                    >
                        <GitForkIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PublicGistCard;
