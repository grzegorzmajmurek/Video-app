import { Movie } from '@model/movies.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YoutubeApiResponse } from '@model/api-response.model';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class YoutubeApiService {

    constructor(public httpClient: HttpClient) { }

    private fetchYoutubeApi(value: string): Observable<YoutubeApiResponse> {
        let params = new HttpParams();
        const data = {
            part: 'snippet',
            key: environment.key.youtube,
            maxResults: 10,
            id: value
        };
        Object.keys(data).forEach(p => {
            params = params.append(p, data[p]);
        });
        params = params.append('part', 'statistics');
        return this.httpClient.get('https://www.googleapis.com/youtube/v3/videos', { params }) as Observable<YoutubeApiResponse>;
    }

    addMovie(link: string): Observable<Movie> {
        const videoId = this.extractId(link);
        return this.fetchYoutubeApi(videoId)
            .pipe(
                map((res: YoutubeApiResponse) => {
                    if (res.items.length === 0) {
                        return null;
                    }
                    const { id, snippet, statistics } = res.items[0];
                    return {
                        movieId: id,
                        imageUrl: snippet.thumbnails.default.url,
                        title: snippet.title,
                        viewCount: statistics.viewCount,
                        publishedAt: snippet.publishedAt,
                        url: `https://www.youtube.com/embed/${id}`,
                        favorite: false
                    };
                })
            );
    }
    extractId(link: string): string {
        // https://stackoverflow.com/a/54200105
        const url = link.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }
}
