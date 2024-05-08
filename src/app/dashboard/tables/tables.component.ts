import {Component} from '@angular/core';
import {TableDTO, TableService} from '../../services/table.service';
import {LocalStorageService} from '../../services/localStorage.service';
import {TableComponent} from "./table/table.component";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddTableComponent} from './add-table/add-table.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tables',
  standalone: true,
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
  imports: [MatDialogModule, MatButtonModule, MatDividerModule, MatIconModule, TableComponent, MatCardModule],

})
export class TablesComponent {
  $tables!: Array<TableDTO>

  constructor(private tableService: TableService,
              private localStorageService: LocalStorageService,
              public addTableDialog: MatDialog,
              private router: Router
  ) {
    tableService.getTablesByRestaurantId(this.localStorageService.getItem("restaurantId")).subscribe(
      response => {
        this.$tables = response;
      }
    );
  }

  changedTable($event: TableDTO) {
    this.tableService.getTablesByRestaurantId(this.localStorageService.getItem("restaurantId")).subscribe(
      response => {
        this.$tables = response;
      })
  };

  openDialog() {

    let tableNum = 1;
    if (this.$tables.length > 0) {
      tableNum = this.$tables[this.$tables.length - 1].number + 1;
    }
    let dialogRef = this.addTableDialog.open(AddTableComponent, {id: "addTableDialog", data: tableNum});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableService.getTablesByRestaurantId(this.localStorageService.getItem("restaurantId")).subscribe(
          response => {
            this.$tables = response;
          })
      }
    });
  }

  printQrsClients() {
    this.router.navigate(["/dashboard/qr-print"], {
      queryParams: {
        type: "ClientLink"
      }
    })
  }
  printQrsWaiters() {
    this.router.navigate(["/dashboard/qr-print"], {
      queryParams: {
        type: "WaiterLink"
      }
    })
  }
}
