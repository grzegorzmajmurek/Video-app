import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YoutubeApiResponse } from '../model/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class YoutubeApiService {

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
        return  this.httpClient.get('https://www.googleapis.com/youtube/v3/videos', { params }) as Observable<YoutubeApiResponse>;
    }

}
