import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      employee_id: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.employeeForm.invalid || this.submitting) return;

    this.submitting = true;
    this.error = null;

    this.employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => {
        this.error = 'Failed to add employee';
        this.submitting = false;
      }
    });
  }
}
