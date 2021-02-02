export interface Movie {
    id?: number;
    movieId: string | number;
    imageUrl: string;
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

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 5;
