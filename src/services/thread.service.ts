import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class ThreadService{

  constructor(private http: HttpClient) {}

  getThreads(board_id): Observable<[]>{
    return this.http.get<[]>(environment.api + `/threads/${board_id}`)
  }

  createThread(data): Observable<[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };
    
    return this.http.post<[]>(
      environment.api + '/threads', 
      JSON.stringify(data),
      options
    )
  }
}
