import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public exportQuestionnaire(id: number, language: string): Observable<any> {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>('api/excel/' + id + "?language=" + language, httpOptions);
  }
}
