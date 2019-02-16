import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFrame]'
})
export class FrameDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
