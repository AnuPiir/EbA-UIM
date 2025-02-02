import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureGroupResponse } from '../model/feature-group-response';
import { FeatureGroupEndpointConstants } from '../../constants/feature-group-endpoint-constants';

@Injectable({
  providedIn: 'root'
})
export class FeatureGroupService {

  constructor(private http: HttpClient) {}

  public createFeatureGroup(questionnaireId: number, name: string): Observable<FeatureGroupResponse> {
    return this.http.post<any>(
      FeatureGroupEndpointConstants.rootUri(),
      {name: name, questionnaireId: questionnaireId}
    );
  }

  public getFeatureGroupsByQuestionnaireId(questionnaireId: number): Observable<FeatureGroupResponse[]> {
    return this.http.get<FeatureGroupResponse[]>(
      FeatureGroupEndpointConstants.getByQuestionnaireId(questionnaireId)
    );
  }

  public deleteFeatureGroup(id: number): Observable<any> {
    return this.http.delete<any>(FeatureGroupEndpointConstants.idPath(id));
  }

  public updateFeatureGroup(id: number, name: string): Observable<FeatureGroupResponse> {
    return this.http.put<FeatureGroupResponse>(FeatureGroupEndpointConstants.idPath(id), {name: name});
  }
}
