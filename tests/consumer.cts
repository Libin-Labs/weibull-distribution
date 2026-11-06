import { weibullSurvival } from '@lp-labs/weibull-distribution';
if (Math.abs(weibullSurvival(2, 2, 2) - Math.exp(-1)) > 1e-12) throw new Error('Distribution');
// @ts-expect-error invalid argument must be rejected by declarations
weibullSurvival('2', 2, 2);
