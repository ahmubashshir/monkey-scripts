// ==UserScript==
// @name           Keyboard navigation for manga sites [kakalot, nelo]
// @version        2
// @grant          none
// @run-at         document-end
// @include        https://*manganato.com/manga-*/chapter-*
// @include        https://mangakakalot.com/chapter/*/chapter_*
// @updateURL      https://ahmubashshir.github.io/monkey-scripts/js/manga-nav.user.js
// ==/UserScript==

document.addEventListener('keydown', (ev) => {
	let elems = () => {
		let testhost = regex => regex.test(location.host);
		let findnav  = sel => {
			return {
				prev: document.querySelector(sel.prev),
				next: document.querySelector(sel.next)
			};
		};

		if (testhost(/^\w+manganato\.com$/)) return findnav({
			next: 'a.navi-change-chapter-btn-next',
			prev: 'a.navi-change-chapter-btn-prev'
		});
		else if (testhost(/^mangakakalot\.com$/)) return findnav({
			next: '.btn-navigation-chap > a.next',
			prev: '.btn-navigation-chap > a.back'
		});

		return undefined;
	};

	switch(ev.key) {
		case  'ArrowLeft': return elems()?.next?.click?.();
		case 'ArrowRight': return elems()?.prev?.click?.();
		default: return undefined;
	}
});
