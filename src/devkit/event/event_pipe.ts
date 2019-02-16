import { Subject } from 'rxjs/Subject';

export class EventPipe {

  private eventSubject: Subject<any>;

  constructor(private name: string,
    private tokenValue: any,
    private emitter: object) {
    this.eventSubject = new Subject<any>();
  }

  post(data: any) {
    this.eventSubject.next(data);
  }

  subscribe(eventHandler: (value: any) => void, caller: object) {
    this.eventSubject.subscribe((value) => eventHandler.call(caller, value));
  }

  unSubscribe() {
    throw new Error('Method has not implemented.');
  }
}
