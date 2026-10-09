import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeIndianPhone } from '../src/utils/enquiry.js';

test('normalizes supported Indian phone formats', () => {
  for (const value of ['9861234567', '+919861234567', '91 98612 34567',
    '+91 98612-34567', '(986) 123-4567', '09861234567', ' 9861234567 ']) {
    assert.equal(normalizeIndianPhone(value), '+919861234567', value);
  }
});

test('rejects missing, malformed and implausible phone values', () => {
  for (const value of ['', '   ', null, '123', 'abcdefghij', 'abc9861234567',
    '0000000000', '9999999999', '1234567890', '+1 9861234567', '+9861234567',
    '++919861234567', '98612345678', '9861234567 ext 1']) {
    assert.equal(normalizeIndianPhone(value), null, String(value));
  }
});
