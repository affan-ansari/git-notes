import axiosInstance from '../../app/axios';
import { IPublicGist } from './dashboard.types';

export const getPublicGists = async (url: string) => {
    const paramsString = url.split('?')[1];
    const filterParams = getFilterParams(paramsString);
    const response = await axiosInstance.get<IPublicGist[]>('/gists/public', {
        params: filterParams,
    });
    return response.data;
};

// Service helper methods
const getFilterParams = (paramsString: string) => {
    const filterParams: Record<string, string> = {};
    const params = new URLSearchParams(paramsString);
    for (const [key, value] of params.entries()) {
        if (value) filterParams[key] = value;
    }
    return filterParams;
};
