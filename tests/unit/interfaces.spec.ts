import { test } from 'node:test';
import assert from 'node:assert';
import { UserPhoneRecord } from '../../src/types/interfaces';

test('UserPhoneRecord interface validation', async (t) => {
  await t.test('should create a valid UserPhoneRecord', () => {
    const record: UserPhoneRecord = {
      user_id: 'user123',
      phone_number: '+1234567890',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    assert.strictEqual(record.user_id, 'user123');
    assert.strictEqual(record.phone_number, '+1234567890');
    assert.ok(record.created_at);
    assert.ok(record.updated_at);
  });

  await t.test('should handle missing optional fields', () => {
    const record: UserPhoneRecord = {
      user_id: 'user456',
      phone_number: '+9876543210',
    };

    assert.strictEqual(record.user_id, 'user456');
    assert.strictEqual(record.phone_number, '+9876543210');
    assert.strictEqual(record.created_at, undefined);
    assert.strictEqual(record.updated_at, undefined);
  });
});
