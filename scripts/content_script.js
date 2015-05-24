var shortcuts;
var locale_shortening;
var locale_copied;

var tooltip = {
	element:[],
	visible: false, 
	
	create: function(){
		this.element = document.createElement('div');	
		this.element.setAttribute('style', 'left: 0; position: fixed; top: 0;width: 100%; text-align: center; min-height: 1.375em; z-index:9999;');
		
		var div = document.createElement('div');
		div.setAttribute('style', 'font: bold 13px arial,sans-serif; padding: 2px 15px; background: #fff1a8; border-color: #fff1a8; color: #000; text-align: center; border: 3px solid transparent; border-radius: 3px; display: inline-block; line-height: 100%;');
		
		this.element.appendChild(div);
	},

	show: function(){
		this.visible = true;
		document.body.appendChild(this.element);	
	},
	
	hide: function(){
		document.body.removeChild(this.element);
		this.visible = false;
	},
	
	style: function(q){
		this.element.setAttribute('style', q);					
	},
	
	text: function(q){
		this.element.firstChild.innerText = q;
	}
}

function keyDownEventListener(e)
{
	if(tooltip.visible)
		return;
	
	if(e.target.tagName.toLowerCase() == 'input' ||
	   e.target.tagName.toLowerCase() == 'textarea' ||
	   e.target.tagName.toLowerCase() == 'select' ||
	   e.target.tagName.toLowerCase() == 'object')
		return;
		
	if(!((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90) || (e.which >= 112 && e.which <= 123) || e.which == 46))
		return;

	var code = (+e.ctrlKey) + '' + (+e.shiftKey) + '' + (+e.altKey) + e.which;
	var selectedShortcut = '';
		
	for (var shortcut in shortcuts)
	{		
		if(shortcuts[shortcut] == code)
		{
			selectedShortcut = shortcut;
			break;
		}
	}
	
	if(selectedShortcut == '')
		return;
	
	tooltip.text(locale_shortening);
	tooltip.show();
	
	chrome.extension.sendMessage({type: 'shortcut', shortcut: selectedShortcut}, function(response) 
	{				
		if(selectedShortcut == 'copy')
		{
			if(response.status == 'error')
				tooltip.text(response.message);
			else
				tooltip.text(response.message + ' ' + locale_copied);
			
			setTimeout('tooltip.hide()', 2000);
		}
		else
		{
			tooltip.hide();
		}
	});
}

chrome.extension.sendMessage({type: 'preferences'}, function(response) 
{	
	shortcuts = response;
	
	if(shortcuts != null && shortcuts.shortcuts_enabled)
	{
		locale_shortening = chrome.i18n.getMessage('shortening');
		locale_copied = chrome.i18n.getMessage('copied_to_clipboard');
		
		tooltip.create();			
		document.addEventListener('keydown', keyDownEventListener);
	}
});