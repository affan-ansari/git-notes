import { IPublicGist } from 'src/components/dashboard/dashboard.types';

export interface GistActionsCellProps {
    // value: unknown;
    row: IPublicGist;
    onFork: (gist: IPublicGist) => void;
    onStar: (gist: IPublicGist) => void;
}
