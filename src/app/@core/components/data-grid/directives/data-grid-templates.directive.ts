import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[actions-column]',
    standalone: true
})
export class ActionsColumnDirective {
    constructor(public template: TemplateRef<any>) {
    }
}
