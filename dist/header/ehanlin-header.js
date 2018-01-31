(function (jQuery3_2_1) {
'use strict';

jQuery3_2_1 = jQuery3_2_1 && jQuery3_2_1.hasOwnProperty('default') ? jQuery3_2_1['default'] : jQuery3_2_1;

let jQueryNoConflict = jQuery3_2_1.noConflict(!0);

let ajaxUtil = (o, t, e) => ("GET" !== o && e && (e = JSON.stringify(e)), jQueryNoConflict.ajax({ type: o, cache: !1, crossDomain: !0, url: t, data: e, contentType: "application/json; charset=UTF-8", dataType: "json" })); let onLogOut = () => {
  jQueryNoConflict("#logoutButton").on("click", () => {
    ajaxUtil("PUT", "/Users/521d946be4b0d765448570bd/!logout").then(() => {
      window.location = "https://" + window.location.hostname;
    });
  });
}; let logIn = () => {
  ajaxUtil("GET", "/ms-user-status/userStatus").then(o => {
    let t = `<a href='/Users/${o.id}.html'> ${o.studentCard} ${o.name} </a>\n        <span style='color:#9B9B9B'> | </span>\n        <li><a id='logoutButton'>登出</a></li>\n        <span style='color:#9B9B9B'> | </span>`;jQueryNoConflict("#loginSuccess").append(t), jQueryNoConflict("#loginBotton").remove(), jQueryNoConflict("#register").remove(), onLogOut();
  }, () => {
    jQueryNoConflict("ul.header-menu").removeAttr("style");
  }).then(() => {
    jQueryNoConflict("ul.header-menu").removeAttr("style");
  });
};

let showCart = () => {
  jQueryNoConflict.get("/my/owned/Carts.json", { ts: new Date().getTime() }, t => {
    t.success && t.result && jQueryNoConflict("#car_sum").text(t.result.items.length);
  });
};

let marqueeTarget = jQueryNoConflict("#ehanlin-header div.marquee"); let marqueeCloseTarget = jQueryNoConflict("#ehanlin-header i.marquee-close"); let isShowMarqueeClose = !0; let runMarquee = () => {
  jQueryNoConflict.ajax({ type: "get", url: "/Marquee", dataType: "json" }).then(e => {
    if (e && e.length > 0) {
      let r;marqueeTarget.removeAttr("style"), marqueeCloseTarget.removeAttr("style"), jQueryNoConflict.each(e, (e, o) => {
        "system" === o.type && (isShowMarqueeClose = !1), r = jQueryNoConflict('<li style="display: none"></li>').addClass("marquee-content").css({ "background-color": o.backgroundColor }).html(o.text), marqueeTarget.css({ "background-color": o.backgroundColor }), marqueeTarget.find("ul").append(r);
      });
    }
  }).then(() => {
    jQueryNoConflict("#ehanlin-header li.marquee-content").show(), marqueeTarget.marquee({ duration: 15e3 }), !0 === isShowMarqueeClose && marqueeCloseTarget.removeAttr("style");
  }).then(() => {
    jQueryNoConflict("#ehanlin-header i.marquee-close").on("click", e => {
      jQueryNoConflict(e.currentTarget).parents("#ehanlin-marquee").remove();
    });
  });
};

logIn(), showCart(), runMarquee();

}(jQuery3_2_1));
//# sourceMappingURL=ehanlin-header.js.map
