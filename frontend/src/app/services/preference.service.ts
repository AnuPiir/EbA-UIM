import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreferenceEndpointConstants } from '../constants/preference-endpoint-constants';

export interface Preference {
  type: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor (private http: HttpClient) { }

  getPreferences(): Observable<Preference[]> {
    return this.http.get<Preference[]>(
        PreferenceEndpointConstants.getAll()
    );
  }

  setPreference(type: string, value: string): Observable<void> {
    return this.http.post<void>(
        PreferenceEndpointConstants.save(type, value),
        {}
    );
  }
}
