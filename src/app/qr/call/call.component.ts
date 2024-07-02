import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss'
})
export class CallComponent {
  id$: Observable<string>;
  constructor(readonly route: ActivatedRoute,
              readonly notificationService: NotificationService,
              readonly snackBar: MatSnackBar
  ) {
    this.id$ = this.route.params.pipe<string>(map((p) => p['id']));
  }


  callWaiter(){
    this.id$.subscribe(id =>{
      this.notificationService.callWaiter(id).subscribe(()=>{
        this.snackBar.open("Water called", undefined,{duration: 2000})
      })
    })
  }
}
