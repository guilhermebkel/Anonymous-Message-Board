import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod'
import { Observable } from 'rxjs';

@Injectable()
export class BoardService{

  boards: []

  constructor(private http: HttpClient) {}

  getBoards(): Observable<[]>{
    return this.http.get<[]>(environment.local_api + '/boards')
  }
}
