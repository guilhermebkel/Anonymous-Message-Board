import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod'
import { Observable } from 'rxjs';

const api = environment.online_api

@Injectable()
export class ReplyService{

  constructor(private http: HttpClient) {}

  getReplies(board_id): Observable<[]>{
    return this.http.get<[]>(api + `/replies/${board_id}`)
  }

  createThread(data): Observable<[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };
    
    return this.http.post<[]>(
      api + '/replies', 
      JSON.stringify(data),
      options
    )
  }
}
