import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {
  public onOpen: Subject<any> = new Subject();
  public apps: any[] = [
    { title: '首页', content: '/dashboard/index.html', removable: false, active: true }
    // { title: '工作目标', content: '/objective/index.html', removable: true },
    // { title: '工作计划', content: '/plan/index.html', removable: true },
    // { title: '工作反馈', content: '/progress/index.html', removable: true }
  ];

  constructor() { }

  open(title: string, content: string) {
    switch (title) {
      case 'objective':
        this.apps.push({ title: '工作目标', content: '/objective/index.html', removable: true });
        break;
      case 'plan':
        this.apps.push({ title: '工作计划', content: '/plan/index.html', removable: true });
        break;
      case 'progress':
        this.apps.push({ title: '工作反馈', content: '/progress/index.html', removable: true });
        break;
      default:
        this.apps.push({
          title: title,
          content: content,
          removable: true
        });
        break;
    }
    this.onOpen.next(title);
  }
}
