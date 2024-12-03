import axiosInstance from '../../app/axios';
import { IPublicGist } from './dashboard.types';
// import { IPublicGistsResponse } from './dashboard.types';

export const getPublicGists = async () => {
    const response = await axiosInstance.get<IPublicGist[]>('/gists/public');
    return response.data;
};
