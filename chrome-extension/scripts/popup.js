var current_tab;

function init() {
  chrome.tabs.getSelected(null, function (tab) {
    current_tab = tab;
    chrome.extension.getBackgroundPage().shortenUrl(tab.url, tab.incognito, onResponse);
  });
}

function onResponse(response) {
  if (response.status == 'error') {
    document.getElementById('loading').innerText = response.message;
  } else {
    current_tab.shortenedUrl = response.message;

    document.getElementById('url').innerText = "shoutkey.com/" + current_tab.shortenedUrl;
    document.getElementById('loading').setAttribute('style', 'visibility:hidden; display:none;');
    document.getElementById('response').setAttribute('style', 'visibility:visible; display:block;');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});