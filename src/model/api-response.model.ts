export interface YoutubeApiResponse {
    kind: string;
    etag: string;
    items: YoutubeApiItemResponse[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}

export interface YoutubeApiItemResponse {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: Thumbnails;
            medium: Thumbnails;
            high: Thumbnails;
            standard: Thumbnails;
            maxres: Thumbnails;
        },
        channelTitle: string;
        categoryId: string;
        liveBroadcastContent: string;
        defaultLanguage: string;
        localized: {
            title: string;
            description: string;
        },
        defaultAudioLanguage: string;
    };
    statistics: {
        viewCount: string;
        likeCount: string;
        dislikeCount: string;
        favoriteCount: string;
        commentCount: string;
    }

}

export interface Thumbnails {
    url: string;
    width: number;
    height: number;
}

export interface VimeoApiResponse {
    uri: string;
    name: string;
    description: string;
    embed: {
        html: string;
    };
    created_time: string;
    pictures: {
        sizes: PictureSize[];
    }
}

export interface PictureSize {
    width: number;
    height: number;
    link: string;
}
