// ==UserScript==
// @name         Duck.AI Auto TOS
// @description  Accept DuckAI Tos and dismiss tour auromatically
// @version      1.0.0
// @match        *://duck.ai/*
// @icon         https://duck.ai/favicon.ico

// @homepageURL  https://duck.ai
// @updateURL    https://ahmubashshir.github.io/monkey-scripts/js/duck-ai.user.js
// @require      https://ahmubashshir.github.io/monkey-scripts/js/lib/forceStorage.js
// ==/UserScript==

(() => {
	ForceStorage.set("duckaiHasAgreedToTerms", true);
	ForceStorage.merge("duckaiProductTourChecklist", {
		"impressionFired": true
		, "dismissed": true
	});
})();