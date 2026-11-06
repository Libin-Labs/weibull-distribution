import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('analytic fixture', () => {
  assert.ok(Math.abs(api.weibullSurvival(2, 2, 2) - Math.exp(-1)) < 1e-12);
});
test('origin', () => {
  assert.equal(api.weibullSurvival(0, 2, 1), 1);
  assert.equal(api.weibullCdf(0, 2, 1), 0);
});
test('exponential special case', () => {
  assert.ok(Math.abs(api.weibullCdf(3, 1, 2) - (1 - Math.exp(-1.5))) < 1e-14);
});
test('quantile inverse', () => {
  for (let i = 1; i < 100; i++) {
    const p = i / 100;
    assert.ok(Math.abs(api.weibullCdf(api.weibullQuantile(p, 2.3, 5), 2.3, 5) - p) < 1e-14);
  }
});
test('invalid and saturated tail', () => {
  assert.equal(api.weibullSurvival(1e100, 100, 1e-12), 0);
  assert.throws(() => api.weibullQuantile(1, 2, 1));
  assert.throws(() => api.weibullCdf(-1, 2, 1));
});
test('type contract', () => {
  assert.throws(() => api.weibullSurvival('2', 2, 2));
});
