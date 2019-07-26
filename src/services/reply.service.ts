import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class ReplyService{

  constructor(private http: HttpClient) {}

  getReplies(board_id): Observable<[]>{
    return this.http.get<[]>(environment.api + `/replies/${board_id}`)
  }

  createThread(data): Observable<[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };
    
    return this.http.post<[]>(
      environment.api + '/replies', 
      JSON.stringify(data),
      options
    )
  }
}
