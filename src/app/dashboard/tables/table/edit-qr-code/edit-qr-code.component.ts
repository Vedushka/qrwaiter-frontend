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

@Component({
  selector: 'app-edit-qr-code',
  standalone: true,
  imports: [QRCodeModule, MatDialogModule, MatButtonModule, CommonModule, MatDividerModule, MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatProgressBarModule],
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
        this.snackBar.open("QR-код изменен", "", { duration: 2000 })

      },
      error=>{
      this.loading = false;
      this.snackBar.open("Ошибка, попробуйте еще раз", "", { duration: 2000 })
    });
  }
  onGenerate(linkType: LinkType) {
    let yesNoContent: YesNoDialogContent = { header: `Новый QR-код для клиентов`, description: `Вы действительно хотите сгенерировать новый QR-код для этого столика? Текущий QR-код будет не допоступен. Вам придется клеить новый QR-код на столик. Для генерации нового QR-кода введите: </br><b>${this.data.name} ${this.data.number}</b>`, keyString : `${this.data.name} ${this.data.number}` }
    if(linkType == LinkType.WaiterLink){
      yesNoContent = { header: `Новый QR-код для официантов`, description: `Вы действительно хотите сгенерировать новый QR-код для этого столика? Текущий QR-код будет не допоступен.` }
    }
    let yesNoDialogRef = this.dialog.open(YesNoDialogComponent, { data: yesNoContent, id: "yesNoDeleteTabledDialog", ariaModal: true, width: "440px" });
    yesNoDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.qrCodeService.generateNewQrCodeLink(this.qrCode.id, linkType).subscribe(response => {
          this.form.get("title")?.setValue(response.title);
          this.qrCode = response;
          this.snackBar.open("Новый QR-код сгенерирован", "", { duration: 2000 })
          this.qrUrlCall = environment.baseUrl+"/qr/call/" + this.qrCode.clientLink;
          this.qrUrlSubscribe = environment.baseUrl+"/qr/subscribe/" + this.qrCode.waiterLink;
          this.loading = false;
        },
        error=>{
          this.loading = false;
          this.snackBar.open("Ошибка, попробуйте еще раз", "", { duration: 2000 })
        });
      }
    });


  }
  copyLink(link: string){
    this.clipboard.copy(link);
    this.snackBar.open("Ссылка скопирована", "", { duration: 2000 })
  }
}
