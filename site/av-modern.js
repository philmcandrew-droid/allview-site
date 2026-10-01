(function () {
  if (document.getElementById("av-skip")) return;

  var skip = document.createElement("a");
  skip.id = "av-skip";
  skip.className = "av-skip";
  skip.href = "#Content";
  skip.textContent = "Skip to main content";
  document.body.insertBefore(skip, document.body.firstChild);

  var content = document.getElementById("Content");
  if (content && !content.hasAttribute("tabindex")) {
    content.setAttribute("tabindex", "-1");
  }

  var home = document.querySelector("#menu-item-3924 > a span");
  if (home && !home.textContent.trim()) {
    home.textContent = "Home";
  }
})();
