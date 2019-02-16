import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FrameDirective } from './frame.directive';
import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrameComponent implements OnInit {

  @Input('uri')
  set uri(value: string) {
    this.innerUri = value;
  }

  get safeResourceUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.innerUri);
  }

  private innerUri: string;

  @ViewChild(FrameDirective) frame: FrameDirective;

  constructor(private context: AppContextService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const frameElement = this.frame.viewContainerRef.element;
    if (frameElement.nativeElement) {
      frameElement.nativeElement.onload = () => {
        frameElement.nativeElement.contentWindow.openNewApp = (title, content) => {
          this.context.open(title, content);
        };
      };
    }
  }
}
