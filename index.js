'use strict';

const converters = {
	years: value => value * 3154e+10,
	months: value => value * 2628e+9,
	weeks: value => value * 6048e+8,
	days: value => value * 864e5,
	hours: value => value * 36e5,
	minutes: value => value * 6e4,
	seconds: value => value * 1e3,
	milliseconds: value => value,
	microseconds: value => value / 1e3,
	nanoseconds: value => value / 1e6
};

const toMilliseconds = object => Object.entries(object).reduce((milliseconds, [key, value]) => {
	if (typeof value !== 'number') {
		throw new TypeError(`Expected a \`number\` for key \`${key}\`, got \`${value}\` (${typeof value})`);
	}

	if (!converters[key]) {
		throw new Error('Unsupported time key');
	}

	return milliseconds + converters[key](value);
}, 0);

module.exports = toMilliseconds;
// TODO: remove this for next major version
module.exports.default = toMilliseconds;
