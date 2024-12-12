import moment from 'moment';
import axiosInstance from '../../../../app/axios';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { useEffect, useState } from 'react';
import { IPublicGistCardProps } from './public-gist-card.types';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // You can choose different themes

import './public-gist-card.styles.scss';

const PublicGistCard: React.FC<IPublicGistCardProps> = ({ gist }) => {
    const [code, setCode] = useState('');

    useEffect(() => {
        const key = Object.keys(gist.files)[0];
        axiosInstance
            .get(gist.files[key].raw_url)
            .then((res) => {
                let data = res.data;
                if (typeof data === 'object') {
                    data = JSON.stringify(data, null, 2);
                }
                const first10Lines = data.split('\n').slice(0, 10).join('\n');
                setCode(first10Lines);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [gist.files, gist]);

    return (
        <Card>
            <SyntaxHighlighter
                customStyle={{ height: 200, fontSize: 'small', overflowX: 'hidden' }}
                style={atomOneDark}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter>
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
            </CardContent>
        </Card>
    );
};

export default PublicGistCard;
