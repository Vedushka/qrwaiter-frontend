import {Component} from '@angular/core';
import {map} from "rxjs/internal/operators/map";
import {Observable} from "rxjs/internal/Observable";
import {ActivatedRoute} from "@angular/router";
import {AngularFireModule} from "@angular/fire/compat";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {TableService, TableWithWaitersDTO} from "../../services/table.service";
import {TableComponent} from "../../dashboard/tables/table/table.component";
import {TableSubscribeComponent} from "../table-subscribe/table-subscribe.component";
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {trace} from "@angular/fire/compat/performance";
import {tap} from "rxjs/internal/operators/tap";
import {LocalStorageService} from "../../services/localStorage.service";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-waiter-page',
  standalone: true,
  imports: [CommonModule, AngularFireModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, TableComponent, TableSubscribeComponent],
  templateUrl: './waiter-page.component.html',
  styleUrl: './waiter-page.component.scss'
})
export class WaiterPageComponent {
  link$: Observable<string>;
  token: string = "";
  message$: Observable<any>;
  tables$: Observable<Array<TableWithWaitersDTO>>;
  tables!: Array<TableWithWaitersDTO>;
  nameExist = false;
  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });
  fiirebaseActive = false;
  constructor(readonly route: ActivatedRoute,
              readonly tableService: TableService,
              readonly messaging: AngularFireMessaging,
              readonly localStorageService: LocalStorageService,
              readonly notificationService: NotificationService,
              readonly snackBar: MatSnackBar,
  ) {

    this.form.get('name')?.setValue(localStorageService.getItem("waiterName"));
    if (localStorageService.getItem("waiterName")) {
      this.nameExist = true;
    }
    this.tables$ = new Observable<Array<TableWithWaitersDTO>>;
    this.link$ = this.route.params.pipe<string>(map((p) => p['restaurantLink']));
    this.message$ = messaging.messages;
    this.messaging.getToken.subscribe(token =>{
      this.token = token??"";
    })
    this.link$.subscribe(link => {
      this.tables$ = this.tableService.getTablesWitWaitersByRestaurantLink(link);
      this.tables$.subscribe(tables => {
        this.tables = tables;
      });
    });

  }

  requestToken() {
    if (this.fiirebaseActive) {
      this.localStorageService.setItem("waiterName", this.form.get('name')?.getRawValue());
      this.messaging.requestPermission.subscribe(() => {
        this.messaging.getToken.subscribe(token =>{
          this.token = token??"";
        })
        this.tables$.subscribe(tables => {
          this.tables = tables;
        });
      });

    }
  }

  allNotificationsOff() {
      this.notificationService.unsubscribeDeviceFromAllQrCodes(this.token).subscribe(() => {
        this.snackBar.open("Notifications turnded-off", undefined, {duration: 2000});
        this.tables$.subscribe(tables => {
          this.tables = tables;
        });

    });
  }
  changedTable($event: TableWithWaitersDTO) {
  }
}
