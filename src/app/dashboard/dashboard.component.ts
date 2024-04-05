import { AfterRenderPhase, Component, afterRender } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { IdentityService } from '../services/identity.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CommonModule, MatListModule, MatDividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardSidebarOpened: boolean = Boolean(this.localStorageService.getItem('dashboardSidebarOpened'))
  constructor(private localStorageService: LocalStorageService, private identityService: IdentityService, private router: Router) {

    let dashboardSidebarOpenedLocalStorage = this.localStorageService.getItem('dashboardSidebarOpened')
    if (dashboardSidebarOpenedLocalStorage == "") {
      this.localStorageService.setItem('dashboardSidebarOpened', 'true')
      this.dashboardSidebarOpened = true
    }
    else {
      this.dashboardSidebarOpened = JSON.parse(dashboardSidebarOpenedLocalStorage)
    }
  }
  logout() {
    this.identityService.logout();
  }
  toggle() {
    this.dashboardSidebarOpened = !this.dashboardSidebarOpened
    this.localStorageService.setItem('dashboardSidebarOpened', String(this.dashboardSidebarOpened))
  }
}
