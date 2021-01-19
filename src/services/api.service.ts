import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YoutubeApiResponse, VimeoApiResponse } from '@model/api-response.model';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(public httpClient: HttpClient) { }

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

    fetchVimeoApi(id: string): Observable<VimeoApiResponse> {
        let headers = new HttpHeaders();
        headers = headers
        .set('Content-Type', 'application/json')
        .set('Authorization', `bearer ${environment.key.vimeo}`)
        .set('Accept', 'application/vnd.vimeo.user+json;version=3.0,application/vnd.vimeo.video+json;version=3.4');
        return  this.httpClient.get(`https://api.vimeo.com/videos/${id}`, { headers }) as Observable<VimeoApiResponse>;
    }

}
