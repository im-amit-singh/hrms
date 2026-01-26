import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../../shared/models/attendance.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  markAttendance(data: Attendance): Observable<any> {
    return this.http.post(`${this.baseUrl}/attendance/`, data);
  }

  getAttendanceList(filters?: {
    employee_id?: string;
    date?: string;
  }) {
    let params: any = {};

    if (filters?.employee_id) {
      params.employee_id = filters.employee_id;
    }

    if (filters?.date) {
      params.date = filters.date;
    }

    return this.http.get<any[]>(
      `${this.baseUrl}/attendance/list/`,
      { params }
    );
  }


  getEmployeeSummary(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/attendance/summary/`
    );
  }
}
