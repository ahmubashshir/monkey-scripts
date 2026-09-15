/**
 * ForceStorage 1.0.0 — standalone userscript localStorage editor library.
 * Loading this file performs no requests. No build step or dependencies required.
 */
// Top-level var bindings also work inside a userscript manager's @require wrapper.

var ForceStorage = (() => {
	const contains1 = (lvalue, rvalue) => {
		return Object.keys(rvalue).every(key =>
			Object.hasOwn(lvalue, key) &&
			lvalue[key] === rvalue[key]
		);
	}

	const merge1 = (lvalue, rvalue) => {
		return {
			...lvalue
			, ...rvalue
		};
	}

	const exact = (key, value) => {
		const jvalue = JSON.stringify(value);
		if (localStorage.getItem(key) === jvalue) return;
		localStorage.setItem(key, jvalue);
	}

	const partial = (key, data) => {
		const stored = JSON.parse(localStorage.getItem(key) || "{}");

		if (contains1(stored, data)) return;

		localStorage.setItem(key, JSON.stringify(merge1(stored, data)));
	}

	return Object.freeze({
		version: '1.0.0'
		, set: exact
		, merge: partial
	});
})();

if (typeof module === 'object' && module.exports) {
	module.exports = ForceStorage;
}