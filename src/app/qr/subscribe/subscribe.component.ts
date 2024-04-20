import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< Updated upstream
import { Observable, map } from 'rxjs';
=======
import { FirebaseServerApp } from 'firebase/app';
import { Observable, map } from 'rxjs';
import { FierBaseService } from '../../services/fier-base.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  id$: Observable<string>;
<<<<<<< Updated upstream
  constructor(private route: ActivatedRoute) {
=======
  constructor(private route: ActivatedRoute,
              private firebase: FierBaseService
  ) {
    firebase.requestPermission();
>>>>>>> Stashed changes
    this.id$ = this.route.params.pipe<string>(map((p) => p['id']));
  }
}
