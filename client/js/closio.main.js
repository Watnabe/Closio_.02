var closio = closio || {};

closio.config = {};

closio.panelOne = {};

closio.panelTwo = {};

closio.sidebar = {};

closio.layoutMgr = {};

closio.messagesSidebar = {};    //todo:this may not be used

closio.options.defaultDealTab = 'details';

closio.$appWrapper = false;



//todo:is this used? we have addTo...
closio.addView = function(options) {

    var view = new closio[options.view](options.data);

    options.$anchor.append(view.$get());

    if (view.postRenderProcessing)
        view.postRenderProcessing();
};

closio.ContextManager = function () {
    var context;

    closio.router.on('all', function () {
        var fragmentParts, modelType, modelId, secondaryModelType, secondaryModelId;

        fragmentParts = closio.history.fragment.split('/');
        //if this is actually a model, it will be plural, we need to remove the s
        modelType = fragmentParts[0].slice(0, -1);
        modelId = fragmentParts[1];

        //if there is a secondary model, then the secondary model is the context
        //i.w. deals/2/files/4 would yield a context of file, 4
        if(fragmentParts[2] && fragmentParts[3]){
            secondaryModelType = fragmentParts[2].slice(0, -1);
            secondaryModelId = fragmentParts[3];
            closio.context(secondaryModelType, secondaryModelId);
        }
        else if(modelId){
            //there is no secondary model, so the primary model is the context
            closio.context(modelType, modelId);
        }
        else{
            //the url is in the format '#deals' a list with no specific model id, and therefore no context
        }


    });

    closio.history.on('beforeRoute', function(){
        closio.clearContext();
    });
};

/****************************************
 Modules
 ****************************************/
//Base Module
//todo:get rid of this in favor of views
closio.Module = function() {
    this.cssSelectors = {};

    this.$element = {};

    this.evtMgr = closio.evtMgr;


};

closio.Module.prototype.cssSelector = function(selectorName) {
    var self = this;

    if (self.cssSelectors[selectorName])
        return self.cssSelectors[selectorName];
    else return false;
};

closio.Module.prototype.cssClass = function(selectorName) {
    var self = this;

    if (self.cssSelectors[selectorName])
        return self.cssSelectors[selectorName].substr(1);
    else return false;
};

closio.Module.prototype.initialize = function() {
    if (this.load)
        this.load();

    if (this.render)
        this.render();
};

closio.Module.prototype.debugMessage = function() {
    closio.utils.debugMessage.apply(this);
};

closio.Module.prototype.run = function(callback) {
    closio.utils.run.apply(this, arguments);
};

//Layout Module, sets up left nav and right main window
closio.LayoutManager = function() {
    var self = this,
        state, sel, c,
        $domWindow, $appWindow, $sidebar, verticalMargin, horizontalMargin, headerHeight;

    //the css selectors used by the layout manager
    this.cssSelectors = {
        sidebar:'#sidebar',
        appWindow:'.window'
    };

    //maintains the state of each of the layout components
    state = {
        sidebarWidth:0 //TODO: used?
    };

    //quick access to the cssSelector and cssClass functions
    sel = self.cssSelector.bind(this);

    init_base_layout();
    
    //save references to each of the dom elements required to manage the layout
    $domWindow = $(window);
    $appWindow = $(sel('appWindow'));
    $sidebar = $(sel('sidebar'));

    var sidebarWidth = $sidebar.width();

    function initialize() {
        state.sidebarWidth = $sidebar.width();

        verticalMargin = parseInt($appWindow.css('margin-top'), 10) + parseInt($appWindow.css('margin-bottom'), 10);
        headerHeight = $('#header-wrapper').height();
        horizontalMargin = parseInt($appWindow.css('margin-left'), 10) + parseInt($appWindow.css('margin-right'), 10);
        resize();

        $appWindow.animate({'opacity':1});
    }

    function init_base_layout(){
       closio.$appWrapper = closio.templateManager.$get('base-layout');
        $('body').append(closio.$appWrapper);
    }

    function resize() {
        $appWindow.height($domWindow.height() - verticalMargin - headerHeight); //.width($domWindow.width() - sidebarWidth - horizontalMargin);
    }

    function hideMessages(){
        $appWindow.addClass('messages-closed');
    }

    function showMessages(){
        $appWindow.removeClass('messages-closed');
    }

    //event handlers
    $domWindow.resize(resize);

    initialize();

    return{
        resize:resize,
        hideMessages:hideMessages,
        showMessages:showMessages
    }
};

closio.LayoutManager.prototype = new closio.Module();

//shows or hides messages 
closio.MessagesPanelManager = function(){
    function hideMessages() {
        closio.layoutMgr.hideMessages();
        closio.messagesViewInstance.hide();
        closio.evtMgr.publish('messages-panel-hidden');
    }

    function showMessages() {
        closio.layoutMgr.showMessages();
        closio.messagesViewInstance.show();
        closio.evtMgr.publish('messages-panel-showing');
    }

    return{
        hideMessages:hideMessages,
        showMessages:showMessages
    }
};

//TODO: ALl of these are views (button, button set, list) not modules. A module is a collection of views that work together for some purpose

//Button, sets up buttons in the app 
//todo:this should be a veiw
closio.Button = function(options) {
    this.options = options;

    this.buttonText = options.buttonText; //Make sure there is consistency in there I am setting these values, constructor or load? Perhaps load funciton is replaced entirely by a model?

    this.buttonType = this.options.buttonType || 'flat-button';

    this.buttonId = options.buttonId;

    this.initialize();
}; //TODO: Should I combine button and button set? They are extremely similar in terms of the code that was written

closio.Button.prototype = new closio.Module();

closio.Button.prototype.render = function() {
    var self = this;

    self.$element = closio.templateManager.$get('button', {
        buttonId:self.buttonId,
        buttonType:self.buttonType,
        buttonText:self.buttonText
    });
};

closio.Button.prototype.setAction = function(action) {
    var self = this;

    self.$element.click(function() {
        self.run(action, this);
    });

    if (self.options.action)
        this.setAction(self.options.action);
};

/****************************************
 Panel Managers
 sets up left and right panels 
 ****************************************/
closio.PanelManager = function() {
    this.anchor = $('.window');

    this.content = $();

    this.actions = [
        {panelAction:'+', actionUrl:'#'}
    ];

    this.panel = {};

    this.cssSelectors = {};
};

closio.PanelManager.prototype.buildPanel = function() {
    var self = this;

    self.panel = new closio.PanelView({
        id:self.id,
        isPrimary:self.isPrimary,
        type:self.isPrimary ? '' : 'secondary',
        title:self.title,
        anchor:self.anchor,
        content:self.content, //TODO: Where is this getting set?
        actions:self.actions
    });

    self.panel.$element.appendTo(self.anchor);
};

//Primary Panel
closio.PrimaryPanelManager = function() {
    var self = this;

    this.id = 'panel-one';

    this.isPrimary = true;

    this.isHidden = false;

    this.anchor = $('.window');

    this.content = $();

    this.$action = false;

    this.panel = {};

    this.model = '';

    this.title = '';

    this.collection = {};

    this.firstItem = {};

    this.maps = {
        task:{
            title:'task',
            meta1:'notes'
        },
        deal:{
            title:'name',
            meta1:'clientName',
            meta2:'dueDateHumanized'
        },
        template:{
            title:'name',
            meta1:'clientName',
            meta2:'dueDateHumanized'
        },
        client:{
            title:'name',
            meta1:'email'
        },
        user:{
            title:'name',
            meta1:'email'
        },

        proposal:{
            title:'name',
            meta1:'formattedTotal',
            meta2:'statusText'
        },
        file:{
            title:'name'
        },
        hello:{
            title:'name'
        }
    };

    this.list = {};

    this.actions = [
        {panelAction:'+', actionUrl:'#'}
    ];
    //filters are status indicators
    this.filters = {
      /*  deal:[
            {name:'In Progress', value:0, param:'isArchived'},
            {name:'Archived', value:1, param:'isArchived'},
            {name:'All', value:'*', param:'isArchived', isDefault:true}
        ],
	  */	
        deal:[
            {name:'Pending', value:0, param:'isArchived'},
            {name:'Won', value:1, param:'isArchived'},
            {name:'Lost', value:'*', param:'isArchived', isDefault:true}
        ],
       
        proposal:[
            {name:'Paid', value:1, param:'isPaid'},
            {name:'Overdue', value:1, param:'isOverdue'},
            {name:'All', value:'*', param:'isOverdue', isDefault:true}
        ]
    };

    //show and hide panel 
    function showHidePanelAction(){

        if(self.model == 'client' || self.model == 'deal' || self.model == 'template'){
            self.$action.css('display', 'block');
        }
        else self.$action.css('display', 'none');
    }

    //draw the panel
    function draw(collection, map, selectedId) {
        //remove the previous list view if it exists
		
		//console.log(collection);
		
        if (self.listView)
            self.listView.unload();

        self.panel.notify('loading', false);

        collection.on('loaded', function () {
			//console.log(collection);
            self.listView = new closio.ListView(collection, map, selectedId);

            self.panel.hideNotification();

            self.listView.addTo({
                $anchor:self.panel.$element,
                position:'append'
            });
        });
    }

    //set up collections based on filters arguments
    function processFiltered(filtered) {
        var collection;
		//console.log(filtered);
        collection = new closio.Collection({model:self.model});

        self.filtered = collection;

        draw(collection, self.maps[self.model]);

        collection.load(filtered);
    }


    //initialize the filter
    function initFilter() {
        var filters, defaultFilter;

        if (self.panelFilter)
            self.panelFilter.unload();

        if (!self.filters[self.model])
            return;

        filters = self.filters[self.model];

        self.panelFilter = new closio.PanelFilterView({
            collection:self.collection,
            filters:filters
        });

        self.panelFilter.addTo({$anchor:self.$panelFilterWrapper});

        self.panelFilter.on('filterApplied', function (e, filtered) {
            processFiltered(filtered);
        });
    }
    //initialize the sort
    function initSort(){

        if(self.panelSort)
            self.panelSort.unload();

        if(self.model != 'deal')
            return false;


        self.panelSort = new closio.PanelSortView();
        self.panelSort.addTo({$anchor:self.$panelSortWrapper});

        self.panelSort.on('sorted', function(e, order){
            var collectionToSort,
                collection,
                sortOrder = order == 'descending' ? 'desc' : 'asc';

            if(self.filtered)
                collectionToSort = self.filtered;
            else collectionToSort = self.collection;

            collectionToSort.sort('createdDate', sortOrder);

            collection = new closio.Collection({model:self.model});

            draw(collection, self.maps[self.model]);
			//console.log(collection);

            collection.load(collectionToSort.models);
        });
    }
    //loading content into the panel
    this.setContent = function(model, selectedId) {
        var panelLoaded = new $.Deferred(),
            loadingView = new closio.PanelLoadingView();

        if(this.isHidden)
            this.show();

        //x is a special id that the app will use to indicate that the list needs to be updated regardless of whether
        //the model changed (i.e. when deleting items from the list)
        if (!this.model || this.model !== model || selectedId == 'x') {
            this.model = model;

            self.panel.setTitle(ut.lang('sidebar.' + model + 's')); //closio.utils.ucFirst(model) + 's');
			//console.log("main.js setContent.model "+model); //model is 'client' for example
            self.collection = new closio.Collection({model:model});
            //console.log("main.js setContent.collection "+self.collection);
			//console.log(self.collection);
			
			
			//create filters for data based on access_level (role) of user
			if(closio.my.role == 'user'){
				//get only items i own
			    var my_collection = self.collection;  //which is a collection of objects
			    //console.log(my_collection);
				//console.log(Object.keys(my_collection));
				
				
				
			    
			
				
				
			
			}  
			
			
			
			
			
            initFilter();
            initSort();

            self.collection.on('loaded', function() { //TODO: Is this redundant? I'm checking whether the collection is loaded in the list object

                self.firstItem = self.collection.getFirst();
                panelLoaded.resolve();
            });

            //self.firstItem = self.collection.getFirst();
            showHidePanelAction();

            //remove the previous list view if it exists
            if(self.listView)
                self.listView.unload();

            self.panel.notify('loading', false);

            self.collection.on('loaded', function(){
                self.listView = new closio.ListView(self.collection, self.maps[model], selectedId);

                self.panel.hideNotification();

                self.listView.addTo({
                    $anchor:self.panel.$element,
                    position:'append'
                });
            });

            self.collection.load();
        }
        else {

            //the model hasn't changed so no need to update the list, but we still want to change the selected item
            self.listView.setSelected(selectedId);
            panelLoaded.resolve();
        }

        return panelLoaded;
    };

    //useful if we want to force the list to reload (i.e. when we've just added a new item to the list
    this.reset = function(){
        this.model = false;
    };

    this.buildPanel();

    //todo: i can use the view domElements function?
    this.$listWrapper = this.panel.$element.find('.list-wrapper');

    this.$panelFilterWrapper = this.panel.$element.find('.panel-filter-wrapper');

    this.$panelSortWrapper = this.panel.$element.find('.panel-sort-wrapper');

    this.$action = this.panel.$element.find('.panel-action');

    this.$action.click(function(){
        new closio['New' + closio.utils.ucFirst(self.model) + 'View']();
    });

    this.hide = function(){
        self.isHidden = true;
        self.panel.$element.closest('.window').addClass('one-panel');
    };

    this.show = function(){
        self.isHidden = false;
        self.panel.$element.closest('.window').removeClass('one-panel');
    };
};

closio.PrimaryPanelManager.prototype = new closio.PanelManager();

//Secondary Panel, sets up the secondary panel, etc. 
closio.SecondaryPanelManager = function() {
    var self = this, sel, c;

    this.isPrimary = false;

    this.id = 'panel-two';

    this.title = '';

    this.anchor = $('.window');

    this.content = $();


    this.$actions = false;

    this.$actionsWrapper = false;

    this.panel = {};

    //this panel may be based on a specific item(i.e. a deal)
    this.item = {};

    this.itemCategories = {};


    this.messagesButton = {};

    this.loadingView = new closio.PanelLoadingView();

    this.noSelectionView = new closio.NoSelectionView();

    this.setContent = function($content) {
        self.panel.setContent($content);
    };

    this.setInnerContent = function($content) {
        self.panel.setInnerContent($content);
    };

    this.setTitle = function(title){
        self.panel.$title.text(closio.utils.html_entity_decode(title));
    };

    //todo:consider using closio.context instead of storing reference to the model
    this.setModel = function(model){
        var rebuildCategories;

        if(typeof model != 'undefined'){
            if(!self.model){
                rebuildCategories = true;
            }
            else {
                rebuildCategories = (typeof self.model !== 'undefined') && (self.model.type != model.type);
            }



        }

        self.model = model;


        if(rebuildCategories)
            buildDealItemCategories();

        self.setActions();
    };

    this.setTitleWidget = function(view) {
        self.panel.setTitleWidget(view);
    };

    this.removeTitleWidget = function(){
       self.panel.removeTitleWidget();
    };

    this.destroy = function(){
        $(window).off('resize.secondaryPanelManager');
    };
    //module specific actions 
    this.setActions = function(){
        //todo:clean this up. Perhaps an addAction function
        if(self.model && self.model.type == 'deal'){
            self.actions = [{panelAction:'Edit', actionUrl:'#', id:'edit-panel-entity'}];

            if(self.model.isArchived == 0)
                self.actions.push({panelAction:'Archive', actionUrl:'#', id:'archive-panel-entity'});
            else self.actions.push({panelAction:'Move to In Progress', actionUrl:'#', id:'unarchive-panel-entity'});

            self.actions.push({panelAction:'Delete', actionUrl:'#', class:'danger', id:'delete-panel-entity'});

        }
        else if(self.model && $.inArray(self.model.type, ['client', 'user']) !== -1){
            self.actions = [
                {panelAction:'Edit', actionUrl:'#', id:'edit-panel-entity'},
                {panelAction:'Delete', actionUrl:'#', class:'danger', id:'delete-panel-entity'}
            ];
        }
        else if(self.model && self.model.type == 'template'){
            self.actions = [

                {panelAction:'New Deal From Template', actionUrl:'#', class:"go", id:'new-deal-from-template'},
                {panelAction:'Edit', actionUrl:'#', id:'edit-panel-entity'},
                {panelAction:'Delete', actionUrl:'#', class:'danger', id:'delete-panel-entity'}

            ];
        }
        else {
            self.actions = [];
        }

        var $actions = closio.templateManager.$get('panel-actions', {actions:self.actions});

        self.$actions.html($actions);
    };

    //Not using the SecondaryPanelManager.prototype because there should only be one SecondaryPanelManger
    function initialize() {
        var dealItemCategories, messagesButton;

        self.buildPanel();

        buildDealItemCategories();
        self.panel.addToMainMenu(self.itemCategories.$element, true);

        //initially, there will be nothing selected
        self.panel.clearContent(self.noSelectionView);



        self.panel.resize();
    }
    //adds buttons to subView for a Deal
    function buildDealItemCategories() {

        var buttons, dealItemCategories;

        buttons = [
            {buttonId:'deal-details', buttonText:'Details'},
            {buttonId:'deal-calendar', buttonText:'Calendar'},
            {buttonId:'deal-tasks', buttonText:'Tasks'},
            {buttonId:'deal-files', buttonText:'Files'},
            {buttonId:'deal-proposals', buttonText:'Proposals'},
            {buttonId:'deal-notes', buttonText:'Notes'}
        ];

        var buttonsToRemove = closio.modulesToHide;


        if(self.model && self.model.type == 'template'){
            buttonsToRemove = buttonsToRemove.concat(['Calendar', 'Proposals']);
        }

        buttons = buttons.filter(function (value) {
            //$.inArray(value.buttonText, buttonsToRemove);
            return $.inArray(value.buttonText, buttonsToRemove) == -1;
        });

        dealItemCategories = new closio.ButtonSetView({
            buttons:buttons
        });

        dealItemCategories.setAction(function(button) {
            var type = $(button).attr('id').substr(8);
            closio.navigate(self.model.type + 's/' + self.item.id + '/' + type);
        });

        self.panel.clearMainMenu();
        self.panel.addToMainMenu(dealItemCategories.$element);

        self.itemCategories = dealItemCategories;

        return dealItemCategories;
    }


    $(window).on('resize.secondaryPanelManager',function() {
        self.panel.resize();
    });

    closio.evtMgr.subscribe('contextChanged', function(){
        self.setContent(self.loadingView.$get());
    });

    closio.evtMgr.subscribe('contextCleared', function(){
        self.panel.clearContent(self.noSelectionView);
    });

    closio.evtMgr.subscribe('setSecondaryContent', function(e, contentDetails) {
        var view = new closio[contentDetails.view](contentDetails.data);

        self.setInnerContent(view.$get());
    });

    closio.evtMgr.subscribe('secondaryContentUpdated', function(){
        self.panel.resize();
    });


    initialize();


    this.$actions = this.panel.$element.find('.panel-actions');


    //todo: this needs to be tied to setActions
    this.panel.$element.on('click', '#edit-panel-entity', function(){
        new closio['New' + closio.utils.ucFirst(self.model.type) + 'View'](self.model);
    });

    this.panel.$element.on('click', '#delete-panel-entity', function(){
        var type = self.model.type;

        closio['Delete' + closio.utils.ucFirst(type) + 'View'](self.model);
    });

    this.panel.$element.on('click', '#new-deal-from-template', function(){
        new closio.NewDealFromTemplateView(self.model);
    });

    this.panel.$element.on('click', '#archive-panel-entity', function () {
        closio['Archive' + closio.utils.ucFirst(self.model.type) + 'View'](self.model);
    });

    this.panel.$element.on('click', '#unarchive-panel-entity', function () {
        closio['Unarchive' + closio.utils.ucFirst(self.model.type) + 'View'](self.model);
    });
};

closio.SecondaryPanelManager.prototype = new closio.PanelManager();


closio.initModulesToHide = function(){
    var modulesToHide = closio.config.modules_to_hide.split(',');
    $.each(modulesToHide, function(i, moduleName){
        modulesToHide[i] = $.trim(moduleName);
    });

    closio.modulesToHide = modulesToHide;
};

closio.buildLayout = function(){
    closio.layoutMgr = new closio.LayoutManager();
    closio.panelOne = new closio.PrimaryPanelManager();
    closio.panelTwo = new closio.SecondaryPanelManager();
    closio.messagesMgr = new closio.MessagesPanelManager();

    closio.headerViewInstance = new closio.HeaderView();
    closio.headerViewInstance.addTo({$anchor:$('#header-wrapper')});

    closio.sidebarViewInstance = new closio.SidebarView();
    closio.sidebarViewInstance.addTo({$anchor:$('#sidebar'), position:'append'});

    closio.messagesViewInstance = new closio.MessagesPanelView();
    closio.messagesViewInstance.addTo({$anchor:$('.inner-right'), position:'append'});

    closio.initComplete = true;


};

closio.initViewCommonParams = function(){
    closio.viewCommonParams = {
        currencySymbol:closio.config.currency_symbol
    };
};



closio.loadConfig = function(){
    var configRequest;

    //load the server side config options
    configRequest = new closio.Request({
        url:'app/config',
        success:function(response){
            if(response.isValid()){
                closio.config = response.data;
                closio.initViewCommonParams();
            }
        }
    });

    return configRequest;
};

closio.loadLanguage = function(){
    var langRequest;


    //load the client side language file
    langRequest = new closio.Request({
        url:'app/language',
        success:function (response) {
            if (response.isValid()) {
                closio.language = response.data;
            }
        }
    });

    return langRequest;
};

//starts app show login or not logic
closio.start = function(newLogin) {
    var self = this,
        continueStart = false,
        loginCheckRequest, appStarted = $.Deferred();

    //we can't do anything without the router, so lets make sure it's initialized
    if(!closio.router){
        //start the history and the app router
        closio.history = new closio.History();
        closio.router = new closio.Router(closio.routes);
    }



    closio.templateManager = new closio.TemplateManager();

    $.when(closio.templateManager.loadingTemplatesPromise, closio.loadConfig(), closio.loadLanguage()).done(function() { //TODO: I should have some kind of global on function
        loginCheckRequest = closio.Request({
            url:'app/logged_in',
            success:function(response){
                if(response.auth != 'not_logged_in')
                    continueStart = true;
            }
        });

        $.when(loginCheckRequest.isComplete).done(function(){
            if (continueStart) {
                closio.applyLocalization();

                closio.initModulesToHide();

                closio.buildLayout();


                closio.contextMgr = new closio.ContextManager();

                //we need to manually call the resize function once the main components have been built
                closio.layoutMgr.resize();

                appStarted.resolve();

                if(!closio.history || !closio.history.started)
                    closio.history.start();


                //todo: i probably should't show the screen until after the layout manager is finished loading?
            }
            else if(closio.isPublicRoute()){
                if(!closio.history || !closio.history.started)
                    closio.history.start();

            }
        });
    });

    return appStarted;
};

//cleanup and show login form
closio.stop = function(message){
	
    if(!closio.history || !closio.history.started)
        closio.history.start();

    if(closio.sidebarViewInstance)
        closio.sidebarViewInstance.unload();

    if(closio.headerViewInstance)
        closio.headerViewInstance.unload();

    if(closio.messagesViewInstance)
        closio.messagesViewInstance.unload();

    if(closio.$appWrapper)
        closio.$appWrapper.remove();

    //todo:this should stop history or the router or both
    if(!$('.login-window').length){
        closio.addView({
            view:'LoginView',
            data:{message:message},
            $anchor:$('body')
        }); //todo: replace with the view.addTo funciton
    }
};

closio.error = function (message) {
    var error = closio.templateManager.$get('error');
    return error.prepend(message);
};

closio.notice = function(message){
    var error = closio.templateManager.$get('notice');
    return error.prepend(message);
};

