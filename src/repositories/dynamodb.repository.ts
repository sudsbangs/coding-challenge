import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { UserPhoneRecord } from '../types/interfaces';

export class DynamoDBRepository {
  private docClient: DynamoDBDocumentClient;
  private tableName: string;

  constructor(tableName: string, region: string = 'ap-southeast-1') {
    const client = new DynamoDBClient({ region });
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  /**
   * Put an item into DynamoDB
   */
  async putItem(item: UserPhoneRecord): Promise<void> {
    const itemWithTimestamp = {
      ...item,
      created_at: item.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: this.tableName,
      Item: itemWithTimestamp,
    });

    try {
      await this.docClient.send(command);
      console.log('Item successfully stored in DynamoDB');
    } catch (error) {
      console.error('Error putting item:', error);
      throw error;
    }
  }

  /**
   * Get an item from DynamoDB by user_id
   */
  async getItem(user_id: string): Promise<UserPhoneRecord | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        user_id,
      },
    });

    try {
      const result = await this.docClient.send(command);
      return (result.Item as UserPhoneRecord | undefined) || null;
    } catch (error) {
      console.error('Error getting item:', error);
      throw error;
    }
  }

  /**
   * Query items from DynamoDB by user_id
   */
  async queryByUserId(user_id: string): Promise<UserPhoneRecord[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: 'user_id = :user_id',
      ExpressionAttributeValues: {
        ':user_id': user_id,
      },
    });

    try {
      const result = await this.docClient.send(command);
      return (result.Items as UserPhoneRecord[]) || [];
    } catch (error) {
      console.error('Error querying items:', error);
      throw error;
    }
  }

  /**
   * Query items by phone_number (requires GSI)
   */
  async queryByPhoneNumber(phone_number: string): Promise<UserPhoneRecord[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'phone_number-index',
      KeyConditionExpression: 'phone_number = :phone_number',
      ExpressionAttributeValues: {
        ':phone_number': phone_number,
      },
    });

    try {
      const result = await this.docClient.send(command);
      return (result.Items as UserPhoneRecord[]) || [];
    } catch (error) {
      console.error('Error querying by phone number:', error);
      throw error;
    }
  }
}
