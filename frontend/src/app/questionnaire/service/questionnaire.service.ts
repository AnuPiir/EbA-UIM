import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionnaireEndpointConstants } from '../../constants/questionnaire-endpoint-constants';
import { QuestionnaireResponse } from '../model/questionnaire-response';
import { QuestionnaireRequest } from '../model/questionnaire-request';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private http: HttpClient) {}

  public getQuestionnaires(): Observable<QuestionnaireResponse[]> {
      return this.http.get<QuestionnaireResponse[]>(
        QuestionnaireEndpointConstants.getQuestionnairesUri()
      );
  }

  public getQuestionnaire(id: number): Observable<QuestionnaireResponse> {
    return this.http.get<QuestionnaireResponse>(
      QuestionnaireEndpointConstants.getQuestionnaireUri(id)
    );
  }

  public deleteQuestionnaire(id: number): Observable<any> {
    return this.http.delete(QuestionnaireEndpointConstants.getQuestionnaireUri(id));
  }

  public saveQuestionnaire(body: QuestionnaireRequest): Observable<QuestionnaireResponse> {
    return this.http.put<QuestionnaireResponse>(
      QuestionnaireEndpointConstants.saveQuestionnaireUri(),
      body
    );
  }

  public exportQuestionnaireAsExcel(id: number, language: string): Observable<any> {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(`http://localhost:8080/api/export/excel/questionnaire/${id}/language/${language}`, httpOptions);
  }

  public exportQuestionnaireAsJson(id: number): Observable<any> {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(`http://localhost:8080/api/export/json/questionnaire/${id}`, httpOptions);
  }

  public importQuestionnaireFromJson(jsonData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`http://localhost:8080/api/import/json`, jsonData, httpOptions);
  }
}
