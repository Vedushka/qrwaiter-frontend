import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddTableDTO, TableDTO as TableDTO, TableService } from '../../../services/table.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { time } from 'console';
import { timeInterval, timer } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-table',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatDividerModule, MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatProgressBarModule],
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.scss'
})
export class AddTableComponent {

  constructor(private tableService: TableService,
    private dialogRef: MatDialogRef<AddTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number

  ) { }
  table!: AddTableDTO;
  loading = false;
  form = new FormGroup({
    name: new FormControl('Table', [Validators.required]),
    number: new FormControl<number>(this.data, [Validators.required]),
  });
  onSubmit() {
    this.loading = true;
    this.table = {
      name: this.form.get("name")?.getRawValue(),
      number: this.form.get("number")?.getRawValue(),
      idResaurant: localStorage.getItem("restaurantId") ?? "",
    }
    this.tableService.addTable(this.table).subscribe(response => {
      this.dialogRef.close(true);
    })
  }
}
