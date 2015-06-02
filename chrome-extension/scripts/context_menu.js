var menu_item_id_array;

function createContextMenu()
{
	var separator;
	menu_item_id_array = new Array();

	chrome.contextMenus.removeAll();
	
	if(!preferencesGetter().contextmenu_enabled)
		return;
	
	var parent_link_id = chrome.contextMenus.create({'title': chrome.i18n.getMessage('shorten_this_link'), 'contexts': ['link']});
	var parent_page_id = chrome.contextMenus.create({'title': chrome.i18n.getMessage('shorten_this_page'), 'contexts': ['page'], 'documentUrlPatterns': ['http://*/*', 'https://*/*']});
	var parent_image_id = chrome.contextMenus.create({'title': chrome.i18n.getMessage('shorten_this_image'), 'contexts': ['image']});

	var item_link_id = chrome.contextMenus.create({'title': chrome.i18n.getMessage('copy_to_clipboard'), 'contexts':['link'], 'parentId': parent_link_id, 'onclick': onLinkClick});
	menu_item_id_array[item_link_id] = 'copy';
	
	var item_page_id = chrome.contextMenus.create({'title': chrome.i18n.getMessage('copy_to_clipboard'), 'contexts':['page'], 'parentId': parent_page_id, 'onclick': onPageClick, 'documentUrlPatterns': ['http://*/*', 'https://*/*']});
	menu_item_id_array[item_page_id] = 'copy';
	
	var item_image_id = chrome.contextMenus.create({'title': chrome.i18n.getMessage('copy_to_clipboard'), 'contexts':['image'], 'parentId': parent_image_id, 'onclick': onImageClick});
	menu_item_id_array[item_image_id] = 'copy';
	
	var services = servicesGetter();
	
	for (var service in services)
	{		
		if(!services[service] || servicesJSON[service] == undefined)
			continue;

		if(separator == undefined)
		{
			separator = chrome.contextMenus.create({'contexts':['link'], 'parentId': parent_link_id, 'type': 'separator'});
			chrome.contextMenus.create({'contexts':['page'], 'parentId': parent_page_id, 'type': 'separator'});
			chrome.contextMenus.create({'contexts':['image'], 'parentId': parent_image_id, 'type': 'separator'});
		}
			
		var title = servicesJSON[service].name;
			
		item_link_id = chrome.contextMenus.create({'title': title, 'contexts':['link'], 'parentId': parent_link_id, 'onclick': onLinkClick});		
		menu_item_id_array[item_link_id] = service;
		
		item_page_id = chrome.contextMenus.create({'title': title, 'contexts':['page'], 'parentId': parent_page_id, 'onclick': onPageClick, 'documentUrlPatterns': ['http://*/*', 'https://*/*']});		
		menu_item_id_array[item_page_id] = service;

		item_image_id = chrome.contextMenus.create({'title': title, 'contexts':['image'], 'parentId': parent_image_id, 'onclick': onImageClick});		
		menu_item_id_array[item_image_id] = service;
	}
}

function onLinkClick(info, tab)
{
	shortenUrl(info.linkUrl, tab.incognito, function(response){ contextMenuCallback(response, info, tab); });
}

function onPageClick(info, tab)
{
	shortenUrl(tab.url, tab.incognito, function(response){ contextMenuCallback(response, info, tab); });
}

function onImageClick(info, tab)
{
	shortenUrl(info.srcUrl, tab.incognito, function(response){ contextMenuCallback(response, info, tab); });
}

function contextMenuCallback(response, info, tab)
{
	if(response.status != 'error')
	{	
		if(menu_item_id_array[info.menuItemId] == 'copy')
		{
			copyToClipboard(response.message);
		}
		else
		{
			tab.title = '';
			tab.shortenedUrl = response.message;
			share(menu_item_id_array[info.menuItemId], tab);
		}
	}
}