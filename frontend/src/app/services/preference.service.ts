import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Preference {
  type: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private baseUrl = '/api/preference';

  constructor (private http: HttpClient) { }

  getPreferences(): Observable<Preference[]> {
    return this.http.get<Preference[]>(this.baseUrl);
  }

  updatePreference(type: string, value: string): Observable<any> {
    return this.http.post<void>(
        `${this.baseUrl}/type/${encodeURIComponent(type)}/value/${encodeURIComponent(value)}`,
        {}
    );
  }
}
