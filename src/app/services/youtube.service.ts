import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http'
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtube = 'https://www.googleapis.com/youtube/v3' ;
  private apiKey = 'AIzaSyCR3jBVymvmj2Rc43c86w-u-TWI1Egettc' ;
  private playList = 'UUFnzyYoaHw7jMqbw4blpTZQ';

  private nextPageToken = '' ;

  constructor(private http:HttpClient) { 

    console.log("Esta iniciando el servicio");
  }

  getVideos(){
    const Url = `${ this.youtube }/playlistItems?`
    const params = new HttpParams()
    .set('part','snippet')
    .set('key',this.apiKey)
    .set('playlistId',this.playList)
    .set('maxResults',8)
    .set('pageToken',this.nextPageToken)

   return this.http.get<YoutubeResponse>(Url,{ params })
   .pipe(
     map( resp => {
       this.nextPageToken = resp.nextPageToken;
       return resp.items
     }),
     map(items => items.map( video => video.snippet ))
   )
  }
}
