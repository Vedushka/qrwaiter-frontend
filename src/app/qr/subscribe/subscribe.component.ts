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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../services/notification.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule, AngularFireModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  qrCodeAndTableDto$!: Observable<QrCodeAndTableDTO>;
  token$: Observable<any>;
  message$: Observable<any>;
  fiirebaseActive = false;
  subscribed = false;
  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });
  nameReadonly = false;
  link$: Observable<string>;
  constructor(readonly route: ActivatedRoute,
    readonly messaging: AngularFireMessaging,
    readonly qrCodeService: QrCodeService,
    readonly notificationService: NotificationService,
    readonly localStorageService: LocalStorageService
  ) {
    this.link$ = this.route.params.pipe<string>(map((p) => p['id']));
    this.form.get('name')?.setValue(localStorageService.getItem("waiterName"));
    if (localStorageService.getItem("waiterName")) {
      this.nameReadonly = true;
    }
    this.message$ = messaging.messages;
    this.token$ = messaging.tokenChanges.pipe(
      trace('token'),
      tap(token => this.fiirebaseActive = !token)
    );
    this.link$.subscribe(link => {
      this.token$.subscribe(token => {
        if (!token) {
          token = "";
        }
        this.qrCodeAndTableDto$ = this.qrCodeService.getQrCodeAndTableDto(link, LinkType.WaiterLink, token);
      })
    })
  }
  subscribeToTable() {
    this.nameReadonly = true;
    this.localStorageService.setItem("waiterName", this.form.get('name')?.getRawValue());
    this.token$.subscribe(token => {
      this.link$.subscribe(link => {
        this.notificationService.addDeviceToQrCode({ deviceToken: String(token), link: link, name: this.form.get('name')?.getRawValue() }, false).subscribe(() => {
          this.qrCodeAndTableDto$ = this.qrCodeService.getQrCodeAndTableDto(link, LinkType.WaiterLink, token);
        })
      })
    })
  }
  unsubscribeFromTable() {
    this.token$.subscribe(token => {
      this.link$.subscribe(link => {
        this.notificationService.unsubscribeDeviceFromQrCode(token, link).subscribe(() => {
          this.qrCodeAndTableDto$ = this.qrCodeService.getQrCodeAndTableDto(link, LinkType.WaiterLink, token);
        })
      })
    })
  }
  requestToken() {
    if (this.fiirebaseActive) {
      this.messaging.requestPermission.subscribe();
    }
  }
}
