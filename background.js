
// this idea borrowed from
// https://www.planbox.com/blog/development/coding/bypassing-githubs-content-security-policy-chrome-extension.html

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  for (i = 0; i < details.responseHeaders.length; i++) {

    if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
      var csp = details.responseHeaders[i].value;

      csp = "default-src *; script-src https://*.addtoany.com 'unsafe-inline' assets-cdn.github.com collector-cdn.github.com; object-src assets-cdn.github.com; style-src https://*.addtoany.com 'self' 'unsafe-inline' 'unsafe-eval' assets-cdn.github.com; img-src  https://*.addtoany.com 'self' data: assets-cdn.github.com identicons.github.com www.google-analytics.com collector.githubapp.com *.githubusercontent.com *.gravatar.com *.wp.com; media-src https://*.addtoany.com; frame-src https://*.addtoany.com 'self' render.githubusercontent.com gist.github.com www.youtube.com player.vimeo.com checkout.paypal.com; font-src https://*.addtoany.com assets-cdn.github.com; connect-src https://*.addtoany.com 'self' live.github.com wss://live.github.com uploads.github.com status.github.com api.github.com www.google-analytics.com github-cloud.s3.amazonaws.com; form-action 'self'; base-uri 'self'"

      details.responseHeaders[i].value = csp;
    }
  }

  return { // Return the new HTTP header
    responseHeaders: details.responseHeaders
  };
}, {
  urls: ["https://github.com/*"],
  types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
}, ["blocking", "responseHeaders"]);


function isCSPHeader(headerName) {
  return (headerName == 'CONTENT-SECURITY-POLICY') || (headerName == 'X-WEBKIT-CSP');
}