import { NgModule } from '@angular/core';
import { FormWrapModule } from './form-wrap/form-wrap.module';
import { PhotoCapturePageModule } from './photo-capture/photo-capture.module';
import { QrcodeLeitorPageModule } from './qrcode-leitor/qrcode-leitor.module';
import { QrcodeMaskModule } from './qrcode-mask/qrcode-mask.module';
import { QrcodeViewerPageModule } from './qrcode-viewer/qrcode-viewer.module';

const MODULES = [
  FormWrapModule,
  PhotoCapturePageModule,
  QrcodeLeitorPageModule,
  QrcodeMaskModule,
  QrcodeViewerPageModule
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class CoreComponentsModule {}
