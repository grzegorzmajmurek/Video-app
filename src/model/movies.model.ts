import { Thumbnails } from './api-response.model';

export interface Movie {
    id: string;
    image: Thumbnails;
    title: string;
    viewCount: string;
    publishedAt: string;
    url: string;
    favourite: boolean;
}