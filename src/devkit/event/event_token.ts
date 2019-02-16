export class EventToken {

  constructor(private eventName, private tokenValue = 'UnWatched') {
  }

  get name(): string {
    return this.eventName;
  }

  get value(): string {
    return this.tokenValue;
  }

  changeToken(tokenValue: string) {
    this.tokenValue = tokenValue;
  }
}
