import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {TableDTO, TableWithWaitersDTO} from "../../services/table.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {AsyncPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {QrCodeAndTableDTO} from "../../services/qr-code.service";
import {Observable} from "rxjs/internal/Observable";
import {NotificationService} from "../../services/notification.service";
import {LocalStorageService} from "../../services/localStorage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-table-subscribe',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, AsyncPipe, MatIcon],
  templateUrl: './table-subscribe.component.html',
  styleUrl: './table-subscribe.component.scss'
})
export class TableSubscribeComponent implements OnChanges {
  @Input({required: true}) table!: TableWithWaitersDTO;
  @Input({required: true}) deviceToken!: string;
  @Input({required: true}) waiterName!: string;
  @Output() changedTable = new EventEmitter<TableWithWaitersDTO>();

  subscribed = false;
  qrCodeAndTableDto$!: Observable<QrCodeAndTableDTO>;
  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  constructor(readonly notificationService: NotificationService,
              readonly snackBar: MatSnackBar,
  ) {
  }

  ngOnChanges() {
    this.subscribed = this.table.waiters.some(w => w.deviceToken == this.deviceToken);
  }

  subscribeToTable() {
    this.notificationService.addDeviceToQrCode({
      deviceToken: this.deviceToken,
      link: this.table.waiterLink,
      name: this.waiterName
    }, false).subscribe(response => {
      this.table.waiters.push(({deviceToken: response.deviceToken, name: response.name}))
      this.subscribed = this.table.waiters.some(w => w.deviceToken == this.deviceToken);
      this.snackBar.open(`You subscribed to ${this.table.name} ${this.table.number}`,undefined,{duration:2000});
      this.changedTable.emit(this.table);
    });
  }

  unsubscribeFromTable() {
    this.notificationService.unsubscribeDeviceFromQrCode(this.deviceToken, this.table.waiterLink).subscribe(response => {
      const index = this.table.waiters.findIndex(w => w.deviceToken == this.deviceToken);
      this.table.waiters.splice(index, 1);
      this.subscribed = this.table.waiters.some(w => w.deviceToken == this.deviceToken);
      this.snackBar.open(`You unsubscribed from ${this.table.name} ${this.table.number}`,undefined,{duration:2000});
      this.changedTable.emit(this.table);
    });
  }
}
