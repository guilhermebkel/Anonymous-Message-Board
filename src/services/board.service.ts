import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod'
import { Observable } from 'rxjs';

const api = environment.online_api

@Injectable()
export class BoardService{

  constructor(private http: HttpClient) {}

  getBoards(): Observable<[]>{
    return this.http.get<[]>(api + '/boards')
  }

  createBoard(title): Observable<[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };
    
    return this.http.post<[]>(
      api + '/boards', 
      JSON.stringify(title),
      options
    )
  }
}
