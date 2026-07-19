import test from 'node:test';
import assert from 'node:assert/strict';
import { ensureTenantAccess } from '../utils/tenant.js';
import ApiError from '../utils/ApiError.js';

test('allows access when the resource belongs to the same restaurant', () => {
  assert.equal(ensureTenantAccess({ restaurantId: 'rest-1' }, 'rest-1'), true);
});

test('denies access when the resource belongs to another restaurant', () => {
  assert.throws(
    () => ensureTenantAccess({ restaurantId: 'rest-1' }, 'rest-2'),
    (error) => error instanceof ApiError && error.statusCode === 403
  );
});


