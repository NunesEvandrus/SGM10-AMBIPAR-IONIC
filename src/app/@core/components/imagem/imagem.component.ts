import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange
} from '@angular/core';

const isPresent = (param) =>
  param !== undefined && param !== null && param !== '';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.scss']
})
export class ImagemComponent implements OnChanges {
  @Input() alt: string;
  @Input() title: string;
  @Input() src: string;
  @Input() srcError = 'assets/default.png';

  imgElement: any;
  erros = 0;

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {
    this.imgElement = new Image();
    this.loaded(false);
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.update();
  }

  update() {
    this.loaded(false);

    if (isPresent(this.alt)) {
      this.imgElement.alt = this.alt;
    }

    if (isPresent(this.title)) {
      this.imgElement.title = this.title;
    }

    this.imgElement.addEventListener('load', () => {
      this.elementRef.nativeElement.appendChild(this.imgElement);
      this.loaded(true);
    });

    this.imgElement.addEventListener('error', () => {
      this.erros++;
      //Contador de erros para impedir loops infinitos
      if (this.erros <= 2) {
        this.imgElement.src = this.srcError;
        this.elementRef.nativeElement.classList.add('not-found');
        this.imgElement.classList.add('not-found');
        this.loaded(true);
      }
    });

    this.imgElement.src = this.src;
  }

  loaded(isLoaded: boolean) {
    this.elementRef.nativeElement.src = isLoaded ? this.src : this.srcError;
    this.elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove'](
      'img-loaded'
    );
  }
}
