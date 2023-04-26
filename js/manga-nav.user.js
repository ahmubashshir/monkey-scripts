// ==UserScript==
// @name           Keyboard navigation for manga sites [kakalot, nelo]
// @version        1
// @run-at         document-end
// @include        https://*manganato.com/manga-*/chapter-*
// @include        https://mangakakalot.com/chapter/*/chapter_*
// @updateURL      https://ahmubashshir.github.io/monkey-scripts/js/manga-nav.user.js
// ==/UserScript==

document.addEventListener('keydown', (ev) => {
	let elems = () => {
		let findnav = (sel) => {
			return {
				prev: document.querySelector(sel.prev),
				next: document.querySelector(sel.next)
			}
		};
		let testhost = (regex) => {
			return regex.test(location.host);
		}

		if (testhost(/^\w+manganato\.com$/)) return findnav({
			next: 'a.navi-change-chapter-btn-next',
			prev: 'a.navi-change-chapter-btn-prev'
		});
		else if (testhost(/^mangakakalot\.com$/)) return findnav({
			next: '.btn-navigation-chap > a.next',
			prev: '.btn-navigation-chap > a.back'
		});
		else return undefined;
	};

	switch(ev.key) {
		case  'ArrowLeft': return elems()?.prev.click();
		case 'ArrowRight': return elems()?.next.click();
		default: return undefined;
	}
})
