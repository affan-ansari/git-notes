import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { IGistHeadingProps } from './gist-heading.types';
import moment from 'moment';

import './gist-heading.styles.scss';

const GistHeading: React.FC<IGistHeadingProps> = ({ gist }) => {
    return (
        <Box className="gist-heading__mainBox">
            <Avatar alt={gist?.owner.login} src={gist?.owner.avatar_url} />
            <Box>
                <Typography component="div" className="global__overflowTextContent">
                    <a
                        className="gist-heading__text"
                        target="_blank"
                        rel="noreferrer"
                        href={gist?.owner?.html_url}
                    >
                        {gist?.owner?.login}
                    </a>{' '}
                    /{' '}
                    <a
                        className="gist-heading__text gist-heading__gistName"
                        target="_blank"
                        rel="noreferrer"
                        href={gist.html_url}
                    >
                        {gist && Object.keys(gist.files)[0]}
                    </a>
                </Typography>
                <Typography variant="caption" color="textSecondary" component="div">
                    {moment(gist?.created_at).fromNow()}
                </Typography>
                <Typography
                    variant="caption"
                    component="div"
                    color="textSecondary"
                    className="global__overflowTextContent"
                >
                    {gist?.description ? gist?.description : 'No description'}
                </Typography>
            </Box>
        </Box>
    );
};

export default GistHeading;
