# Integration Service
A simple Microservice responsible for managing integrations with third-party systems (webhooks, ERPs, CRMs, etc.).

## Tech stack
- PostgreSQL
- CloudAMQP LavinMQ/RabbitMQ
- Axios
- TypeORM
- Fastify
- Typescript
- Docker
- PNPM

## Architecture
The project uses vertical slices architecture to guide the boundaries of each feature. For exemple, the **webhook** feature is responsible for everything related to webhook calls and webhook domain management, from the settings to the domain logic.

The architectures used in the features are the following:
- **webhook:** Domain Driven

Different slices can have different architectures if needed, but add them to the above list so its easier to understand.

## Standards
Each feature should have a `<feature name>.start.ts` file in its root folder that represent the entrypoint for this specific feature. All set up configuration related to this specific feature should be inside of its `.start.ts` file.

All files follow the `<file-name>.<type>.ts` name convention where:
- File name must be in `kebab-case`
- The type must be meaningful (example: model, entity, service, etc.)