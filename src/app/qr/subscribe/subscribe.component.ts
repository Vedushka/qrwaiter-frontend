import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { trace } from '@angular/fire/compat/performance';
import { AngularFireModule } from '@angular/fire/compat';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { LinkType, QrCodeAndTableDTO, QrCodeService } from '../../services/qr-code.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../services/notification.service';
import { LocalStorageService } from '../../services/localStorage.service';


@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule, AngularFireModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  qrCodeAndTableDto$!: Observable<QrCodeAndTableDTO>;
  token$: Observable<any>;
  message$: Observable<any>;
  fiirebaseActive = false;
  subscribed = false;
  name = "";
  nameReadonly = false;
  link$: Observable<string>;
  constructor(readonly route: ActivatedRoute,
    readonly messaging: AngularFireMessaging,
    readonly qrCodeService: QrCodeService,
    readonly notificationService: NotificationService,
    readonly localStorageService: LocalStorageService
  ) {
    this.link$ = this.route.params.pipe<string>(map((p) => p['id']));
    
    // this.token$.subscribe(token =>{
      // this.link$.subscribe(link => {
      // // this.qrCodeAndTableDto$ = this.qrCodeService.getQrCodeAndTableDto(link, LinkType.WaiterLink, "");
      //   this.qrCodeAndTableDto$ = this.qrCodeService.getQrCodeAndTableDto(link, LinkType.WaiterLink, token);
      // })
    // })
    this.name = localStorageService.getItem("waiterName");
    if (this.name) {
      this.nameReadonly = true;
    }
    this.message$ = messaging.messages;
    this.token$ = messaging.tokenChanges.pipe(
      trace('token'),
      tap(token => this.fiirebaseActive = !token)
    );
    // this.message$ = this.messaging.messages;
    // this.token$ = this.messaging.tokenChanges.pipe(
    //   trace('token'),
    //   tap(token => this.fiirebaseActive = !token),
    //   map(token =>{
    //     this.link$.subscribe(link => {
          // this.qrCodeAndTableDto$ = this.qrCodeService.getQrCodeAndTableDto(link, LinkType.WaiterLink, "");
            // this.qrCodeAndTableDto$ = this.qrCodeService.getQrCodeAndTableDto(link, LinkType.WaiterLink, token);
          // })
      // })
    // );
  }
  request() {
    this.nameReadonly = true;
    this.localStorageService.setItem("waiterName", this.name);
    if (this.fiirebaseActive) {
      
      this.messaging.requestPermission.subscribe(console.log, console.error);
      // this.token$ = this.messaging.tokenChanges.pipe(
      //   trace('token'),
      //   tap(token => this.fiirebaseActive = !!token)
      // );
      // this.token$.subscribe(token => {
      //   this.link$.subscribe(link => {
      //     this.notificationService.addDeviceToQrCode({ deviceToken: String(token), link: link, name: this.name }, false).subscribe(response => {
      //       console.dir(response);
      //     })
      //   })
      // })
    }
  }
}
