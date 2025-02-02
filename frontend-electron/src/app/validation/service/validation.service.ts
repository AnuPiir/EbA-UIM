import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationEndpointConstants } from '../../constants/validation-endpoint-constants';
import { Validation } from '../model/validation';
import { ValidationAnswer } from '../model/validation-answer';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) {}

  public getValidations(): Observable<Validation[]> {
    return this.http.get<Validation[]>(
      ValidationEndpointConstants.getValidationUri()
    );
  }

  public getValidationCombinationResults(): Observable<any> {
    return this.http.get<any[]>(
      ValidationEndpointConstants.getValidationCombinationResultUri()
    );
  }

  public getValidationAnswersByQuestionnaireId(questionnaireId: number): Observable<ValidationAnswer[]> {
    return this.http.get<ValidationAnswer[]>(
      ValidationEndpointConstants.getValidationAnswersByQuestionnaireIdUri(questionnaireId)
    );
  }

  public getValidationAnswersByFeatureGroupId(featureGroupId: number): Observable<ValidationAnswer[]> {
    return this.http.get<ValidationAnswer[]>(
      ValidationEndpointConstants.getValidationAnswersByFeatureGroupUri(featureGroupId)
    );
  }

  public deleteValidationAnswersByQuestionnaireIdAndRowId(questionnaireId: number, rowId: number): Observable<any> {
    return this.http.delete<any>(
      ValidationEndpointConstants.deleteValidationAnswersByQuestionnaireIdUriAndRowId(questionnaireId, rowId)
    );
  }

  public saveValidationAnswer(validationAnswer: ValidationAnswer): Observable<ValidationAnswer> {
    return this.http.put<ValidationAnswer>(
      ValidationEndpointConstants.getValidationAnswersUri(),
      validationAnswer
    );
  }
}
