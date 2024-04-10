import { Component } from '@angular/core';
import { RestaurantDTO, RestaurantService } from '../../services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeZones } from '../profile/profile.component';
import { timeStamp } from 'console';
import { QrCodeService } from '../../services/qr-code.service';
import { QRCodeModule } from 'angularx-qrcode';
import { environment } from '../../../environments/environment';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { YesNoDialogComponent, YesNoDialogContent } from '../../components/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [QRCodeModule, MatIconModule, MatButtonModule],
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



  ) {
    this.restaurantService.getRestaurant().subscribe({
      next: restaurant => {
        this.restaurant = restaurant;
        this.timeZone = TimeZones.find(x =>x.value == restaurant.timeZoneMinutes)?.description??"";
        this.qrUrlWaiter += restaurant.waiterLink;
      }
    });

  }
  qrUrlWaiter = environment.baseUrl+"/waiter/";
  
  copyLink(link: string){
    this.clipboard.copy(link);
    this.snackBar.open("Ссылка скопирована", "", { duration: 2000 })
  }
  onGenerate() {
    let yesNoContent: YesNoDialogContent = { header: `Новый QR-код для официантов`, description: `Вы действительно хотите сгенерировать новый QR-код для ресторана? Текущий QR-код будет не допоступен.` }
    let yesNoDialogRef = this.dialog.open(YesNoDialogComponent, { data: yesNoContent, id: "yesNoDeleteTabledDialog", ariaModal: true });
    yesNoDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantService.generateNewRestaurantLink(this.restaurant.id).subscribe(response => {
          
          this.restaurant = response;
          this.snackBar.open("Новый QR-код сгенерирован", "", { duration: 2000 })
          this.qrUrlWaiter = environment.baseUrl+"/waiter/"+this.restaurant.waiterLink;
        },
        error=>{
          this.snackBar.open("Ошибка, попробуйте еще раз", "", { duration: 2000 })
        });
      }
    });


  }
}
