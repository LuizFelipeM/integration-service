import { registry } from "tsyringe";
import { EventConsumerSymbol } from "../symbols/event-consumer.symbol";
import { EventConsumer } from "./event.consumer";

@registry([
  { token: EventConsumerSymbol, useToken: EventConsumer },
])
export class ConsumersRegistry { }