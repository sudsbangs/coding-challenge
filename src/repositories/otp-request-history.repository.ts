import { DynamoDBRepository } from './dynamodb.repository';
import { UserPhoneRecord } from '../types/interfaces';

export class OtpRequestHistoryRepository extends DynamoDBRepository {
  constructor(region: string = 'us-east-1', isLocal: boolean = false) {
    super('test_table_challenge', region, isLocal);
  }

  /**
   * Store OTP request history for a user
   */
  async storeOtpRequest(user_id: string, phone_number: string): Promise<void> {
    const otpRecord: UserPhoneRecord = {
      user_id,
      phone_number,
    };
    await this.putItem(otpRecord);
  }

  /**
   * Get OTP request history for a user
   */
  async getOtpRequest(user_id: string): Promise<UserPhoneRecord | null> {
    return await this.getItem(user_id);
  }

  /**
   * Get all OTP requests for a user
   */
  async getUserOtpRequests(user_id: string): Promise<UserPhoneRecord[]> {
    return await this.queryByUserId(user_id);
  }
}
