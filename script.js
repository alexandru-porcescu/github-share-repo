//https://gist.github.com/MoOx/8614711
window.onload = function() {

    //share plugin config
    var a2a_config = a2a_config || {};
    a2a_config.onclick = 1;
    a2a_config.exclude_services = ["aim", "pinterest", "amazon_wish_list", "baidu", "yummly", "balatarin", "bibsonomy", "yahoo_messenger", "bitty_browser", "rediff", "print", "blinklist", "blogger_post", "blogmarks", "bookmarks.fr", "box_net", "care2_news", "citeulike", "diaspora", "dihitt", "dzone", "fark", "jamespot", "kakao", "kindle_it", "line", "livejournal", "mendeley", "meneame", "mixi", "myspace", "netlog", "netvouz", "newsvine", "nujij", "odnoklassniki", "oknotizie", "outlook.com", "pinboard", "plurk", "printfriendly", "protopage_bookmarks", "pusha", "qzone", "rediff_mypage", "renren", "segnalo", "slashdot", "stumbleupon", "stumpedia", "svejo", "symbaloo_feeds", "tuenti", "tumblr", "twiddla", "typepad_post", "viadeo", "vk", "wanelo", "webnews", "wordpress", "wykop", "xing", "yahoo_bookmarks", "youmob", "diary_ru"];
    a2a_config.track_links = 'googl';

    window.a2a_config = a2a_config;

    var injectScript = function(d, script) {
        script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = function() {
            // remote script has loaded
        };
        script.src = '//static.addtoany.com/menu/page.js';
        d.getElementsByTagName('head')[0].appendChild(script);
    };

    //Credit to https://gist.github.com/MoOx/8614711 
    //simplified it
    var createCustomElem = function(options) {
        var el, a, i

        el = document.createElement(options.tagName);

        if (options.attributes) {
            for (a in options.attributes) {
                el.setAttribute(a, options.attributes[a])
            }
        }

        // IE 8 doesn"t have HTMLElement
        if (window.HTMLElement === undefined) {
            window.HTMLElement = Element
        }

        if (options.children && options.children.length) {
            for (i = 0; i < options.children.length; i++) {
                el.appendChild(options.children[i] instanceof window.HTMLElement ? options.children[i] : createElement(options.children[i]))
            }
        }

        return el
    }

    desktopMode();	

    function desktopMode() {
        
        var pageHead = document.querySelector('.pagehead-actions');

        if (!pageHead) {
        	return;
        };

        //inject plugin script
        injectScript(document);

        var buttonsAttr = [{
            'class': 'a2a_button_twitter'
        }, {
            'class': 'a2a_button_hacker_news'
        }, {
            'class': 'a2a_button_reddit'
        }, {
            'class': 'a2a_button_delicious'
        }, {
            'class': 'a2a_dd',
            'href': 'https://www.addtoany.com/share_save'
        }];

        var buttonsElements = [];

        for (i = 0; i < buttonsAttr.length; i++) {
            var elemAttr = {};
            elemAttr['attributes'] = buttonsAttr[i];
            elemAttr['tagName'] = 'a';
            buttonsElements.push(createCustomElem(elemAttr));
        }

        var buttonsWrapper = createCustomElem({
            'tagName': 'div',
            'attributes': {
                'class': 'a2a_kit a2a_default_style',
                'style': 'margin-top: 6px;'
            },
            'children': buttonsElements
        });

        var newItem = createCustomElem({
            'tagName': 'li',
            'children': [buttonsWrapper]
        });

        //insert before 
        pageHead.insertBefore(newItem, pageHead.firstChild)
    }

}