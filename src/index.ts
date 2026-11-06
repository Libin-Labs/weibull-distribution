function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function params(shape: number, scale: number): void {
  finite(shape, 0.1, 100);
  finite(scale, 1e-12, 1e12);
}
export function weibullSurvival(x: number, shape: number, scale: number): number {
  params(shape, scale);
  finite(x, 0, 1e100);
  return Math.exp(-((x / scale) ** shape));
}
export function weibullCdf(x: number, shape: number, scale: number): number {
  params(shape, scale);
  finite(x, 0, 1e100);
  return -Math.expm1(-((x / scale) ** shape));
}
export function weibullQuantile(p: number, shape: number, scale: number): number {
  params(shape, scale);
  finite(p, 0, 1);
  if (p === 1) throw new RangeError('Finite quantile requires p<1');
  if (p === 0) return 0;
  const result = scale * (-Math.log1p(-p)) ** (1 / shape);
  if (!Number.isFinite(result) || result === 0) throw new RangeError('Quantile resolution lost');
  return result;
}
