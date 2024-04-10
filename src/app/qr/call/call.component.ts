import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss'
})
export class CallComponent {
  id$: Observable<string>;
  constructor(private route: ActivatedRoute) {
    this.id$ = this.route.params.pipe<string>(map((p) => p['id']));
  }
}
