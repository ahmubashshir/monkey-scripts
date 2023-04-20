// ==UserScript==
// @name           Wikipedia Dark
// @version        1
// @grant          none
// @inject-into    page
// @include        http://*.*wiki*.org/*
// @include        https://*.*wiki*.org/*
// ==/UserScript==

(function () {
		let style = document.createElement('style');
		style.innerText = [
		'@import "https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-dark-mode.css&action=raw&ctype=text/css"',
		'screen and (prefers-color-scheme: dark);'
	].join();
		document.head.appendChild(style);
	)();
