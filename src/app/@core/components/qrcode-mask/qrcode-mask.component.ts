import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qrcode-mask',
  templateUrl: './qrcode-mask.component.html',
  styleUrls: ['./qrcode-mask.component.scss'],
})
export class QrcodeMaskComponent {
  @Input() qrcode: string;
  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() logo: string;
  @Input() footer: string;

  @ViewChild('qrcodeEl', { static: true }) qrcodeEl: ElementRef<HTMLDivElement>;

  constructor() {}

  async baixarImagem() {
    const canvas = await html2canvas(this.qrcodeEl.nativeElement, {
      allowTaint: true,
      useCORS: true,
      logging: environment.production,
    });
    const myImage = canvas.toDataURL('image/png');
    this.downloadURI('data:' + myImage, this.titulo + '.png');
  }

  downloadURI(uri: string, name: string) {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    link.click();
    link.remove();
  }
}
