import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureEndpointConstants } from '../../constants/feature-endpoint-constants';
import { FeaturePreCondition } from '../model/feature-pre-condition';

@Injectable({
  providedIn: 'root'
})
export class FeaturePreConditionService {

  constructor(private http: HttpClient) {}

  public create(answer: string): Observable<FeaturePreCondition> {
    return this.http.post<FeaturePreCondition>(
      FeatureEndpointConstants.preConditionRootUri(),
      {answer: answer}
    );
  }

  public update(id: number | undefined, answer: string): Observable<FeaturePreCondition> {
    return this.http.put<FeaturePreCondition>(
      FeatureEndpointConstants.preConditionIdPath(id),
      {answer: answer}
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(FeatureEndpointConstants.preConditionIdPath(id));
  }
}
