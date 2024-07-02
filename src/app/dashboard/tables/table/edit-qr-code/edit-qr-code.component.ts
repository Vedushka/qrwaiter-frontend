import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { QRCodeModule } from 'angularx-qrcode';
import { YesNoDialogContent, YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import { TableService, TableDTO } from '../../../../services/table.service';
import { EditTableComponent } from '../edit-table/edit-table.component';
import { LinkType, QrCodeDTO, QrCodeService } from '../../../../services/qr-code.service';
import { subscribe } from 'diagnostics_channel';
import { environment } from '../../../../../environments/environment';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-edit-qr-code',
  standalone: true,
  imports: [QRCodeModule, MatDialogModule, MatButtonModule, CommonModule, MatDividerModule, MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatProgressBarModule, RouterLink],
  templateUrl: './edit-qr-code.component.html',
  styleUrl: './edit-qr-code.component.scss'
})
export class EditQrCodeComponent {
  constructor(
    private qrCodeService: QrCodeService,
    private dialogRef: MatDialogRef<EditQrCodeComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: TableDTO,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private router: Router

  ) {
    this.qrCodeService.getQrCode(this.data.idQrCode).subscribe(response => {
      this.form.get("title")?.setValue(response.title);
      this.qrCode = response;
      this.qrUrlCall += this.qrCode.clientLink;
      this.qrUrlSubscribe += this.qrCode.waiterLink;
      });
    }

  public linkType = LinkType;
  public qrCode!: QrCodeDTO;
  qrUrlCall = environment.baseUrl+"/qr/call/";
  qrUrlSubscribe = environment.baseUrl+"/qr/subscribe/";
  loading = false;
  form = new FormGroup({
    title: new FormControl(""),
  });


  onUpdate() {
    this.loading = true;
    this.qrCode.title = this.form.get("title")?.getRawValue(),
      this.qrCodeService.updateQrCode(this.qrCode).subscribe(response => {
        this.form.get("title")?.setValue(response.title);
        this.qrCode = response;
        this.loading = false;
        this.snackBar.open("QR-code changed", "", { duration: 2000 })

      },
      error=>{
      this.loading = false;
      this.snackBar.open("Error, try again", "", { duration: 2000 })
    });
  }
  onGenerate(linkType: LinkType) {
    let yesNoContent: YesNoDialogContent = { header: `New QR code for customers`, description: `Are you sure you want to generate a new QR code for this table? The current QR code will not be available. You will have to stick a new QR code on the table. To generate a new QR code, enter: </br><b>${this.data.name} ${this.data.number}</b>`, keyString : `${this.data.name} ${this.data.number}` }
    if(linkType == LinkType.WaiterLink){
      yesNoContent = { header: `New QR code for waiters`, description: `Are you sure you want to generate a new QR code for this table? The current QR code will not be available.` }
    }
    let yesNoDialogRef = this.dialog.open(YesNoDialogComponent, { data: yesNoContent, id: "yesNoDeleteTabledDialog", ariaModal: true, width: "440px" });
    yesNoDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.qrCodeService.generateNewQrCodeLink(this.qrCode.id, linkType).subscribe(response => {
          this.form.get("title")?.setValue(response.title);
          this.qrCode = response;
          this.snackBar.open("New QR-code generated", "", { duration: 2000 })
          this.qrUrlCall = environment.baseUrl+"/qr/call/" + this.qrCode.clientLink;
          this.qrUrlSubscribe = environment.baseUrl+"/qr/subscribe/" + this.qrCode.waiterLink;
          this.loading = false;
        },
        error=>{
          this.loading = false;
          this.snackBar.open("Error, try again", "", { duration: 2000 })
        });
      }
    });


  }
  printQrClien(){
    this.router.navigate(["/dashboard/qr-print"], {queryParams: {link: this.qrUrlCall, title: `${this.qrCode.title}\n${this.data.name} ${this.data.number}`}})
  }
  printQrWaiter(){
    this.router.navigate(["/dashboard/qr-print"], {queryParams: {link: this.qrUrlSubscribe, title: `*${this.data.name} ${this.data.number}`}})
  }
  copyLink(link: string){
    this.clipboard.copy(link);
    this.snackBar.open("Link copied", "", { duration: 2000 })
  }
}
