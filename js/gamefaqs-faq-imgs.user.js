// ==UserScript==
// @name           Fix GameFaqs Single page images
// @version        3
// @grant          none
// @run-at         document-end
// @include        /^https?:\/\/gamefaqs\.gamespot\.com\/.+\/.+\/faqs\/[0-9]*(/.+)?\?(|.*&)(single=1)(|&.*)$/
// @updateURL      https://ahmubashshir.github.io/monkey-scripts/js/gamefaqs-faq-imgs.user.js
// ==/UserScript==
(function () {
	((func) => {
		URL.prototype.basename = URL.prototype.basename || func;
		Location.prototype.basename = Location.prototype.basename ||
			func;
	})(function () {
		"use strict";
		return this.pathname.split('/').filter(x => x).slice(-1)[0];
	});
	((faq) => {
		document.querySelectorAll('#faqwrap img').forEach((elem) => {
			let src = new URL(elem.src);
			if (!src.pathname.startsWith('/ffaq/')) {
				return;
			}
			let idx = src.basename();
			let path = `/a/faqs/${faq.slice(-2)}/${faq}-${idx}`;
			elem.src = "", elem.srcset =
				`${path}.jpg, ${path}.png`;
			console.log(path);
		});
	})(location.basename());
})();
