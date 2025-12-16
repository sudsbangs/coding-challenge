import { test } from 'node:test';
import assert from 'node:assert';
import { DynamoDBRepository } from '../../src/repositories/dynamodb.repository';

test('DynamoDBRepository', async (t) => {
  await t.test('should instantiate with required tableName', () => {
    const repo = new DynamoDBRepository('test-table');
    assert.ok(repo instanceof DynamoDBRepository);
  });

  await t.test('should instantiate with tableName and custom region', () => {
    const repo = new DynamoDBRepository('test-table', 'us-east-1');
    assert.ok(repo instanceof DynamoDBRepository);
  });

  await t.test('should have all required methods', () => {
    const repo = new DynamoDBRepository('test-table');
    assert.strictEqual(typeof repo.putItem, 'function');
    assert.strictEqual(typeof repo.getItem, 'function');
    assert.strictEqual(typeof repo.queryByUserId, 'function');
    assert.strictEqual(typeof repo.queryByPhoneNumber, 'function');
  });
});
