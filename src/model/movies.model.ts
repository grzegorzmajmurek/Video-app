import { Thumbnails } from './api-response.model';

export interface Movie {
    id?: number;
    movieId: string;
    image: Thumbnails;
    title: string;
    viewCount: string;
    publishedAt: string;
    url: string;
    favourite: boolean;
}