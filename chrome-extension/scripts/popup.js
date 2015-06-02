var background_page = chrome.extension.getBackgroundPage();
var current_tab;

function serviceClick(service) {
  return function () {
    share(service, current_tab);
  }
}

function addActions() {
}

function addServices() {
}

function onResponse(response) {
  if (response.status == 'error') {
    document.getElementById('loading').innerText = response.message;
  }
  else {
    var preferences = preferencesGetter();

    current_tab.shortenedUrl = response.message;

    if (preferences.auto_copy)
      background_page.copyToClipboard(current_tab.shortenedUrl);

    document.getElementById('url').innerText = "shoutkey.com/" + current_tab.shortenedUrl;

    if (current_tab.incognito) {
      var history_element = document.getElementById('history');
      history_element.innerText = chrome.i18n.getMessage('incognito_mode');
    }
    else {
      if (preferences.history_enabled) {
        var history_element = document.getElementById('ahistory');
        if (response.added_to_history == false) {
          history_element.innerText = chrome.i18n.getMessage('not_added_to_history');
          history_element.setAttribute('style', 'color: #C80000');
          history_element.addEventListener('click', function () {
            chrome.tabs.create({url: 'options.html'});
          }, false)
        }
        else {
          history_element.innerText = chrome.i18n.getMessage('added_to_history');
          history_element.setAttribute('style', 'color: #008000;');
          history_element.addEventListener('click', function () {
            chrome.tabs.create({url: 'http://goo.gl'});
          }, false)
        }
      }
      else {
        document.getElementById('history').setAttribute('style', 'visibility:hidden; display:none;');
      }
    }

    addActions();
    addServices();

    document.getElementById('loading').setAttribute('style', 'visibility:hidden; display:none;');
    document.getElementById('response').setAttribute('style', 'visibility:visible; display:block;');
  }
}

function init() {
  chrome.tabs.getSelected(null, function (tab) {
    current_tab = tab;
    background_page.shortenUrl(tab.url, tab.incognito, onResponse);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loading').innerText = chrome.i18n.getMessage('shortening');
  //document.getElementById('actions').innerHTML = "<div class=\"title\">" + chrome.i18n.getMessage('actions') + "</div>";
  //document.getElementById('services').innerHTML = "<div class=\"title\">" + chrome.i18n.getMessage('services') + "</div>";
  init();
});