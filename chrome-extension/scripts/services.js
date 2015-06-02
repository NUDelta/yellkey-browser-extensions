function share(service, tab)
{
	var temp = servicesJSON[service].url;
	temp = temp.replace("${short-url}", encodeURIComponent(tab.shortenedUrl));
	temp = temp.replace("${title}", encodeURIComponent(tab.title));
	
	if(temp.indexOf("mailto:") == 0)
		chrome.tabs.update(tab.id, { url: temp });
	else
		chrome.tabs.create({url: temp});
}

var servicesJSON = 
{
	_100zakladok:
	{
		name : "100zakladok",
		icon : "100zakladok.png",
		url : "http://www.100zakladok.ru/save/?bmurl=${short-url}&bmtitle=${title}"
	},
	
	aol_mail:
	{
		name : "AOL Mail",
		icon : "aol_mail.png",
		url : "http://webmail.aol.com/compose-message.aspx?subject=${title}&body=${short-url}"
	},

	baidu: 
	{
		name : "Baidu",
		icon : "baidu.png",
		url : "http://cang.baidu.com/do/add?it=${title}&iu=${short-url}&fr=ien&dc="
	},

	bebo: 
	{
		name : "Bebo",
		icon : "bebo.png",
		url : "http://www.bebo.com/c/share?Url=${short-url}&Title=${title}"
	},

	blip: 
	{
		name : "Blip",
		icon : "blip.png",
		url : "http://blip.pl/dashboard?body=${title}:+${short-url}"
	},
	
	blogger: 
	{
		name : "Blogger",
		icon : "blogger.png",
		url : "http://www.blogger.com/blog_this.pyra?t=&u=${short-url}&n=${title}"
	},

	bobrdobr: 
	{
		name : "Bobrdobr",
		icon : "bobrdobr.png",
		url : "http://bobrdobr.ru/addext.html?url=${short-url}&title=${title}&desc="
	},
	
	delicious:
	{
		name : "Delicious",
		icon : "delicious.png",
		url : "http://delicious.com/save?url=${short-url}"
	},
	
	diaspora:
	{
		name : "Diaspora*",
		icon : "diaspora.png",
		url : "https://diasp.org/bookmarklet?url=${short-url}&title=${title}"
	},
		
	digg:
	{
		name : "Digg",
		icon : "digg.png",
		url : "http://digg.com/submit?phase=2&url=${short-url}"
	},
		
	diigo:
	{
		name : "Diigo",
		icon : "diigo.png",
		url : "http://secure.diigo.com/post?url=${short-url}"
	},
	
	evernote:
	{	
		name : "Evernote",
		icon : "evernote.png",
		url : "http://www.evernote.com/clip.action?url=${short-url}&title=${title}"
	},
	
	facebook:
	{
		name : "Facebook",
		icon : "facebook.png",
		url : "http://www.facebook.com/share.php?u=${short-url}"
	},
	
	formspring:
	{
		name : "Formspring",
		icon : "formspring.png",
		url : "http://www.formspring.me/share?url=${short-url}&title=${title}"
	},	
	
	friendfeed:
	{
		name : "FriendFeed",
		icon : "friendfeed.png",
		url : "http://friendfeed.com/share?url=${short-url}&title=${title}"
	},

	friendster:
	{
		name : "Friendster",
		icon : "friendster.png",
		url : "http://www.friendster.com/sharer.php?u=${short-url}&t=${title}"
	},	

	gmail:
	{
		name : "Gmail",
		icon : "gmail.png",
		url : "https://mail.google.com/mail/?ui=2&view=cm&fs=1&tf=1&su=${title}&body=${short-url}"	
	},
	
	google_bookmarks:
	{
		name : "Google Bookmarks",
		icon : "google_bookmarks.png",
		url : "http://www.google.com/bookmarks/mark?op=edit&bkmk=${short-url}&title=${title}"
	},
	
	google_plus: 
	{
		name : "Google+",
		icon : "google_plus.png",
		url : "https://plusone.google.com/_/+1/confirm?url=${short-url}"
	},

	hatena:
	{
		name : "Hatena",
		icon : "hatena.png",
		url : "http://b.hatena.ne.jp/bookmarklet?url=${short-url}&btitle=${title}"
	},
	
	hyves:
	{
		name : "Hyves",
		icon : "hyves.png",
		url : "http://www.hyves.nl/profilemanage/add/tips/?name=${title}&text=${short-url}&type=12"
	},
	
	hotmail:
	{
		name : "Hotmail",
		icon : "hotmail.png",
		url : "http://hotmail.com/secure/start?action=compose&subject=${title}&body=${short-url}"
	},
	
	identica:
	{
		name : "Identi.ca",
		icon : "identica.png",
		url : "http://identi.ca/notice/new?status_textarea=${title}%20${short-url}"
	},
	
	instapaper:
	{
		name : "Instapaper",
		icon : "instapaper.png",
		url : "http://www.instapaper.com/edit?url=${short-url}&title=${title}"
	},

	iwiw:
	{
		name : "iWiW",
		icon : "iwiw.png",
		url : "http://iwiw.hu/pages/share/share.jsp?v=1&u=${short-url}&t=${title}"
	},	
	
	lifestream:
	{
		name : "Lifestream",
		icon : "lifestream.png",
		url : "http://lifestream.aol.com/share/?url=${short-url}&title=${title}&description="
	},
	
	linkedin:
	{
		name : "LinkedIn",
		icon : "linkedin.png",
		url : "http://www.linkedin.com/shareArticle?mini=true&url=${short-url}&title=${title}"
	},

	livejournal:
	{
		name : "LiveJournal",
		icon : "livejournal.png",
		url : "http://www.livejournal.com/update.bml?subject=${title}&event=${short-url}"
	},	
	
	mail:
	{
		name : "Mail",
		icon : "mail.png",
		url : "mailto:?subject=${title}&body=${short-url}"
	},
	
	mailru:
	{
		name : "Mail.ru",
		icon : "mailru.png",
		url : "http://connect.mail.ru/share?share_url=${short-url}&title=${title}"
	},

	meinvz:
	{
		name : "meinVZ",
		icon : "meinvz.png",
		url : "http://www.meinvz.net/Suggest/Selection/?u=${short-url}&desc=${title}"
	},	
	
	meneame:
	{
		name : "Menéame",
		icon : "meneame.png",
		url : "http://www.meneame.net/submit.php?url=${short-url}"
	},

	mister_wong:
	{
		name : "Mister Wong",
		icon : "mister_wong.png",
		url : "http://www.mister-wong.com/index.php?action=addurl&bm_url=${short-url}&bm_description=${title}"
	},
	
	multiply:
	{
		name : "Multiply",
		icon : "multiply.png",
		url : "http://multiply.com/gus/journal/compose/addthis?body=&url=${short-url}&subject=${title}"
	},
	
	myspace:
	{
		name : "MySpace",
		icon : "myspace.png",
		url : "http://www.myspace.com/Modules/PostTo/Pages/?u=${short-url}&t=${title}"
	},
	
	netlog:
	{
		name : "Netlog",
		icon : "netlog.png",
		url : "http://en.netlog.com/go/manage/links/view=save&origin=external&url=${short-url}&title=${title}&description="
	},

	nujij:
	{
		name : "NUjij",
		icon : "nujij.png",
		url : "http://nujij.nl/jij.lynkx?u=${short-url}&t=${title}&b="
	},
	
	oknotizie:
	{
		name : "OKNOtizie",
		icon : "oknotizie.png",
		url : "http://oknotizie.alice.it/post?url=${short-url}&title=${title}"
	},
	
	orkut:
	{
		name : "Orkut",
		icon : "orkut.png",
		url : "http://promote.orkut.com/preview?nt=orkut.com&tt=${title}&du=${short-url}"
	},
	
	oyyla:
	{
		name : "Oyyla",
		icon : "oyyla.png",
		url : "http://www.oyyla.com/gonder?phase=2&url=${short-url}"
	},
	
	pingfm:
	{
		name : "Ping.fm",
		icon : "pingfm.png",
		url : "http://ping.fm/ref/?link=${short-url}&title=${title}"
	},

	plaxo:
	{
		name : "Plaxo",
		icon : "plaxo.png",
		url : "http://www.plaxo.com/pulse/?share_link=${short-url}"
	},
	
	plurk:
	{
		name : "Plurk",
		icon : "plurk.png",
		url : "http://www.plurk.com/m?content=${short-url}&qualifier=shares"
	},
	
	pocket:
	{
		name : "Pocket",
		icon : "pocket.png",
		url : "https://getpocket.com/save?url=${short-url}%&title=${title}"
	},
	
	reddit:
	{
		name : "Reddit",
		icon : "reddit.png",
		url : "http://reddit.com/submit?url=${short-url}&title=${title}"
	},

	segnalo:
	{
		name : "Segnalo",
		icon : "segnalo.png",
		url : "http://segnalo.alice.it/post.html.php?url=${short-url}&title=${title}"
	},
	
	sina_weibo:
	{
		name : "Sina Weibo",
		icon : "sinaweibo.png",
		url : "http://v.t.sina.com.cn/share/share.php?url=${short-url}&title=${title}"
	},
	
	sonico:
	{
		name : "Sonico",
		icon : "sonico.png",
		url : "http://www.sonico.com/share.php?url=${short-url}&title=${title}"
	},
	
	springpad:
	{
		name : "Springpad",
		icon : "springpad.png",
		url : "http://springpadit.com/s?type=lifemanagr.Bookmark&url=${short-url}&name=${title}"
	},
	
	studivz:
	{
		name : "studiVZ",
		icon : "studivz.png",
		url : "http://www.studivz.net/Suggest/Selection/?u=${short-url}&desc=${title}"
	},
	
	stumbleupon:
	{
		name : "StumbleUpon",
		icon : "stumbleupon.png",
		url : "http://www.stumbleupon.com/submit?url=${short-url}&title=${title}"
	},
	
	technorati:
	{
		name : "Technorati",
		icon : "technorati.png",
		url : "http://www.technorati.com/faves?add=${short-url}"
	},
	
	tuenti:
	{
		name : "Tuenti",
		icon : "tuenti.png",
		url : "http://www.tuenti.com/share?url=${short-url}"
	},
	
	tumblr:
	{
		name : "Tumblr",
		icon : "tumblr.png",
		url : "http://www.tumblr.com/share?v=3&u=${short-url}&t=${title}"
	},
	
	twitter:
	{
		name : "Twitter",
		icon : "twitter.png",
		url : "https://twitter.com/intent/tweet?text=${title}%20${short-url}"
	},

	twitthat:
	{
		name : "TwitThat",
		icon : "twitthat.png",
		url : "http://twitthat.com/go?url=${short-url}&title=${title}"
	},

	twitthis:
	{
		name : "TwitThis",
		icon : "twitthis.png",
		url : "http://twitthis.com/twit?url=${short-url}&source=bookmarklet&title=${title}"
	},

	viadeo:
	{
		name : "Viadeo",
		icon : "viadeo.png",
		url : "http://www.viadeo.com/tableaudebord/accueil/?&url=${short-url}&title=${title}"
	},		
	
	vkontakte:
	{
		name : "VKontakte",
		icon : "vkontakte.png",
		url : "http://vk.com/share.php?url=${short-url}"
	},
	
	wykop:
	{
		name : "Wykop",
		icon : "wykop.png",
		url : "http://www.wykop.pl/dodaj?url=${short-url}&title=${title}&desc="
	},
	
	xing:
	{
		name : "XING",
		icon : "xing.png",
		url : "https://www.xing.com/app/user?op=share&url=${short-url};title=${title};provider=testprovider"
	},
	
	yahoo_bookmarks:
	{
		name : "Yahoo! Bookmarks",
		icon : "yahoo.png",
		url : "http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&u=${short-url}&t=${title}"
	},
	
	yahoo_mail:
	{
		name : "Yahoo! Mail",
		icon : "yahoo.png",
		url : "http://us.mg1.mail.yahoo.com/mc/compose?ymv=0&body=${short-url}&Subj=${title}"
	},
	
	yammer:
	{
		name : "Yammer",
		icon : "yammer.png",
		url : "http://www.yammer.com/home/bookmarklet?t=${title}&u=${short-url}"
	}
}