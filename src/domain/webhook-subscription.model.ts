import axios from "axios";

export class WebhookSubscriptionModel {
  constructor(private readonly url: string) {
  }

  async publish(payload: unknown) {
    await axios.post(this.url, payload)
  }
}