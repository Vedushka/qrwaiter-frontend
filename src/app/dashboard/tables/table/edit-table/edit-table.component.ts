import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { table } from 'console';
import { TableDTO, TableService } from '../../../../services/table.service';
import { AddTableComponent } from '../../add-table/add-table.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { YesNoDialogComponent, YesNoDialogContent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-table',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatDividerModule, MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatProgressBarModule],
  templateUrl: './edit-table.component.html',
  styleUrl: './edit-table.component.scss'
})
export class EditTableComponent {
  constructor(
    private tableService: TableService,
    private dialogRef: MatDialogRef<EditTableComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: TableDTO
  ) {
    this.form.get("name")?.setValue(this.data.name);
    this.form.get("number")?.setValue(this.data.number);
  }
  loading = false;
  @Output() changedTable = new EventEmitter<TableDTO>();

  form = new FormGroup({
    name: new FormControl('Table', [Validators.required]),
    number: new FormControl<number>(0, [Validators.required]),
  });
  onUpdate() {
    this.loading = true;
    this.data.name = this.form.get("name")?.getRawValue(),
    this.data.number = this.form.get("number")?.getRawValue(),
    this.tableService.updateTable(this.data).subscribe(response => {
      this.dialogRef.close("updated");
      this.snackBar.open("Table changed", "", { duration: 2000 })
      this.loading = false;
      });
  }
  onDelete() {

      let yesNoContent: YesNoDialogContent = { header: `Delete`, description: `Do you want delete ${this.data.name} at number ${this.data.number}? To delete a table, enter:</br><b>${this.data.name} ${this.data.number}</b>`, keyString : `${this.data.name} ${this.data.number}`}
      let yesNoDialogRef = this.dialog.open(YesNoDialogComponent, { data: yesNoContent, id: "yesNoDeleteTabledDialog", ariaModal: true, width: "440px" });
      yesNoDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loading = true;
          this.tableService.deleteTable(this.data.id).subscribe(response => {
            this.dialogRef.close("deleted");
          });
        }
      });
    

  }
}
