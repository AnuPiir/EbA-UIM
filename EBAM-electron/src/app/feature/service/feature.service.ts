import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureEndpointConstants } from '../../constants/feature-endpoint-constants';
import { FeatureResponse } from '../model/feature';
import { QuestionnaireEndpointConstants } from '../../constants/questionnaire-endpoint-constants';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http: HttpClient) {}

  public create(answer: string): Observable<FeatureResponse> {
    return this.http.post<FeatureResponse>(
      FeatureEndpointConstants.rootUri(),
      {answer: answer}
    );
  }

  public update(id: number, answer: string, customId: string): Observable<FeatureResponse> {
    return this.http.put<FeatureResponse>(
      FeatureEndpointConstants.idPath(id),
      {answer: answer, customId: customId}
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(FeatureEndpointConstants.idPath(id));
  }
}
