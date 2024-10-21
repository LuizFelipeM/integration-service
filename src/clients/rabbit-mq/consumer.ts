export type MessageHeaders = { [key: string]: any }

export abstract class Consumer<T> {
  public abstract receive(headers: MessageHeaders, payload: T): Promise<void>
}