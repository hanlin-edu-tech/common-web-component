!function () {
  let e = decodeURIComponent(window.location.pathname),
      t = document.querySelector(`.menu li > a[href*='${e}']`);t && t.classList.add("select"), document.querySelector(".irt-btn").addEventListener("click", () => {
    window.localStorage.clear();
  });
}();