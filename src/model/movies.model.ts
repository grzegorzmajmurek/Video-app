import { Thumbnails } from './api-response.model';

export interface Movie {
    id?: number;
    movieId: string;
    image: Thumbnails;
    title: string;
    viewCount: string;
    publishedAt: string;
    url: string;
    favorite: boolean;
}

export enum DISPLAY_TYPE {
    CARD = 'CARD',
    LIST = 'LIST',
    LIST_FAVORITE = 'LIST_FAVORITE'
}

export enum VIDEO_WEBSITE {
    YOUTUBE = 'YOUTUBE',
    VIMEO = 'VIMEO'
}

export enum SORT {
    ASC = 'ASCENDING',
    DSC = 'DESCENDING'
}
