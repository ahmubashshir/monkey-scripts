// ==UserScript==
// @name         LVB
// @match        https://bypass.city/*
// @match        https://adbypass.org/*
// @version      20.0.0
// @connect      bypass.city
// @connect      adbypass.org
// @icon         https://adbypass.org/favicon.ico

(() => {
	(async () => {
		window.addEventListener("bypassComplete", async (event) => {
			console.debug(event.detail);
			//await UserScript.deleteValue("bypass.data");
			//await sleep(1);
			//WrappedSet("bypass.data", data);
			//window.open("https://linkvertise.com/", "_self", "noopener,noreferrer");
		});
	})();
})();