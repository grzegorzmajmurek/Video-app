import { Movie } from './../model/movies.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YoutubeApiResponse } from '../model/api-response.model';
import { environment } from '../../../environments/environment';
import { MoviesService } from './movies.service';

@Injectable({
    providedIn: 'root',
})
export class YoutubeApiService {

    constructor(public httpClient: HttpClient, public moviesService: MoviesService) { }

    fetchYoutubeApi(value: string): Observable<YoutubeApiResponse> {
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


    addMovie(id: string) {
        this.fetchYoutubeApi(id)
            .subscribe((res: YoutubeApiResponse) => {
                const { id, snippet, statistics } = res.items[0];
                const movie: Movie = {
                    movieId: id,
                    imageUrl: snippet.thumbnails.default.url,
                    title: snippet.title,
                    viewCount: statistics.viewCount,
                    publishedAt: snippet.publishedAt,
                    url: `https://www.youtube.com/embed/${id}`,
                    favorite: false
                };
                this.moviesService.addMovie(movie);
            },
                (err) => console.error('Handle error from Youtube', err)
            );
    }
};



