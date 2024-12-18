import axiosInstance from '../../app/axios';
import { GistFormData } from './create-gist/create-gist.types';
import { IGithubUser, IPublicGist } from './dashboard.types';

export const getPublicGists = async (url: string) => {
    const paramsString = url.split('?')[1];
    const filterParams = getFilterParams(paramsString);
    const response = await axiosInstance.get<IPublicGist[]>('/gists/public', {
        params: filterParams,
    });
    return response.data;
};

export const getUserGists = async (url: string) => {
    const paramsString = url.split('?')[1];
    const filterParams = getFilterParams(paramsString);
    const response = await axiosInstance.get<IPublicGist[]>(url, {
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

export const getAuthenticatedStarredGists = async (url: string) => {
    const paramsString = url.split('?')[1];
    const filterParams = getFilterParams(paramsString);
    const response = await axiosInstance.get<IPublicGist[]>('/gists/starred', {
        params: filterParams,
    });

    const linkHeader = response.headers.link;
    const lastPage = extractLastPage(linkHeader);
    const totalPages = lastPage ?? parseInt(filterParams['page']);
    return { gistsData: response.data, totalPages };
};

export const starGist = async (gistId: string) => {
    const response = await axiosInstance.put(`/gists/${gistId}/star`);
    return response.status;
};

export const unStarGist = async (gistId: string) => {
    const response = await axiosInstance.delete(`/gists/${gistId}/star`);
    return response.data;
};

export const isStarredGist = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.status;
};

export const forkGist = async (gistId: string) => {
    const response = await axiosInstance.post(`/gists/${gistId}/forks`);
    return response.status;
};

export const createGist = async (formData: GistFormData) => {
    return await axiosInstance.post('/gists', {
        ...formData,
    });
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
