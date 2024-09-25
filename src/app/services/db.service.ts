import { Injectable } from '@angular/core';
import { Question } from './question';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private httpClient: HttpClient)
  {  }

  // Render fake data
  getFakeQuestions() : any  { 
    return this.httpClient.get('assets/data/questions.json').pipe(map((res: any) => {
      return res.questions;
    }))
  }
  
  getFakeHealthCenter() : any  { 
    return this.httpClient.get('assets/data/healthCenter.json').pipe(map((res: any) => {
      return res.centers;
    }))
  }
}