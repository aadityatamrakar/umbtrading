! function () {
	var e = window.top !== window.self,
		n = window.location.href.includes("handoff=1");
	if (!(window.location.host.includes(".myportfolio.design") || n || e)) {
		var t = "?utm_source=animaapp.io&utm_campaign=free-website-banner",
			a = `<div class="_anima-free-banner">\n  This website was built using <a href="https://animaapp.com/${t}">AnimaApp.com</a>. If you are the owner <a href="https://projects.animaapp.com/pricing${t}" class="link">upgrade here</a> to remove this message.\n  </div>`;
		if (!window.location.host.endsWith(".animaapp.io")) {
			var i = document.createElement("div");
			i.innerHTML = "<style>@import url('https://fonts.googleapis.com/css?family=Mulish:400');\n._anima-free-banner { text-align: center; position: fixed; top: 0; left: 0; background: #FF6250; color: #FFFFFF; width: 100%; padding: 18px; font-family: Mulish, sans-serif; text-decoration: none; }\n._anima-free-banner .link, ._anima-free-banner a { color: white; text-decoration: underline; display: inline; }\n._anima-free-banner a { margin-right: 0 }\n@media screen and (max-width: 550px) { ._anima-free-banner { display: block; text-align: center; } }\n</style>" + a, document.body.appendChild(i)
		}
		window._forceShowAnimaWatermark = !0;
		var o = new CustomEvent("show-anima-watermark");
		window.dispatchEvent(o)
	}
}(),
function () {
	function e() {
		var e = function (e) {
			for (var n = e + "=", t = document.cookie.split(";"), a = 0; a < t.length; a++) {
				for (var i = t[a];
					" " === i.charAt(0);) i = i.substring(1, i.length);
				if (0 === i.indexOf(n)) return i.substring(n.length, i.length)
			}
			return null
		}("ana_visitorId");
		return e || function (e, n, t) {
			var a;
			if (t) {
				var i = new Date;
				i.setTime(i.getTime() + 24 * t * 60 * 60 * 1e3), a = "; expires=" + i.toGMTString()
			} else a = "";
			document.cookie = e + "=" + n + a + "; path=/"
		}("ana_visitorId", e = function () {
			var e = (new Date).getTime();
			return "undefined" != typeof performance && "function" == typeof performance.now && (e += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (n) {
				var t = (e + 16 * Math.random()) % 16 | 0;
				return e = Math.floor(e / 16), ("x" === n ? t : 3 & t | 8).toString(16)
			}))
		}()), e
	}
	window.trackEvent = function (n) {
		var t = e(),
			a = "",
			i = function () {
				try {
					var e = new URLSearchParams(window.location.search),
						n = window.innerWidth;
					return JSON.stringify({
						restart: !!e.r,
						animaInterface: !!e.pages,
						screenWidth: n,
						isDesktop: n >= 1024
					})
				} catch (e) {
					return
				}
			}();
		document.getElementById("anPageName") && (a = document.getElementById("anPageName").value);
		var o = function (e) {
				var n = "";
				for (var t in e) e.hasOwnProperty(t) && (n.length > 0 && (n += "&"), n += encodeURI(t + "=" + e[t]));
				return n
			}({
				eventCategory: "General",
				eventAction: n,
				url: encodeURIComponent(window.location.href),
				host: window.location.hostname,
				path: window.location.pathname,
				page: a,
				referrer: document.referrer,
				uid: t,
				params: i
			}),
			r = new XMLHttpRequest;
		r.open("POST", "//logs.animaapp.com/analytics/collect", !0), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.send(o)
	}, window.submitted = function (e) {
		window.trackEvent("conversion")
	}, window.trackEvent("pageview")
}();