import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { RouterOutlet } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ServiceWorkerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    readonly messaging: AngularFireMessaging,
    readonly toastr: ToastrService
  ){
    this.messaging.onMessage(msg =>{
      console.dir(msg)
      this.toastr.info(msg.notification.body, msg.notification.title
        ,{
        closeButton: true,
        timeOut: 0,
        extendedTimeOut: 2000,
        positionClass: "toast-bottom-right"
      }
    );

    })
  }
  title = 'qrwaiter-frontend';

}
