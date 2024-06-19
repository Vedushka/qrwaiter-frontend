import {Component, ElementRef, Input} from '@angular/core';
import {QRCodeModule} from "angularx-qrcode";
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {PrintQrCodeDTO, QrCodeService} from "../../services/qr-code.service";

@Component({
  selector: 'app-qr-print',
  standalone: true,
  imports: [
    QRCodeModule
  ],
  templateUrl: './qr-print.component.html',
  styleUrl: './qr-print.component.scss'
})
export class QrPrintComponent {
  @Input() qrCodes!: Array<PrintQrCodeDTO>;
  qrSize: number = 175;
  qrFontSize: number = 16;
  qrBorderRadius: number = 3;

  constructor(private elRef: ElementRef,
              readonly dataService: DataService,
              readonly route: ActivatedRoute,
              readonly qrCodeService: QrCodeService) {
  }

  updateCustomProperty() {
    this.elRef.nativeElement.style.setProperty('--qr-size', this.qrSize + "mm");
    this.elRef.nativeElement.style.setProperty('--font-size', this.qrFontSize + "pt");
    this.elRef.nativeElement.style.setProperty('--qr-border-radius', this.qrBorderRadius + "mm");
  }

  ngOnInit() {
    this.dataService.dataSubject.subscribe(value => {
      this.qrSize = value['qrSize'];
      this.qrBorderRadius = value['qrBorderRadius'];
      this.qrFontSize = value['qrFontSize'];
      this.updateCustomProperty();
    });
    this.route.queryParams.subscribe(params => {
        if (params['link'] && params['title']) {
          this.qrCodes = [{link: params['link'], title: params['title']}];
        } else if (params['type']) {
          this.qrCodeService.getQrCodesForPrint(params['type']).subscribe(qrs=>{
            this.qrCodes = qrs;
          })
        }
      }
    );
  }
}


