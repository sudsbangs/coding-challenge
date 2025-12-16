# DynamoDB Local Setup Guide

## Prerequisites

- **Option 1**: Docker installed on your machine (recommended)
- **Option 2**: Java installed (v11 or higher)

## Quick Setup Comparison

| Step              | Option 1: Docker     | Option 2: JAR File   |
| ----------------- | -------------------- | -------------------- |
| **Prerequisites** | Docker               | Java 11+             |
| **Ease of Setup** | ⭐⭐⭐⭐⭐ Very Easy | ⭐⭐⭐ Moderate      |
| **Performance**   | Fast, containerized  | Direct JVM execution |
| **Cleanup**       | `docker rm`          | Manual deletion      |
| **Recommended**   | ✅ Yes               | Alternative          |

## Side-by-Side Setup Instructions

### Option 1: Using Docker (Recommended) | Option 2: Using JAR File

<table>
<tr>
<td width="50%">

#### 1️⃣ Start DynamoDB Local

```bash
docker run -d -p 8000:8000 \
  --name dynamodb-local \
  amazon/dynamodb-local
```

#### 2️⃣ Verify Container Running

```bash
docker ps | grep dynamodb-local
```

✅ You should see the container listed

#### 3️⃣ Create Table

```bash
npm run migrate:local
```

#### 4️⃣ Verify Table Creation

```bash
aws dynamodb list-tables \
  --endpoint-url http://localhost:8000
```

✅ Should see `otp_request_history`

#### ⏹️ Stop DynamoDB

```bash
docker stop dynamodb-local
```

</td>
<td width="50%">

#### 1️⃣ Download and Extract

```bash
mkdir -p ~/dynamodb_local
cd ~/dynamodb_local

curl -O https://s3.us-west-2.amazonaws.com/\
dynamodb-local/dynamodb_local_latest.tar.gz

tar -xzf dynamodb_local_latest.tar.gz
```

#### 2️⃣ Start DynamoDB

Open a terminal and run:

```bash
java -Djava.library.path=\
./DynamoDBLocal_lib \
-jar DynamoDBLocal.jar \
-sharedDb -inMemory
```

✅ Should see port 8000 initialization

#### 3️⃣ Create Table (New Terminal)

```bash
npm run migrate:local
```

#### 4️⃣ Verify Table Creation

```bash
aws dynamodb list-tables \
  --endpoint-url http://localhost:8000
```

✅ Should see `otp_request_history`

</td>
</tr>
</table>

## After Setup: Common Steps

```bash
# Run unit tests
npm run unit:test

# Start dev server
npm run dev

# View all tables
aws dynamodb list-tables --endpoint-url http://localhost:8000

# Scan table data
aws dynamodb scan \
  --table-name otp_request_history \
  --endpoint-url http://localhost:8000
```
