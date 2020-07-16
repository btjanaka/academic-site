// Loads the regular or dark mode stylesheet. Intended to be placed in the head
// of the document, so that the stylesheet is chosen before the document loads.
(function() {
  // See getUseDarkMode() in dark-mode.js
  const useDarkMode = Boolean(Number(window.localStorage.getItem("use_dark_mode")));
  // Instead of writing the stylesheet element to the document, we could first
  // create the element and then modify its href attribute. However, this seems
  // to take longer, and the user experiences a brief period where the document
  // has no styling on it.
  if(useDarkMode) {
    {% include snippets/prepend-baseurl.html path='/assets/css/dark.css' %}
    document.write(`<link id="main-stylesheet" rel="stylesheet" href="{{ __return }}">`)
  } else {
    {% include snippets/prepend-baseurl.html path='/assets/css/main.css' %}
    document.write(`<link id="main-stylesheet" rel="stylesheet" href="{{ __return }}">`)
  }
})();
