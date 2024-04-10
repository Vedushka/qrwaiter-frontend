import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-yes-no-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,  MatInputModule, MatFormFieldModule],
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.scss'
})
export class YesNoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: YesNoDialogContent,
              private dialogRef: MatDialogRef<YesNoDialogComponent>){}
  keyField = "";
}

export interface YesNoDialogContent {
  header?: string;
  description?: string;
  keyString?: string;
}
