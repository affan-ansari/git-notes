import axiosInstance from '../../app/axios';
import { IGithubUser, IPublicGist } from './dashboard.types';

export const getPublicGists = async (url: string) => {
    const paramsString = url.split('?')[1];
    const filterParams = getFilterParams(paramsString);
    const response = await axiosInstance.get<IPublicGist[]>('/gists/public', {
        params: filterParams,
    });
    return response.data;
};

export const getGist = async (url: string) => {
    const response = await axiosInstance.get<IPublicGist>(url);
    return response.data;
};

export const getUser = async (url: string) => {
    const response = await axiosInstance.get<IGithubUser>(url);
    return response.data;
};

export const getAuthenticatedGists = async (url: string) => {
    const paramsString = url.split('?')[1];
    const filterParams = getFilterParams(paramsString);
    const response = await axiosInstance.get<IPublicGist[]>('/gists', { params: filterParams });

    const linkHeader = response.headers.link;
    const lastPage = extractLastPage(linkHeader);
    const totalPages = lastPage ?? parseInt(filterParams['page']);
    return { gistsData: response.data, totalPages };
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

const extractLastPage = (linkHeader: string): number | null => {
    if (!linkHeader) return null;

    const links = linkHeader.split(',').map((link) => link.trim());
    for (const link of links) {
        if (link.includes('rel="last"')) {
            const match = link.match(/page=(\d+)/);
            return match ? parseInt(match[1], 10) : null;
        }
    }
    return null;
};
