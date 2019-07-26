import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod'
import { Observable } from 'rxjs';

@Injectable()
export class ThreadService{

  constructor(private http: HttpClient) {}

  getThreads(board_id): Observable<[]>{
    return this.http.get<[]>(environment.online_api + `/threads/${board_id}`)
  }

  createThread(data): Observable<[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };
    
    return this.http.post<[]>(
      environment.online_api + '/threads', 
      JSON.stringify(data),
      options
    )
  }
}
