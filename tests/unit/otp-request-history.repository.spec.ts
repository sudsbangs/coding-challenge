import { test } from 'node:test';
import assert from 'node:assert';
import { OtpRequestHistoryRepository } from '../../src/repositories/otp-request-history.repository';

test('OtpRequestHistoryRepository', async (t) => {
  await t.test('should instantiate with default region', () => {
    const repo = new OtpRequestHistoryRepository();
    assert.ok(repo instanceof OtpRequestHistoryRepository);
  });

  await t.test('should instantiate with custom region', () => {
    const repo = new OtpRequestHistoryRepository('us-west-2');
    assert.ok(repo instanceof OtpRequestHistoryRepository);
  });

  await t.test('should have access to parent methods', () => {
    const repo = new OtpRequestHistoryRepository();
    assert.strictEqual(typeof repo.storeOtpRequest, 'function');
    assert.strictEqual(typeof repo.getOtpRequest, 'function');
    assert.strictEqual(typeof repo.getUserOtpRequests, 'function');
    assert.strictEqual(typeof repo.putItem, 'function');
    assert.strictEqual(typeof repo.getItem, 'function');
    assert.strictEqual(typeof repo.queryByUserId, 'function');
  });
});
