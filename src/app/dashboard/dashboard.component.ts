import {Component, HostListener, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDrawer, MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {filter} from 'rxjs';
import {CommonModule} from '@angular/common';
import {LocalStorageService} from '../services/localStorage.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {IdentityService} from '../services/identity.service';
import {DataService} from "../services/data.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatFormFieldModule, MatSliderModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CommonModule, MatListModule, MatDividerModule, FormsModule, MatInput],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardSidebarOpened: boolean = Boolean(this.localStorageService.getItem('dashboardSidebarOpened'));
  sideNavMode: MatDrawerMode = 'push';
  qrPrintPage = false;
  @ViewChild('drawer', { static: false }) public drawer : MatDrawer | undefined;


  qrSize = 175;
  qrFontSize = 16;
  qrBorderRadius = 3;


  constructor(readonly localStorageService: LocalStorageService,
              readonly identityService: IdentityService,
              readonly dataService: DataService,
              readonly router: Router) {
    console.log(this.router.url)
    if (this.router.url.includes('/dashboard/qr-print')) {
      this.qrPrintPage = true;
    }
    let dashboardSidebarOpenedLocalStorage = this.localStorageService.getItem('dashboardSidebarOpened')
    if (dashboardSidebarOpenedLocalStorage == "") {
      this.localStorageService.setItem('dashboardSidebarOpened', 'true')
      this.dashboardSidebarOpened = true
    } else {
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

  ngOnInit() {
    this.onResize();

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event.url.includes('/dashboard/qr-print')) {
        this.qrPrintPage = true;
      } else {
        this.qrPrintPage = false;
      }
    });

  }
  print(){
    if(this.drawer){
      this.drawer.close();
      this.dashboardSidebarOpened = false;
    }
    setTimeout(()=>{
      window.print();
    }, 500)

  }
  qrChangeValue($event: any) {
    this.dataService.changeOrAddData({'qrFontSize': this.qrFontSize,'qrBorderRadius': this.qrBorderRadius,'qrSize': this.qrSize});
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 960) {
      this.sideNavMode = "push";
    } else {
      this.sideNavMode = "side";
    }
  }
}
