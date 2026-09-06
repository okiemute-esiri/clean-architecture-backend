# Clean Architecture Backend

A production-style TypeScript backend demonstrating Clean Architecture, dependency inversion, use-case driven application design, repository ports, infrastructure adapters, HTTP delivery, validation, automated tests, containerization and CI/CD.

> **Portfolio status:** Core Clean Architecture implementation is present. PostgreSQL persistence, authentication and richer observability remain roadmap items.

## Architecture

```text
HTTP / Express
     |
     v
Interface Adapters
     |
     v
Application Use Cases
     |
     v
Domain Entities + Repository Ports
     ^
     |
Infrastructure Adapters
```

The dependency direction points inward: application and domain code do not depend on Express, a database, or infrastructure libraries.

## Implemented Features

- TypeScript with strict compiler settings
- Express HTTP API
- Domain entity with business validation
- Repository interface defined in the application boundary
- Create, list and complete task use cases
- In-memory repository adapter
- Centralized HTTP error handling
- Zod request validation
- Health endpoint
- Unit tests for use cases
- API tests with Supertest
- OpenAPI 3.0 specification
- Multi-stage Docker image
- GitHub Actions CI with typecheck, tests, build and Docker-image verification

## API

```text
GET    /health
GET    /api/v1/tasks
POST   /api/v1/tasks
PATCH  /api/v1/tasks/:id/complete
```

Example create request:

```json
{
  "title": "Review architecture boundaries"
}
```

The API contract is documented in `docs/openapi.yaml`, including request validation, task schemas and error responses.

## Project Structure

```text
src/
├── domain/
│   └── task.ts
├── application/
│   ├── ports/
│   │   └── task-repository.ts
│   └── use-cases/
│       ├── create-task.ts
│       ├── list-tasks.ts
│       └── complete-task.ts
├── infrastructure/
│   └── persistence/
│       └── in-memory-task-repository.ts
├── interfaces/
│   └── http/
│       └── task-routes.ts
├── app.ts
└── server.ts

tests/
├── create-task.test.ts
└── api.test.ts

docs/
└── openapi.yaml
```

## Dependency Rule

The domain layer knows nothing about Express, databases or transport concerns. Use cases depend only on repository contracts. Infrastructure implements those contracts and can therefore be replaced without changing core business logic.

## Run Locally

```bash
npm install
npm run dev
```

Run tests:

```bash
npm test
```

Type-check:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

Run the compiled production entry point:

```bash
npm start
```

## Docker

```bash
docker build -t clean-architecture-backend .
docker run --rm -p 3000:3000 clean-architecture-backend
```

## Engineering Roadmap

- [x] Domain entity
- [x] Repository port
- [x] Application use cases
- [x] In-memory persistence adapter
- [x] HTTP delivery adapter
- [x] Request validation
- [x] Unit and API tests
- [x] OpenAPI specification
- [x] Dockerfile
- [x] Docker build verification in CI
- [x] GitHub Actions CI
- [ ] PostgreSQL repository adapter
- [ ] Transaction boundary abstraction
- [ ] Authentication and authorization
- [ ] Structured logging and metrics

## What This Project Demonstrates

This repository demonstrates practical application of Clean Architecture: separation of concerns, dependency inversion, framework independence, testable use cases, explicit API contracts and replaceable infrastructure.
