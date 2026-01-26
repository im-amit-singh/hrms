import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent implements OnInit {

  attendanceForm!: FormGroup;
  employees: Employee[] = [];
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      employee: ['', Validators.required],
      date: ['', Validators.required],
      status: ['PRESENT', Validators.required]
    });

    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  submit() {
    if (this.attendanceForm.invalid) return;

    this.submitting = true;
    this.error = null;

    const formValue = this.attendanceForm.value;

    const payload = {
      employee: formValue.employee,
      status: formValue.status,
      date: this.formatDate(formValue.date)
    };

    this.attendanceService.markAttendance(payload).subscribe({
      next: () => {
        alert('Attendance marked successfully');
        this.attendanceForm.reset({ status: 'PRESENT' });
        this.submitting = false;
      },
      error: (err) => {
        this.error = err.error?.non_field_errors?.[0] || 'Something went wrong';
        this.submitting = false;
      }
    });
  }
}