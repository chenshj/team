
export interface IEmitable {
  post(emitter: object, tokenValue: string, eventName: string, eventArgs: any): void;

  register(target: string, tokenValue: string, eventName: string, handler: (value: any) => void, caller: object): void;

  registerEventPipe(emitter: object, tokenValue: string, eventName: string): void;
}
