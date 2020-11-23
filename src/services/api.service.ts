import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(public httpClient: HttpClient) { }

    fetchYoutubeApi(value: string): Observable<any> {
        let params = new HttpParams();
        const data = {
            part: 'snippet',
            key: 'AIzaSyAVPRtNBbTqBey08rHQRrZPQHgDWYCFcr4',
            maxResults: 10,
            id: value
        };
        Object.keys(data).forEach(p => {
            params = params.append(p, data[p]);
        });
        return this.httpClient.get('https://www.googleapis.com/youtube/v3/videos', { params });
    }

}