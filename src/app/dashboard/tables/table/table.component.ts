import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TableDTO, TableService } from '../../../services/table.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTableComponent } from './edit-table/edit-table.component';
import { LocalStorageService } from '../../../services/localStorage.service';
import { EditQrCodeComponent } from './edit-qr-code/edit-qr-code.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Output() changedTable = new EventEmitter<TableDTO>();
  @Input({ required: true }) table!: TableDTO;
  constructor(private tableService: TableService,
              public dialog: MatDialog,
              private localStorageService: LocalStorageService,

  ) {

  }
  onDelete() {
    this.tableService.deleteTable(this.table.id).subscribe(response => {
      this.changedTable.emit(this.table);
    });

  }
  openDialogEdit() {
    
    const dialogRef = this.dialog.open(EditTableComponent, {data: this.table, id: "editTableDialog",});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableService.getTablesByRestaurantId(this.localStorageService.getItem("restaurantId")).subscribe(
          response => {
            this.changedTable.emit(this.table);
            dialogRef.close(true);
          })
      }
    });
  }
  openDialogQrCodeEdit() {
    const dialogRef = this.dialog.open(EditQrCodeComponent, {data: this.table, id: "editQrCodeDialog", width:'600px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableService.getTablesByRestaurantId(this.localStorageService.getItem("restaurantId")).subscribe(
          response => {
            this.changedTable.emit(this.table);
            dialogRef.close(true);
          })
      }
    });
  }
}
