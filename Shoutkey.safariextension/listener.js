function clickHandler(o,recursive) {
	var e=(recursive)?o:o.target;
	if ($(e).is('a')) { 
		/*
		clicked element is a link so 
		send a message with link information
	    to global file (calls handleMessage function) 
	    */
	    safari.self.tab.dispatchMessage("link", $(e).get(0).href);
	} else {
		/*
		if the clicked element is not a link so 
		we need to go up to the parent element 
		recursively util a link tag is found.
	    */
		var parent = $(e).parents("a").get(0);
		if(parent) {
			clickHandler(parent,true);
		}
	}
}
/*
bind clickHandler function for each 
existing element of the document.
clickHandler will trigger when user
click on a element.
*/
$(document).on("click",clickHandler);