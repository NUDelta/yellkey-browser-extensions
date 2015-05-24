var background_page = chrome.extension.getBackgroundPage();

function save()
{
	if(!checkLocalStorage())
		return;
	
	//localStorage.clear();
	
	preferencesSetter({
		auto_copy : document.getElementsByName('auto_copy').item(0).checked,
		shortcuts_enabled : document.getElementsByName('shortcuts_enabled').item(0).checked,
		contextmenu_enabled : document.getElementsByName('contextmenu_enabled').item(0).checked,
		history_enabled : document.getElementsByName('history_enabled').item(0).checked
	});
	
	actionsSetter({
		copy : document.getElementById('copy').checked,
		details : document.getElementById('details').checked,
		qrcode : document.getElementById('qrcode').checked
	});
	
	var services = {};
	var shortcuts = { copy : document.getElementById('hiddencopyShortcut').value };
	
	for (var service in servicesJSON)
	{		
		var elementService = document.getElementById(service);
		services[service] = elementService == undefined ? false : elementService.checked;
		
		var elementShortcut = document.getElementById('hidden' + service + 'Shortcut');
		shortcuts[service] = elementShortcut == undefined ? '' : elementShortcut.value;
	}
	
	servicesSetter(services);	
	shortcutsSetter(shortcuts);
		
	background_page.createContextMenu();
}

function deleteShortcutLocal(i)
{
    return function ()
	{
       deleteShortcut(i);
    }
}

function createShortcutLocal(i)
{
    return function () 
	{
       createShortcut(i);
    }
}

function init()
{
	document.getElementById('grant').value = chrome.i18n.getMessage('grant_access');
	document.getElementById('revoke').value = chrome.i18n.getMessage('revoke_access');

	if(!checkLocalStorage())
		return;
	
	var preferences = preferencesGetter();
	
	if(preferences.auto_copy)
		document.getElementsByName('auto_copy').item(0).checked = true;
	else
		document.getElementsByName('auto_copy').item(1).checked = true;
	
	if(preferences.shortcuts_enabled)
		document.getElementsByName('shortcuts_enabled').item(0).checked = true;
	else
		document.getElementsByName('shortcuts_enabled').item(1).checked = true;
	
	if(preferences.contextmenu_enabled)
		document.getElementsByName('contextmenu_enabled').item(0).checked = true;
	else
		document.getElementsByName('contextmenu_enabled').item(1).checked = true;	

	if(preferences.history_enabled)
		document.getElementsByName('history_enabled').item(0).checked = true;
	else
		document.getElementsByName('history_enabled').item(1).checked = true;				
	
	var actions = actionsGetter();
	
	document.getElementById('copy').checked = actions.copy;
	document.getElementById('details').checked = actions.details;
	document.getElementById('qrcode').checked = actions.qrcode;
	
	var services = servicesGetter();
	var shortcuts = shortcutsGetter();
	
	document.getElementById('hiddencopyShortcut').value = shortcuts.copy;
	document.getElementById('spancopyShortcut').innerText = getStringByShortcutCode(shortcuts.copy);
	
	for (var service in servicesJSON)
	{
		var servicesTable = document.getElementById('servicesTable');
		
		if(servicesTable != undefined)
		{
			var serviceTr = document.createElement('tr');
			
			var serviceTd1 = document.createElement('td');
			serviceTd1.setAttribute('width', '23');
			
			var checkbox = document.createElement('input');
			checkbox.setAttribute('id', service);
			checkbox.setAttribute('type', 'checkbox');
			checkbox.addEventListener('change', save);
			checkbox.checked = services[service];
			serviceTd1.appendChild(checkbox);
			
			var serviceTd2 = document.createElement('td');
			serviceTd2.setAttribute('width', '23');
			
			var image = document.createElement('img');
			image.setAttribute('width', '16');
			image.setAttribute('src', 'images/' + servicesJSON[service].icon);
			
			serviceTd2.appendChild(image);
			
			var serviceTd3 = document.createElement('td');
			serviceTd3.innerText = servicesJSON[service].name;
			
			serviceTr.appendChild(serviceTd1);
			serviceTr.appendChild(serviceTd2);
			serviceTr.appendChild(serviceTd3);
			
			servicesTable.appendChild(serviceTr);
		}
		
		var shortcutsTable = document.getElementById('shortcutsTable');
		
		if(shortcutsTable != undefined)
		{
			var shortcutTr = document.createElement('tr');
			
			var shortcutTd1 = document.createElement('td');
			shortcutTd1.setAttribute('class', 'div-preferences');
			shortcutTd1.innerText = servicesJSON[service].name;
			
			var shortcutTd2 = document.createElement('td');
			shortcutTd2.setAttribute('class', 'div-preferences');
			
			var shortcutSpan = document.createElement('span');
			shortcutSpan.setAttribute('id', 'span' + service + 'Shortcut');
			shortcutSpan.innerText = getStringByShortcutCode(shortcuts[service]);
			
			var shortcutHidden = document.createElement('input');
			shortcutHidden.setAttribute('id', 'hidden' + service + 'Shortcut');
			shortcutHidden.setAttribute('type', 'hidden');
			shortcutHidden.value = shortcuts[service];
			
			shortcutTd2.appendChild(shortcutSpan);
			shortcutTd2.appendChild(shortcutHidden);
			
			var shortcutTd3 = document.createElement('td');
			shortcutTd3.setAttribute('class', 'div-preferences');
			
			var shortcutSpanCreate = document.createElement('span');
			shortcutSpanCreate.setAttribute('class', 'link');
			shortcutSpanCreate.addEventListener('click', createShortcutLocal(service));
			shortcutSpanCreate.innerText = chrome.i18n.getMessage('edit');

			shortcutTd3.appendChild(shortcutSpanCreate);
			
			var shortcutTd4 = document.createElement('td');
			shortcutTd4.setAttribute('class', 'div-preferences');
			
			var shortcutSpanDelete = document.createElement('span');
			shortcutSpanDelete.setAttribute('class', 'link');
			shortcutSpanDelete.addEventListener('click', deleteShortcutLocal(service));
			shortcutSpanDelete.innerText = chrome.i18n.getMessage('delete');

			shortcutTd4.appendChild(shortcutSpanDelete);
			
			shortcutTr.appendChild(shortcutTd1);
			shortcutTr.appendChild(shortcutTd2);
			shortcutTr.appendChild(shortcutTd3);
			shortcutTr.appendChild(shortcutTd4);
			
			shortcutsTable.appendChild(shortcutTr);
		}
	}
	
	chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
		changeAccessButtonStatus(token != undefined);
	});
}

function tabClick(elem)
{
	if(elem == 'preferences')
	{
		document.getElementById('preferencesTab').className = 'tab tab-selected';
		document.getElementById('preferencesDiv').className = 'tab-selected visible';	
	}
	else
	{
		document.getElementById('preferencesTab').className = 'tab tab-unselected';
		document.getElementById('preferencesDiv').className = 'tab-selected hidden';
	}	
	
	if(elem == 'actions')
	{
		document.getElementById('actionsTab').className = 'tab tab-selected';
		document.getElementById('actionsDiv').className = 'tab-selected visible';
	}
	else
	{
		document.getElementById('actionsTab').className = 'tab tab-unselected';
		document.getElementById('actionsDiv').className = 'tab-selected hidden';
	}
	
	if(elem == 'services')
	{
		document.getElementById('servicesTab').className = 'tab tab-selected';
		document.getElementById('servicesDiv').className = 'tab-selected visible';
	}
	else
	{
		document.getElementById('servicesTab').className = 'tab tab-unselected';
		document.getElementById('servicesDiv').className = 'tab-selected hidden';
	}
	
	if(elem == 'shortcuts')
	{
		document.getElementById('shortcutsTab').className = 'tab tab-selected';
		document.getElementById('shortcutsDiv').className = 'tab-selected visible';
	}
	else
	{
		document.getElementById('shortcutsTab').className = 'tab tab-unselected';
		document.getElementById('shortcutsDiv').className = 'tab-selected hidden';
	}
	
	if(elem == 'changelog')
	{
		document.getElementById('changelogTab').className = 'tab tab-selected';
		document.getElementById('changelogDiv').className = 'tab-selected visible';
	}
	else
	{
		document.getElementById('changelogTab').className = 'tab tab-unselected';
		document.getElementById('changelogDiv').className = 'tab-selected hidden';
	}
}

function getToken()
{
	chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
		changeAccessButtonStatus(token != undefined);
	});
}

function revokeToken() {
	chrome.identity.getAuthToken({ 'interactive': false }, function(current_token) {
		if (!chrome.runtime.lastError) {
			chrome.identity.removeCachedAuthToken({ token: current_token }, function() {});

			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + current_token);
			xhr.send();
			
			changeAccessButtonStatus(false);
		}
	});
}

function changeAccessButtonStatus(granted)
{
	document.getElementById('revoke').disabled = !granted;
	document.getElementById('grant').disabled = granted;
}

document.addEventListener('DOMContentLoaded', function () 
{
	document.getElementById('titleDiv').innerText = chrome.i18n.getMessage('settings');
	document.getElementById('preferencesTab').innerText = chrome.i18n.getMessage('preferences');
	document.getElementById('preferencesTab').addEventListener('click', function(){ tabClick('preferences'); });
		
	document.getElementById('actionsTab').innerText = chrome.i18n.getMessage('actions');
	document.getElementById('actionsTab').addEventListener('click', function(){ tabClick('actions'); });
	
	document.getElementById('servicesTab').innerText = chrome.i18n.getMessage('services');
	document.getElementById('servicesTab').addEventListener('click', function(){ tabClick('services'); });
	
	document.getElementById('shortcutsTab').innerText = chrome.i18n.getMessage('keyboard_shortcuts');
	document.getElementById('shortcutsTab').addEventListener('click', function(){ tabClick('shortcuts'); });
	
	document.getElementById('changelogTab').innerText = chrome.i18n.getMessage('changelog');
	document.getElementById('changelogTab').addEventListener('click', function(){ tabClick('changelog'); });
	
	document.getElementById('automatically_copy_shortened_url').innerText = chrome.i18n.getMessage('automatically_copy_shortened_url') + ":";
	document.getElementById('autoCopyTrue').addEventListener('change', save);
	document.getElementById('autoCopyFalse').addEventListener('change', save);
	document.getElementById('autoCopyTrueLabel').innerHTML = "&nbsp;&nbsp;&nbsp;" + chrome.i18n.getMessage('yes') + "&nbsp;&nbsp;&nbsp";
	document.getElementById('autoCopyFalseLabel').innerHTML = "&nbsp;&nbsp;&nbsp;" + chrome.i18n.getMessage('no') + "&nbsp;&nbsp;&nbsp";
	
	document.getElementById('enable_keyboard_shortcuts').innerText = chrome.i18n.getMessage('enable_keyboard_shortcuts') + ":";
	document.getElementById('shortcutTrue').addEventListener('change', save);
	document.getElementById('shortcutFalse').addEventListener('change', save);
	document.getElementById('shortcutTrueLabel').innerHTML = "&nbsp;&nbsp;&nbsp;" + chrome.i18n.getMessage('yes') + "&nbsp;&nbsp;&nbsp";
	document.getElementById('shortcutFalseLabel').innerHTML = "&nbsp;&nbsp;&nbsp;" + chrome.i18n.getMessage('no') + "&nbsp;&nbsp;&nbsp";
	
	document.getElementById('enable_context_menu').innerText = chrome.i18n.getMessage('enable_context_menu') + ":";
	document.getElementById('contextmenuTrue').addEventListener('change', save);
	document.getElementById('contextmenuFalse').addEventListener('change', save);
	document.getElementById('contextmenuTrueLabel').innerHTML = "&nbsp;&nbsp;&nbsp;" + chrome.i18n.getMessage('yes') + "&nbsp;&nbsp;&nbsp";
	document.getElementById('contextmenuFalseLabel').innerHTML = "&nbsp;&nbsp;&nbsp;" + chrome.i18n.getMessage('no') + "&nbsp;&nbsp;&nbsp";
	
	document.getElementById('enable_history').innerText = chrome.i18n.getMessage('enable_history') + ":";
	document.getElementById('historyTrue').addEventListener('change', save);
	document.getElementById('historyFalse').addEventListener('change', save);
	document.getElementById('historyTrueLabel').innerHTML = "&nbsp;&nbsp;&nbsp;" + chrome.i18n.getMessage('yes') + "&nbsp;&nbsp;&nbsp";
	document.getElementById('historyFalseLabel').innerHTML = "&nbsp;&nbsp;&nbsp;" + chrome.i18n.getMessage('no') + "&nbsp;&nbsp;&nbsp";
	
	document.getElementById('google_url_shortener_access').innerText = chrome.i18n.getMessage('google_url_shortener_access') + ":";
	document.getElementById('google_url_shortener_access_details').innerText = "(" + chrome.i18n.getMessage('google_url_shortener_access_details') + ")";
	
	document.getElementById('grant').value = chrome.i18n.getMessage('grant_access');
	document.getElementById('grant').addEventListener('click', getToken);
	document.getElementById('revoke').value = chrome.i18n.getMessage('revoke_access');
	document.getElementById('revoke').addEventListener('click', revokeToken);
	
	document.getElementById('tdCopy').innerText = chrome.i18n.getMessage('copy');
	document.getElementById('copy').addEventListener('change', save);
	
	document.getElementById('tdDetails').innerText = chrome.i18n.getMessage('details');
	document.getElementById('details').addEventListener('change', save);
		
	document.getElementById('tdQrCode').innerText = chrome.i18n.getMessage('qr_code');
	document.getElementById('qrcode').addEventListener('change', save);
	
	document.getElementById('pleaseNote').innerText = chrome.i18n.getMessage('please_note') + ':';
	document.getElementById('keyboard_shortcuts_warning').innerHTML  = chrome.i18n.getMessage('keyboard_shortcuts_warning', ['<a href="https://chrome.google.com/webstore" target="_blank">Chrome Web Store</a>']);
	document.getElementById('reload_all_opened_tabs').innerText = chrome.i18n.getMessage('reload_all_opened_tabs');
	
	document.getElementById('copyShortcut').innerText = chrome.i18n.getMessage('copy');
	
	document.getElementById('deleteCopyShortcut').innerText = chrome.i18n.getMessage('delete');
	document.getElementById('deleteCopyShortcut').addEventListener('click', function(){ deleteShortcut('copy'); });
	
	document.getElementById('editCopyShortcut').innerText = chrome.i18n.getMessage('edit');
	document.getElementById('editCopyShortcut').addEventListener('click', function(){ createShortcut('copy'); });	
	
	init();
});