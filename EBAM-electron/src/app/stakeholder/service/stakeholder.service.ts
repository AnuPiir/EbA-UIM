import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StakeholderResponse } from '../model/stakeholder-response';
import { StakeholderEndpointConstants } from '../../constants/stakeholder-endpoint-constants';

@Injectable({
  providedIn: 'root'
})
export class StakeholderService {

  constructor(private http: HttpClient) {}

  public createStakeholder(questionnaireId: number, name: string): Observable<StakeholderResponse> {
    return this.http.post<any>(
      StakeholderEndpointConstants.rootUri(),
      {name: name, questionnaireId: questionnaireId}
    );
  }

  public update(stakeHolderId: number, name: string): Observable<StakeholderResponse> {
    return this.http.put<StakeholderResponse>(
      StakeholderEndpointConstants.idPath(stakeHolderId),
      {name: name}
    );
  }

  public getStakeholdersByQuestionnaireId(questionnaireId: number): Observable<StakeholderResponse[]> {
    return this.http.get<StakeholderResponse[]>(
      StakeholderEndpointConstants.getByQuestionnaireId(questionnaireId)
    );
  }

  public deleteStakeholder(id: number): Observable<any> {
    return this.http.delete<any>(StakeholderEndpointConstants.idPath(id));
  }
}
