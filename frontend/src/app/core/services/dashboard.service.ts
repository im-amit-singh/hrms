import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummary } from '../../shared/models/dashboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getSummary() {
    return this.http.get<DashboardSummary>(
      `${this.baseUrl}/dashboard/summary/`
    );
  }
}
