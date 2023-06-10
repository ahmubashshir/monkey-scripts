// ==UserScript==
// @name           Keyboard navigation for manga sites [kakalot, nelo, webtoons]
// @version        6
// @grant          none
// @run-at         document-start
// @include        /^https:\/\/.+manganato\.com\/manga-.+\/chapter-.+/
// @include        /^https:\/\/mangakakalot.com\/chapter\/.+\/chapter_.*/
// @include        /^https:\/\/www.webtoons.com\/.+\/episode-.+\/viewer/
// @updateURL      https://ahmubashshir.github.io/monkey-scripts/js/manga-nav.user.js
// ==/UserScript==
(() => {

	document.addEventListener('keydown', (ev) => {
		let elems = () => {
			let testhost = regex => regex.test(location.host);
			let findnav = sel => {
				return {
					prev: document.querySelector(sel.prev),
					next: document.querySelector(sel.next)
				};
			};

			if (testhost(/^\w+manganato\.com$/)) {
				return findnav({
					next: 'a.navi-change-chapter-btn-next',
					prev: 'a.navi-change-chapter-btn-prev'
				});
			} else if (testhost(/^mangakakalot\.com$/)) {
				return findnav({
					next: '.btn-navigation-chap > a.back',
					prev: '.btn-navigation-chap > a.next'
				});
			} else if (testhost(/^www\.webtoons\.com$/)) {
				return findnav({
					next: 'a.pg_next._nextEpisode',
					prev: 'a.pg_prev._prevEpisode'
				});
			}

			return undefined;
		};

		switch (ev.key) {
		case 'ArrowLeft':
			return elems()?.prev?.click?.();
		case 'ArrowRight':
			return elems()?.next?.click?.();
		default:
			return undefined;
		}
	});
})();
