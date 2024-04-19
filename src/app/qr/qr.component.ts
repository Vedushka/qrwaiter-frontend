import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.scss'
})
export class QrComponent {

}
