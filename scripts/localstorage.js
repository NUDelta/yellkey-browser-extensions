function preferencesGetter()
{
	var defaultJSON = { auto_copy : true, shortcuts_enabled : true, contextmenu_enabled : true, history_enabled: true };
	return baseGetter("preferences", preferencesSetter, defaultJSON);
}

function preferencesSetter(value)
{
	localStorage.setItem("preferences", JSON.stringify(value));
}

function actionsGetter()
{
	var defaultJSON = { copy : true, details : true, qrcode : true };
	return baseGetter("actions", actionsSetter, defaultJSON);
}

function actionsSetter(value)
{
	localStorage.setItem("actions", JSON.stringify(value));
}

function servicesGetter()
{
	var defaultJSON = {};

	for (var service in servicesJSON)
	{		
		defaultJSON[service] = false;
	}

	return baseGetter("services", servicesSetter, defaultJSON);
}

function servicesSetter(value)
{
	localStorage.setItem("services", JSON.stringify(value));
}

function shortcutsGetter()
{
	var defaultJSON = { copy : "" };
	
	for (var service in servicesJSON)
	{		
		defaultJSON[service] = "";
	}

	return baseGetter("shortcuts", shortcutsSetter, defaultJSON);
}

function shortcutsSetter(value)
{
	localStorage.setItem("shortcuts", JSON.stringify(value));
}

function baseGetter(item, setter, defaultJSON)
{
	var result = defaultJSON;

	try 
	{ 
		var local_storage_item = localStorage.getItem(item);
		result = JSON.parse(local_storage_item); 
		
		for(var prop in defaultJSON) 
		{
			if(result[prop] == undefined)
				throw new exception();
		}	
	}
	catch(err)
	{ 
		setter(defaultJSON);
		result = defaultJSON;
	}
		 
	return result;
}

function checkLocalStorage()
{
	if (window.localStorage == null) 
	{
		alert(chrome.i18n.getMessage('localstorage_warning'));
		return false;
	}
	return true;
}