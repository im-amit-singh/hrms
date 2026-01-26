import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {

  filterForm!: FormGroup;
  loading = false;

  displayedColumns: string[] = ['employee_id', 'employee_name', 'date', 'status'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      employee_id: [''],
      date: ['']
    });

    this.fetchAttendance();
  }

  fetchAttendance(): void {
    this.loading = true;
    const filters = { ...this.filterForm.value };
    if (filters.date) {
      const dateObj = new Date(filters.date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');

      filters.date = `${year}-${month}-${day}`;
    }

    this.attendanceService.getAttendanceList(filters).subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;

        if (this.paginator) {
          this.paginator.firstPage();
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  reset(): void {
    this.filterForm.reset();
    this.fetchAttendance();
  }
}