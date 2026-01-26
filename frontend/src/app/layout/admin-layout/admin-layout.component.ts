import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements AfterViewInit {

  isMobile = false;

  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngAfterViewInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;

        if (this.isMobile) {
          this.drawer.close();
        } else {
          this.drawer.open();
        }
      });
  }
}
