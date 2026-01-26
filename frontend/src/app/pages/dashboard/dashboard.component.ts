import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardSummary } from 'src/app/shared/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  summary!: DashboardSummary;
  loading = false;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.error = null;

    this.dashboardService.getSummary().subscribe({
      next: (res) => {
        this.summary = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load dashboard';
        this.loading = false;
      }
    });
  }
}