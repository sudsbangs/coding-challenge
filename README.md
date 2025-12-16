# Fastify OTP Rate Limiting Challenge

A TypeScript-based API server built with Fastify that demonstrates OTP (One-Time Password) management with DynamoDB rate limiting. This challenge involves implementing a complete backend solution with rate limiting logic, database operations, and comprehensive unit tests.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify 5.x
- **Database**: AWS DynamoDB (with local development support)
- **Testing**: Node.js native test runner
- **Linting**: ESLint with TypeScript support
- **Build**: tsx (TypeScript executor)

## Project Structure

```
src/
├── app.ts                          # Fastify app initialization
├── server.ts                       # Server entry point
├── routes/
│   ├── health.route.ts             # Health check endpoint
│   └── api.route.ts                # API routes
├── repositories/
│   ├── dynamodb.repository.ts      # Base DynamoDB repository
│   └── otp-request-history.repository.ts  # OTP-specific repository
└── types/
    └── interfaces.ts               # TypeScript interfaces

migration/
└── create-otp-history-table.ts     # DynamoDB table creation script

tests/unit/
├── dynamodb.repository.spec.ts     # Repository unit tests
├── otp-request-history.repository.spec.ts
└── interfaces.spec.ts              # Type validation tests
```

## Setup

### Prerequisites

- Node.js 18+ or higher
- Docker (for DynamoDB Local) or Java (for JAR version)
- AWS CLI (optional, for table management)

### Installation

```bash
# Install dependencies
npm install

# Running local server
npm run dev

# Run unit tests
npm run unit:test
```

## API Endpoints

### Health Check

- **GET** `/health` - Server health status

### OTP Management

- **GET** `/api/user-phone?phone_number=<number>&user_id=<id>` - Retrieve user phone info
- **POST** `/api/send-sms-otp` - store OTP and track request count

## Challenges

### 1. Server Setup ✅

Set up a local Fastify server with accessible endpoints defined in `src/routes/`

- Routes: GET/POST endpoints for user phone management
- Proper error handling and validation

### 2. DynamoDB Local Setup ✅

Configure and run DynamoDB locally following [DYNAMODB_SETUP.md](DYNAMODB_SETUP.md)

### 3. Rate Limiting Logic

Implement OTP rate limiting with the following specifications:

- **Max 3 OTP requests** per phone number
- **5-minute rolling window** (not fixed window)
- Track request count in DynamoDB with timestamps
- Return appropriate HTTP status codes (429 for rate limit exceeded)

### 4. OTP Request Storage

Extend the POST `/api/send-sms-otp` endpoint to:

- Validate phone number and user_id
- Store OTP request metadata in DynamoDB
- Include request timestamp and count information
- Return success/failure response with request details

### 5. Rate Limit Validation

Implement rate limit checker in POST endpoint that:

- Queries existing OTP requests for the phone number
- Filters requests within the 5-minute rolling window
- Compares count against the max limit (3)
- Blocks request if limit exceeded
- Increments counter on successful requests

### 6. Bonus: Unit Tests ✅

Add comprehensive unit tests covering:

- Repository CRUD operations
- Type validation
- Rate limiting logic (mock timestamps)
- Error handling scenarios
- Edge cases (boundary conditions)

Run tests: `npm run unit:test`

## Rate Limiting Algorithm

```typescript
// Pseudocode for rate limiting check
function checkRateLimit(phone_number: string, limit: number = 3, windowMs: number = 5 * 60 * 1000) {
  1. Query OTP requests for phone_number from DynamoDB
  2. Filter requests where: created_at > (now - windowMs)
  3. If filtered_count >= limit: return 429 (Rate Limited)
  4. Else: Allow request and store new record
}
```

## Development Workflow

1. Start local DynamoDB
2. Run migrations to create tables
3. Start dev server: `npm run dev`
4. Test endpoints via curl/Postman
5. Run tests to validate changes: `npm run unit:test`

## Example Usage

## Troubleshooting

- **Port 3000 already in use**: Change port via `PORT=3001 npm run dev`
- **DynamoDB connection refused**: Ensure Docker container is running
- **Table not found**: Run `npm run migrate:local`
- See [DYNAMODB_SETUP.md](DYNAMODB_SETUP.md) for more troubleshooting

## Architecture Notes

- **Repository Pattern**: Abstracted database operations via base `DynamoDBRepository` class
- **Type Safety**: Full TypeScript with strict mode enabled
- **Local Development**: Support for both local and AWS DynamoDB via configuration
- **Scalability**: Ready for production deployment to AWS with environment variables
