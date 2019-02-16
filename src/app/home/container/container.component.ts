import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  // tabs: any[] = [
  //   { title: 'Dynamic Title 1', content: 'app-frame' },
  //   { title: 'Dynamic Title 2', content: 'Dynamic content 2' },
  //   { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true }
  // ];
  constructor(
    public context: AppContextService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.context.onOpen.subscribe({
      next: (title) => {
        console.log(title);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  removeTabHandler(tab) {
    console.log(tab);
    console.log(this.context.apps);
    const index = this.context.apps.indexOf(tab);
    console.log(index);
    this.context.apps.splice(index, 1);
    console.log(this.context.apps);
    this.changeDetectorRef.detectChanges();
  }
}
