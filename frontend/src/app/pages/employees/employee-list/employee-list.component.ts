import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = [
    'employee_id',
    'full_name',
    'email',
    'department',
    'actions'
  ];

  dataSource = new MatTableDataSource<Employee>();
  loading = false;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees(),
      error: () => alert('Failed to delete employee')
    });
  }
}