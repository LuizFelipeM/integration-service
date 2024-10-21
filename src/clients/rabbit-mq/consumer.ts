type MessageHeaders = { [key: string]: any }

export abstract class Consumer<T> {
  public abstract consume(headers: MessageHeaders, payload: T): Promise<void>
}