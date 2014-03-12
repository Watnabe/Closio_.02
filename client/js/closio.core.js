var closio = closio || {};

closio.version = '1.2.1';

closio.eventNamespace = '.closio';

//parameters that are useful to all views
closio.viewCommonParams = {};


closio.evtMgr = function (options) {
    var $target = $('<b/>');

    function subscribe(event, fn) {
        $target.bind(event, fn);
    }

    function publish(event) {
        if (options && options.debugEvents)
            closio.utils.debugMessage('closio APP EVENT: ' + event);

        $target.trigger(event, Array.prototype.slice.call(arguments, 1));
    }

    function unsubscribe(event, fn){
        $target.unbind(event, fn);
    }

    return{
        publish:publish,
        subscribe:subscribe,
        unsubscribe:unsubscribe
    }
}();

closio.makeUrl = function(routeAction){
    return  closio.options.server + closio.options.urlPrefix + routeAction
};





closio.unloadOnRouteChange = [];

closio.appState = {};

closio.isLoggedIn = false;

closio.my = false;

closio.loggedIn = function () {
    return closio.isLoggedIn === true;
};

closio.state = function (key, value) {
    if (typeof value != 'undefined') {
        closio.appState[key] = value;
        return true;
    }
    else {

        return closio.appState[key];
    }
};

closio.context = function (objectName, id) {
    if (objectName && id) {
        var currentContext = closio.state('context');

        if(currentContext && currentContext.object == objectName && currentContext.id == id){
            //context is the same, do nothing
        }
        else{
            //set the new context
            currentContext = {object:objectName, id:id};
            closio.state('context', currentContext);


            closio.evtMgr.publish('contextChanged', currentContext);
        }
    }
    else return closio.state('context');
};

closio.clearContext = function(){
    closio.state('context', false);
    closio.evtMgr.publish('contextCleared');
};

closio.unloadViews = function () {
    $.each(closio.unloadOnRouteChange, function (i, view) {
        if (view.unload)
            view.unload();
    });

    closio.unloadOnRouteChange = [];
};



closio.make = function (modelType, modelParams) {
    var model = new closio[modelType];

    model.cid = closio.utils.uniqueId();

    if(modelParams)
        model.load(modelParams);

    return model;
};

closio.my = {
	//look up here role in db. 
	
    role:false
};

closio.userIsAdmin = function () {
    return closio.my.role == 'admin';
};

closio.userIsClient = function () {
    return closio.my.role == 'client';
};
closio.userIsUser = function () {
    return closio.my.role == 'user';
};
closio.userIsSuperAdmin = function () {
    return closio.my.role == 'super_admin';
};

closio.TemplateManager = function () {
    var loadingTemplatesPromise, $templates, templates, compiledTemplates = {};

    loadingTemplatesPromise = $.ajax(closio.makeUrl('language/templates'), {
        success:function (data) {

            //let's pre compile all of the templates
            $templates = $(data);

            //we need to remove whitespace so that jquery will parse the templates string (result of $templates.html())
            //as html. If we do not remove this whitespace, jquery (1.9+) will throw an error
            templates = $.trim($templates.html());

            $(templates).children().each(function (i, template) {
                var $template = $(template);

                compiledTemplates[$template.attr('id')] = Hogan.compile($template.html());
            });
        }
    });

    function getTemplate(templateName, vars) {
        //TODO: I probably want to do all my hogan stuff here...
        //  var templateString = $templates.find('#template-' + templateName).html();
        if (!compiledTemplates['template-' + templateName]) {
            closio.utils.debugMessage('Invalid template name: ' + templateName);
            return false;
        }

        return compiledTemplates['template-' + templateName].render(vars);
    }

    function $get(templateName, vars) {

        return $(getTemplate(templateName, vars));
    }

    return{
        loadingTemplatesPromise:loadingTemplatesPromise,
        getTemplate:getTemplate,
        $get:$get
    }
};

/**-----------------------------------------------------------------------
 * Request Object
 *----------------------------------------------------------------------
 *
 * The request object initiates a xhr request to the server side scripts
 *
 **/

closio.Request = function (options) {
    var self = this;

    this.url = closio.makeUrl(options.url);

    this.isComplete = $.ajax({
        url:this.url,
        type:"POST",
        data:options.data,
        dataType:"text",
        success:function (data) {
            self.response = new closio.Response(data, self);
            closio.utils.run.apply(this, [options.success, self.response]);
        }
    });

    return this; //todo:maybe i should just return isComplete deferred
};

closio.Response = function (responseData, request) {
    this.code = 0;

    this.data = {};

    this.request = request || false;

    this.initialize(responseData);
};

closio.Response.prototype.initialize = function (responseData) {
    var responseInitialized = false;

    try {

        var data = $.parseJSON(responseData);

        $.extend(true, this, data);
        this.data = this.data || {};

        responseInitialized = true;
    }
    catch (e) {
        var messageText = 'Error initializing the response object (' + (this.request ? this.request.url : '') + ')';
        closio.utils.debugMessage(messageText, this, e, {stack:e.stack});
    }

    if (responseInitialized)
        this.processAuth();

    this.processMessages();
};

closio.Response.prototype.isValid = function () {
    return this.code == 200; //todo: i need to work on this, definitely not the right logic
};

closio.Response.prototype.processMessages = function(){
    var messageString = '';

    if(this.messages && this.messages.length)
        closio.alert(this.messages);

};

closio.Response.prototype.processAuth = function () {
    var auth = this.auth;

    closio.my = this.user || {};

    //added specifically so the login screen can display the company name (even if the user isn't logged in)
    closio.companyName = this.company;

    switch (auth) {
        case 'successful_login':
			
            closio.isLoggedIn = true;

            //let's manually remove the hash to prevent the app from trying to load the wrong url
            //when closio.start calls history.start()
            window.location.hash = '#';

            $.when(closio.start()).done(function () {
                closio.navigate(closio.config.default_route);
            });
            break;
        case 'unsuccessful_login':
			
            closio.isLoggedIn = false;
            if(closio.LoginView)
                closio.LoginView.prototype.unsuccessfulLogin(this);
            else {
                //todo: will this branch ever be reached?
                new closio.ModalView('<h5 style="text-align:center">' + ut.lang('loginForm.incorrectLogin') + '</h5>');
            }
            // alert('incorrect login info');
            break;
        case 'not_authorized':
			
            break;
        case 'not_logged_in':
			//triggered when login view is activated and after linkedin returns to site
			
			//alert("not_logged_in");
            //alert(window.location.hash);
			if(window.location.hash.search("linkedin") >= 1 ){
				
				var hasher = window.location.hash.split("/");
				//alert(hasher[0]);
				//alert(hasher[1]);
				var email = hasher[1];
				//parse the hash get email send to login routine
				new closio.Request({
				            url:'app/linkedin',
							data: "username="+email, 
				            success:function(){
				                 closio.isLoggedIn = true;
								 window.location = '#dashboard';
								 window.location.reload();
								 // maybe now load dashboard view? 
								 //alert("logged in");								
				            }
				});
				
			}
			
			
			
			//trigger log in routine in codeigniter then set closio.isLoggedIn = true
			
			closio.isLoggedIn = false;
            if(!closio.isPublicRoute())
                closio.stop();
            break;
        case 'auto_logged_out':
            closio.isLoggedIn = false;
            closio.stop(ut.lang('loginForm.inactivityLogout'));
            break;
        case 'logged_in':
			
            closio.isLoggedIn = true;
            break;
        case 'not_installed':
            closio.stop();
            window.location = document.URL.split('#')[0].replace(/\/+$/, "") + '/install';
            alert('Please run the installation wizard');
            break;
        case 'continue':
            break;
    }
};

//todo:is this used?
closio.Response.prototype.get = function(param){
    return this.data[param];
};

/****************************************
 Routing & History
 Everything in this section is borrowed
 from the source of backbone.js
 ****************************************/
// A module that can be mixed in to *any object* in order to provide it with
// custom events. You may bind with `on` or remove with `off` callback functions
// to an event; trigger`-ing an event fires all callbacks in succession.
//
//     var object = {};
//     _.extend(object, Backbone.Events);
//     object.on('expand', function(){ alert('expanded'); });
//     object.trigger('expand');
//
//todo:I NEED to resolve this with my own version of the 'on'/'off' functions
closio.Events = {
    eventSplitter: /\s+/,
    // Bind one or more space separated events, `events`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.
    on:function (events, callback, context) {

        var calls, event, node, tail, list;
        if (!callback) return this;

        events = events.split(this.eventSplitter);
        calls = this._callbacks || (this._callbacks = {});

        // Create an immutable callback list, allowing traversal during
        // modification.  The tail is an empty object that will always be used
        // as the next node.
        while (event = events.shift()) {
            list = calls[event];
            node = list ? list.tail : {};
            node.next = tail = {};
            node.context = context;
            node.callback = callback;
            calls[event] = {tail:tail, next:list ? list.next : node};
        }

        return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `events` is null, removes all bound callbacks for all events.
    off:function (events, callback, context) {
        var event, calls, node, tail, cb, ctx;

        // No events, or removing *all* events.
        if (!(calls = this._callbacks)) return;
        if (!(events || callback || context)) {
            delete this._callbacks;
            return this;
        }

        // Loop through the listed events and contexts, splicing them out of the
        // linked list of callbacks if appropriate.
        events = events ? events.split(this.eventSplitter) : _.keys(calls);
        while (event = events.shift()) {
            node = calls[event];
            delete calls[event];
            if (!node || !(callback || context)) continue;
            // Create a new list, omitting the indicated callbacks.
            tail = node.tail;
            while ((node = node.next) !== tail) {
                cb = node.callback;
                ctx = node.context;
                if ((callback && cb !== callback) || (context && ctx !== context)) {
                    this.on(event, cb, ctx);
                }
            }
        }

        return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger:function (events) {
        var event, node, calls, tail, args, all, rest;
        if (!(calls = this._callbacks)) return this;
        all = calls.all;
        events = events.split(this.eventSplitter);
        rest = Array.prototype.slice.call(arguments, 1);

        // For each event, walk through the linked list of callbacks twice,
        // first to trigger the event, then to trigger any `"all"` callbacks.
        while (event = events.shift()) {
            if (node = calls[event]) {
                tail = node.tail;
                while ((node = node.next) !== tail) {
                    node.callback.apply(node.context || this, rest);
                }
            }
            if (node = all) {
                tail = node.tail;
                args = [event].concat(rest);
                while ((node = node.next) !== tail) {
                    node.callback.apply(node.context || this, args);
                }
            }
        }

        return this;
    },
    bind:function(events, callback, context){
        return this.on(events, callback, context);
    }
};

// Handles cross-browser history management, based on URL fragments. If the
// browser does not support `onhashchange`, falls back to polling.
closio.History = function () {
    this.handlers = [];
    // Has the history handling already been started?
    this.started = false;
    _.bindAll(this, 'checkUrl');
};

closio.History.prototype = $.extend(true, {}, closio.Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval:50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash:function (windowOverride) {
        var loc = windowOverride ? windowOverride.location : window.location;
        var match = loc.href.match(/#(.*)$/);
        return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment:function (fragment, forcePushState) {
        // Cached regex for cleaning leading hashes and slashes .
        var routeStripper = /^[#\/]/;

        if (fragment == null) {
            if (this._hasPushState || forcePushState) {
                fragment = window.location.pathname;
                var search = window.location.search;
                if (search) fragment += search;
            } else {
                fragment = this.getHash();
            }
        }
        if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);

        fragment = fragment.replace(routeStripper, '');

        //SE: Added to remove any trailing slashes so that #tasks routes to the same handler as  #tasks/
        if (fragment[fragment.length - 1] === '/')
            fragment = fragment.substr(0, fragment.length - 1);

        return fragment
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start:function (options) {

        // Cached regex for detecting MSIE.
        var isExplorer = /msie [\w.]+/;
        // Cached regex for cleaning leading hashes and slashes .
        var routeStripper = /^[#\/]/;

        if (this.started) throw new Error("closio.history has already been started");
        this.started = true;

        // Figure out the initial configuration. Do we need an iframe?
        // Is pushState desired ... is it available?
        this.options = _.extend({}, {root:'/'}, this.options, options);
        this._wantsHashChange = this.options.hashChange !== false;
        this._wantsPushState = !!this.options.pushState;
        this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
        var fragment = this.getFragment();
        var docMode = document.documentMode;
        var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

        if (oldIE) {
            this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
            this.navigate(fragment);
        }

        // Depending on whether we're using pushState or hashes, and whether
        // 'onhashchange' is supported, determine how we check the URL state.
        if (this._hasPushState) {
            $(window).bind('popstate', this.checkUrl);
        } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
            $(window).bind('hashchange', this.checkUrl);
        } else if (this._wantsHashChange) {
            this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
        }

        // Determine if we need to change the base url, for a pushState link
        // opened by a non-pushState browser.
        this.fragment = fragment;
        var loc = window.location;
        var atRoot = loc.pathname == this.options.root;

        // If we've started off with a route from a `pushState`-enabled browser,
        // but we're currently in a browser that doesn't support it...
        if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
            this.fragment = this.getFragment(null, true);
            window.location.replace(this.options.root + '#' + this.fragment);
            // Return immediately as browser will do redirect to new url
            return true;

            // Or if we've started out with a hash-based route, but we're currently
            // in a browser where it could be `pushState`-based instead...
        } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
            this.fragment = this.getHash().replace(routeStripper, '');
            window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
        }

        if (!this.options.silent) {
            return this.loadUrl();
        }
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop:function () {
        $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
        clearInterval(this._checkUrlInterval);
        this.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route:function (route, callback) {

        this.handlers.unshift({route:route, callback:callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl:function (e) {

        var current = this.getFragment();
        if (current == this.fragment && this.iframe) current = this.getFragment(this.getHash(this.iframe));
        if (current == this.fragment) return false;
        if (this.iframe) this.navigate(current);
        this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl:function (fragmentOverride) {
        var self = this;

        var fragment = this.fragment = this.getFragment(fragmentOverride);
        var matched = _.any(this.handlers, function (handler) {
            if (handler.route.test(fragment)) {
                closio.unloadViews();
                self.trigger('beforeRoute');
                //todo:should before navigate happen here rather than in the router?

                //todo:there should be a way to apply a confirmation in here, or maybe this is where the confirmation should happen instead of navigate, since navigate calls this function? But by the time this function is called the url has already changed (i think)
                handler.callback(fragment);
                return true;
            }
        });

        return matched;
    },
    //SE: Added confirmation, confirmRoute, and clearConfirmation to allow the app to ask the user if they are sure that
    //they want to leave a page if some action hasn't been taken yet (i.e. saving)
    confirmation:false,

    addConfirmation:function (message) {
        this.confirmation = message;
    },

    clearConfirmation:function () {
        this.confirmation = false;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate:function (fragment, options) {
        // Cached regex for cleaning leading hashes and slashes .

        function doNavigate(){
            var routeStripper = /^[#\/]/;

            if (!this.started) return false;

            if (!options || options === true) options = {trigger:options};
            var frag = (fragment || '').replace(routeStripper, '');
            if (this.fragment == frag) return;

            // If pushState is available, we use it to set the fragment as a real URL.
            if (this._hasPushState) {
                if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
                this.fragment = frag;
                window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

                // If hash changes haven't been explicitly disabled, update the hash
                // fragment to store history.
            } else if (this._wantsHashChange) {
                this.fragment = frag;
                this._updateHash(window.location, frag, options.replace);
                if (this.iframe && (frag != this.getFragment(this.getHash(this.iframe)))) {
                    // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
                    // When replace is true, we don't want this.
                    if (!options.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, frag, options.replace);
                }

                // If you've told us that you explicitly don't want fallback hashchange-
                // based history, then `navigate` becomes a page refresh.
            } else {
                window.location.assign(this.options.root + fragment);
            }
            if (options.trigger) this.loadUrl(fragment);
        }

        //todo:all of this, including confirmation, is in the wrong place

        this.preProcessRoute(doNavigate);
    },

    preProcessRoute:function(callback){
        //todo:this function gets called twice

        if(callback){
            if (this.confirmation) {
                var go = confirm(this.confirmation);

                if (go === true) {
                    callback.apply(this);
                    this.clearConfirmation();
                }
            }
            else {
                callback.apply(this);
            }
        }
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash:function (location, fragment, replace) {
        if (replace) {
            location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
        } else {
            location.hash = fragment;
        }
    }
});

// Routers map faux-URLs to actions, and fire events when routes are
// matched. Creating a new one sets its `routes` hash, if not set statically.
closio.Router = function (options) {
    options || (options = {});
    this.options = options;
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
};

closio.Router.prototype = $.extend(true, {}, closio.Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize:function () {
    },

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route:function (route, name, callback) {

        // console.trace();
        //debugger;
        closio.history || (closio.history = new closio.History);
        if (!_.isRegExp(route)) route = this._routeToRegExp(route);

        if (!callback) callback = this[name];

        closio.history.route(route, _.bind(function (fragment) {
            var args = this._extractParameters(route, fragment);

            //SE: Added to allow the application to run logic before a route is run
            if (closio.beforeNavigate() !== false) {
                callback && callback.apply(this, args);
                this.trigger.apply(this, ['route:' + name].concat(args));
                closio.history.trigger('route', this, name, args);
            }
        }, this));
        return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate:function (fragment, options) {
        //SE: Added to make work in the context of closioapp
        options = options || this.options;

        closio.history.navigate(fragment, options);

    },


    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes:function () {
        //SE: Added to make work in the context of closioapp
        var options = this.options;
        if (!this.routes) return;
        var routes = [];
        for (var route in this.routes) {
            routes.unshift([route, this.routes[route]]);
            this[this.routes[route]] = options[this.routes[route]];
        }
        for (var i = 0, l = routes.length; i < l; i++) {
            this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
        }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp:function (route) {
        // Cached regular expressions for matching named param parts and splatted
        // parts of route strings.
        var namedParam = /:\w+/g;
        var splatParam = /\*\w+/g;
        var escapeRegExp = /[-[\]{}()+?.,\\^$|#\s]/g;

        route = route.replace(escapeRegExp, '\\$&')
            .replace(namedParam, '([^\/]+)')
            .replace(splatParam, '(.*?)');
        return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters:function (route, fragment) {
        return route.exec(fragment).slice(1);
    }
});

closio.beforeNavigate = function () {
    //the app should only run the route if the user is logged in, or the route is "public"
    if (closio.isLoggedIn === false && !closio.isPublicRoute()) {
        closio.routes.login();
        return false;
    }
    else return true;
};

closio.navigate = function (route) {
    closio.router.navigate(route, {trigger:true});
    closio.state('currentRoute', route);
};

closio.reload = function(){
    //source: shttp://stackoverflow.com/a/10181053
    closio.history.loadUrl(closio.history.fragment);
};

//Base Model
closio.Model = function () {
    this.id = false;

    //a temporary id created by the client side scripts. The model will be assigned a permanant id the first time it is
    //saved to the database.
    this.cid = false;

    //some models might have a different url for saving
    this.saveUrl = false;

    this.type = '';

    this.errors = {};

    //we may want to force validation to fail even if there are no errors.
    this.forceInvalid = false;

    this.events = {};

    this.changed = false;
};

closio.Model.prototype.modelParams = function () {
    var self = this,
        modelParams = {};

    for (var key in self) {

        if (self.hasOwnProperty(key)) {

            if (typeof self[key] != 'object') {
                modelParams[key] =  self[key];
            }
            else if (self[key] instanceof closio.Model) {
                //if this is a model, lets use it's model params function
                modelParams[key] = self[key].modelParams();
            }
            else {

                //if this parameter is an object, but not a model, we need to call the model params function and explicitly set the context
                //first let's make sure this isn't a falsy value (null values were causing infinite loops)
                //let's also make sure it isn't a jquery object, which also cause infinite loops
                //it can't be a jquery deferred either, which causes a jquery error on Model.save
                if (self[key] && !(self[key] instanceof jQuery) && !($.isFunction(self[key].promise))) {
                    var params = closio.Model.prototype.modelParams.apply(self[key]);

                    //if the original property is an array, we want to make sure it stays an array. W
                    //Calling model params on the array somehow generates an object, so we'll need to convert the result
                    //back into an array
                    if($.isArray(self[key])){
                        var thisArray = [];
                        $.each(params, function(index, item){
                            thisArray.push(item);
                        });

                        modelParams[key] = thisArray;
                    }
                    else {
                        //the original is not an array (so it must have been and object) so we can just set the params
                        modelParams[key] =  params
                    }
                }
            }
        }
    }

    return modelParams;
};

closio.Model.prototype.importProperties = function (data) {

    var self = this,
        utils = closio.utils,
        doDecode = true;

    if(!data)
        return;

    //map object properties to this model.
    //todo:this should be recursive and modify the properties of sub ojects
    $.each(data, function (property, value) {
        if(typeof value != 'undefined'){
            //the data is mostly likley using underscore notation (if it came from the server or a form)
            //we need camelCase so let's convert it here
            var camelCaseProperty = utils.camelCase(property);

           self[camelCaseProperty] = value;
        }
    });

    //todo:determine if i need this, since we have post load processing. Right now it seems helpful because of the way the set function is used (if, it's used)
    //todo:this shoudl only be called in a couple of places, not 7
    self.prepViewProperties();
    self.postLoadProcessing();

    this.changed = true;
};

closio.Model.prototype.load = function (idOrData) {
    var self = this,
        request;

    //This function operates differently depending on the type of data passed in.
    //1. An id is passed in. The data is loaded from the server
    //2. An object is passed in. Model data is mapped from the object.

    if (typeof idOrData == 'object') {
        self.importProperties(idOrData);
    }
    else if (typeof idOrData == 'string' || typeof idOrData == 'number') {
        self.loadFromServer(idOrData);
    }
};

closio.Model.prototype.loadFromServer = function(id){
    var self = this, request;

    request = new closio.Request({
        url:self.getLoadUrl() + id,

        success:function (response) {

            if (response.isValid()) {
                //make sure data was returned for the task id specified
                if (!$.isEmptyObject(response.data)) {
                    self.importProperties(response.data);
                }
                else {
                    //TODO:there definitely needs to be an else here perhaps trigger an error event on the item?
                }

                self.publish('loaded', response);
            }
        }
    });
}

closio.Model.prototype.on = function (event, callback) {
    //todo:need to convert on to this type of model
    this.initEventTarget();
    this.$evtTarget.bind(event, callback);
};

closio.Model.prototype.once = function(event, callback){
    //todo:this hasn't been tested at all
    var self = this,
        once = function () {
            self.$evtTarget.unbind(event, once);
            //get the arguments passed into this function, remove the event (e), and pass the arguments into the
            //callback
            callback.apply(this, Array.prototype.slice.call(arguments, 1));
        };
    this.initEventTarget();
    this.$evtTarget.bind(event, once);
};

closio.Model.prototype.publish = function (event) {
    this.initEventTarget();
    this.$evtTarget.trigger(event, Array.prototype.slice.call(arguments, 1));
};

closio.Model.prototype.initEventTarget = function () {
    //if we put this in the constructor, then two models of the same type will have the same event target. To prevent that,
    //we will create the event target for each model as it's needed.
    this.$evtTarget = this.$evtTarget || $('<b/>');
};

closio.Model.prototype.prepViewProperties = function () {
    //should be overridden on each model if it's required
};

closio.Model.prototype.postLoadProcessing = function () {
    //should be overridden on each model if it's required
};

closio.Model.prototype.humanizedEndOfDay = function (date) { //todo:seems like it should be on utils
    return date ? moment.unix(date).endOf('day').fromNow() : '';
};

closio.Model.prototype.humanizedDate = function(date){
    return date ? moment.unix(date).fromNow() : '';
};

closio.Model.prototype.formatDate = function (date, format) { //todo:utils;
    return (date && format) ? moment.unix(date).format(format) : null
};

closio.Model.prototype.formatMoney = function(number){
    if(typeof number != 'undefined'){
        return closio.config.currency_symbol + Number(number).toFixed(2).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }
    else return null;

};

closio.Model.prototype.save = function (data) {
    var self = this;

    //todo:this can probably be condensed, look at model params function
    if (data) {
        for (var key in self) {
            if (self.hasOwnProperty(key) && typeof data[key] != 'undefined') {
                self[key] = data[key];
            }
        }
    }

    this.validate();

    if (this.isValid()) {
        return this.createSaveRequest();
    }
    else {
        this.publish('error');
        return false;
    }
};

closio.Model.prototype.createSaveRequest = function () {
    var self = this, saveRequest;

    saveRequest = new closio.Request({
        url:self.getSaveUrl(),
        type:'POST',
        data:self.modelParams(),
        success:function (response) {
            if (response.isValid()) {
                if (typeof response.data.id != 'undefined' && !self.id){
                    $.extend(self, response.data);
                    //self.id = response.data.id;
                }

                //all changes have been saved so reset the changed variable
                self.changed = false;
                //self.prepViewProperties(); //todo:calculated values?
                self.publish('saved', response);
            }
            else {
                self.errors = response.data;

                //trigger the error event passing in the response data
                self.publish('error', response);
            }
        },
        error:function () {

        }
    });

    return saveRequest.isComplete;
};

//todo:is this used? How is it different from destroy? Or am i using destroy?
closio.Model.prototype.delete = function () {
    var self = this, request;

    request = new closio.Request({
        url:self.getTypeForServer() + 's/delete',
        type:'POST',
        data:self.modelParams(),
        success:function (response) {
            if (response.isValid()) {
                self.publish('deleted', response);
            }
        }
    });

    return request.isComplete;
};

closio.Model.prototype.getTypeForServer = function () {
    return this.type.split('-').join('');
};

closio.Model.prototype.getSaveUrl = function () {
    return this.saveUrl || this.getTypeForServer() + 's/save'
};

closio.Model.prototype.getLoadUrl = function () {
    return this.loadUrl || this.getTypeForServer() + 's/';
};

closio.Model.prototype.destroy = function () {
    var self = this, itemDeleted;

    itemDeleted = new closio.Request({
        url:self.getTypeForServer() + 's/delete',
        type:'POST',
        data:self.modelParams()
    });

    return itemDeleted;
};

closio.Model.prototype.set = function (property, value) {
    var self = this;
//todo:do i really need this function, seems redundant with importProperties...
    if (typeof this[property] != 'undefined') //todo: do i want to do this? this is going to force me to explicity declare each property on each model, so in three places, the db, the php, and the js
    {
        if (typeof property === 'string')
            self[property] = value;
        else if (typeof property === 'object') {
            var params = property;
            $.each(params, function (property, value) {
                self[property] = value;
            });
        }
    }

    if (this.updateComputedValues)
        this.updateComputedValues();

    //todo:is there a difference between this and computed values?
    //todo:why is the model responsible for this and not the view?
    if (this.prepViewProperties)
        this.prepViewProperties();

    this.changed = true;
    this.publish('changed');
    //todo: do i need to keep track of which properties have changed since the last save? If so, I need to set here, clear in the save function
    //todo:this is where i need to trigger the change event that would update any views built on this model.
};

closio.Model.prototype.validate = function () {
    var self = this, errorMsgs;

    errorMsgs = ut.lang('csValidation');

    function errorMessage(rule, param){
        if(errorMsgs[rule])
            return errorMsgs[rule].replace('$1', param);
        else return errorMsgs.default;
    }

    //clear any previously set errors
    this.errors = {};
    this.forceInvalid = false;

    //if there are no rules, then the model is valid
    if (!this.rules)
        return true;

    //validate each field against it's rules list
    $.each(this.rules, function (fieldName, rulesList) {
        var rules = rulesList.split('|'),
        //the field name is coming from a form, so there is a good chance it's in underscore format rather than camel case
            field = closio.utils.camelCase(fieldName);

        //if the field exists on the model and it has rules defined for it, we will test the value against those rules
        if (typeof self[field] != 'undefined' && rules.length) {
            //evaluate each of the rules for this field
            $.each(rules, function (i, rule) {
                var ruleName, param, isValid,
                    params = rule.match(/(.*?)\[(.*?)\]/);

                //extract the parameter from the rule if it exists (i.e. max[50] is an example of a rule with
                //a parameter
                if(params){
                    ruleName = params[1];
                    param = params[2];
                }
                else ruleName = rule;

                //run the test for this rule
                isValid = self.validationTests[ruleName].apply(self[field], [param]);

                if (isValid !== true) {
                    self.setError(fieldName, errorMessage(ruleName, param));
                    //self.errors[field].push(errorMsgs[rule]);
                }
            });
        }

        //if the field isn't defined on the model, but it is required, throw an error. This will only happen because we
        //haven't defined each field in the constructors. They are only set when we import data.
        if (typeof self[field] == 'undefined' && $.inArray('required', rules) != -1) {
            self.setError(fieldName, errorMsgs.required);
            //  self.errors[field].push(errorMsgs.required);
        }
    });

    if (!this.isValid())
        this.publish('invalid');
};

closio.Model.prototype.validationTests = function () {
    var self = this, typeRe, numRe, emailRe, urlRe;

    typeRe = /\[type=([a-z]+)\]/;
    numRe = /^-?[0-9]*(\.[0-9]+)?$/;

    // http://net.tutsplus.com/tutorials/other/8-regular-expressions-you-should-know/
    emailRe = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i;
    urlRe = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i;

    function required() {
        return (this != false) && (typeof this != 'undefined') && (this.length > 0);
    }

    function email() {
        return emailRe.test(this);
    }

    function min(min) {
        return parseInt(this, 10) >= min;
    }

    function max(max) {

        return parseInt(this, 10) <= max;
    }

    function url() {
        return urlRe.test(this);
    }

    function number() {
        return numRe.test(this);
    }

    return{
        required:required,
        email:email,
        min:min,
        max:max,
        url:url,
        number:number
    }
}();

closio.Model.prototype.setError = function (field, error) {
    var self = this;

    if (!self.errors[field])
        self.errors[field] = [];

    this.errors[field].push(error);
};

closio.Model.prototype.isValid = function () {
    return $.isEmptyObject(this.errors) && !this.forceInvalid;
};

closio.Model.prototype.invalidate = function () {
    this.forceInvalid = true;
};

closio.Model.prototype.get_id = function () {
    return this.id || this.cid;
};

//Base Collection
closio.Collection = function (options) {
	
    this.options = options;

    this.model = closio.utils.ucFirst(options.model);

    this.url = options.url;

    this.models = [];
    this.modelsById = {};

    this.events = {
        loaded:{}
    };
};

closio.Collection.prototype.load = function (urlOrData) {
    var self = this;
	//alert("loading data in core.js");
    //reset back to empty list just in case this is a reload
    self.models = [];

    if(typeof urlOrData == 'object'){
        self.loadArray(urlOrData);
    }
    else{
        self.loadFromServer(urlOrData);
    }
	
};

closio.Collection.prototype.loadFromServer = function(url){
    var self = this,
        loadUrl, request;



		//call a filter before loading the data then add functions to deal with cases. 
		

    loadUrl = url || self.url || self.model + 's';
	
    new closio.Request({
        url:loadUrl,
        success:function (response) {
            if (response.isValid()) {
				var list = [];
				var my_data = response.data;
				
                $.each( my_data, function( key, value ) {
			        var my_values = value;
					//admin role here is changing as changes are made to teams creation.  
					 if(my_values.creator_id == closio.my.id && closio.my.role == 'user' 
					 || my_values.creator_id == closio.my.id && closio.my.role == 'admin' 
					 || closio.my.role == 'superadmin'){
						 list.push(value);
					 }
					 //console.log("my list size is "+list.length );   
			     });
				 //self.loadArray(response.data);//original developer was loading all model data 
				 //now this is deprecated for filtering
				self.loadArray(list);
				
            }
        }
    });
};

closio.Collection.prototype.loadArray = function(array){
    var self = this,
        model;

    if(!$.isArray(array)){
        closio.utils.debugMessage('Attempting to load non-array into collection');
        return;
    }

    $.each(array, function (i, item) {
        if (closio[self.model]) {
            //create a new instance of this item's model and add it to the collection
            if(!(item instanceof closio[self.model])){
                model = new closio[self.model]();
                model.load(item);
            }
            else model = item;



            self.models.push(model);
            self.modelsById[item.id] = model;
        }
        else closio.utils.debugMessage('Invalid model type: ' + self.model);

    });

    self.publish('loaded');
};

closio.Collection.prototype.getFirst = function () {
    return this.models[0];
};

closio.Collection.prototype.prepViewProperties = function () {
    var self = this;

    $.each(self.models, function (i, item) {
        item.prepViewProperties();
    });
};

closio.Collection.prototype.modelParams = function () {
    var self = this,
        collectionViewParams = [];

    $.each(self.models, function (i, item) {
        collectionViewParams.push(item.modelParams());
    });

    return collectionViewParams;
};

closio.Collection.prototype.get = function (id) {
	
	
    if (this.modelsById[id])
	
        return this.modelsById[id];
    else return false;
};

closio.Collection.prototype.add = function (data, doSave) {
    var self = this,
        updateModelsById = false,
        item, initialSave;

    //create the model
    if(data instanceof closio.Model)
        item = data;
    else{
        item = new closio[this.model];
        item.load(data);
    }

    //add the model to the collection
    this.models.push(item);
    this.modelsById[item.get_id()] = item;

    //save the model
    if (doSave) {
        //if this model has never been saved to the server, it won't have an id. This means that modelsById will be
        //using the client id rather than the server id. Once the model has been saved to the server, we want to start
        //using the server id
        if(!item.id)
            updateModelsById = true;

        initialSave = item.save();

        //models created by the collection, will need to keep track of the deferred associated with their initial save
        //this is so we can perform actions after the initial save (and an id is created for this model)
        //Because of the way this function works, there is no way to get a hold of the model before the save request is
        //initiated. This makes it impossible to bind any action using Model.on function. Therefore we need this deferred...
        item.initialSave = initialSave;

        $.when(initialSave).done(function(){
            //swap out the client_id reference for the server id reference
            if(updateModelsById){
                self.modelsById[item.id] = item;
                delete self.modelsById[item.cid];
            }
        });
    }

    return item;
};

closio.Collection.prototype.remove = function(modelToRemove, deleteFromServer){
    var self = this,
        indexInCollectionArray;

    $.each(self.models, function(i, model){
        if(model.id == modelToRemove.id){
            indexInCollectionArray = i;
            return false;
        }
    });

    delete self.models.splice(indexInCollectionArray, 1);
    delete self.modelsById[modelToRemove.id];

    if(deleteFromServer === true)
        modelToRemove.destroy();
};

closio.Collection.prototype.toArray = function () {
    var self = this,
        array = [];

    $.each(self.models, function (i, item) {
        array[array.length] = item;
    });

    return array;
};



closio.Collection.prototype.filter = function (filterParams) {
    var filteredModels = [];

    function isMatchingModel(modelParam, value) {
        if (value == '*')
            return true;
        else return modelParam == value
    }

    $.each(this.models, function (i, model) {
        var isMatch = true;

        $.each(filterParams, function (param, value) {
            if (typeof model[param] == 'undefined' || !isMatchingModel(model[param], value)) {
                isMatch = false;
                return false;
            }
        });

        if (isMatch === true) {
            filteredModels.push(model);
        }
    });

    return filteredModels;
};

closio.Collection.prototype.search = function(searchParams){
    var filteredModels = [];

    $.each(this.models, function(i, model){
        var isMatch = true;

        $.each(searchParams, function(param, value){
            //http://stackoverflow.com/a/177724/427276
            if((typeof model[param]  == 'undefined') || (model[param].toLowerCase().indexOf(value.toLowerCase()) == -1)){
                isMatch = false;
            }
        });

        if(isMatch === true){
            filteredModels.push(model);
        }
    });

    return filteredModels;
};

closio.Collection.prototype.sort = function(key, direction){
   this.models.sort(function(a, b){
        var valA, valB, result, sortOrder = 1;

        valA = a[key];
        valB = b[key];

        //if the sort order is descending, we want to reverse 'results' calculated below
        if(direction == 'desc')
            sortOrder = -1;

        if(valA < valB)
            result = -1;
        else if(valA > valB)
            result = 1;
        else result = 0;

        return result * sortOrder;
    });
};

closio.Collection.prototype.publish = closio.Model.prototype.publish;

closio.Collection.prototype.on = closio.Model.prototype.on;

closio.Collection.prototype.initEventTarget = closio.Model.prototype.initEventTarget;

/****************************************
 Views
 ****************************************/
closio.View = function () {
    this.template = '';

    this.id = false;

    this.$element = false;

    this.modelParams = {};

    this.model = false;

    this.collection = false;

    this.data = false;

    this.events = {};

    //an object that lists all the references to dom elements we will need in this view. Once the view is built, the
    //it will use this object to save reference to each of these elements
    this.domElements = false;
};

closio.View.prototype.initialize = function (data) {

    this.id = closio.utils.uniqueId();

    if (data instanceof closio.Model)
        this.model = data;
    else if (data instanceof closio.Collection)
        this.collection = data;
    else this.data = data;

    //todo:this should be named params or view params
    this.modelParams = this.getViewParams();

    this.preBuildProcessing();

    this.decodeParams();

    this.build();

    this.postBuildProcessing();

    this.saveReferencesToDomeElements();

    if (this.bindEvents)
        this.bindEvents();

    if (this.userBasedProcessing)
        this.userBasedProcessing(closio.my);

    if (this.postInitProcessing)
        this.postInitProcessing();
};

closio.View.prototype.decodeParams = function(){
    var self = this;
    //todo:I might be able to remove this functionality now that we're using html purifier on the server side. Just remove xss for each param in the models
    if(this.paramsToDecode && $.isArray(this.paramsToDecode)){
        $.each(this.paramsToDecode, function(i, param){
            var parts = param.split(':'), onChildArray = parts.length > 1;

            //IMPORTANT
            //param could be in dot notation and several levels deep. Using eval is the only method I could come up with
            //for modifying an object parameter that is several levels deep. If we loop through each level and try to
            //set the new value, it doesn't affect the original.

            if(onChildArray){
                var childArrayName = parts[0],
                    child = eval('self.modelParams.' + childArrayName),
                    params = parts[1].split(',');

                //loop through the child array decoding each of the specified parameters
                $.each(child, function(i, object){

                    //there may be more than one parameter on this child array that we need to decode. Loop through each
                    //parameter and decode it.
                    $.each(params, function(j, param){
                        if(child[i][param]){
                            //creates and runs code that looks like:
                            //self.modelParams.proposalItems[93].item= ut.decode(self.modelParams.proposalItems[93].item)
                            eval('self.modelParams.' + childArrayName + '[' + i + '].' + param + '= ut.decode(self.modelParams.' + childArrayName + '[' + i + '].' + param + ", 'ENT_QUOTES')");

                        }

                    });
                });
            }
            else{
                eval('self.modelParams.' + param + ' = closio.utils.html_entity_decode(self.modelParams.' + param + ", 'ENT_QUOTES')" );
            }
        });
    }
};

closio.View.prototype.getViewParams = function () {
    var params = {};

    if (this.model !== false) {
        params = this.model.modelParams(true);
    }
    else if (this.collection !== false) {
        params[closio.utils.lcFirst(this.collection.model) + 's'] = this.collection.modelParams(true);
    }
    else {
        if(this.data)
            params = this.data;
        else params = {};
    }


    return params;
};

closio.View.prototype.build = function (template, params) {
    //todo:get rid of this when we switch from hogan
    
	//look up role here in db and call appropriate user role. create one common function to handle roles rather then userIsAdmin to userIs()
	
	closio.viewCommonParams.userIsAdmin = closio.userIsAdmin();
	closio.viewCommonParams.userIsClient = closio.userIsClient();
	closio.viewCommonParams.userIsUser = closio.userIsUser();
	closio.viewCommonParams.userIsSuperAdmin = closio.userIsSuperAdmin();
    //closio.viewCommonParams.userIsClient = !closio.viewCommonParams.userIsAdmin;

    if(!template && !params){
        this.$element = this.$element || closio.templateManager.$get(this.template, $.extend(this.modelParams, closio.viewCommonParams));

    }else {
        var $template = closio.templateManager.$get(template, $.extend(params, closio.viewCommonParams));

        return $template;
    }
};

closio.View.prototype.initSelects = function($el){
    var $element = $el || this.$element,
        options = {minimumResultsForSearch:10, width:'off'};

    if($element.is('select'))
        $element.select2(options);
    else $element.find('select').select2(options);
};

closio.View.prototype.destroySelects = function () {
    this.$element.find('select').select2('close');
}

closio.View.prototype.$get = function () {
    return this.$element;
};

closio.View.prototype.saveReferencesToDomeElements = function () {
    var self = this;

    if (self.domElements) {
        $.each(self.domElements, function (domElement, selector) {
            self[domElement] = self.$element.find(selector);
        });
    }
};

closio.View.prototype.addTo = function (options) {
    var position = options.position,
        $anchor = options.$anchor || $(options.anchor);
    //todo: unload any views previously at this position
    if (!position){
        //call empty first to release all event handlers bound to child elements
        $anchor.empty();
        $anchor.html(this.$get());
    }
    else if (position == 'append')
        $anchor.append(this.$get());
    else if (position == 'prepend')
        $anchor.prepend(this.$get());

    this.initSelects();

    if (options.postRenderProcessing !== false && this.postRenderProcessing)
        this.postRenderProcessing();
};

closio.View.prototype.needsUnloading = function () {
    closio.unloadOnRouteChange.push(this);
};

closio.View.prototype.unload = function(){
    //todo:possibly redundant with addTo, which will call empty (and remove events)
    //unbind events
    this.$element.off();
    //remove any children and unbind their events
    this.$element.empty();
    //remove the element from the dom
    this.$element.remove();

    //todo:should i remove references to dome elements (including those in this.domElements)? i.e. this.$element = false
    this.unloadProcessing();
};

closio.View.prototype.unloadProcessing = function(){
    //Defined on each individual view.
    //perform any additional unload processing. For example, some views will bind events to parent elements
    //i.e. binding an event to the window resize event, you will unbind it here
};

closio.View.prototype.preBuildProcessing = function(){
    //do something with modelParams here
};

closio.View.prototype.postBuildProcessing = function(){
    //if you need to perform some action after the build, but before events are bound
};

closio.View.prototype.on = closio.Model.prototype.on;
closio.View.prototype.publish = closio.Model.prototype.publish;
closio.View.prototype.initEventTarget = closio.Model.prototype.initEventTarget;


closio.FormView = function (options) {
    this.$errorAnchors = [];

    this.$form = false;

    this.$submitButton = false;

    if (options)
        this.initForm(options);
};

closio.FormView.prototype = new closio.View();

closio.FormView.prototype.initForm = function (options) {
    this.template = 'form-' + options.name;

    this.isModal = options.isModal;

    this.modal = false;

    //todo:it's impossible to pass in a model and have a different set of data that populates the form
    this.model = options.model instanceof closio.Model ? options.model : false;

    this.submitAction = options.submitAction;
	

    this.width = false;

    this.initialize(options.data);

    this.$submitButton = this.$element.find('input[type=submit]');

    if (this.isModal === true) {
        this.modal = new closio.ModalView(this, options.title);
    }
};

closio.FormView.prototype.preBuildProcessing = function(){
    var self = this;

    $.each(this.modelParams, function(param, value){
        self.modelParams[param] = ut.decode(value);
    });
};

closio.FormView.prototype.postInitProcessing = function(){
    var width, $hidden, $clone;
    $hidden = $('#hidden');
    $clone = this.$element.clone();
    $hidden.append($clone);
    width = $clone.width();
    if(width > 400)
        this.width = width;

    $clone.remove();
};

closio.FormView.prototype.processFormValues = function(values){
    //sometimes form values will need additional processing (i.e. turning a date into a timestamp)
    //should be overriden on each form if needed
    return values;
};

closio.FormView.prototype.disableSubmitButton = function(){
    this.$submitButton.attr('disabled', 'disabled');
};

closio.FormView.prototype.enableSubmitButton = function(){
    this.$submitButton.removeAttr('disabled');
};

closio.FormView.prototype.bindEvents = function () {

    var self = this;

    function getValues($form){
        var values = $form.serializeObject();

        values = self.processFormValues(values);

        $.each(values, function(key, value){
            if(value === ''){
                delete values[key];
            }
        });

        return values;
    }

    this.$form = this.$element.is('form') ? this.$element : this.$element.find('form');

    this.$form.validator({effect:'labelMate'}).submit(function (e) {

        if (!e.isDefaultPrevented()) {
            var modelName, model;

            if (self.model) {
                //if this is an edit operation, the model will already be specified.
                model = self.model;
            }
            else {
                modelName = closio.utils.modelName(self.$form.data('model'));
                model = self.model = new closio[modelName]();
            }

            model.importProperties(getValues($(this)));

            //todo:i should modify on to accept multiple event names
            //todo: error should refer to server side OR client side erorrs, which would allow me to get rid of the separate isValid check below?
            model.once('error', function () {
                self.saveErrorHandler();
                self.displayErrors(model.errors);
                self.enableSubmitButton();
            });

            model.once('saved', function (response) {

                if (response && response.data && response.data.id)
                    model.id = response.data.id;

                //todo:duplicated below
                if (!model.isValid()) {
                    self.displayErrors(model.errors);
                }

                self.close();
                self.enableSubmitButton();

                self.publish('submitted', model);

                //todo:get rid of submitAction in favor of submitted event
                if(self.submitAction)
                    self.submitAction(model);
            });

            model.save();
            self.disableSubmitButton();
        }

        e.preventDefault();
    });
};

closio.FormView.prototype.close = function () {
    if (this.isModal)
        this.modal.close();
};

closio.FormView.prototype.initSelectsAndDates = function () {
    //todo:getting called twice on modals
    this.$element.find('[type=date]').dateinput({format:closio.config.datepicker_format});
};

closio.FormView.prototype.postBuildProcessing = function () {
    this.initSelectsAndDates();
};

closio.FormView.prototype.displayErrors = function (errors) {
    var self = this;
    self.clearErrors();
    //we need to account for field names that have brackets ie name=field[] needs to become name=field\\[\\] for
    //the jquery selector engine
    //source: http://stackoverflow.com/a/3113742/427276
    function escapeStr(str) {
        if (str)
            return str.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
        else
            return str;
    }

    $.each(errors, function (field, errorList) {
        $.each(errorList, function (i, error) {
            //todo:css selector, templates
            var escapedFieldName = escapeStr(field),
                $errorAnchor = self.$element.find('[name=' + escapedFieldName + ']').first().parent();

            //if we couldn't find a field with specified name attribute, let's see if it matches a class
            if (!$errorAnchor.length)
                $errorAnchor = self.$element.find('input, textarea, select').filter('.' + escapedFieldName).parent();

            //if we still don't have an anchor, use the form element as the anchor
            if (!$errorAnchor.length) {
                $errorAnchor = self.$element;
                //specify the field name in the error since the error isn't being positioned next to the field
                error = field + ': ' + error;
            }

            $errorAnchor.addClass('has-error').prepend('<span class="error">' + error + '</span>');

            self.$errorAnchors.push($errorAnchor);
        });
    });
};

closio.FormView.prototype.clearErrors = function () {
    var self = this;

    for (var i = 0; i < self.$errorAnchors.length; i++) {
        self.$errorAnchors[i].removeClass('has-error').find('.error').remove();
    }
};

closio.FormView.prototype.saveErrorHandler = function () {
    //should be overridden on each view if needed
};

closio.FormView.prototype.savedHandler = function () {
    //should be overridden on each view if needed
};

closio.FormView.prototype.on = closio.Model.prototype.on;
closio.FormView.prototype.once = closio.Model.prototype.once;
closio.FormView.prototype.publish = closio.Model.prototype.publish;
closio.FormView.prototype.initEventTarget = closio.Model.prototype.initEventTarget;

closio.FormView.prototype.populateCurrentValues = function(){
    var self = this,
        data = self.modelParams;

    if(data){

        self.$element.find('input, textarea, select').not('[type=submit]').not("input[class^='select2']").each(function(){

            var $this = $(this),
                type = this.tagName.toLowerCase(),
                inputName = $this.attr('name'),
                name = closio.utils.camelCase(inputName);

            //the field that displays dates will be named xyx_selection the actual field that holds the date timestap
            //will be called xyz. (i.e. due_date_selection and due_date, where due_date selection is the human readable
            //format. Since there is no field on the model called due_date_selection, we need to make an exception to
            //the following rule for date classes
            if(!data[name] && !$this.hasClass('date'))
                return;

            if(type != 'select'){
                $this.val(data[name]);

                if($this.hasClass('date')){
                    var fieldWithValue = $this.attr('name').slice(0, -10),
                        value = data[closio.utils.camelCase(fieldWithValue)];

                    if(value)
                        $this.data('dateinput').setValue(new Date(closio.Model.prototype.formatDate(value, 'MM/DD/YYYY'))); //todo:date

                }
            }
            else {
                $this.select2('val',  data[name]);

                $this.find('[value=' + data[name] + ']').attr('selected', 'selected');
            }
        });
    }
};

closio.ModalView = function (content, title) {
    var self = this;

    this.template = 'modal';

    this.domElements = {
        $overlay:'.modal-overlay',
        $inner:'.modal'
    };

    this.initialize({title:title});

    //not passing in content as an argument because it doesn't appear that mustache can accept a jquery object or an html
    //string
    if (content instanceof closio.View) {
        if(content.width)
            this.$inner.width(content.width);

        content.addTo({
            $anchor:self.$inner,
            postRenderProcessing:false,
            position:'append'
        });
    }
    else this.$inner.append(content);

    this.addTo({
        anchor:'body',
        position:'append'
    });

    if (content instanceof closio.FormView)//todo: I can use addView and post render processing...
        content.initSelectsAndDates();
};

closio.ModalView.prototype = new closio.View();

closio.ModalView.prototype.bindEvents = function () {
    var self = this;

    this.$element.find('.close').click(function () {
        self.close();
    });
};



closio.ModalView.prototype.close = function () {
    //the select2 dropdown will stay open even if the form is closed, let's prevent that
    this.destroySelects();
    this.unload();
};

closio.ModalView.prototype.setTitle = function (title) {
    this.$element.find('.modal-info').find('h3').text(title);
};

closio.confirm = function (options) {
    //accepts the following
    //actionName - the modal title and and the text in the 'danger' button
    //message - the text to display in the modal
    //callback - the function to run if the action is returned. It should return a deferred if it's ascync
    var $content, confirmationBox, callbackReturnValue;

    options.actionName = options.actionName || ut.lang('confirmBox.defaultActionName');
    options.message = options.message || ut.lang('confirmBox.defaultMessage');
    options.message = ut.decode(options.message);

    $content = closio.templateManager.$get('confirm-box', {message:options.message, action:options.actionName});

    confirmationBox = new closio.ModalView($content, closio.utils.ucFirst(options.title || options.actionName));

    $content.on('click', '.cancel', function () {
        confirmationBox.close();
    });

    $content.on('click', '.action', function () {
        $content.find('button').addClass('disabled');

        callbackReturnValue = options.callback();

        $.when(callbackReturnValue).done(function () {
            confirmationBox.close();
        });
    });
};

closio.alert = function(messages, isCloseable){
    var alertView = new closio.View();

    if(!$.isArray(messages))
        messages = [{message:messages}];

    alertView.template = 'alert';

    alertView.domElements = {
        'closeButton':'.button'
    };


    alertView.initialize({messages:messages});

    if (isCloseable !== false) {
        alertView.closeButton.on('click', function () {
            alertView.unload();
        });
    }
    else {
        alertView.closeButton.remove();
    }

    alertView.addTo({
        anchor:'body',
        position:'append'
    });

    alertView.close = function(){
        alertView.unload();
    };

    return alertView;
};


closio.initRouter = function () {
    //we can't do anything without the router, so lets make sure it's initialized
    if (!closio.router) {
        //start the history and the app router
        closio.history = new closio.History();
        closio.router = new closio.Router(closio.routes);
    }
};

closio.isPublicRoute = function () {
    var checkRoute = window.location.hash.substr(1).split('/'),
        publicRoutes = closio.config.public_routes || [],
        matchFound = false;

    $.each(publicRoutes, function (i, route) {
        var pieces = route.split('/'),
            model = pieces[0],
            action = typeof pieces[1] !== 'undefined' ? pieces[1] : null;

        if (checkRoute[0] == model && (typeof action !== 'undefined') && checkRoute[1] == action) {
            matchFound = true;
            return false;
        } else if (checkRoute[0] == model && (typeof action == 'undefined')) {
            matchFound = true;
            return false;
        }
    });

    return matchFound;

};

closio.applyLocalization = function(){

   var lang = ut.lang;

    var messages = {
        '*':{en:lang('csValidation.default')},
        ':email':{en:lang('csValidation.email')},
        ':number':{en:lang('csValidation.number')},
        ':radio':{en:lang('csValidation.radio')},
        ':url':{en:lang('csValidation.url')},
        '[max]':{en:lang('csValidation.max')},
        '[min]':{en:lang('csValidation.min')},
        '[required]':{en:lang('csValidation.required')}
    };
    $.tools.validator.messages = messages;

    //1. the language code doesn't matter since we're passing in the strings
    //2. the datepicker language object will be modified by the jquery tools localize function. We need to pass in a copy
    //so that no errors are thrown if the localize function is called a second time (i.e. on login it's called twice)
    $.tools.dateinput.localize('en', $.extend(true, {}, lang('datepicker')));

    //the language code doesn't matter since we're passing in the strings
    moment.lang('en', lang('moment'));
};

//this function appears to never be called see stop() function in main.js
closio.stop = function (message) {
	
    closio.routes.login(message); //.navigate('login', {trigger:true});
};
