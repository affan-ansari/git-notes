import { IPublicGist } from '../dashboard.types';

export interface IPublicGistsCardsProps {
    gists: IPublicGist[];
    loading: boolean;
}
