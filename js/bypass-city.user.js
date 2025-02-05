// ==UserScript==
// @name         bypass.city userscript
// @homepageURL  https://bypass.city
// @supportURL   https://discord.gg/bypass-city
// @description  Automate bypass.city navigation
// @match        *://bypass.city/bypass?*
// @match        *://adbypass.org/bypass?*

// @version      1.0.1
// @connect      bypass.city
// @connect      adbypass.org
// @icon         https://adbypass.org/favicon.ico
// @updateURL    https://ahmubashshir.github.io/monkey-scripts/js/bypass-city.user.js
// ==/UserScript==

(() => {
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	window.addEventListener("bypassComplete", async (event) => {
		let url = event.detail.bypassData;
		console.info(url);
		await sleep(100);
		window.open(url, "_self", "noopener,noreferrer");
		await sleep(2000);
		window.open(url, "_blank");
	});
})();