import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  open(title: string, content: string) {
    if (window['openNewApp']) {
      window['openNewApp'](title, content);
    }
  }
}
