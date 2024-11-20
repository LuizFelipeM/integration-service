export class SendWebhookCommand {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly payload: unknown) {
  }
}