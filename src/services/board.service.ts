import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class BoardService{

  constructor(private http: HttpClient) {}

  getBoards(): Observable<[]>{
    return this.http.get<[]>(environment.api + '/boards')
  }

  createBoard(title): Observable<[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };
    
    return this.http.post<[]>(
      environment.api + '/boards', 
      JSON.stringify(title),
      options
    )
  }
}
