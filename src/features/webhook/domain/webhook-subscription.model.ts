import axios from "axios";

export class WebhookSubscriptionModel {
  constructor(public readonly url: string) {
  }

  async send(payload: unknown) {
    await axios.post(this.url, payload)
  }
}