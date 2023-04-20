// ==UserScript==
// @name           Wikipedia Dark
// @version        5
// @grant          GM.addStyle
// @grant          GM_addStyle
// @run-at         document-end
// @include        http://*.*wiki*.org/*
// @include        https://*.*wiki*.org/*
// @updateURL      https://ahmubashshir.github.io/monkey-scripts/wikipedia-dark.user.js
// ==/UserScript==

(function () {
	(GM.addStyle || GM_addStyle)([
		'@import "https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-dark-mode.css&action=raw&ctype=text/css"',
		'screen and (prefers-color-scheme: dark);'
	].join());
})();
