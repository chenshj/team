import { EventToken } from './event_token';

export class EventContext {

  get name() {
    return this.eventToken.name;
  }

  get tokenValue() {
    return this.eventToken.value;
  }

  get data() {
    return this.eventData;
  }

  get emitter() {
    return this.owner;
  }

  constructor(private eventToken: EventToken,
    private eventData: any,
    private owner: object) { }
}
