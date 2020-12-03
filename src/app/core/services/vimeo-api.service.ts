import { Movie } from './../model/movies.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VimeoApiResponse } from '../model/api-response.model';
import { environment } from '../../../environments/environment';
import { substringLink } from '../utile/utile';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class VimeoApiService {

    constructor(public httpClient: HttpClient) { }

    private fetchVimeoApi(id: string): Observable<VimeoApiResponse> {
        let headers = new HttpHeaders();
        headers = headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `bearer ${environment.key.vimeo}`)
            .set('Accept', 'application/vnd.vimeo.user+json;version=3.0,application/vnd.vimeo.video+json;version=3.4');
        return this.httpClient.get(`https://api.vimeo.com/videos/${id}`, { headers }) as Observable<VimeoApiResponse>;
    }

    addMovie(link: string): Observable<Movie> {
        const id = this.extractId(link);
        return this.fetchVimeoApi(id).pipe(
            map((res: VimeoApiResponse) => {
            return {
                movieId: id,
                imageUrl: res.pictures.sizes[0].link,
                title: res.name,
                viewCount: '',
                publishedAt: res.created_time,
                url: `https://player.vimeo.com/video/${id}`,
                favorite: false
            };
        })
        );
    }

    extractId(link: string): string {
        if (link.includes('https://') || link.includes('.com/')) {
            return substringLink('vimeo.com/', link);
        }

        return link;
    }
}



