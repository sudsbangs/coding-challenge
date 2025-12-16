import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
} from '@aws-sdk/client-dynamodb';

//const TABLE_NAME = 'otp_request_history';

const TABLE_NAME = 'test_table_challenge';

async function createTable() {
  const isLocal = process.env.DYNAMODB_LOCAL === 'true';

  const ddbClient = new DynamoDBClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    ...(isLocal && { endpoint: 'http://localhost:8000' }),
  });

  try {
    // First check if table exists
    await ddbClient.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    console.log(`✅ Table "${TABLE_NAME}" already exists.`);
  } catch (err: any) {
    if (err.name === 'ResourceNotFoundException') {
      console.log(`⏳ Creating table "${TABLE_NAME}"...`);

      const params = {
        TableName: TABLE_NAME,
        KeySchema: [
          { AttributeName: 'user_id', KeyType: 'HASH' }, // Partition key
        ],
        AttributeDefinitions: [
          { AttributeName: 'user_id', AttributeType: 'S' }, // 'S' = String
          { AttributeName: 'phone_number', AttributeType: 'S' }, // For GSI
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: 'phone_number-index',
            KeySchema: [{ AttributeName: 'phone_number', KeyType: 'HASH' }],
            Projection: {
              ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          },
        ],
        BillingMode: 'PROVISIONED',
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };

      await ddbClient.send(new CreateTableCommand(params));
      console.log(`✅ Table "${TABLE_NAME}" created successfully.`);
    } else {
      console.error('❌ Failed to check or create table:', err);
    }
  }
}

createTable().catch(console.error);
