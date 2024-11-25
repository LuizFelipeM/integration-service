import "reflect-metadata";
import "dotenv/config";
// import { config } from "dotenv";
import { AmqpClient } from "amqp-simple-client";
import { container } from "tsyringe";
import express from "express";
import { AppDataSource } from "./data-source";
import { webhookStart } from "./features/webhook/webhook.start";

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected")

    container.register<AmqpClient>(AmqpClient, { useValue: new AmqpClient(process.env.RABBITMQ_URL!) })

    const server = express()

    webhookStart()

    server.get('/health', (req, res) => {
      res.send({ status: 'OK' })
    })

    server.listen({ port: Number(process.env.PORT) })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()