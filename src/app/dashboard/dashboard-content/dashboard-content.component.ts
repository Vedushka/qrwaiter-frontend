import { Component } from '@angular/core';
import { RestaurantDTO, RestaurantService } from '../../services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeZones } from '../profile/profile.component';
import { QRCodeModule } from 'angularx-qrcode';
import { environment } from '../../../environments/environment';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { YesNoDialogComponent, YesNoDialogContent } from '../../components/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [QRCodeModule, MatIconModule, MatButtonModule, RouterModule, RouterOutlet],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})
export class DashboardContentComponent {
  timeZone! : string;
  public restaurant!: RestaurantDTO;
  constructor(
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard,
    public dialog: MatDialog,
    public router: Router



  ) {
    this.restaurantService.getRestaurant().subscribe({
      next: restaurant => {
        this.restaurant = restaurant;
        this.timeZone = TimeZones.find(x =>x.value == restaurant.timeZoneMinutes)?.description??"";
        this.qrUrlWaiter += restaurant.waiterLink;
      }
    });

  }
  qrUrlWaiter = environment.baseUrl+"/qr/waiter/";
  printQrWaiters(){
    this.router.navigate(["/dashboard/qr-print"], {queryParams: {link: this.qrUrlWaiter, title: "QR code for waiters"}})
  }
  copyLink(link: string){
    this.clipboard.copy(link);
    this.snackBar.open("Link copied", "", { duration: 2000 })
  }
  onGenerate() {
    let yesNoContent: YesNoDialogContent = { header: `New QR-code for waiters`, description: `Are you sure you want to generate a new QR code for the restaurant? The current QR code will not be available.` }
    let yesNoDialogRef = this.dialog.open(YesNoDialogComponent, { data: yesNoContent, id: "yesNoDeleteTabledDialog", ariaModal: true });
    yesNoDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantService.generateNewRestaurantLink(this.restaurant.id).subscribe(response => {

          this.restaurant = response;
          this.snackBar.open("New QR-code generated", "", { duration: 2000 })
          this.qrUrlWaiter = environment.baseUrl+"/qr/waiter/"+this.restaurant.waiterLink;
        },
            error=>{
          this.snackBar.open("Error, try again", "", { duration: 2000 })
        });
      }
    });


  }
}
