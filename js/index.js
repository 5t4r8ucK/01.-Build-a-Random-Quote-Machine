function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {
  const noWidows = () => {
    const blockquote = document.getElementById("quote-text");
    blockquote.innerHTML = blockquote.innerHTML.replace(/\s([^\s<]{0,10})\s*$/,'&nbsp;$1');
  }
  noWidows();
});