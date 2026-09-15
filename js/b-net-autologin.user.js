// ==UserScript==
// @name            B.net AutoLogin
// @match           https://selfcare.bnet-bd.com/Login.aspx
// @var text        user  "User ID"       undefined
// @var text        phone "Phone Number"  undefined
// @var checkbox    auto  "Auto Login"    0
// @run-at          document-end
// @version         2.2
// @updateURL       https://ahmubashshir.github.io/monkey-scripts/js/b-net-autologin.user.js
// ==/UserScript==

const validate = (value, fail, check, ok) => {
	const chk = value !== "undefined" && value !== undefined;

	const mod = typeof (check) !== "function" || Boolean(check(value));

	if (chk && mod && ok !== undefined) {
		return ok;
	} else if (chk) {
		return value;
	}

	return fail;
}

const showModalError = (uid, num) => {
	const dialog = document.createElement("dialog");
	const form = document.createElement("form");
	const message = document.createElement("p");
	const button = document.createElement("button");

	const errors = [];

	if (uid === "none") {
		errors.push("User ID is not configured.");
	}

	if (num === "none") {
		errors.push("Phone Number is not configured.");
	}

	errors.forEach((error, index) => {
		if (index > 0) {
			message.append(document.createElement("br"));
		}
		message.append(error);
	});

	button.textContent = "OK";
	button.autofocus = true;

	form.method = "dialog";
	form.append(message, button);
	dialog.append(form);

	dialog.addEventListener("close", () => dialog.remove());

	document.body.append(dialog);
	dialog.showModal();
};

const uid = validate(user, "none"); // eslint-disable-line no-undef
const num = validate(phone, "none", v => !`${v}`.startsWith("0"), `0${phone}`); // eslint-disable-line no-undef
const autoLogin = validate(auto, false, v => v === 1, true); // eslint-disable-line no-undef

const fill = (sel, text) => {
	const e = document.querySelector(sel);
	if (e !== null && e.tagName === "INPUT" && e.type === "text") {
		e.value = text;
	}
};

if (uid !== "none" && num !== "none") {
	fill("#TextBox1", uid);
	fill("#TextBox2", num);
	if (autoLogin) {
		document.querySelector("#Button1")?.click();
	}
} else {
	showModalError(uid, num)
}