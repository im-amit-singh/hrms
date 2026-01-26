import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeListComponent } from './pages/employees/employee-list/employee-list.component';
import { EmployeeAddComponent } from './pages/employees/employee-add/employee-add.component';
import { AttendanceListComponent } from './pages/attendance/attendance-list/attendance-list.component';
import { MarkAttendanceComponent } from './pages/attendance/mark-attendance/mark-attendance.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/add', component: EmployeeAddComponent },
      { path: 'attendance', component: AttendanceListComponent },
      { path: 'attendance/mark', component: MarkAttendanceComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
