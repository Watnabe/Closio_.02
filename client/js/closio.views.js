var closio = closio || {};

//Button Set
closio.ButtonSetView = function (data) {
    this.template = 'button-set';

    this.initialize(data);
};

closio.ButtonSetView.prototype = new closio.View();

closio.ButtonSetView.prototype.setAction = function (action) {
    var self = this;

    self.$element.on('click', 'li', function () {
        self.setSelected($(this).attr('id'));

        //run the action associated with this button set
        closio.utils.run.apply(this, [action, this]); //todo:add to base view if this is used often. See usage on closio.Module
    });
};

closio.ButtonSetView.prototype.setSelected = function (id) {
    //mark the current button as selected
    this.$element.find('#' + id).addClass('selected').siblings().removeClass('selected');
};

//Panel View
closio.PanelView = function (options) {
    options = options || {};

    this.template = options.isPrimary ? 'panel' : 'panel-two';

    this.domElements = {
        $scrollable:'.nano',
        $notification:'.notification',
        $title:'.panel-title',
        $inner:'.inner',
        $innerMenu:'.inner-menu',
        $panelInfo:'.panel-info',
        $innerContentWrapper:'.inner-content-wrapper',
        $innerContent:'.inner-content',
        $showMessages:'#show-messages-panel',
        $panelActionsWrapper:'.panel-actions-wrapper',
        $titleWidgetSpace:'.panel-title-widget'
    };

    this.scrollbar = false;

    this.isPrimary = options.isPrimary;

    this.initialize(options);

    //we need to save a reference to the current content, so we can trigger "remove" functionality when it is removed from the dom
    this.innerContent = {};

    this.notificationTimout = false;

    if (!options.isPrimary) {
        this.scrollbar = true;
        this.$element.find('.nano').nanoScroller();
    }
};

closio.PanelView.prototype = new closio.View();


closio.PanelView.prototype.setContent = function (content) {
    //todo: is this used?
    this.$panelActionsWrapper.css('display', 'block');
    this.setInnerContent(content, false);
};

closio.PanelView.prototype.clearContent = function (view) {
    //clear the secondary inner menu
    this.clearSecondaryMenu();
    this.$innerMenu.css('display', 'none');
    this.$panelActionsWrapper.css('display', 'none');

    this.removeTitleWidget();

    this.$title.html('');

    this.$innerContent.empty();

    if (view)
        view.addTo({
            $anchor:this.$innerContent
        });
};

closio.PanelView.prototype.setTitleWidget = function (view) {
    this.hasTitleWidget = true;
    view.addTo({$anchor:this.$titleWidgetSpace});
};

closio.PanelView.prototype.removeTitleWidget = function () {
    if (this.hasTitleWidget === true) {
        this.$titleWidgetSpace.html('');
        this.hasTitleWidget = false;
    }
};

closio.PanelView.prototype.setInnerContent = function (content, showMenu) {
    var display = showMenu !== false ? 'block' : 'none';

    //clear the secondary inner menu
    this.clearSecondaryMenu();

    //show the inner menu
    this.$innerMenu.css('display', display);

    //set the content
    if (content instanceof closio.View) {
        content.addTo({
            $anchor:this.$innerContent
        });
    }
    else this.$innerContent.html(content);

    //we need to call resize, otherwise the height might be wrong (if the inner menu was previously showing)
    this.resize();

    this.updateScrollbar();
};

closio.PanelView.prototype.addContent = function (content) {
    if (content instanceof closio.View) {
        content.addTo({
            $anchor:this.$innerContentWrapper.find('.inner-content'),
            position:'append'
        });
    }
    else this.$innerContentWrapper.find('.inner-content').append(content);
};

closio.PanelView.prototype.updateScrollbar = function () {
    this.$scrollable.nanoScroller({scroll:'top'});
};

closio.PanelView.prototype.addToMainMenu = function ($content, isLeftSide) {
    this.$innerMenu.find('.left-menu').first().append($content);
};


closio.PanelView.prototype.clearMainMenu = function(){
    this.$innerMenu.find('.left-menu').first().empty();
};

closio.PanelView.prototype.addToSecondaryMenu = function ($content) {
    var $anchor = this.$innerMenu.find('.secondary-inner-menu');

    if ($content instanceof closio.View)
        $content.addTo({$anchor:$anchor, position:'append'});
    else $anchor.append($content);

};

closio.PanelView.prototype.clearSecondaryMenu = function () {
    this.$innerMenu.find('.secondary-inner-menu').html('');
};

closio.PanelView.prototype.resize = function () {
    var innerMenuHeight = this.$innerMenu.css('display') != 'none' ? this.$innerMenu.outerHeight(true) : 0;

    //todo:where is the 10 on the end from?
    this.$scrollable.height(this.$element.outerHeight(true) - this.$panelInfo.outerHeight(true) - innerMenuHeight - 10);

    this.$scrollable.nanoScroller();
};

closio.PanelView.prototype.setTitle = function (title) {
    this.$title.html(closio.utils.html_entity_decode(title));
};

closio.PanelView.prototype.notify = function (message, timeout) {
    var self = this,
        notificationTimeout;

    //if notification timeout is set to false, then this notifcation will persist
    if (timeout !== false) {
        notificationTimeout = timeout || 3000;
    }

    if (message) {
        this.$notification.text(message);
        this.$notification.show();

        clearTimeout(this.notificationTimeout);

        if (notificationTimeout) {
            this.notificationTimeout = setTimeout(function () {
                self.$notification.fadeOut();
            }, notificationTimeout);
        }
    }
};

closio.PanelView.prototype.hideNotification = function () {
    this.$notification.css('display', 'none');
};

closio.PanelView.prototype.bindEvents = function () {
    var self = this;

    this.$notification.on('click', '.close', function () {
        self.hideNotification();
    });

    if (!this.isPrimary) {
        //we're loadig on the dashboard, so let's hide this button initially
        self.$showMessages.css('display', 'none');

        self.$showMessages.on('click', function () {
            if (!closio.messagesViewInstance.isShowing) {
                self.showMessagesPanel()
            }
            else {
                self.hideMessagesPanel();
            }
        });

        closio.evtMgr.subscribe('contextChanged contextCleared', function (e, context) {

            if (!context || $.inArray(context.object, ['client', 'user', 'dashboard', 'reporting', 'template']) != -1) {
                self.$showMessages.css('display', 'none');
                closio.messagesMgr.hideMessages();
                //self.$inner.removeClass('showing-messages');
            }
            else {
                self.$showMessages.css('display', 'inline-block');
                closio.messagesMgr.showMessages();
            }
        });
    }
};



closio.PanelView.prototype.showMessagesPanel = function(){
    closio.messagesMgr.showMessages();
};

closio.PanelView.prototype.hideMessagesPanel = function(){
    closio.messagesMgr.hideMessages();
};

//Sidebar View
closio.SidebarView = function () {
    this.template = 'sidebar';

    this.domElements = {
        $visibleItems:'#sidebar-menu-items',
        $hiddenItems:'#sidebar-menu-overflow',
        $more:'#sidebar-more'
    };

    this.tab = false;
    this.$body = $('body');

    this.initialize(null);
};

closio.SidebarView.prototype = new closio.View();

closio.SidebarView.prototype.bindEvents = function () {
    var self = this;

    function setSelected($el) {

        if (!$el.length || $el.is('#sidebar-more'))
            return;

        var tab = $el.attr('id').split('-')[0];

        self.$element.find('li').not($el).removeClass('active');
        $el.addClass('active');

        self.tab = tab;
    }

    this.$element.on('click', 'li', function () {
        setSelected($(this));
    });

    this.$more.on('click', function () {
        var $hiddenItems = self.$visibleItems.find('.hidden').clone().removeClass('hidden');

        self.$hiddenItems.html($hiddenItems);

        self.$hiddenItems.css({
            display:'block',
            width:($hiddenItems.length * 65) + 42,
            top:self.$more.position().top - 20
        });
    });

    this.$hiddenItems.on('mouseleave', function () {
        self.$hiddenItems.fadeOut(200);
    });

    $(window).on('resize.sidebarView', function () {
        self.resize();
    });
};

closio.SidebarView.prototype.postRenderProcessing = function () {
    var self = this;

    this.margin = parseInt(this.$element.parent().css('margin-top'), 10);
    var itemsToRemove = closio.modulesToHide;
    $.each(itemsToRemove, function (i, item) {
        self.$element.find('#' + item.toLowerCase() + '-tab').remove();
    });
    this.$items = this.$element.find('#sidebar-menu-items li');
    this.numItems = this.$visibleItems.find('li').length;
    this.resize();


};

closio.SidebarView.prototype.resize = function () {
    var height, numDisplayedItems;

    //todo:don't hardcode header height
    height = this.$body.height() - this.margin - 40;

    this.$element.height(height);

    numDisplayedItems = Math.min(Math.floor((height - 100) / 85), this.numItems);

    if (numDisplayedItems >= this.numItems - 1)  //need to subract one because the more button takes up a space
        this.$more.css('display', 'none');
    else this.$more.css('display', 'block');


    this.$items.each(function (index, el) {
        if (index <= numDisplayedItems)
            $(el).removeClass('hidden');
        else $(el).addClass('hidden');
    });
};

closio.SidebarView.prototype.unloadProcessing = function(){
    $(window).off('resize.secondaryPanelManager');
};

//Messages Panel View
closio.MessagesPanelView = function (messagesCollection) {
    var self = this;

    this.template = 'messages-panel';

    this.$messagesList = false;

    self.isShowing = false;

    this.messagesCollection = messagesCollection;

    this.domElements = {
        $messagesList:'#messages-list', //todo:css selector?
        $scrollable:'.nano',
        $newMessage:'#new-message',
        $menu:'#messages-panel-menu',
        $hide:'#hide-messages-panel',
        $refresh:'#refresh-messages-panel',
        $sendMessage:'#send-message',
        $sendMessageWrapper:'#message-area-wrapper',
        $entityName:'#discussion-entity-name'
    };


    this.initialize(null);


    this.manage();
};

closio.MessagesPanelView.prototype = new closio.View();

closio.MessagesPanelView.prototype.setHeight = function () {
    this.$scrollable.height(this.$element.outerHeight(true) - this.$newMessage.outerHeight(true) - this.$menu.outerHeight(true));
};




closio.MessagesPanelView.prototype.bindEvents = function () {
    var self = this;

    self.$element.on('keyup', 'textarea', function (e) {
        var $textarea = $(this);

        if (e.which === 13) {
            self.addMessage($textarea.val());
            $textarea.val('');
        }
    });

    self.$sendMessage.on('click', function () {
        var data = self.editor.getData();

        if(!data.length)
            return;

        self.$newMessage.addClass('sending-message');
        var sendingMessage = self.addMessage(data);

        $.when(sendingMessage).done(function(){
            self.editor.setData('');
            self.$newMessage.removeClass('sending-message');
        });


    });

    self.$refresh.on('click', function () {
        self.load();
    });

    self.$hide.on('click', function () {
        self.hide();
    });

    $(window).on('resize.messagesPanelView', function () {
        self.setHeight();
        self.updateScrollbar();
    });

    closio.evtMgr.subscribe('contextChanged', function (e, context) {
        self.manage();
    });
};

closio.MessagesPanelView.prototype.manage = function () {
    var self = this,
        context = closio.context();

    if (!context)
        return;

    if ($.inArray(context.object, ['client', 'user', 'dashboard']) != -1)
        self.hide();



    //if the context changes and the messages panel is showing, then we should load the messages for the new context
    if (self.isShowing)
    {
        self.setEntityName(context.object);
        self.load();
    }
};

closio.MessagesPanelView.prototype.setEntityName = function(name){
    this.$entityName.html(name)
};

closio.MessagesPanelView.prototype.hide = function () {
    //don't do anything if the messages panel is already hidden
    if(!this.isShowing)
        return false;


    this.isShowing = false;

};

closio.MessagesPanelView.prototype.show = function () {
    //don't do anything if the messages panel is already showing
    if(this.isShowing)
        return false;

    this.isShowing = true;

    //if the screen was resized when the messages window was hidden, the editor height will have been messed up
    //we need to set it to the correct size here
    //todo:shouldn't be hardcoded
    if (this.editor)
        this.editor.resize(260, 120);

    //reload the messages because the context could have changed since the last time this panel was refreshed,
    //or new messages could have been loaded
    this.load();
};

closio.MessagesPanelView.prototype.addMessage = function (messageText) {
    var self = this,
        message = this.messagesCollection.add({message:messageText}, true);

    $.when(message.initialSave).done(function(){
        self.createMessageView(message);

        self.updateScrollbar();
    });

    return message.initialSave;

};

closio.MessagesPanelView.prototype.updateScrollbar = function () {
    //todo: is this necessary - two calls?
    this.$scrollable.nanoScroller();
    this.$scrollable.nanoScroller({scroll:'bottom'});
};

closio.MessagesPanelView.prototype.createMessageView = function (message) {
    var messageView = new closio.MessageView(message);
    this.$messagesList.append(messageView.$get());
};

closio.MessagesPanelView.prototype.load = function () {
    var self = this,
        context = closio.context();

    if (context) {
        this.messagesCollection = new closio.Collection({model:'message'});

        this.messagesCollection.on('loaded', function () {
            self.populate();
        });

        this.messagesCollection.load('app/messages/' + context.object + '/' + context.id);
    }
};

closio.MessagesPanelView.prototype.populate = function () {
    var self = this;

    self.$messagesList.html('');

    $.each(self.messagesCollection.models, function (i, message) {
        self.createMessageView(message);
    });

    self.setHeight();
    this.updateScrollbar();
};

closio.MessagesPanelView.prototype.postRenderProcessing = function () {
    var self = this;

    function startEditor() {
        //unbind the event that caused this function to fire - the same way the 'once' function would
        closio.evtMgr.unsubscribe('messages-panel-showing', startEditor);
        self.startEditor();
    }

    if (this.isShowing)
        this.startEditor();
    else {
        closio.evtMgr.subscribe('messages-panel-showing', startEditor);
    }
};

closio.MessagesPanelView.prototype.startEditor = function () {
    var ckeditorConfig = {},
        self = this;

    function doStart(){
        var $editor = self.$element.find('textarea');

        //for some reason the editor will sometimes try to start before the textarea is actually available.
        //let's make sure this doesn't happen.
        if($editor.length)
            self.editor = CKEDITOR.replace($editor.get(0), ckeditorConfig);
        else setTimeout(doStart, 100);
    }

    ckeditorConfig.uiColor = '#ffffff';

    ckeditorConfig.toolbar = [
        { name:'basicstyles', items:[ 'Bold', 'Italic', 'Underline', 'Strike'] }
    ];

    //the underline and strikethrough buttons won't appear without this line
    ckeditorConfig.removeButtons = '';

    //prevent the editor from creating <p> tags, which mess up the activity stream
    //The activity stream wraps all messages in <a> tags, which are inline level elements, but <p> is block level
    ckeditorConfig.enterMode = CKEDITOR.ENTER_BR;
    ckeditorConfig.shiftEnterMode = CKEDITOR.ENTER_P;

    //use a div instead of an iframe
    ckeditorConfig.extraPlugins = 'divarea';

    ckeditorConfig.height = 120;

    doStart();
};

closio.MessagesPanelView.prototype.unloadProcessing = function(){
    if(this.editor)
        this.editor.destroy();

    $(window).off('resize.messagesPanelView');
};

//Message View
closio.MessageView = function (data) {
    this.template = 'message';



    this.paramsToDecode = ['message'];

    this.initialize(data);

};

closio.MessageView.prototype = new closio.View();

closio.MessageView.prototype.postBuildProcessing = function(){
    this.$element.find('.message-text').html(this.modelParams.message);
};

closio.MessageView.prototype.postInitProcessing = function () {
    closio.insertProfileImage(this.$element, this.model);
};

//Item List View for deals
closio.DealListView = function (type, modelOrCollection) {
    var self = this;

    this.template = 'deal-' + type + '-list';

    this.type = type;

    if (modelOrCollection)
        this.initialize(modelOrCollection);

    return this;
}; //TODO: the arguments list for all views should be standardized

closio.DealListView.prototype = new closio.View();


closio.TaskListView = function (data, deal) {
    this.template = 'deal-task-list-wrapper';

    this.initialize();

    this.collection = data;

    this.deal = deal;

    if (closio.userIsAdmin())
        this.taskListItemsView = new closio.TaskListItemsView(data, deal);
    else this.taskListItemsView = new closio.TaskListItemsSimpleView(data, deal.id);

    this.taskListItemsView.addTo({$anchor:this.$element});
};

closio.TaskListView.prototype = new closio.View();

closio.TaskListView.prototype.postRenderProcessing = function () {
    //clients can't create tasks
    if (closio.userIsAdmin())
        this.newTaskButton();

    this.initFilter();

    //if we move this into postInitProcessing, it will be removed when the task list is created becasue the task list
    //does not use append as the position argument for View.addTo
    if (!this.collection.models.length)
        this.showMessage(ut.lang('taskList.noTasks'));
};

closio.TaskListView.prototype.newTaskButton = function () {
    var $button, self = this;

    $button = closio.templateManager.$get('add-deal-list-item', {
        buttonText:'Task',
        type:'new-entity'
    });

    $button.on('click', function () {
        new closio.NewTaskView({}, function (taskModel) {
            var $task = closio.templateManager.$get('deal-task-list-item', taskModel);
            self.collection.add(taskModel);

            //todo:loose coupling, this is very messy
            self.taskListItemsView.fluidList.addListItem($task);
        });
    });

    closio.panelTwo.panel.addToSecondaryMenu($button);

    this.taskButton = $button;
};

closio.TaskListView.prototype.initFilter = function () {
    //todo: Loose coupling. This implementation is terrible
    var filter = new closio.TaskListFilterView(this);

    closio.panelTwo.panel.addToSecondaryMenu(filter);
    this.filter = filter;
    this.filter.applyDefault();
};

closio.TaskListView.prototype.redraw = function (collection, filterToApply) {
    var taskCollection = collection || this.collection,
        currentFilters = this.filter.currentFilters(),
        filter = filterToApply || currentFilters.complete,
        ucFirst = closio.utils.ucFirst;

    this.taskListItemsView.unload();
    this.taskListITemsView = false;
    //this.taskListItemsView = new closio.TaskListItemsView(taskCollection, this.deal);

    if (closio.userIsAdmin())
        this.taskListItemsView = new closio.TaskListItemsView(taskCollection, this.deal);
    else this.taskListItemsView = new closio.TaskListItemsSimpleView(taskCollection, this.deal.id);

    this.taskListItemsView.addTo({$anchor:this.$element});

    if (filter)
        this.taskListItemsView['show' + ucFirst(filter)](); //todo: this  should reapply the current filter, then we can probably get rid of the clear function on the filter
    else this.taskListItemsView.showIncomplete();

    closio.panelTwo.panel.updateScrollbar();
};

closio.TaskListView.prototype.showMessage = function (optionsOrMessage) {
    var options = {},
        $message;

    if (typeof optionsOrMessage == 'string') {
        options.message = optionsOrMessage;
    }
    else $.extend(options, optionsOrMessage);

    if (!options.closeButtonText)
        options.noCloseButtonText = true;

    $message = closio.templateManager.$get('task-list-message', options);

    this.$element.prepend($message);
};

closio.TaskListView.prototype.bindEvents = function () {
    var self = this;

    this.$element.on('click', '.search-results-message .close', function () {
        self.redraw();
    });

    this.$element.on('click', '.task-list-message .close', function () {
        $(this).closest('.task-list-message').remove();
    });
};


closio.TaskListFilterView = function (taskListView) {
    this.needsUnloading();

    this.template = 'task-filter';

    this.domElements = {
        $searchFilter:'.search-filter'
    };

    this.appliedFilters = {};

    this.taskListView = taskListView;

    this.initialize();
};

closio.TaskListFilterView.prototype = new closio.View();

closio.TaskListFilterView.prototype.applyDefault = function(){
    this.appliedFilters = {complete:0};
    this.performFilters();
};

closio.TaskListFilterView.prototype.bindEvents = function () {
    var self = this,
        ucFirst = closio.utils.ucFirst;

    this.$element.on('click', function (e) {
        $(this).toggleClass('open');
        e.stopPropagation();
    });

    this.$searchFilter.on('click', function (e) {
        e.stopPropagation();
    });

    this.$searchFilter.on('keyup', 'input', function (e) {
        var $this;

        if (e.which == 13) {
            $this = $(this);
            self.searchList($this.val());
            $this.val('');
            self.$element.find('.selected').removeClass('selected');
        }
    });

    $('html').on('click.task-filter', function () {
        self.$element.removeClass('open');
    });

    this.$element.on('click', 'li', function () {
        var $this, type, value;

        $this = $(this);

        if ($this.hasClass('search-filter'))
            return;

        type = $this.data('filter-type');
        value = ucFirst($this.data('filter-value'));

        $this.toggleClass('selected').siblings('[data-filter-type=' + type + ']').removeClass('selected');

        //keep track of the current filters that have been applied
        self.appliedFilters[type] = value;

        //run the function that performs the actual filter
        self.performFilters();

        if ($this.hasClass('selected'))
            closio.panelTwo.panel.notify(ut.lang('taskFilter.filterNotification', {filterValue:value}));

        closio.panelTwo.panel.updateScrollbar();
    });

};

closio.TaskListFilterView.prototype.unloadProcessing = function () {
    $('html').off('click.task-filter');
};

closio.TaskListFilterView.prototype.setFilters = function(){
    var self = this, filters = {};

    if(self.appliedFilters.complete){
        var complete = self.appliedFilters.complete;

        if(complete != 'All')
            filters.isComplete = (complete == 'Incomplete') ? 0 : 1;
    }

    //set assigned filter
    //check to see if the assigned filter has been selected
    if(self.appliedFilters.assigned){
        var assigned = self.appliedFilters.assigned;

        //if we're filtering 'my' tasks then we need to add the current user's id, otherwise we need to remove
        if(assigned == 'Mine')
            filters.assignedTo = closio.my.id;
    }

    return filters;
};

closio.TaskListFilterView.prototype.performFilters = function(){
    var self = this, filtered, collection;

    filters = this.setFilters();

    filtered = self.taskListView.collection.filter(filters);

    collection = new closio.Collection({model:'task'});
    collection.load(filtered);

    this.taskListView.redraw(collection);
};

closio.TaskListFilterView.prototype.searchList = function (searchTerm) {
    var self = this, filtered, collection;

    filtered = self.taskListView.collection.search({task:searchTerm});
    collection = new closio.Collection({model:'task'});
    collection.load(filtered);

    this.taskListView.redraw(collection, 'incomplete');

    this.taskListView.showMessage({
        message: ut.lang('taskFilter.searchNotification', {searchTerm:searchTerm}),
        closeButtonText:ut.lang('taskFilter.closeSearch'),
        type:'search-results-message'
    });

    this.$element.removeClass('open');
};

closio.TaskListFilterView.prototype.currentFilters = function () {
    var filters = {};

    this.$element.find('.selected').each(function () {
        var $this = $(this);
        filters[$this.attr('data-filter-type')] = $this.attr('data-filter-value');
    });

    return filters;
};


//Task List Items View
closio.TaskListItemsView = function (data, deal) {

    var tasks;
    //todo:i shouldn't have to pass in the deal just to update the progress when a task is completed. Should be a better way
    this.domElements = {
        $completedTasks:'#completed-tasks-list',
        $incompleteTasks:'#incomplete-tasks-list'
    };

    this.fluidList = false;

    this.deal = deal;

    tasks = this.sortTasks(data);

    this.initialize(tasks);

    this.collection = data;
};

closio.TaskListItemsView.prototype = new closio.DealListView('task');

closio.TaskListItemsView.prototype.postRenderProcessing = function () {
    var self = this;
    //todo:there should be some kind of loading animation until this is done.

    this.fluidList = this.initFluidList();
};

closio.TaskListItemsView.prototype.loadUsers = function (modalForm) {
    var self = this;

    function buildSelect() {
        $.each(self.deal.users, function (i, user) {
            modalForm.$element.find('select').append('<option value="' + user.id + '">' + user.name + '</option>');

        });

        modalForm.$element.find('select').select2();
    }

    //if we don't already have the list of users, we need to get it before we populate the select.
    if (!self.deal.users) {
        new closio.Request({
            url:'/deals/' + self.deal.id + '/users',
            success:function (response) {
                self.deal.users = response.data;
                buildSelect();
            }
        });
    }
    else buildSelect();
};

closio.TaskListItemsView.prototype.bindEvents = function () {
    var self = this;

    function goToTask(id) {
        closio.navigate('deals/' + closio.context().id + '/tasks/' + id);
    }

    //IMPORTANT: double click handler is defined in the fluid list initialization



    self.$incompleteTasks.on('click', '.delete-task', function () {
        var $this = $(this),
            type = $this.closest('li').hasClass('list-header') ? 'header' : 'task';

        closio.confirm({
            actionName:ut.lang('taskListItems.deleteTask'),
            message:ut.lang('taskListItems.deleteTaskMessage', {type:type}),
            callback:function () {
                var $listItem = $this.closest('li'),
                    id = $listItem.data('id'),
                    task = new closio.Task();

                task.id = id;

                task.on('deleted', function () {
                    $listItem.fadeOut(function () {
                        //we need to remove the
                        self.fluidList.removeListItem($listItem);
                        $listItem.remove();
                    });
                });

                task.delete();
            }
        });
    });

    self.$element.on('click', '.view-task', function () {
        self.goToTask($(this).closest('li').data('item'));
    });

    self.$element.on('keyup.tasklistview', function (e) {
        var $this = $(this);

        if (e.which === 27) {
            if (self.fluidList)
                self.fluidList.destroy();
        }
    });

    self.$element.on('click', '.is-task-completed', function (e) {
        var $this = $(this),
            $task = $this.closest('li'),
            task = self.collection.modelsById[$task.data('id')];

        task.toggleComplete();

        self.updateDealProgress();

        if (task.isComplete) {
            self.markTaskComplete($task, true);
        }
        else {
            $task.fadeOut(400, function () {
                $task.remove();
                self.fluidList.addListItem($task.css('display', 'block'));
            });

        }

        return false;
    });

    self.$completedTasks.on('click', 'li', function (e) {
        if(!$(e.target).is('.is-task-completed'))
            goToTask($(this).closest('li').data('id'));
    });
};

closio.TaskListItemsView.prototype.updateDealProgress = function () {
    this.deal.calculateProgress(this.collection);
};

closio.TaskListItemsView.prototype.markTaskComplete = function ($task, animate) {
    var self = this;

    function removeTask() {
        if (self.fluidList)
            self.fluidList.removeListItem($task);

        //the task may have been hidden by the animation, we need to reset it's display property before we add it
        //to the completed tasks list, otherwise it won't show up if we're in the "all tasks" view
        $task.css('display', 'block');

        //move the task to the completed tasks list
        self.$completedTasks.append($task);
    }

    $task.addClass('complete');

    if (animate === true) {
        $task.fadeOut(400, function () {
            removeTask();
        });
    }
    else removeTask();
};

closio.TaskListItemsView.prototype.goToTask = function (listItem) {

    var self = this;

    //todo: this seems like it should be handled in the fluid list plugin
    function goToTask(listItem) {
        closio.navigate(listItem.$element.data('task').url());
    }

    //if the list item isn't saved, save it before navigating to the task
    if (!listItem.extraData.id) {
        var deferred = listItem.save();

        $.when(deferred).done(function () {
            goToTask(listItem);
        });
    }
    else if (!listItem.isSection) {
        goToTask(listItem);
    }

};

closio.TaskListItemsView.prototype.initFluidList = function (indexOfClicked) {
    var self = this,
        decode = closio.utils.html_entity_decode;

    var tasksManager = new closio.TasksManager();

    self.$incompleteTasks.fluidList({
        itemTemplate:closio.templateManager.$get('deal-task-list-item').outerHtml(),
        editableSelector:'.task-details',
        currentItemIndex:indexOfClicked,
        orderChangeCallback:function (order, originalOrder) {
            tasksManager.order = order;
            tasksManager.originalOrder = originalOrder;
            tasksManager.dealId = self.deal.id;
            tasksManager.save();
        },
        getItemValueCallback:function (value) {
            return decode(value);
        },
        itemImportCallback:function (item, $item) {
            self.initListItem(item, $item.data('id'));
        },
        itemSaveCallback:function (item, oldOrder, newOrder) {
            var id = item.getData('id'),
                context = closio.context(),
                itemData,
                task,
                deferred,
                isDeal = context.object == 'deal' || context.object == 'template';

            itemData = {
                task:item.value,
                dealId:isDeal ? context.id : null,
                clientId:self.deal.clientId,
                isSection:item.isSection,
                oldOrder:oldOrder,
                newOrder:newOrder
            };

            if (typeof id === 'undefined') {
                task = self.createTask(item, itemData);
                deferred = task.initialSave;
            }
            else {
                task = self.collection.get(id);
                deferred = task.save(itemData);
            }

            self.updateDealProgress();

            return deferred;
        },
        itemDeleteCallback:function (listItem) {
            var task;

            if (task = self.collection.get(listItem.getData('id')))
                self.collection.remove(task, true);

            self.updateDealProgress();
        },
        doubleClickCallback:function (listItem) {
            self.goToTask(listItem);
        },
        openItemCallback:function (listItem) {
            self.goToTask(listItem);
        }
    });

    return self.$incompleteTasks.data('FluidList');
};

closio.TaskListItemsView.prototype.initListItem = function (item, id) {
    var self = this,
        task;

    if (id) {
        task = self.collection.modelsById[id];
        item.setData('id', id);
        item.$element.attr('id', id);
        item.$element.attr('data-id', id);

        //todo: i don't think this is used anymore
        item.$element.data('task', task);
    }

    return task;
};

closio.TaskListItemsView.prototype.createTask = function (listItem, data, callback) {
    var self = this,
        task = self.collection.add(data, true);

    $.when(task.initialSave).done(function (response) {
        if (task.id) {
            self.initListItem(listItem, task.id);
        }
    });

    return task;
};

closio.TaskListItemsView.prototype.showComplete = function () {
    this.$incompleteTasks.css('display', 'none');
    this.$completedTasks.css('display', 'block');
};

closio.TaskListItemsView.prototype.showIncomplete = function () {
    this.$incompleteTasks.css('display', 'block');
    this.$completedTasks.css('display', 'none');
};

closio.TaskListItemsView.prototype.showAll = function () {
    this.$incompleteTasks.css('display', 'block');
    this.$completedTasks.css('display', 'block');
};

closio.TaskListItemsView.prototype.unloadProcessing = function () {
    //todo: is there unloading logic for fluid list?
};

closio.TaskListItemsView.prototype.sortTasks = function (tasksCollection) {
    var tasks = {
        complete:[],
        incomplete:[]
    };

    $.each(tasksCollection.models, function (id, task) {
        task.classes = task.isSection === true ? 'list-header' : '';
        if (task.isComplete === true) {
            tasks.complete.push(task);
        }
        else tasks.incomplete.push(task);
    });

    return tasks;
};


closio.TaskListItemsSimpleView = function (data, dealId) {
    var tasks;

    this.dealId = dealId;

    this.domElements = {
        $completedTasks:'#completed-tasks-list',
        $incompleteTasks:'#incomplete-tasks-list'
    };

    this.paramsToDecode = ['complete:task', 'incomplete:task'];

    tasks = closio.TaskListItemsView.prototype.sortTasks(data);

    this.initialize(tasks);
};

closio.TaskListItemsSimpleView.prototype = new closio.DealListView('client-task');

closio.TaskListItemsSimpleView.prototype.bindEvents = function () {
    var self = this;

    this.$element.on('click', 'li:not(.list-header)', function () {

        closio.navigate('deals/' + self.dealId + '/task/' + $(this).data('id'));
    });
};

closio.TaskListItemsSimpleView.prototype.showComplete = closio.TaskListItemsView.prototype.showComplete;
closio.TaskListItemsSimpleView.prototype.showIncomplete = closio.TaskListItemsView.prototype.showIncomplete;
closio.TaskListItemsSimpleView.prototype.showAll = closio.TaskListItemsView.prototype.showAll;


closio.NewTaskView = function (taskModel, callback) {
    var self = this,
        data = taskModel instanceof closio.Model ? taskModel : {},
        submitAction = typeof callback != 'undefined' ? callback : null,
        context = closio.context(),
        isDeal = context.object == 'deal' || context.object == 'template',
        dealId = isDeal ? context.id : taskModel.dealId,
        isEdit = taskModel instanceof closio.Model;

    self.dealId = dealId;

    this.initForm({
        name:'deal-task',
        isModal:true,
        title:isEdit ? ut.lang('taskForm.editTask') : ut.lang('taskForm.newTask'),
        data:data,
        submitAction:submitAction
    });

    this.$element.find('[name=due_date_selection]').change(function (event, date) {
        var timestamp = ut.datepicker_to_timestamp($(this).val());
        self.$element.find('[name=due_date]').val(timestamp);
    });

    this.$element.find('[name=deal_id]').val(dealId);

    this.loadUsers = self.loadUsers(this);
};

closio.NewTaskView.prototype = new closio.FormView();

closio.NewTaskView.prototype.loadUsers = function (modalForm) {
    var self = this, request;

    function buildSelect() {
        $.each(self.users, function (i, user) {
            modalForm.$element.find('select').append('<option value="' + user.id + '">' + user.name + '</option>');

        });

        modalForm.$element.find('select').select2();
    }

    //if we don't already have the list of users, we need to get it before we populate the select.
    if (!self.users) {
        request = new closio.Request({
            url:'/deals/' + self.dealId + '/users/admins',
            success:function (response) {
                self.users = response.data;
                buildSelect();
            }
        });
    }
    else buildSelect();

    return request.isComplete;
};

closio.NewDealView = function (deal, isModal) {


    this.deal = deal;

    this.type = 'deal';



    this.initializeForm(isModal);

};

closio.NewDealView.prototype = new closio.FormView();



closio.NewDealView.prototype.initializeForm = function(isModal){
    var self = this, formData, isEdit, isModal, title, langKey;

    formData = this.deal ? this.deal.modelParams() : false;
    isEdit = this.deal instanceof closio.Model;

    isModal = typeof isModal != 'undefined' ? isModal : true;

    this.typeWord = ut.ucFirst(this.type);

    //get the title text
    langKey = isEdit ? 'dealForm.editDeal' : 'dealForm.newDeal';
    title = ut.lang(langKey, {type:this.typeWord});


    this.initForm({
        name:'deal',
        isModal:isModal,
        title:title,
        data:formData,
        model:self.deal,
        submitAction:function (deal) {
            var notification;

            //force the primary list to reset
            closio.panelOne.reset();

            //if this is a new deal, we can just navigate to the deal page. If this is an existin, we have
            //to force a reload for the page to refresh.
            if (!isEdit)
                closio.navigate(self.type + 's/' + deal.id);
            else closio.reload();

            //get the notification text
            langKey = isEdit ? 'dealForm.dealEdited' : 'dealForm.dealCreated';
            notification = ut.lang(langKey, {type:this.typeWord});

            closio.panelTwo.panel.notify(notification);
        }
    });

    this.$element.find('[name=due_date_selection], [name=start_date_selection]').change(function (event, date) {
        var $this = $(this),
            timestamp = ut.datepicker_to_timestamp($(this).val());

        self.$element.find('[name=' + $this.attr('name').slice(0, -10) + ']').val(timestamp);
    });

    this.loadingClients = self.loadClients(this);

    if (this.deal) {
        $.when(this.loadingClients).done(function () {
            self.populateCurrentValues();
        });
    }
    else {
        //this is a new deal, let's auto populate the start date with today's date
        var startDate = moment().unix();

        this.$element.find('[name=start_date]').val(startDate);
        this.$element.find('[name=start_date_selection]').data('dateinput').setValue(new Date(closio.Model.prototype.formatDate(startDate, 'MM/DD/YYYY')));
    }
};


closio.NewDealView.prototype.loadClients = function (modalForm) {
    var self = this, request;

    function buildSelect() {
        $.each(self.clients, function (i, client) {
            var $option = $('<option value="' + client.id + '"></option>').text(ut.decode(client.name));
           // client.name = ut.decode(client.name);

            modalForm.$element.find('select').append($option);
        });

        modalForm.$element.find('select').select2();
    }

    var $notification = $('<div class="notification">' + ut.lang('dealForm.loadingClients') + '</div>');
    self.$element.prepend($notification);

    //if we don't already have the list of users, we need to get it before we populate the select.
    if (!self.clients) {
        request = new closio.Request({
            url:'/clients',
            success:function (response) {
                $notification.fadeOut();
                self.clients = response.data;
                buildSelect();
            }
        });
    }
    else buildSelect();

    return request.isComplete;
};

closio.NewTemplateView = function(deal, isModal){
    this.deal = deal;

    this.type = 'template';

    this.initializeForm(isModal);

    this.$form.attr('data-model', 'template');
};

closio.NewTemplateView.prototype = closio.NewDealView.prototype;

//Proposal List View
closio.ProposalListView = function (data) {
    this.initialize(data);
};

closio.ProposalListView.prototype = new closio.DealListView('proposal');

closio.ProposalListView.prototype.bindEvents = function () {
    var self = this;

    self.$element.on('click', 'li', function () {
        closio.navigate('deals/' + closio.context().id + '/proposals/' + $(this).data('id'));
    });
};

closio.ProposalListView.prototype.postRenderProcessing = function () {
    if (closio.userIsAdmin())
        closio.panelTwo.panel.addToSecondaryMenu(this.newProposalButton());

    if (!this.collection.models.length)
        this.$element.html('<div class="no-activity">' + ut.lang('proposalList.noProposals') + '</div>');

};

closio.ProposalListView.prototype.newProposalButton = function () {
    var $button, proposal, context;

    context = closio.context();

    $button = closio.templateManager.$get('add-deal-list-item', {
        buttonText:ut.lang('proposalList.newProposalButton'),
        type:'new-entity'
    });

    $button.on('click', function () {
        proposal = closio.make('Proposal');


        closio.panelTwo.panel.notify(ut.lang('proposalList.creatingProposalNotification'));
        //todo: there needs to be some kind of notification that the app is thinking...perhaps immidately go to the editor route, which doesn't load until the proposal id?


        proposal.once('saved', function () {
            closio.panelTwo.panel.hideNotification();
            closio.navigate('deals/' + context.id + '/proposals/' + proposal.id + '/build');
        });

        proposal.load({deal_id:context.id});
        proposal.save();

        return false;
    });

    return $button;
};

//File Preview List
closio.FileListTilesView = function (filesCollection) {
    var self = this, queue, queuePosition = 0, queue = [];

    this.needsUnloading();

    self.$element = $('<ul class="files-preview-list"></ul>'); //TODO: This needs to be in a template file

    self.previews = [];

    self.stopLoading = false;

    self.isLoading = false;

    //add each item in the collection to loading queue
    $.each(filesCollection.models, function (i, file) {
        queue.push(file);
    });

    //todo:all of this needs to move to a document gallery plugin
    //todo:Document Gallery needs to have a signle jPlayer instance. The play button, progress bar will not be directly tied to the jPlayer insance, which will be hidden with size = 0
    function buildTiles() {
        for (var i = 0; i < queue.length; i++) {
            buildTile(queue[i]);
        }
    }

    function buildTile(model) {
        var preview = new closio.FilePreviewView(model);

        self.previews.push(preview);
        self.$element.append(preview.$element);
    }

    function loadFile(i) {
        return self.previews[i].load();
    }

    function loadNext() {
        if (self.stopLoading)
            return false;

        if (queue[queuePosition]) {
            var promise, isLoaded = loadFile(queuePosition);

            self.isLoading = true;

            promise = $.when(isLoaded);
            promise.queuePosition = queuePosition;

            queuePosition++;

            promise.done(function () {
                loadNext();// loadNext();
            });

            promise.fail(function (type) {
                //todo:add this to the preview view
                self.previews[promise.queuePosition].error(type);
                loadNext();
            });
        }
        else {
            self.isLoading = false;
            //end of queue, resize the panel to make sure the scrollbar includes all the content
            closio.evtMgr.publish('secondaryContentUpdated');
        }
    }

    buildTiles();

    //todo:loading becomes significantly less reliable when we attempt to increase the number of simultaneous loads. If the first item is a pdf, it will not render 90% of the time. Set i = 3 to test
    for (var i = 0; i < 1; i++) {
        loadNext();
    }


    this.bindEvents();

    closio.evtMgr.subscribe('addFilePreview', function (e, file) {

        //todo:is this event getting fired more than once, switch to tasks then back is it bound twice?
        var fileModel = filesCollection.add(file);

        //todo:shouldn't this happen automatically somewhere? It seems to only happen when load is called. What about doing it in the add function? or when the model is initialized?
        fileModel.prepViewProperties();

        queue.push(fileModel);

        buildTile(queue[queue.length - 1]);

        self.arrangePreviews();

        $.when(fileModel.getFileUrl()).done(function () {
            //todo:getting called too many times...se above todo
            if (!self.isLoading)
                loadNext();
        });

    });
};

closio.FileListTilesView.prototype = new closio.View();

closio.FileListTilesView.prototype.arrangePreviews = function () {
    var self = this;

    self.colCount = 0;
    self.colWidth = 0;
    self.spaceLeft = 0;
    self.margin = 20;
    self.$filePreviews = self.$element.find('.file-list-preview');

    $(window).on('resize.filelistview', function () {
        self.setupBlocks();
    });

    // Function to get the Min value in Array
    Array.min = function (array) {
        return Math.min.apply(Math, array);
    };

    self.setupBlocks();
};

closio.FileListTilesView.prototype.setupBlocks = function () {
    var self = this, windowWidth;

    windowWidth = self.$element.width();
    self.colWidth = self.$filePreviews.first().outerWidth();
    self.blocks = [];

    self.colCount = Math.floor(windowWidth / (self.colWidth + self.margin * 2));
    self.spaceLeft = (windowWidth - ((self.colWidth * self.colCount) + self.margin * 2)) / 2;
    self.spaceLeft -= self.margin;

    for (var i = 0; i < self.colCount; i++) {
        self.blocks.push(self.margin);
    }

    self.positionBlocks();
};

closio.FileListTilesView.prototype.positionBlocks = function () {
    var self = this;

    self.$filePreviews.each(function () {
        var min = Array.min(self.blocks),
            index = $.inArray(min, self.blocks),
            leftPos = self.margin + (index * (self.colWidth + self.margin)),
            $this = $(this);

        $this.css({
            'left':(leftPos + self.spaceLeft) + 'px',
            'top':min + 'px'
        });

        self.blocks[index] = min + $this.outerHeight() + self.margin;
    });
};

closio.FileListTilesView.prototype.postRenderProcessing = function () {
    this.arrangePreviews();
};

closio.FileListTilesView.prototype.bindEvents = function () {
    var self = this;

    closio.evtMgr.subscribe('arrangePreviews', function () {
        self.arrangePreviews();
    });

    closio.evtMgr.subscribe('messages-panel-showing.fileTileView messages-panel-hidden.fileTileView', self.arrangePreviews.bind(self));

};

closio.FileListTilesView.prototype.unloadProcessing = function () {
    var self = this;
    self.stopLoading = true;

    $.each(self.previews, function (i, preview) {
        var $preview = $(preview), $jPlayer, jPlayer;

        if ($preview.data('type') == 'audio') {
            $jPlayer = $preview.find('.jPlayer-container');

            //todo:it seems like instances that are in the middle of being initialized arent destroyed. Turn on jPlayer debuging to test
            if ($jPlayer && $jPlayer.jPlayer)
                $jPlayer.jPlayer('destroy');
        }
    });

    closio.evtMgr.unsubscribe('messages-panel-showing.fileTileView messages-panel-hidden.fileTileView');
};


closio.FileListLineItemsView = function (filesCollection) {
    var dv = new DocumentViewer(false, {init:false});

    $.each(filesCollection.models, function (i, fileModel) {
        //todo:the type should really be determined on the server, with this as a backup
        //if(!fileModel.type)
        fileModel.type = dv.getDocumentType(fileModel.name);
    });

    this.initialize(filesCollection);
};

closio.FileListLineItemsView.prototype = new closio.DealListView('file');

closio.FileListLineItemsView.prototype.bindEvents = function () {
    this.$element.on('click', 'li', function (e) {
        closio.navigate('deals/' + closio.context().id + '/files/' + $(this).data('id'));
    });
};


closio.FileListView = function (filesCollection) {

    this.filesCollection = filesCollection;
    //we need to create a wrapper element that will be added to the DOM. The real view (created above), will be added
    //to this wrapper
    this.$element = $('<div class="file-list-view-wrapper"></div>');
};

closio.FileListView.prototype = new closio.View();

closio.FileListView.prototype.postRenderProcessing = function () {
    var self = this,
    //used to map the button ids to their corresponding views
        idMap = {
            'line-items-view':'LineItems',
            'tiles-view':'Tiles'
        },
    //used to map the view names to the button ids
        viewNameMap = {
            'LineItems':'line-items-view',
            'Tiles':'tiles-view'
        };


    //set the default file view
    this.generateView(closio.config.default_file_view);

    if(closio.userIsAdmin() || closio.config.allow_client_uploads == true){
        //create the button to add new files
        var button = new closio.AddFileButton();
        closio.panelTwo.panel.addToSecondaryMenu(button.$get());
    }


    //create the buttons to switch between tile and list view
    var fileViewType = new closio.ButtonSetView({
        id:'file-view-type',
        buttons:[
            {buttonId:'line-items-view', buttonText:''},
            {buttonId:'tiles-view', buttonText:''}
        ]
    });

    fileViewType.setAction(function (button) {
        var buttonId = $(button).attr('id'),
            viewType = idMap[buttonId];

        self.generateView(viewType);
    });

    //set the default view as the selected view in the buttonSet we just created
    fileViewType.setSelected(viewNameMap[closio.config.default_file_view]);

    //render the button set
    closio.panelTwo.panel.addToSecondaryMenu(fileViewType.$element);

    if (!this.filesCollection.models.length)
        this.$element.append('<div class="no-activity">' + ut.lang('fileList.noFiles') + '</div>');
};

closio.FileListView.prototype.generateView = function (type) {
    var self = this,
        viewType;

    //this view is just a wrapper for the different file type views
    //let's create the specific type of file view that needs to be loaded
    viewType = type || 'Tiles';

    this.view = new closio['FileList' + viewType + 'View'](self.filesCollection);

    //once' the wrapper has been added to the DOM, we insert the view into this wrapper
    this.view.addTo({
        $anchor:self.$element
    });
};

//File preview
closio.FilePreviewView = function (data) {
    var self = this, size, type,
        dv = new DocumentViewer(false, {init:false});

    this.template = 'file-list-preview';

    this.downloadUrl = 'files/download/' + data.id;

    this.url = false;

    this.file = data;

    this.filename = data.name;

    this.fileId = data.id;

    this.initialize(data);

    this.$inner = this.$element.find('.file-dv');

    //we want to add the type ass a class to the preview so let's get it now
    type = dv.getDocumentType(this.filename);

    size = dv.getSize({
        type:type,
        width:258
    });

    this.$inner.css(size).addClass(type);

    this.$inner.data('id', this.fileId);



    //todo:this is downloading the entire file to generate previews.
};

closio.FilePreviewView.prototype = new closio.View();

closio.FilePreviewView.prototype.load = function () {
    var self = this,
        size = {},
        dv, type,
        loading = new $.Deferred();

    function generatePreview() {
        //todo:perhaps the next one shouldn't load until the previous one has finished?
        //todo: IMPORTANT. I don't think i need get contents any more since we know exactly where each file will be
        //we need to pass in the type and extension because we're using a dynamic url that does not include the actual filename
        var loadedDeferred = dv.load(self.file.url, {
            type:type,
            extension:dv.getExtension(self.filename),
            useTextLoaderHelper:false,
            height:size.height,
            width:size.width,
            debug:closio.config.enable_debugging
        });

        if (type == 'image') {
            //if this is an image, we need to reposition the previews once the image is loaded since there is no way to
            //know the height before hand
            //TODO: Can php send the height?
            $.when(loadedDeferred).done(function () {
                self.$element.find('.preview-placeholder').height(self.$element.find('.file-dv').height());

                closio.evtMgr.publish('arrangePreviews');
            });
        }

        $.when(loadedDeferred).done(function(){
            self.$element.find('.loading-message').remove();
        });

        return loadedDeferred;
    }

    dv = self.$element.find('.file-dv').documentViewer({
        path:'client/plugins/document-viewer/',
        autoplay:false,
        scrollbar:false,
        showErrors:false,
        debug:closio.config.enable_debugging
    });

    //todo:create a wrapper function that returns general types not supported by the document viewer, so that we can set classes for the background images (images seen in tile view and while previews are loading)
    type = dv.getDocumentType(self.filename);

    if(!type){
        loading.reject(ut.lang('fileView.invalidType'));
        return loading;
    }

    self.$element.attr('data-type', type);

    size.width = 258; //TODO: I really don't like explicitly setting sizes here.

    $.when(self.file.getFileUrl()).done(function () {
        //todo:Too many deferreds...How does this relate to the promise in loadNext function?
        var previewPromise = $.when(generatePreview());

        previewPromise.done(function () {
            loading.resolve();
        });

        previewPromise.fail(function () {
            loading.reject();
        });
    });

    return loading;
};

closio.FilePreviewView.prototype.error = function (errorType) {
    //todo: displaying errors should really be part of the document viewer plugin and error messages are set with config options
    var $error;

    if(!errorType)
        $error = closio.templateManager.$get('document-viewer-error');
    else $error = closio.templateManager.$get('document-viewer-unsupported-type');


    this.$element.find('.file-dv').html($error);
};

closio.FilePreviewView.prototype.bindEvents = function () {
    this.$element.on('click', function (e) {
        if ($(e.target).closest('.file-meta-wrapper').length == 0)
            closio.navigate('deals/' + closio.context().id + '/files/' + $(this).find('.file-dv').data('id'));
    });
};

closio.FileView = function (data) {
    var self = this, dv;

    this.template = 'file';

    this.domElements = {
        $downloadButton:'.download-button',
        $editButton:'.edit-button',
        $deleteButton:'.delete-button',
        $notes:'.notes-content'
    };

    this.initialize(data);

    this.$inner = this.$element.find('.file-dv');

    this.file = data;

    self.needsUnloading();
};

closio.FileView.prototype = new closio.View();

closio.FileView.prototype.postRenderProcessing = function () {

    var self = this, dv, loadedDeferred, type, $anchor, width;

    $anchor = this.$inner;

    width = $anchor.width();

    var options = {
        path:'client/plugins/document-viewer/',
        autoplay:false,
        scrollbar:false,
        showErrors:false,
        setAudioHeight:false,
        width:width,
        debug:closio.config.enable_debugging
    };


    dv = $anchor.documentViewer(options);

    self.documentViewer = dv;

    //todo:create a wrapper function that returns general types not supported by the document viewer, so that we can set classes for the background images (images seen in tile view and while previews are loading)
    type = dv.getDocumentType(this.file.name);

    $.when(self.file.getFileUrl()).done(function () {

        self.activateDownloadButton();

        loadedDeferred = dv.load(self.file.url, {
            type:type,
            extension:dv.getExtension(self.file.name),
            useTextLoaderHelper:false,
            width:width
        });

        loadedDeferred.fail(function () {
            //todo:i should be able to just pass an error template to the document viewer
            var $error = closio.templateManager.$get('document-viewer-error');
            self.$element.find('.document-viewer').html($error);
        })
    });
};

closio.FileView.prototype.bindEvents = function () {
    var self = this;


    //todo:this needs to be throttled. The page will crash if the page is being resized with a drag
    $(window).on('resize.' + self.id, function () {
        self.resize();
    });

    self.$downloadButton.on('click', function () {
        return false;
    });

    self.$editButton.on('click', function (e) {

        var notesForm = new closio.FormView({
            name:'edit-file-notes',
            title:ut.lang('fileView.editNotes'),
            model:self.file,
            data:self.file.modelParams(),
            isModal:true
        });

        self.file.once('saved', function () {
            self.$notes.text(self.file.notes);
        });

        e.preventDefault();
    });

    self.$deleteButton.on('click', function (e) {
        closio.confirm({
            actionName:ut.lang('fileView.deleteFile'),
            message:ut.lang('fileView.deleteFileConfirmation'),
            callback:function () {
                var dealId = self.file.dealId,
                    isDeleted = self.file.delete();
                //todo:this isn't going towork, dile.elete does not return a deferred, use file.once
                $.when(isDeleted).done(function () {
                    closio.navigate('deals/' + dealId + '/files');
                });

                return isDeleted;
            }
        });

        e.preventDefault();
    });

    closio.evtMgr.subscribe('messages-panel-showing.fileView messages-panel-hidden.fileView', this.resize.bind(this));
};

closio.FileView.prototype.resize = function(){
    this.$element.find('.file-dv').empty();
    this.postRenderProcessing();
};

closio.FileView.prototype.activateDownloadButton = function () {
    var self = this;

    self.$downloadButton.off();
    self.$downloadButton.on('click', function (e) {
        self.download();
        e.preventDefault();
    });
};

closio.FileView.prototype.download = function () {
    var iframe,
        self = this;

    //http://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery
    var hiddenIFrameID = 'hiddenDownloader';
    iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = closio.options.server + closio.options.urlPrefix + self.file.downloadUrl + '/do';
};

closio.FileView.prototype.unloadProcessing = function () {
    //unbind the window resize event
    $(window).off('.' + this.id);

    closio.evtMgr.unsubscribe('messages-panel-showing.fileView messages-panel-hidden.fileView');
};

closio.AddFileButton = function (opts) {
    var self = this;

    this.options = opts || {};

    //we can either pass in an existing jquery element for the button or we can create it
    if (!this.options.$element) {
        //the button doesn't exist yet so let's create it
        this.template = this.options.template || 'add-file-button';

        //build the view, passing in the data
        this.initialize({
            buttonText:self.options.buttonText || ut.lang('addFileButton.defaultButtonText'),
            type:'new-entity'
        });
    }
    else {
        //the button does exist, let's use the existing jquery object
        this.$element = this.options.$element;
    }

    this.modalForm = false;

    //holds a list of the successful file uploads
    this.uploadedFiles = [];

    this.initFileUploadScript();
};

closio.AddFileButton.prototype = new closio.View();

closio.AddFileButton.prototype.initFileUploadScript = function () {
    var self = this,
        numFiles = 0,
        numComplete = 0,
        url = this.options.url || 'server/' + closio.options.urlPrefix + 'files/upload',
        uploadNotification;

    //todo:this should have a max height with a scrollbar just in case the user tries to upload a ton of files? Or should I just limit the number of simulaneous uploads? Yea, a limit, that's better...
    function createFileProgressBar(filename, id) {
        var $progress = closio.templateManager.$get('file-progress', {
            fileName:filename,
            id:id
        });

        self.modalForm.$element.prepend($progress);

        return $progress;
    }

    this.jqXHR = {};

    this.numFiles = 0;

    this.numComplete = 0;

    function setProgressBar(data, progress){
        data.context.find('.progress').find('span').css(
            'width',
            progress + '%'
        ).find('span').html(progress + '%');
    }
    this.$element.find('#fileupload').fileupload({
        dataType:'json',
        url:url,
        formData:closio.context(),
        start:function () {
            self.modalForm.$element.addClass('uploading').find('input').remove();
        },
        add:function (e, data) {
            var id = closio.utils.uniqueId();

            if (self.modalForm == false)
                self.modalForm = self.initModal();

            //create the progress bar, save reference to it
            data.context = createFileProgressBar(data.files[0].name, id);
            data.context.data('id', id);
            self.jqXHR[id] = data.submit();



            self.jqXHR[id].done(function (response) {
                if (response)
                    closio.evtMgr.publish('addFilePreview', response.data);
            });

            self.numFiles++;
        },
        done:function (e, data) {
            //no need to send an upload notification for a profile pic
            if (!self.options.isProfilePhoto) {
                var fileDetails = {
                    id:data.result.data.id,
                    name:data.result.data.name,
                    deal_id:data.result.data.deal_id
                };

                self.uploadedFiles.push(fileDetails);
            }

                setProgressBar(data, 100);
                data.context.addClass('complete');
                self.uploadComplete(data);

        },
        progress:function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);

            setProgressBar(data, progress);
        },
        progressall:function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            self.modalForm.modal.setTitle('Uploading (' + progress + '%)');
        }
    });
};

closio.AddFileButton.prototype.uploadComplete = function () {
    var self = this,
        uploadNotification;

    self.numComplete++;

    function reset() {
        //we need to reload the page otherwise the add file button will not function properly anymore
        //closio.reload();
    }

    function countProperties(obj) {
        var count = 0;

        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                ++count;
        }

        return count;
    }

    if (self.numComplete === self.numFiles) {
        self.modalForm.$element.find('#cancel-all').remove();

        setTimeout(function () {
            self.modalForm.close();

            if (self.options.callback)
                self.options.callback();

            //no need to send an upload notification for a profile pic
            if (!self.options.isProfilePhoto) {
                if(self.uploadedFiles.length){
                    closio.panelTwo.panel.notify(ut.lang('addFileButton.filesUploadedMessage', {numFiles:self.numFiles}));

                    uploadNotification = new closio.FileUploadNotification();
                    uploadNotification.load({files:self.uploadedFiles});
                    uploadNotification.save();
                }
            }

            setTimeout(function(){
                reset();
            }, 500);
        }, 1000);
        //todo:there should be a x files uploaded success message (bar notification type?)
    }
};

closio.AddFileButton.prototype.initModal = function () {
    var self = this;

    function cancel($progressWrapper) {
        var id = $progressWrapper.data('id');

        if (!$progressWrapper.hasClass('complete')) {
            self.jqXHR[id].abort();
            delete self.jqXHR[id];
            $progressWrapper.addClass('cancelled');
            $progressWrapper.find('.status').text(ut.lang('addFileButton.cancelled'));
        }

        self.uploadComplete();
        //todo:notifcation,
    }

    self.modalForm = new closio.FormView({
        name:'deal-file',
        isModal:true,
        title:ut.lang('addFileButton.modalTitle'),
        data:{}
    });

    self.modalForm.$element.find('[name=deal_id]').val(closio.context().id);

    self.modalForm.$element.on('click', '.cancel', function (e) {
        var $progress = $(this).closest('.progress-bar-wrapper');
        cancel($progress);

        e.preventDefault();
    });

    self.modalForm.$element.find('#cancel-all').click(function (e) {

        //todo:there should be an inline confirmation messages. Are you sure?
        $.each(self.modalForm.$element.find('.progress-bar-wrapper'), function (i, progress) {
            cancel($(progress));
        });

        e.preventDefault();
    });

    //we need to get rid of the default submit handler, it's useless here
    self.modalForm.$element.unbind('submit');

    self.modalForm.$element.submit(function (e) {
        return false;
    });

    return self.modalForm;
};

//Task Details View
closio.TaskView = function (data) {
    var self = this, timer, timerInterval, $time;

    this.template = 'task-details';

    this.domElements = {
        $tabs:'.tabs',
        $tabsContent:'.tabs-content',
        $attachmentTab:'#task-attachment-tab',
        $attachmentCount:'.attachment-count',
        $attachmentList:'.attachment-list',
        $edit:'#task-edit',
        $delete:'#task-delete',
        $addFile:'#task-add-file',
        $isTaskCompleted:'.is-task-completed',
        $changeTaskWeight:'#change-task-weight',
        $startTimer:'#start-timer',
        $stopTimer:'#stop-timer',
        $inactiveTimer:'#inactive-timer',
        $elapsedTime:'#elapsed-time',
        $timeEntries:'#task-time-entries',
        $enterTime:'#enter-time'
    };

    this.paramsToDecode = ['task', 'notes'];



    this.initialize(data);

    this.$element.on('click', 'dd a', function (e) {
        var $this = $(this),
            tab = $this.attr('href');

        $this.parent().addClass('active').siblings().removeClass('active');
        self.$tabsContent.find(tab).addClass('active').siblings().removeClass('active');
        //todo:this needs to update scrollbar because height of content will change
        e.preventDefault();
    });



//todo: this generates way too many ajax requests. At least four
};

closio.TaskView.prototype = new closio.View();

closio.TaskView.prototype.addTimeEntryToList = function (timeEntry) {
    var $newEntry;

    //add the new entry to the list
    timeEntry.prepViewProperties();
    $newEntry = closio.templateManager.$get('task-time-entry', timeEntry.modelParams());
    this.$timeEntries.removeClass('hidden').find('.header').after($newEntry);

    this.model.timeEntriesCollection.add(timeEntry);
};

closio.TaskView.prototype.bindEvents = function () {
    var self = this,
        $time;



    function startTimer(){
        closio.runningTimerView = new closio.RunningTimerView(self.model);

        closio.runningTimer = new closio.Timer(self.model, function () {
            self.updateElapsedTime();
        });

        closio.runningTimer.start();

       self.startTimerManageViewState();
    }

   // $time = self.$element.find('#elapsed-time');

    this.$startTimer.on('click', function () {
        if(closio.runningTimer)
            closio.alert(ut.lang('taskDetails.timerAlreadyRunning'));
        else startTimer();
    });

    this.$stopTimer.on('click', function () {
        closio.runningTimer.stop();

        self.addTimeEntryToList(closio.runningTimer.timeEntry);

        closio.runningTimerView.unload();

        self.stopTimerManageViewState();

        closio.runningTimerView = null;
        closio.runningTimer = null;
    });

    this.$enterTime.on('click', function () {
        new closio.TaskTimeEntryView(self.model.id, self);
    });

    this.$element.on('click', '.time-entry-delete', function () {
        var $timeEntry = $(this).closest('li');

        //todo: this won't work if the initial time entry save hasn't completed
        closio.confirm({
            actionName: ut.lang('taskDetails.deleteTimeEntryButton'),
            message: ut.lang('taskDetails.deleteTimeEntryConfirmationMessage'),
            callback:function () {
                var id = $timeEntry.data('id'),
                    deletingTimeEntry = self.model.timeEntriesCollection.modelsById[id].destroy();

                $.when(deletingTimeEntry.isComplete).done(function () {
                    $timeEntry.fadeOut(function () {
                        $timeEntry.remove();
                    });
                });

                return deletingTimeEntry.isComplete;
            }
        });
    });

    this.$edit.on('click', function () {
        var formView = new closio.NewTaskView(self.model);

        $.when(formView.loadUsers).done(function () {
            formView.populateCurrentValues();
        });

        self.model.once('saved', function () {
            closio.reload();
        });
    });

    this.$delete.on('click', function () {
        closio.confirm({
            actionName:ut.lang('taskDetails.deleteTaskButton'),
            message:ut.lang('taskDetails.deleteTaskConfirmationMessage'),
            callback:function () {
                var url, deletingTask = self.model.destroy();

                $.when(deletingTask.isComplete).done(function () {
                    if (self.model.dealId)
                        url = 'deals/' + self.model.dealId + '/tasks';
                    else url = 'tasks/x';

                    closio.navigate(url);
                });

                return deletingTask.isComplete;
            }
        });
    });

    this.$isTaskCompleted.on('click', function () {

        self.model.toggleComplete();

        if (self.model.isComplete) {
            self.$element.addClass('complete');
        }
        else {
            self.$element.removeClass('complete');
        }
    });

    this.$changeTaskWeight.on('click', function () {
        new closio.TaskWeightView(self.model);
    });


    closio.evtMgr.subscribe('runningTaskTimerStopped.' + this.id, function(){
        self.stopTimerManageViewState();
        //we only want this to happen once.
        closio.evtMgr.unsubscribe('runningTaskTimerStopped.' + self.id);
    });
};

closio.TaskView.prototype.updateElapsedTime = function(){
    var timeText = closio.runningTimer.generateTimeText();

    this.$elapsedTime.html(timeText);
    closio.runningTimerView.setTime(timeText);
};

closio.TaskView.prototype.startTimerManageViewState = function(){
    this.$startTimer.hide();
    this.$stopTimer.show();
    this.$inactiveTimer.hide();
    this.$elapsedTime.show();
};

closio.TaskView.prototype.stopTimerManageViewState = function(){
    this.$startTimer.show();
    this.$stopTimer.hide();
    this.$inactiveTimer.show();
    this.$elapsedTime.hide();
};

closio.TaskView.prototype.postInitProcessing = function () {
    var button = new closio.AddFileButton({
        template:'task-add-file-button',
        buttonText:ut.lang('taskDetails.addFile'),
        callback:function () {
            //reload the page so that the file appears in the attachments list
            closio.reload();
        }
    });
    this.$addFile.replaceWith(button.$element);
    this.$addFile = button.$element;
};

closio.TaskView.prototype.postRenderProcessing = function () {
    this.getTaskFiles();
    this.getTimeEntries();

    if(this.isThisTaskTimerRunning())
        this.bindRunningTimer();
};

closio.TaskView.prototype.isThisTaskTimerRunning = function(){
    return closio.runningTimer && closio.runningTimerView && (closio.runningTimerView.model.id == this.model.id);
};

closio.TaskView.prototype.bindRunningTimer = function(){
    var self = this;

    closio.runningTimer.setCallback(function(){
        self.updateElapsedTime();
    });

    this.startTimerManageViewState();

};

closio.TaskView.prototype.getTaskFiles = function () {
    var self = this,
        $list;

    $.when(self.model.getFiles()).done(function (request) {
        self.$attachmentCount.text(self.model.files.length);

        $list = closio.templateManager.$get('task-attachment', {files:self.model.files});

        self.$attachmentList.replaceWith($list);
        self.$attachmentList = $list;
    });
};

closio.TaskView.prototype.getTimeEntries = function () {
    var self = this,
        $list;

    //todo: this could probably be combined into one request (combine with getFiles)
    $.when(self.model.getTimeEntries()).done(function (request) {
        $list = closio.templateManager.$get('task-time-entries', {timeEntries:self.model.timeEntries});
        self.$timeEntries.html($list);

        if (self.model.timeEntries.length)
            self.$timeEntries.removeClass('hidden');
    });
};

closio.TaskView.prototype.unloadProcessing = function(){
    closio.evtMgr.unsubscribe('runningTaskTimerStopped.' + this.id);
};

closio.TaskWeightView = function (taskModel) {
    var self = this;

    this.domElements = {
        $weight:'.task-maximum-weight'
    };

    this.initForm({
        name:'task-weight',
        title:ut.lang('taskWeightForm.taskWeight'),
        model:taskModel,
        data:taskModel.modelParams(),
        isModal:true,
        submitAction:function () {
            closio.reload();
        }
    });

    $.when(taskModel.getMaximumWeight()).done(function () {
        self.$weight.html(taskModel.maximumWeight);
        self.$element.find('.notification').fadeOut();
    });
};

closio.TaskWeightView.prototype = new closio.FormView();

closio.TaskWeightView.prototype.processFormValues = function (values) {
    if (!values['weight'])
        values['weight'] = 0;

    return values;
};

closio.TaskTimeEntryView = function (taskId, taskView) {
    var timeEntry = new closio.TimeEntry();
    timeEntry.taskId = taskId;

    this.initForm({
        name:'time-entry',
        title:ut.lang('timeEntryForm.title'),
        isModal:true,
        model:timeEntry,
        submitAction:function () {
            timeEntry.timeComponentsToSecs();
            taskView.addTimeEntryToList(timeEntry);
        }
    });
};

closio.TaskTimeEntryView.prototype = new closio.FormView();

//Proposal
closio.ProposalView = function (proposal) {
    this.template = 'proposal-details';

    this.domElements = {
        $proposal:'.proposal-wrapper',
        $details:'proposal-meta-wrapper',
        $payButton:'.pay-button',
        $editButton:'.edit-button',
        $sendButton:'.send-button',
        $deleteButton:'.delete-button',
        $previewButton:'.preview-button',
        $downloadButton:'.download-button'
    };

    this.proposalView = false;

    this.paramsToDecode = ['client.name', 'client.address1', 'client.address2', 'proposalItems:item'];

    this.initialize(proposal);

};

closio.ProposalView.prototype = new closio.View();

closio.ProposalView.prototype.postRenderProcessing = function () {
    this.addProposalItems();
};

closio.ProposalView.prototype.addProposalItems = function () {
    var self = this;

    $.each(self.modelParams.proposalItems, function (id, item) {
        var proposalItemView = new closio.ProposalLineItemView(item);
        self.$element.find('.line-items').append(proposalItemView.$get());
    });
};

closio.ProposalView.prototype.postInitProcessing = function () {
    var $proposal = closio.View.prototype.build('proposal', this.modelParams);

    this.$proposal.append($proposal);

    if (this.model.balance <= 0) {
        this.$payButton.remove();

        if (this.model.total > 0) {
            this.$editButton.remove();
            this.$sendButton.remove();
            this.$deleteButton.remove();
        }
    }

    this.setLogo();
};

closio.ProposalView.prototype.bindEvents = function () {
    var self = this;

    this.$editButton.on('click', function (e) {
        closio.navigate('deals/' + self.model.dealId + '/proposals/' + self.model.id + '/build');
        e.preventDefault();
    });

    this.$sendButton.on('click', function () {
        $.when(self.model.send()).done(function () {
            closio.panelTwo.panel.notify(ut.lang('proposalView.proposalSent'));
        });
    });

    this.$payButton.on('click', function () {
        new closio.ProposalPaymentView(self.model);
    });

    this.$previewButton.on('click', function () {

        closio.navigate('deals/' + self.model.dealId + '/proposals/' + self.model.id + '/preview');
    });

    this.$downloadButton.on('click', function (e) {
        new closio.Request({
            url:'proposal/pdf',
            data:self.model.modelParams(),
            success:function (response) {
                //http://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery
                var hiddenIFrameID = 'hiddenDownloader';
                iframe = document.getElementById(hiddenIFrameID);
                if (iframe === null) {
                    iframe = document.createElement('iframe');
                    iframe.id = hiddenIFrameID;
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                }
                iframe.src = closio.options.server + 'proposals/download/' + response.data;
            }
        });
    });

    this.$deleteButton.on('click', function () {
        closio.confirm({
            actionName:ut.lang('proposalView.deleteProposalButton'),
            message:ut.lang('proposalView.deleteProposalConfirmationMessage'),
            callback:function () {
                var deletingProposal = self.model.destroy();

                $.when(deletingProposal.isComplete).done(function () {
                    closio.navigate('deals/' + self.model.dealId + '/proposals');
                });

                return deletingProposal.isComplete;
            }
        });
    });

};

closio.ProposalView.prototype.userBasedProcessing = function () {
    var isAdmin = closio.my.role == 'admin';

    if (isAdmin)
        this.$payButton.text(ut.lang('proposalView.enterPayment')).removeClass('blue');
};

closio.ProposalView.prototype.setLogo = function (model) {
    //need to manually set the logo because setting {{company.logo}} as the img src in the mustache template causes
    //the browser to try to load a nonexistant file named company.logo when the templates are initially imported
    model = model || this.model;
    this.$element.find('.proposal-logo').append('<img src="' + model.company.logo + '" alt="' + model.company.name + '"/>');
};


closio.ProposalPreviewView = function (proposal) {
    this.template = 'proposal-preview';

    this.paramsToDecode = ['client.name', 'client.address1', 'client.address2', 'proposalItems:item'];

    this.initialize(proposal);
};

closio.ProposalPreviewView.prototype = new closio.View();

closio.ProposalPreviewView.prototype.postInitProcessing = function () {
    closio.ProposalView.prototype.addProposalItems.apply(this);
    closio.ProposalView.prototype.setLogo.apply(this);
};

closio.ProposalPreviewView.prototype.bindEvents = function () {
    var self = this;
    this.$element.on('click', '.close-preview', function () {
        closio.navigate('deals/' + self.model.dealId + '/proposals/' + self.model.id);
    });
};

closio.ProposalEditorView = function (proposal) {
    var self = this;

    this.template = 'proposal-editor';

    this.domElements = {
        $subtotal:'#proposal-subtotal',
        $tax:'#proposal-tax',
        $total:'#proposal-total'
    };

    this.activeProposalItem = false;

    this.paramsToDecode= ['client.name', 'client.address1', 'client.address2', 'proposalItems:item'];

    this.initialize(proposal);

    $.each(self.modelParams.proposalItems, function (id, item) {
        //The item variable currently holds a copy of the proposalItem, because the modelParams function creates a copy
        //of data. We need to get the actual proposalItem model.
        var proposalItem = self.model.proposalItems[item.id],
            proposalItemView = new closio.ProposalLineItemView(proposalItem);
        self.$element.find('.line-items').append(proposalItemView.$get());
    });

    this.proposal = this.model;
};

closio.ProposalEditorView.prototype = new closio.View();

closio.ProposalEditorView.prototype.bindEvents = function () {
    var self = this;

    function setValue($input) {
        var lineItemElement = $input.attr('name');

        //set the value on the model
        self.activeProposalItem.item.set(lineItemElement, $input.val());

        //todo:i definitely should not be doing this on every keystroke?
        //todo:this needs to go in a language file
        closio.history.addConfirmation(ut.lang('proposalView.confirmNavigation'));
    }

    self.$element.find('#add-proposal-item').click(function () {
        self.validateCurrentAddNew();
    });

    self.$element.find('#proposal-date-input').on('change', function () {
        self.proposal.setDate($(this).val());

        //once we have updated the date on the model, we need to set the hidden field to the updated date text
        //(since the date supplied by jQuery tools dateinput is in the wrong format
        $(this).val(self.proposal.dateText);
    });

    self.$element.find('#proposal-due-date-input').on('change', function () {
        var $this = $(this);

        self.proposal.setDueDate($this.val());
        $this.val(self.proposal.dueDateText);

        //this placeholder helps make sure the due date 'input' is the right size
        $this.parent().find('span').text(self.proposal.dueDateText);
    });

    //LINE ITEM EVENTS.
    //Technically these belong on the line item view, but since there is such heavy interaction with the proposal view,
    //it is much easier to have them here

    //capture tab events, create a new item if:
    // 1) the current item is valid
    // 2) tab is clicked in the last field
    //Finish editing if esc is clicked
    self.$element.on('keydown', '.line-item-input', function (e) {
        var $this = $(this);

        if (e.which === 9 && $this.parent().is('.proposal-rate')) {
            var $lineItem = $this.parents('.line-item').first(),
                lineItem = $lineItem.data('item');

            //we need to set the value of the last input before we check whether the line item is valid
            setValue($this);

            self.validateCurrentAddNew(true);

            e.preventDefault();
        }

        //finish editing if esc button is clicked
        if (e.which === 27) {
            if (self.validateCurrentItem())
                self.finishEditingItem();
        }
    });

    self.$element.on('focus', '.line-item-input', function () {
        self.setActiveItem($(this));
    });

    self.$element.on('keyup', '.line-item-input', function () {
        var $this = $(this);

        setValue($this);

        if ($this.is('[name=rate]') || $this.is('[name=quantity]')) {
            self.setItemSubtotal();
            self.setTotal();
        }

    });

    self.$element.on('blur', '.editing', function () {
        //todo: the blur event is getting fired each time I tab, and the new input isn't focused yet so the view ends up running this validation too soon. There has to be a better way to handle this than the timeout. perhaps bind to a different event than blur.
        setTimeout(function () {
            if (!self.$element.find('input:focus').length) {
                if (self.validateCurrentItem())
                    self.finishEditingItem();
            }
        }, 100);
    });

    self.$element.on('click', '.edit-item', function () {
        var $origMarkup = $(this).parents('.line-item').first(), //todo: i really need to get back to css selectors
            lineItem = new closio.ProposalLineItemView(),
            $lineItem = lineItem.$element,
            item = $origMarkup.data('item');

        if (self.validateCurrentItem()) {
            //if the current item is valid, save it and add a new one
            self.finishEditingItem();
        }
        else return false;

        //populate the 'form' with the existing values for the line item
        $lineItem.find('input').each(function (i, input) {
            var $input = $(input);
            //set the form values to the values in the model
            $input.val(item[$(input).attr('name')]);
        });

        $lineItem.data('item', item);

        $origMarkup.replaceWith($lineItem);

        $lineItem.find('input').first().focus();

        self.setItemSubtotal();
    });

    self.$element.on('click', '.delete-item', function () {
        self.deleteLineItem($(this).closest('.line-item'));
        self.setTotal();
    });

    //todo:unecesary
    closio.evtMgr.subscribe('proposalSetClient', function (e, clientId) {
        self.setClientDetails(clientId);
    });
};

closio.ProposalEditorView.prototype.deleteLineItem = function ($item) {
    var self = this,
        lineItem;
    lineItem = $item.data('item');

    this.activeProposalItem = null;

    $.when(self.proposal.deleteLineItem(lineItem)).done(function () {
        $item.remove();
    });
};

closio.ProposalEditorView.prototype.postRenderProcessing = function () {
    var self = this;

    this.$element.find('select').val(this.proposal.clientId);

    this.$element.find('input.invisible').dateinput();

    var menu = new closio.ProposalEditorMenu({proposal:self.model});

    closio.panelTwo.panel.addToSecondaryMenu(menu.$get());
};

closio.ProposalEditorView.prototype.setClientDetails = function (clientId) {
    var self = this,
        client = self.clients.models[clientId];

    if (client.address1)
        self.$element.find('.proposal-client-info').eq(0).html(client.address1);
    if (client.address2)
        self.$element.find('.proposal-client-info').eq(1).html(client.address2);
};

closio.ProposalEditorView.prototype.setActiveItem = function ($input) {
    var $item = $input.parents('.line-item').first(); //todo: i should use $('.line-item').closest() throughout the app insted of parents -> first()

    this.activeProposalItem = {
        $item:$item,
        item:$item.data('item')
    };
};

closio.ProposalEditorView.prototype.validateCurrentAddNew = function (addAfterCurrent) {
    if (this.activeProposalItem) {
        if (this.validateCurrentItem()) {
            //if the current item is valid, save it and add a new one
            this.finishEditingItem();
            this.addItem();
        }
    }
    else this.addItem();
};

closio.ProposalEditorView.prototype.validateCurrentItem = function () {
    var $lineItem, lineItem;

    if (!this.activeProposalItem)
        return true;

    $lineItem = this.activeProposalItem.$item;
    lineItem = this.activeProposalItem.item;
    //remove any previously set errors
    $lineItem.find('input').removeClass('error');

    if (lineItem.isValid())
        return true;
    else {
        //if it's not valid mark the fields that have errors
        $.each(lineItem.errors, function (inputName, error) {
            $lineItem.find('[name=' + inputName + ']').addClass('error');
        });

        return false;
    }
};

closio.ProposalEditorView.prototype.addItem = function () {
    var $newItem = closio.templateManager.$get('proposal-line-item'),
        newItem = this.proposal.addItem(); //new closio.ProposalItem();

    $newItem.data('item', newItem);

    this.$element.find('.line-items').append($newItem);

    $newItem.find('input').first().focus();
};

closio.ProposalEditorView.prototype.finishEditingItem = function () {
    if (this.activeProposalItem)
        this.activeProposalItem.$item.removeClass('editing').find('input').each(function (i, input) {
            var $input = $(input);
            $input.parent().text($input.val());
        });
};

closio.ProposalEditorView.prototype.setItemSubtotal = function () {
    this.activeProposalItem.$item.find('.proposal-subtotal').html(this.activeProposalItem.item.formattedSubtotal);
};

closio.ProposalEditorView.prototype.setTotal = function () {

    //update the total on the model
    this.model.updateComputedValues();
    this.model.prepViewProperties();

    this.$subtotal.html(this.model.formattedSubtotal);
    this.$tax.html(this.model.formattedTax);
    this.$total.html(this.model.formattedTotal);

};

closio.ProposalEditorView.prototype.save = function () {
    this.proposal.save();
};

closio.ProposalEditorView.prototype.postInitProcessing = function () {
    closio.ProposalView.prototype.setLogo.apply(this);
};

closio.ProposalEditorMenu = function (data) {
    var menuClass;

    this.template = 'proposal-editor-menu';

    this.proposal = data.proposal;

    this.importingTasks = typeof data.importingTasks != 'undefined' ? data.importingTasks : false;

    menuClass = this.importingTasks ? 'importing-tasks' : '';

    this.initialize({menuClass:menuClass});
};

closio.ProposalEditorMenu.prototype = new closio.View();

closio.ProposalEditorMenu.prototype.bindEvents = function () {
    var self = this;

    //proposal builder button
    this.$element.on('click', '#import-tasks', function () {
        closio.navigate('deals/' + self.proposal.dealId + '/proposals/' + self.proposal.id + '/import');
    });

    this.$element.on('click', '#save-proposal', function () {

        $.when(self.proposal.save()).done(function () {
            closio.history.clearConfirmation();
            closio.navigate('deals/' + self.proposal.dealId + '/proposals/' + self.proposal.id);
        });

    });

    this.$element.on('click', '#close-import-tasks', function () {
        self.proposal.once('saved', function(){
            closio.navigate('deals/' + self.proposal.dealId + '/proposals/' + self.proposal.id + '/build');
        });
        self.proposal.save();


    });

    this.$element.on('click', '#delete-proposal', function () {
        closio.confirm({
            actionName:ut.lang('proposalEditor.deleteConfirmationButton'),
            message:ut.lang('proposalEditor.deleteConfirmationMessage'),
            callback:function () {
                var deletingProposal = self.proposal.destroy();

                $.when(deletingProposal.isComplete).done(function () {

                    closio.navigate('deals/' + self.proposal.dealId + '/proposals');
                });

                return deletingProposal.isComplete;
            }
        });
    });
};

closio.ProposalPaymentView = function (proposal) {
    var paymentMethod = closio.utils.ucFirst(closio.config.payment_method);

    if (closio.my.role != 'admin')
        new closio[paymentMethod + 'PaymentView'](proposal);
    else new closio.ManualPaymentView(proposal);
};

closio.StripePaymentView = function (proposal) {
    this.domElements = {
        $paymentError:'#payment-errors',
        $overlay:'#payment-processing- '
    };

    this.initForm({
//        title:'Make a payment',
        name:'credit-card-payment',
        isModal:true,
        data:proposal.modelParams()
    });
//todo:https error when not using https?

    stripeNS.stripeInit(this.$element);

    this.bindSubmitEvent();

    this.proposal = proposal;
};

closio.StripePaymentView.prototype = new closio.FormView();

closio.StripePaymentView.prototype.bindSubmitEvent = function () {
    var self = this;

    this.$form = this.$element.is('form') ? this.$element : this.$element.find('form');

    //we need to unbind the default submit event
    this.$form.unbind('submit');

    function removeOverlay() {
        setTimeout(function () {
            self.$overlay.css('display', 'none')
        }, 500);
    }

    function showOverlay() {
        self.$overlay.css('display', 'block');
    }

    //and create the event specific to this form
    this.$form.validator({effect:'labelMate'}).submit(function (e) {
        //clear any previous payment error
        self.$paymentError.html('');

        if (!e.isDefaultPrevented()) {
            var modelName, model;

            showOverlay();

            if (self.model) {
                //if this is an edit operation, the model will already be specified.
                model = self.model;
            }
            else {
                modelName = closio.utils.modelName(self.$form.data('model'));
                model = self.model = new closio[modelName]();
            }

            model.importProperties($(this).serializeObject());

            function error_handler(){
                self.saveErrorHandler();
                self.displayErrors(model.errors);
                self.$element.find('input[type=submit]').removeAttr('disabled');

                removeOverlay();
            }


            model.on('error', error_handler);
            model.on('invalid', error_handler);

            model.on('saved', function (response) {
                if (response && response.data && response.data.id)
                    model.id = response.data.id;

                //todo:duplicated below
                if (!model.isValid()) {
                    self.displayErrors(model.errors);
                }

                self.publish('error');

                removeOverlay();
                self.close();

                closio.reload();
                closio.panelTwo.panel.notify(ut.lang('creditCardPayment.paymentSuccessful'));
            });

            var saving = model.save();
        }

        e.preventDefault();
    });
};

closio.PaypalPaymentView = function (proposal) {
    var self = this;
    this.initForm({
        name:'paypal-payment',
        isModal:true,
        data:proposal.modelParams()
    });

    new closio.Request({
        url:'paypal/get_button',
        data:$(self.$form).serializeObject(),
        success:function (response) {
            var $paypal_form = $(response.data),
                $existing_submit_button = self.$form.find('[type=submit]');
            self.$form.append($paypal_form.find('input'));
            self.$form.attr('action', $paypal_form.attr('action'));
//            $paypal_form.find('[name=submit]').replaceWith($existing_submit_button.clone().removeAttr('disabled'));
//            $existing_submit_button.remove();
//            self.$form.append($paypal_form);
        }
    });

    self.$form.unbind('submit');
};

closio.PaypalPaymentView.prototype = new closio.FormView();

closio.PaypalPaymentView.prototype.bindSubmitEvent = function () {

};

closio.ManualPaymentView = function (proposal) {
    this.template = 'manual-payment';

    this.initForm({
        title:ut.lang('manualPayment.formTitle'),
        name:'manual-payment',
        isModal:true,
        data:$.extend(true, proposal.modelParams(), {currency_symbol:closio.config.currency_symbol}),
        submitAction:function () {
            closio.reload();
        }
    });
};

closio.ManualPaymentView.prototype = new closio.FormView();

closio.NonePaymentView = function () {
    this.template = 'no-payment-method';

    this.initialize({paymentInstructions:ut.lang('noPaymentMethod.instructions')});
};

closio.NonePaymentView.prototype = new closio.View();

closio.NonePaymentView.prototype.postInitProcessing = function () {
    this.modal = new closio.ModalView(this, ut.lang('noPaymentMethod.paymentInstructions'));
};

closio.NonePaymentView.prototype.bindEvents = function () {
    var self = this;

    this.$element.on('click', '.ok', function () {
        self.modal.close();
        self.unload();
    });
};


//Proposal Line Item
closio.ProposalLineItemView = function (data) {
    this.template = typeof data !== 'undefined' ? 'proposal-builder-line-item' : 'proposal-line-item';

    if(data && !(data instanceof closio.Model)){
        var model = new closio.ProposalItem();
        model.load(data);
    }
    else model = data;

    this.initialize(model);

    if (data) {
        this.$element.data('item', model);
    }
};

closio.ProposalLineItemView.prototype = new closio.View();

//Proposal Builder Task List
closio.ProposalBuilderTaskListView = function (data) {
    this.template = 'proposal-builder-task-list';

    this.domElements = {
        $completedTasks:'#completed-tasks-list',
        $incompleteTasks:'#incomplete-tasks-list',
        $showCompletedTasks:'.show-completed-tasks'
    };

    this.initialize(data);
};

closio.ProposalBuilderTaskListView.prototype = new closio.View();

closio.ProposalBuilderTaskListView.prototype.postInitProcessing = function () {
    var self = this;

    $.each(self.collection.models, function (id, task) {
        if (task.isComplete === true) {
            var $completedTask = self.$incompleteTasks.find('[data-id=' + task.id + ']');
            self.$completedTasks.append($completedTask);
        }
    });
};

closio.ProposalBuilderTaskListView.prototype.bindEvents = function () {
    var self = this;

    this.$showCompletedTasks.on('click', function (e) {
        self.$showCompletedTasks.remove();
        self.$completedTasks.css("display", 'block');
        self.$element.nanoScroller();
        e.preventDefault();
    });
};

//Proposal Builder
closio.ProposalImportView = function (data) {
    this.template = 'proposal-builder';

    this.proposalView = false;

    this.tasksView = false;

    this.tasksCollection = false;

    //todo:close messages panel to make more room for this...
    this.initialize(data);

    this.$element.find('#proposal-preview').append(this.proposalView.$get());
};

closio.ProposalImportView.prototype = new closio.View();

closio.ProposalImportView.prototype.preBuildProcessing = function () {
    var self = this,
        context = closio.context();

    function convertToLineItem($task) {
        var proposalItem, proposalItemView, task;

        task = self.tasksCollection.modelsById[$task.data('id')];

        proposalItem = closio.make('ProposalItem', task);

        proposalItem.setProposalId(self.proposalView.proposal.id);

        proposalItemView = new closio.ProposalLineItemView(proposalItem);

        self.proposalView.proposal.addItem(proposalItem);
        $task.replaceWith(proposalItemView.$element);
    }

    function initTaskList() {
        self.tasksView = new closio.ProposalBuilderTaskListView(self.tasksCollection);
        self.$element.find('#choose-proposal-tasks').append(self.tasksView.$get());

        self.$element.find('.task-list').sortable({
            connectWith:'.connected-sortable',
            helper:function (e, el) {
                var $helper = $('<div class="task-drag-helper">' + $(el).find('.task-details').text() + '</div>');

                //we need to append the helper to the body so that it doesn't go under (z-index) the proposal during dragging
                $helper.appendTo('body');
                return  $helper;
            }
        });

        //todo:sort handle
        self.$element.find('.line-items').sortable({
            items:'.line-item',
            receive:function (e, ui) {
                convertToLineItem(ui.item);
            }
        });

        self.tasksView.$element.height(self.$element.height());
        self.$element.find('.nano').nanoScroller();
    }


    this.proposalView = new closio.ProposalEditorView(self.model);


    this.tasksCollection = new closio.Collection({
        model:'task',
        url:'deals/' + context.id + '/tasks'
    });

    //todo:fix order
    this.tasksCollection.on('loaded', function () {
        initTaskList();
    });

    this.tasksCollection.load();
};

closio.ProposalImportView.prototype.bindEvents = function () {
    var self = this;

    //disable the default delete item functionality, because it will break the functionality enabled below
    this.proposalView.$element.off('click', '.delete-item');

    this.proposalView.$element.on('click', '.delete-item', function (e) {
        var task, taskListItem,
            $item = $(this).closest('li'),
            proposalItem = $item.data('item');

        //if this is a task, we need to add it back the the task list
        if (proposalItem.taskId) {
            task = self.tasksCollection.modelsById[proposalItem.taskId];
            taskListItem = closio.templateManager.$get('proposal-builder-task-list-task', task.modelParams());
            self.tasksView.$element.find('ul').prepend(taskListItem);
        }

        self.proposalView.deleteLineItem($item);

        return false;
    });
};

closio.ProposalImportView.prototype.postRenderProcessing = function () {
    var self = this;

    var menu = new closio.ProposalEditorMenu({
        proposal:self.model,
        importingTasks:true
    });

    closio.panelTwo.panel.addToSecondaryMenu(menu.$get());
};









//CLIENT DETAILS VIEW
closio.ClientDetailsView = function (data) {
    this.template = 'client-details';
	//console.log(data);
    this.domElements = {
        $changePrimaryContact:'#change-primary-contact',
		$addClientUser:'#add-client-user',
        $addNewUser:'#add-new-user',
        $tabsContent:'.tabs-content'
    };

    this.paramsToDecode = ['address1', 'address2', 'website', 'phone', 'primaryContactName'];

    this.initialize(data);

};

closio.ClientDetailsView.prototype = new closio.View();

closio.ClientDetailsView.prototype.bindEvents = function () {
    var self = this;

    this.$changePrimaryContact.on('click', function () {
        new closio.ClientPrimaryContactView(self.model);
    });
	
    this.$addClientUser.on('click', function () {
        new closio.ClientAddUserView(self.model);
    });

    this.$addNewUser.on('click', function () {
        new closio.ClientNewUserView(self.model);
    });

    this.$element.on('click', 'dd a', function (e) {
        var $this = $(this),
            tab = $this.attr('href');

        $this.parent().addClass('active').siblings().removeClass('active');
        self.$tabsContent.find(tab).addClass('active').siblings().removeClass('active');
        //todo:this needs to update scrollbar because height of content will change
        e.preventDefault();
    });

    this.$element.on('click', '.list li', function () {
        var $this = $(this),
            type = $this.data('type'),
            id = $this.data('id');

        closio.navigate(type + 's/' + id);
    });
};

closio.ClientDetailsView.prototype.postInitProcessing = function () {
    this.$element.find('.user-image').append('<img src="' + this.model.primaryContactImage + '"/>')
        .parent().attr('href', '#users/' + this.model.primaryContactId);
};

closio.ClientDetailsView.prototype.postRenderProcessing = function () {
    this.getEntity('deals');
    this.getEntity('users');
    this.getEntity('proposals');
};

closio.ClientDetailsView.prototype.getEntity = function (type) {
    var self = this,
        $list,
        params = {};

    $.when(this.model.getEntity(type)).done(function () {
      //  params[type] = self.model[type].modelParams();
        var view = new closio['Client' + ut.ucFirst(type) + 'View'](self.model[type]);
     //   $list = closio.templateManager.$get('client-' + type, params);
        self.$element.find('#client-' + type + '-tab').html(view.$get());
    });
};









//CLIENT DEALS, these are the tabs in the client detail view
closio.ClientDealsView = function(dealsCollection){
    this.template = 'client-deals';

    this.paramsToDecode = ['deals:name'];

    this.initialize(dealsCollection);
};

closio.ClientDealsView.prototype = new closio.View();

closio.ClientProposalsView = function(proposalsCollection){
    this.template = 'client-proposals';

    this.initialize(proposalsCollection);
};

closio.ClientProposalsView.prototype = new closio.View();

closio.ClientUsersView = function(usersCollection){
    this.template = 'client-users';

    this.paramsToDecode = ['users:name,email'];

    this.initialize(usersCollection);
};

closio.ClientUsersView.prototype = new closio.View();







closio.ClientPrimaryContactView = function (client) {
    var self = this;
    this.initForm({
        name:'client-primary-contact',
        isModal:true,
        title:ut.lang('clientPrimaryContact.primaryContact'),
        submitAction:function () {
            closio.reload();
        }
    });

    self.model = client;

    this.loadUsers = self.loadUsers(this);
};

closio.ClientPrimaryContactView.prototype = new closio.FormView();

closio.ClientPrimaryContactView.prototype.loadUsers = function (modalForm) {
    var self = this, request;

    function buildSelect() {
        $.each(self.users, function (i, user) {
            modalForm.$element.find('select').append('<option value="' + user.id + '">' + user.name + '</option>');

        });

        modalForm.$element.find('select').select2();
    }

    //if we don't already have the list of users, we need to get it before we populate the select.
    if (!self.users) {
        request = new closio.Request({
            url:'/clients/' + self.model.id + '/users',
            success:function (response) {
                self.users = response.data;
                buildSelect();
            }
        });
    }
    else buildSelect();

    return request.isComplete;
};


closio.ClientNewUserView = function (client) {

    this.domElements = {
        $showDetails:'#show-form-details',
        $hideDetails:'#hide-form-details'
    };

    this.initForm({
        title:ut.lang('clientDetails.newUserFormTitle'),
        name:'client-user',
        isModal:true,
        //if we pass in the actual client model, the form will try to save the existing client model rather than creating
        //a new user
        data:{id:client.id},
        submitAction:function () {

            closio.reload();
            closio.panelTwo.panel.notify(ut.lang('clientDetails.userCreatedMessage'));
        }
    });

    this.$element.find('[name=client_id]');
};

closio.ClientNewUserView.prototype = new closio.FormView();

closio.ClientNewUserView.prototype.bindEvents = function () {
    var self = this;

    closio.FormView.prototype.bindEvents.apply(this);

    this.$showDetails.on('click', function () {
        self.$element.addClass('showing-details');
    });

    this.$hideDetails.on('click', function () {
        self.$element.removeClass('showing-details');
    });
};








//GET A LIST OF USERS FOR ADMIN TO ASSIGN TO CLIENT
closio.ClientAddUserView = function (client) {
	
    var self = this;
    this.initForm({
        name:'client-assign-user',
        isModal:true,
        title:ut.lang('clientAssignUser.title'),
        submitAction:function () {
	        request = new closio.Request({
				
				
				url:'/clients/' + self.model.id + '/addClientUser',
	            data:{c_id:'33'}
	            /*
				success:function (response) {
	                
	            }
				*/
	        });
			
			
			
            closio.reload();
        }
    });

    self.model = client;

    this.loadUsers = self.loadUsers(this);
};

closio.ClientAddUserView.prototype = new closio.FormView();

closio.ClientAddUserView.prototype.loadUsers = function (modalForm) {
    var self = this, request;

    function buildSelect() {
        $.each(self.users, function (i, user) {
            modalForm.$element.find('select').append('<option value="' + user.id + '">' + user.name + '</option>');

        });

        modalForm.$element.find('select').select2();
    }

    //if we don't already have the list of users, we need to get it before we populate the select.
    if (!self.users) {
        request = new closio.Request({
			
            url:'/clients/' + self.model.id + '/users',
            success:function (response) {
                self.users = response.data;
                buildSelect();
            }
        });
		
    }
    else buildSelect();

    return request.isComplete;
};










//CLient Users Detail View
closio.UserDetailsView = function (data) {
    this.template = 'user-details';

    this.domElements = {
        $changePhoto:'#change-photo',
        $image:'.user-image-inner',
        $changePassword:'#change-password-button',
        $sendPassword:'#send-password'
    };

    this.paramsToDecode = ['firstName', 'lastName', 'email', 'address1', 'address2', 'clientName'];

    this.initialize(data);
};

closio.UserDetailsView.prototype = new closio.View();

closio.UserDetailsView.prototype.bindEvents = function () {
    var self = this;

    new closio.AddFileButton({
        isProfilePhoto:true,
        $element:this.$element,
        url:'server/' + closio.options.urlPrefix + 'users/set_profile_image',
        callback:function () {
            closio.reload()
        }
    });

    this.$changePassword.on('click', function () {
        new closio.ChangePasswordView();
    });

    this.$sendPassword.on('click', function(){
        new closio.SendPasswordView(self.model);
    });
};

closio.UserDetailsView.prototype.postInitProcessing = function () {
    if (this.model.profileImage && this.model.profileImage.length) {
        this.$image.html('<img src="' + this.model.profileImage + '"/>');
    }
};

closio.UserDetailsView.prototype.userBasedProcessing = function (user) {
    //the change password and change change photo buttons should only appear if you are viewing your own profile
    if (user.id != this.model.id) {
        this.$changePhoto.remove();
        this.$changePassword.remove();
    }
    else{
        this.$sendPassword.remove();
    }
};









//LOGIN VIEW, here is where the login processing is initiatied. 
closio.LoginView = function (data) {
    this.template = 'login';

    if (data)
        data['company'] = closio.companyName;
    else data = {company:closio.companyName};


    this.domElements = {
        $window:'.login-window',
        $status:'#login-status'
    };

    this.initialize(data);
};

closio.LoginView.prototype = new closio.View();

closio.LoginView.prototype.bindEvents = function () {
    var self = this;
    
    this.$element.on('submit', 'form', function (e) {
		//alert(this.$element.serialize());
		
        var form = $(this);
		//alert(form.serialize()); username=blah&password=blah

        //clear any status messages that already existed
        self.$status.html('');
        
        new closio.Request({
            url:'app/login',
            data:form.serialize(),
            success:function (response) {
                //     debugger;
                if (response.auth === 'successful_login') {
                    self.$element.remove();
                    //closio.navigate('dashboard');
                }
            }
        });

        e.preventDefault();
    });
};

closio.LoginView.prototype.unsuccessfulLogin = function (response) {
    $('#login-status').html(closio.error(response.lang.incorrectLogin));
};

closio.LoginView.prototype.postRenderProcessing = function () {
    this.$window.animate({opacity:1}, 'fast');
};










closio.DropdownView = function (data, options) {
    this.options = options || {};

    if (this.options.$element)
        this.$element = this.options.$element;

    this.initialize();

    this.$dropdown = this.$element.find('.dropdown-menu');
};

closio.DropdownView.prototype = new closio.View();

closio.DropdownView.prototype.bindEvents = function () {
    var self = this;

    //todo:delete if not using, getBounds too
    function positionWithinBounds() {
        if (!self.options.$within)
            return;

        var dropdownBounds = getBounds(self.$dropdown),
            withinBounds = getBounds(self.options.$within),
            offset = self.$element.offset(),
            difference;

        //adjust the right side if necessary
        difference = dropdownBounds.topRight[0] - withinBounds.topRight[0] + 10;

        if (difference > 0)
            self.$dropdown.css({left:-difference});

    }

    function getBounds($element) {
        var offset = $element.offset(),
            height = $element.height(),
            width = $element.width(),
            bounds = {};

        bounds.topLeft = [offset.left, offset.top];
        bounds.topRight = [offset.left + width, offset.top];
        bounds.bottomLeft = [offset.left, offset.top + height];
        bounds.bottomRight = [offset.left + width, offset.top + height];

        return bounds;
    }

    this.$element.click(function () {
        self.$element.toggleClass('open');
    });
};

closio.CalendarView = function (data) {

    this.template = 'calendar';

    this.fullCalendar = {};

    this.headerView = false;

    this.initialize(data);
};

closio.CalendarView.prototype = new closio.View();

closio.CalendarView.prototype.postRenderProcessing = function () {
    var self = this,
        currentPopupView;

    self.headerView = new closio.CalendarHeaderView(this.$element, self.model.taskCollection);
    closio.panelTwo.panel.addToSecondaryMenu(self.headerView.$get());

    this.$element.fullCalendar({
        header:false,
        events:self.model.taskCollection.modelParams(),
        eventRender:function (event, element, view) {
            return new closio.CalendarEventItemView(event).$element;
        },
        viewDisplay:function (view) {
            var titleParts = view.title.split(' '), title;

            if (titleParts[titleParts.length - 1] == new Date().getFullYear()) {
                titleParts.pop();
                title = titleParts.join(' ');
            }
            else title = view.title;

            title = closio.utils.trim(title, ',');
            self.headerView.setTitle(title);
        },
        eventClick:function (event, a, b) {
            //we only want one of these popup views open at a time, so get rid of the provious one if it exists
            if (currentPopupView)
                currentPopupView.unload();

            var context = closio.context();

            //todo: Find a way to move this to the bind events function
            event.url = '#' + context.object + 's/' + context.id + '/tasks/' + event.id;
            currentPopupView = new closio.CalendarEventPopupView(event);
            currentPopupView.needsUnloading();
            currentPopupView.addTo({
                $anchor:self.$element.closest('.inner-left'),
                position:'append'
            });
        }
    });

};

closio.CalendarHeaderView = function (fullCalendar, collection) {
    this.needsUnloading();

    this.template = 'calendar-header';

    this.$calendar = fullCalendar;

    this.taskCollection = collection;

    this.domElements = {
        $next:'.next-date',
        $today:'.today-date',
        $prev:'.prev-date',
        $name:'.date-name',
        $view:'#calendar-view-selector',
        $filters:'.task-filter',
        $myTasks:'#filter-my-tasks',
        $allTasks:'#filter-all-tasks'
    };

    this.initialize();
};

closio.CalendarHeaderView.prototype = new closio.View();

closio.CalendarHeaderView.prototype.bindEvents = function () {
    var self = this;

    function reRender(collection) {
        self.$calendar.fullCalendar('removeEvents');
        self.$calendar.fullCalendar('addEventSource', collection.modelParams());
    }

    this.$next.on('click', function () {
        self.$calendar.fullCalendar('next');
    });

    this.$prev.on('click', function () {
        self.$calendar.fullCalendar('prev');
    });

    this.$today.on('click', function () {
        self.$calendar.fullCalendar('today');
    });

    this.$view.on('change', function () {
        self.$calendar.fullCalendar('changeView', $(this).val());
    });

    this.$myTasks.on('click', function () {
        var collection, filtered;

        filtered = self.taskCollection.filter({assignedTo:closio.my.id});
        collection = new closio.Collection({model:'task'});
        collection.load(filtered);

        reRender(collection);
    });

    this.$allTasks.on('click', function () {
        reRender(self.taskCollection);
    });

    this.$filters.on('click', function (e) {
        $(this).toggleClass('open');
        e.stopPropagation();
    });

    $('html').on('click.task-filter', function () {
        self.$element.removeClass('open');
    });

    this.$filters.on('click', 'li', function () {
        $(this).toggleClass('selected').siblings().removeClass('selected');
    });

};

closio.CalendarHeaderView.prototype.setTitle = function (title) {
    this.$name.html(title);
};

closio.CalendarHeaderView.prototype.unloadProcessing = function () {
    $('html').off('click.task-filter');
};

closio.CalendarEventItemView = function (event) {
    this.template = 'calendar-event-item';

    this.initialize(event);
};

closio.CalendarEventItemView.prototype = new closio.View();

closio.CalendarEventItemView.bindEvents = function () {
    //todo:should bind a single event at the calendar level rather than on each element
};

closio.CalendarEventPopupView = function (event) {
    this.template = 'calendar-item-popup';

    this.initialize(event);
};

closio.CalendarEventPopupView.prototype = new closio.View();

closio.CalendarEventPopupView.prototype.bindEvents = function () {
    var self = this;

    this.$element.on('click', '.close', function () {
        self.unload();
    });
};

closio.CalendarEventPopupView.prototype.postRenderProcessing = function () {
    var self = this,
        $viewport = this.$element.closest('.viewport');

    function bounds($element) {
        var bounds = {},
            offset = $element.offset(),
            height, width;

        height = $element.height();
        width = $element.width();

        bounds.top = offset.top;
        bounds.bottom = offset.top + height;
        bounds.left = offset.left;
        bounds.right = offset.left + width;

        return bounds;
    }

    function withinBounds($element, containerBounds) {
        var elementBounds = bounds($element),
            isOutside = false,
            sidesThatAreOutside = {};

        if (elementBounds.top < containerBounds.top) {
            isOutside = true;
            sidesThatAreOutside.top = Math.abs(elementBounds.top - containerBounds.top);
        }

        if (elementBounds.left < containerBounds.left) {
            isOutside = true;
            sidesThatAreOutside.left = Math.abs(elementBounds.left - containerBounds.left);
        }

        if (elementBounds.bottom > containerBounds.bottom) {
            isOutside = true;
            sidesThatAreOutside.bottom = Math.abs(elementBounds.bottom - containerBounds.bottom);
        }

        if (elementBounds.right > containerBounds.right) {
            isOutside = true;
            sidesThatAreOutside.right = Math.abs(elementBounds.right - containerBounds.right);
        }

        if (isOutside)
            return sidesThatAreOutside;
        else return true;

    }

    function positionWithin($element, $container) {
        var containerBounds = bounds($container),
            isWithin = withinBounds($element, containerBounds),
            position = $element.position();

        if (isWithin !== true) {
            $.each(isWithin, function (outsideThisSide, amountOutside) {

                if (outsideThisSide == 'top')
                    $element.css('top', amountOutside + $container.offset().top);
                else if (outsideThisSide == 'left')
                    $element.css('left', amountOutside);
                else if (outsideThisSide == 'bottom')
                    $element.css('top', -amountOutside);
                else if (outsideThisSide == 'right')
                    $element.css('left', -amountOutside);
            });
        }
    }
};

closio.DealProgressTitleWidgetView = function (data) {
    this.template = 'deal-progress-title-widget';

    this.domElements = {
        $progress:'span'
    };

    this.initialize(data);

    this.$element.data('progress-widget', this);
};

closio.DealProgressTitleWidgetView.prototype = new closio.View();

closio.DealProgressTitleWidgetView.prototype.bindEvents = function () {
    var self = this;

    //todo:this is a hack. Need to rework the title widget functionality
    if (this.model) {
        this.model.on('changed', function () {
            self.setProgress(self.model.progress);
        });
    }
};

closio.DealProgressTitleWidgetView.prototype.setProgress = function (progress) {
    this.$progress.text(progress);
};

closio.HeaderView = function () {
    this.template = 'header';

    this.domElements = {
        $search:'#global-search',
        $runningTimerSpace:'#running-timer-space'
    };

    this.initialize({
        companyName:closio.config.company_name,
        userName:closio.my.first_name + ' ' + closio.my.last_name
    });

    this.$element.find('.user-image').append('<img src="' + closio.my.image + '"/>');
};

closio.HeaderView.prototype = new closio.View();

closio.HeaderView.prototype.bindEvents = function () {
    var self = this;

    this.$element.on('click', '#logout', function () {
        closio.navigate('logout');
    });

    this.$search.on('keyup', function (e) {
        var query;

        if (e.which == 13) {
            query = $(this).val();

            if (query.length) {
                //we need to force a reload if the current search is the same as the previous search
                if (closio.history.fragment != 'search/' + query)
                    closio.navigate('search/' + query);
                else closio.reload();
            }

            self.$search.val('');
        }

        e.preventDefault();
    });
};

closio.DealDetailsView = function (details) {
    this.template = 'deal-details';

    this.domElements = {
        $activityStream:'.activity-stream'
    };

    this.paramsToDecode = ['deal.client_name'];

    this.initialize(details);
};

closio.DealDetailsView.prototype = new closio.View();


closio.DealDetailsView.prototype.postInitProcessing = function () {
    var self = this,
        activityView;

    if (this.model.activity.length)
        this.$activityStream.html('');

    activityView = new closio.ActivityListView(self.model.activity);

    activityView.on('resized', function () {
        closio.panelTwo.panel.updateScrollbar();
    });

    self.$activityStream.append(activityView.$element);
};

closio.ActivityListView = function (activity) {
    var activityCollection;

    this.template = 'activity-list';

    this.domElements = {
        $showAll:'.activity-show-all'
    };

    if (!(activity instanceof closio.Collection)) {
        activityCollection = new closio.Collection({model:'ActivityItem'});
        activityCollection.load(activity);
    }
    else activityCollection = activity;

    this.paramsToDecode = ['activityItems:linkedObjectTitle,objectTitle'];

    this.activityCollection = activityCollection;

    this.initialize(activityCollection);
};

closio.ActivityListView.prototype = new closio.View();

closio.ActivityListView.prototype.postInitProcessing = function () {
    var self = this;

    if (!this.activityCollection.models.length) {
        this.$showAll.replaceWith('<div class="no-activity">' + ut.lang('activityList.noActivity') + '</div>');
    }
    this.$element.find('li:lt(10)').removeClass('hidden');

    //TODO: I would like to do this in the templates, but it will attempt to load images that don't exist src ={{var}}
    this.$element.find('li').each(function () {
        var $this = $(this),
            id = $this.data('id'),
            activityItem = self.activityCollection.modelsById[id];

        closio.insertProfileImage($this, activityItem);
    });
};


closio.ActivityListView.prototype.bindEvents = function () {
    var self = this;

    self.$showAll.on('click', function () {
        self.$showAll.text('loading...');
        self.$element.find('li:gt(10)').removeClass('hidden');

        self.$showAll.remove();
        self.publish('resized');
    });

};


closio.DashboardView = function (dashboardModel) {
    this.template = 'dashboard';

    this.domElements = {
        $activityList:'.activity-stream',
        $dealList:'.deal-list',
        $viewType:'#dashboard-deal-view-type',
        $newDeal:'.add-list-item',
        $filterWrapper:'#dashboard-filter-wrapper',
        $sortWrapper:'#dashboard-sort-wrapper'
    };

    this.initialize(dashboardModel)
};

closio.DashboardView.prototype = new closio.View();

closio.DashboardView.prototype.bindEvents = function () {
    var self = this,
    //used to map the button ids to their corresponding views
        idMap = {
            'line-items-view':'LineItems',
            'tiles-view':'Tiles'
        };

    this.$element.on('click', '.deal-widget', function () {
        closio.navigate('deals/' + $(this).data('id'));
    });

    this.$viewType.on('click', 'li', function () {
        var $this = $(this), view;

        $this.addClass('selected').siblings().removeClass('selected');
        self.generateView(idMap[$this.attr('id')]);
    });

    this.$newDeal.on('click', function () {
        new closio.NewDealView();
    });
};

closio.DashboardView.prototype.generateView = function (viewName, deals) {
    //add the deal list
    var self = this, view, dealsCollection;

    dealsCollection = deals || self.model.deals

    this.displayedDeals = dealsCollection;

    viewName = viewName || 'Tiles';

    this.viewName = viewName;

    view = new closio['DashboardDeals' + viewName + 'View']({deals:dealsCollection});

    //once' the wrapper has been added to the DOM, we insert the view into this wrapper
    view.addTo({
        $anchor:self.$dealList
    });
};

closio.DashboardView.prototype.postInitProcessing = function () {
    var self = this,
        activityView,
    //used to map the view names to the button ids
        viewNameMap = {
            'LineItems':'line-items-view',
            'Tiles':'tiles-view'
        },
        collection;

    //set the default file view
    this.generateView(closio.config.default_dashboard_deals_view);

    //todo:use the button set for this
    this.$viewType.find('#' + viewNameMap[closio.config.default_dashboard_deals_view]).addClass('selected');

    //add the activity list
    activityView = new closio.ActivityListView(self.model.activity);

    activityView.on('resized', function () {
        closio.panelTwo.panel.updateScrollbar();
    });

    self.$activityList.append(activityView.$element);

    //init dashboard filter
    collection = new closio.Collection({model:'deal'});
    collection.load(self.model.deals);

    self.panelFilter = new closio.PanelFilterView({
        collection:collection,
        filters:closio.panelOne.filters.deal
    });

    self.panelFilter.addTo({$anchor:self.$filterWrapper});

    self.panelFilter.on('filterApplied', function (e, filtered) {
        self.generateView(self.viewName, filtered);
    });

    //init panel sort
    self.panelSort = new closio.PanelSortView();
    self.panelSort.addTo({$anchor:self.$sortWrapper});

    self.panelSort.on('sorted', function (e, order) {
        var collection,
            sortOrder = order == 'descending' ? 'desc' : 'asc';

        collection = new closio.Collection({model:'deal'});

        collection.on('loaded', function(){
            collection.sort('createdDate', sortOrder);
            self.generateView(self.viewName, collection.models);
        });

        collection.load(self.displayedDeals);
    });
};

closio.DashboardView.prototype.userBasedProcessing = function (user) {
    if (user.role != 'admin') {
        this.$newDeal.remove();
    }
};


closio.DashboardDealsTilesView = function (data) {
    this.template = 'dashboard-deals-tile-list';

    this.initialize(data);
};

closio.DashboardDealsTilesView.prototype = new closio.View();

closio.DashboardDealsLineItemsView = function (data) {
    this.template = 'dashboard-deals-list';

    this.initialize(data);
};

closio.DashboardDealsLineItemsView.prototype = new closio.View();

closio.NotesView = function (notesModel) {
    this.needsUnloading();

    this.template = 'deal-notes';

    this.domElements = {
        $notes:'#notes-content',
        $noNotes:'.no-activity'
    };

    this.initialize(notesModel);
};

closio.NotesView.prototype = new closio.View();

closio.NotesView.prototype.postRenderProcessing = function () {
    this.manageNoNotesText();

    if (this.model.notes.length)
        this.$notes.html(this.model.notes);

    if (closio.userIsAdmin())
        closio.panelTwo.panel.addToSecondaryMenu(this.enableEditorButton());
};

closio.NotesView.prototype.enableEditorButton = function () {
    var self = this, $button;

    $button = closio.templateManager.$get('edit-notes-button', {
        buttonText:ut.lang('dealNotes.editNotes')
    });

    $button.on('click', function () {
        self.startEditor();
        $button.replaceWith(self.disableEditorButton());
    });

    return $button;
};

closio.NotesView.prototype.disableEditorButton = function () {
    var self = this, $button;

    $button = closio.templateManager.$get('edit-notes-button', {
        buttonText: ut.lang('dealNotes.doneEditing')
    });

    $button.on('click', function () {
        self.model.notes = $.trim(self.editor.getData());

        closio.panelTwo.panel.notify(ut.lang('dealNotes.saving'), false);

        self.model.once('saved', function () {
            self.editor.destroy();
            $button.replaceWith(self.enableEditorButton());
            closio.panelTwo.panel.$notification.fadeOut();
        });
        self.model.save();

        self.manageNoNotesText();

    });

    return $button;
};

closio.NotesView.prototype.startEditor = function () {
    var ckeditorConfig = {};

    if (this.editor)
        this.editor.destroy();

    ckeditorConfig.uiColor = '#ffffff';

    ckeditorConfig.toolbar = [
        { name:'basicstyles', items:[ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Font', 'FontSize', '-', 'TextColor', 'BGColor' ] },
        { name:'paragraph', items:[ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent',
            '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
        { name:'links', items:[ 'Link', 'Unlink', 'Anchor' ] }
    ];

    //todo:add autogrow
    ckeditorConfig.extraPlugins = 'divarea';

    ckeditorConfig.removeButtons = '';

    ckeditorConfig.height = '300px';
    ckeditorConfig.resize_minHeight = 300;


    CKEDITOR.on('instanceReady', function(e){
        e.editor.resize('100%', 300);
    });
    this.editor = CKEDITOR.replace(this.$notes.get(0), ckeditorConfig);



    this.manageNoNotesText(true);
};

closio.NotesView.prototype.unloadProcessing = function(){
    if(this.editor)
        this.editor.destroy();
};

closio.NotesView.prototype.manageNoNotesText = function (startingEditor) {
    //if the editor is showing (or we're about to start it), there is no reason to show the text saying there are no
    //notes
    if (startingEditor == true || this.model.notes.length)
        this.$noNotes.css('display', 'none');
    else {
        this.$noNotes.css('display', 'block');
    }
};

closio.NewClientView = function (client) {
    var isEdit = client instanceof closio.Model,
        data = client || {},
        title = ut.lang('clientForm.' + (isEdit ? 'editClient' : 'newClient'));

    this.domElements = {
        $showDetails:'#show-form-details',
        $hideDetails:'#hide-form-details'
    };

    this.initForm({
        name:isEdit ? 'client-edit' : 'client',
        isModal:true,
        title: title,
        data:data,
        submitAction:function (client) {
             closio.panelOne.reset();

            if(isEdit)
                closio.reload();
            else closio.navigate('clients/' + client.id);
        }
    });

    this.populateCurrentValues();
};

closio.NewClientView.prototype = new closio.FormView();

closio.NewClientView.prototype.bindEvents = closio.ClientNewUserView.prototype.bindEvents;

closio.NewUserView = function (user) {
    //todo:where is this view used?
    var isEdit = user instanceof closio.Model,
        data = user || {};

    this.domElements = {
        $showDetails:'#show-form-details',
        $hideDetails:'#hide-form-details'
    };

    this.initForm({
        name:'user-edit',
        isModal:true,
        title:isEdit ? 'Edit Client' : 'New-- Client', //todo:lang
        data:data,
        submitAction:function (user) {
            closio.reload();

            //todo:should be taken care of by routing or reload function
            closio.panelTwo.setContent('client', 'x');
        }
    });

    this.populateCurrentValues();
};

closio.NewUserView.prototype = new closio.FormView();

closio.NewUserView.prototype.bindEvents = closio.ClientNewUserView.prototype.bindEvents;

closio.DeleteDealView = function (deal) {
    //double confirm the deletion of deals
    closio.confirm({
        title:ut.lang('deleteDeal.title'),
        message:ut.lang('deleteDeal.message', {name:deal.name}),
        actionName:ut.lang('deleteDeal.button'),
        callback:function () {
            closio.confirm({
                title:ut.lang('deleteDeal.secondaryTitlte'),
                message:ut.lang('deleteDeal.secondaryMessage', {name:deal.name}),
                actionName:ut.lang('deleteDeal.secondaryButton'),
                callback:function () {
                    closio.panelTwo.panel.notify(ut.lang('deleteDeal.inProgress'), false);
                    $.when(deal.destroy()).done(function () {
                        closio.panelTwo.panel.$notification.fadeOut();
                        closio.navigate('deals/x');
                    });
                }
            });
        }
    });
};

closio.DeleteClientView = function (client) {
    //double confirm the deletion of deals
    closio.confirm({
        title:ut.lang('deleteClient.title'),
        message:ut.lang('deleteClient.message', {name:client.name}),
        actionName:ut.lang('deleteClient.button'),
        callback:function () {
            closio.confirm({
                title:ut.lang('deleteClient.secondaryTitle'),
                message:ut.lang('deleteClient.secondaryMessage', {name:client.name}),
                actionName:ut.lang('deleteClient.secondaryButton'),

                callback:function () {
                    closio.panelTwo.panel.notify(ut.lang('deleteClient.inProgress'), false);
                    $.when(client.destroy()).done(function () {
                        closio.panelTwo.panel.$notification.fadeOut();
                        closio.panelTwo.panel.clearContent();
                        closio.navigate('clients/x');
                    });
                }
            });
        }
    });
};

closio.DeleteUserView = function (user) {
    closio.confirm({
        title: ut.lang('deleteUser.title'),
        message: ut.lang('deleteUser.message', {firstName:user.firstName, lastName:user.lastName}),
        actionName: ut.lang('deleteUser.button'),
        callback:function () {
            closio.confirm({
                title: ut.lang('deleteUser.secondaryTitle'),
                message: ut.lang('deleteUser.secondaryMessage'),
                actionName: ut.lang('deleteUser.secondaryButton'),

                callback:function () {
                    closio.panelTwo.panel.notify(ut.lang('deleteUser.inProgress'), false);
                    $.when(user.destroy()).done(function () {
                        closio.panelTwo.panel.$notification.fadeOut();
                        closio.panelTwo.panel.clearContent();
                        closio.navigate('users/x');
                    });
                }
            });
        }
    });
};


closio.SearchResultsView = function (data) {
    this.template = 'global-search';

    this.needsUnloading();

    this.domElements = {
        $filter:'.filter-dropdown',
        $noResults:'#no-results-wrapper'
    };

    this.paramsToDecode = ['messages:message', 'tasks:task,dealName', 'deals:name', 'files:name,dealName'];

    this.initialize(data);
};

closio.SearchResultsView.prototype = new closio.View();

closio.SearchResultsView.prototype.bindEvents = function () {
    var self = this;

    this.$element.on('click', '.list li', function () {
        var $this = $(this),
            id = $this.data('id'),
            type = $this.data('type'),
            dealId;

        closio.navigate(self.model.getEntityUrl(type, id));
    });

    //todo:this (filter functionality) needs to be a separate view, it's used 3 times
    self.$filter.on('click', function (e) {
        self.$filter.addClass('open');
        e.stopPropagation();
    });

    self.$filter.on('click', 'li', function () {
        var $this = $(this);

        $this.addClass('selected').siblings().removeClass('selected');
        self.filter($this.data('filter-value'));

    });

    $('html').on('click.search-filter', function () {
        self.$filter.removeClass('open');
    });
};

closio.SearchResultsView.prototype.filter = function (type) {
    var filterType;

    if (type != 'all') {
        var $typeResults = this.$element.find('#search-' + type + '-results');


        if ($typeResults.length)
            $typeResults.css('display', 'block').siblings().css('display', 'none');
        else this.noResults(type);

        filterType = type + 's';

    }
    else {
        this.$element.find('.search-entity').css('display', 'block');
        filterType = 'all';
    }

    closio.panelTwo.panel.notify(ut.lang('globalSearch.resultsMessage', {type:filterType}));
};

closio.SearchResultsView.prototype.noResults = function (type) {
    var $message = closio.templateManager.$get('no-search-results', {type:type});

    this.$noResults.html($message).css('display', 'block');

    //hide any search entities that might be showing
    this.$noResults.siblings().css('display', 'none');
};

closio.SearchResultsView.prototype.unloadProcessing = function () {
    $('html').off('click.search-filter');
};

closio.ForgotPasswordView = function () {
    var self = this;

    this.needsUnloading();

    this.initForm({
        name:'forgot-password',
        submitAction:function () {
            self.$element.addClass('submitted');
        }
    });
};

closio.ForgotPasswordView.prototype = new closio.FormView();

closio.ChangePasswordView = function () {
    this.initForm({
        name:'change-password',
        title:ut.lang('changePassword.title'),
        isModal:true,
        submitAction:function () {
            closio.panelTwo.panel.notify(ut.lang('changePassword.passwordChanged'));
        }
    });
};

closio.ChangePasswordView.prototype = new closio.FormView();

closio.SendPasswordView = function (user) {
    this.initForm({
        name:'send-password',
        title:ut.lang('sendPassword.title'),
        isModal:true,
        data:{userId:user.id},
        submitAction:function () {
            closio.panelTwo.panel.notify(ut.lang('changePassword.passwordSent'));
        }
    });
};

closio.SendPasswordView.prototype = new closio.FormView();












//ADMIN VIEW used for ADMIN SETINGS
closio.AdminView = function () {
    this.template = 'admin-settings';

    this.domElements = {
        $newAdmin:'#new-admin-button',
		$newUser:'#new-user-button',
        $buildLanguage:'#build-language-button',
        $deleteProposal:'#delete-proposal'
    };

    this.initialize({version:closio.version});
};

closio.AdminView.prototype = new closio.View();

closio.AdminView.prototype.bindEvents = function () {
    var alert;

    this.$newAdmin.on('click', function () {
        new closio.NewAdminView();
    });
	
    this.$newUser.on('click', function () {
		//console.log(closio.my.id );
        new closio.AdminNewUserView(closio.my.id);
    });

    this.$buildLanguage.on('click', function(){


        alert = closio.alert(ut.lang('adminSettings.buildingTemplates'), false);

        new closio.Request({
            url:'language/rebuild/en',
            success:function(response){

                if(response.isValid())
                {
                    location.reload(true);
                }
                else{

                    alert.close();
                    if(response.data.template)
                        closio.alert(response.data.template[0]);

                }
            }
        });
    });

    this.$deleteProposal.on('click', function(){
        new closio.DeleteProposalView();
    });
};

closio.DeleteProposalView = function(){
    this.template = 'delete-proposal';

    this.domElements = {
        $button:'.button',
        $input:'input'
    };

    this.initialize();

    this.modal = new closio.ModalView(this, ut.lang('deleteProposal.title'));
};

closio.DeleteProposalView.prototype = new closio.FormView();

closio.DeleteProposalView.prototype.bindEvents = function(){
    var self = this;

    this.$button.on('click', function(){
        var val = self.$input.val();

        if(val.length){
            var proposal = new closio.Proposal(),
            deleting = proposal.forceDelete(val);

            $.when(deleting).done(function(){
                self.modal.unload();

                closio.panelTwo.panel.notify(ut.lang('deleteProposal.successNotification'));
            });
        }
    });
};




closio.NewAdminView = function () {
    this.domElements = {
        $showDetails:'#show-form-details',
        $hideDetails:'#hide-form-details'
    };

    this.initForm({
        title:ut.lang('adminForm.title'),
        name:'client-user',
        isModal:true,

        model:new closio.Admin(),
        submitAction:function () {
            closio.reload();
            closio.panelTwo.panel.notify(ut.lang('adminForm.adminCreated'));
        }
    });

    this.$element.find('[name=client_id]');
};

closio.NewAdminView.prototype = new closio.FormView();

closio.NewAdminView.prototype.bindEvents = closio.ClientNewUserView.prototype.bindEvents;






//ADD A USER IN ADMIN SETTINGS
closio.AdminNewUserView = function (client) {

    this.domElements = {
        $showDetails:'#show-form-details',
        $hideDetails:'#hide-form-details'
    };

    this.initForm({
        title:ut.lang('clientDetails.newUserFormTitle'),
        name:'client-user',
        isModal:true,
        //if we pass in the actual client model, the form will try to save the existing client model rather than creating
        //a new user
        data:{id:closio.my.id, creator_id:closio.my.id},
        submitAction:function () {

            closio.reload();
            closio.panelTwo.panel.notify(ut.lang('clientDetails.userCreatedMessage'));
        }
    });

    this.$element.find('[name=client_id]');
};

closio.AdminNewUserView.prototype = new closio.FormView();

closio.AdminNewUserView.prototype.bindEvents = function () {
    var self = this;

    closio.FormView.prototype.bindEvents.apply(this);

    this.$showDetails.on('click', function () {
        self.$element.addClass('showing-details');
    });

    this.$hideDetails.on('click', function () {
        self.$element.removeClass('showing-details');
    });
};









//List, the list of items that appears on the left side of the primary panel.
closio.ListView = function (data, map, selectedId) {
    //data is the recordset returned from the php core/model.class.php when it loads get()
    var self = this, listClass;
	//console.log(map);
    this.map = map;

    this.selectedId = selectedId;

    this.template = 'list';

    this.modelType = closio.utils.lcFirst(data.model);
	//console.log(this.modelType); returns 'client' for example or 'deal'

    if ($.inArray(this.modelType, ['deal', 'task', 'proposal']) == -1) {
        listClass = 'no-status';
    }
    //console.log(data);
    data.models = $.map(data.models, function (item, key) {
        var mappedItem = {};

        $.extend(mappedItem, item.modelParams());

        if(self.map){
			//console.log(self.map);
			//log returns Object
               /*
			      meta1: "email"
                  title: "name"
                  __proto__: Object
               */
            $.each(self.map, function (key, value) {
				
                if (item[value])
                    mappedItem[key] = item[value];
            });
        }
        else closio.utils.debugMessage('List View: no map found for ' + item.type);


        mappedItem.id = item.id;
        mappedItem.statusText = item.statusText;

        return mappedItem;
    });
	//console.log(data);
    this.paramsToDecode = ['listItems:title,meta1,meta2'];

    this.initialize({listItems:data.models, listClass:listClass});

    self.collection = data;

};

closio.ListView.prototype = new closio.View();

closio.ListView.prototype.postRenderProcessing = function () {
    if (this.selectedId)
        this.setSelected(this.selectedId);

    this.$element.nanoScroller();
};

closio.ListView.prototype.bindEvents = function () {
    var self = this;

    self.$element.on('click', 'li', function () {
		//data('id') == id in db table
		//console.log($(this).data('id'));
        closio.navigate(self.modelType + 's/' + $(this).data('id'));
    });

    $(window).on('resize.listview', function () {
        self.$element.nanoScroller();
    });
};

closio.ListView.prototype.unloadProcessing = function () {
    $(window).off('resize.listview');
};

closio.ListView.prototype.setSelected = function (idOrItem) {
    var self = this, $listItem;

    if (idOrItem instanceof jQuery)
        $listItem = idOrItem;
    else $listItem = self.$element.find('[data-id=' + idOrItem + ']');
    //TODO: I'm going to need to make sure the selected item is in view and if not, scroll

    self.$element.find('.selected').removeClass('selected');
    $listItem.addClass('selected');
};














closio.PanelLoadingView = function () {
    this.template = 'panel-loading';

    this.initialize();
};

closio.PanelLoadingView.prototype = new closio.View();

closio.NoSelectionView = function () {
    this.template = 'panel-no-selection';

    this.initialize();
};

closio.NoSelectionView.prototype = new closio.View();

closio.ReportingView = function (data) {
    var self = this;

    this.needsUnloading();

    this.template = 'reporting';

    this.domElements = {
        $paymentsList:'#reporting-payments-list',
        $revenuePerClient:'#reporting-client-revenue',
        $textWidgets:'#reporting-text-widgets'
    };

    this.initialize(data);

    function resize() {

    }

    $(window).on('resize.reportingView', function () {
        self.resize();
    });
};


closio.ReportingView.prototype = new closio.View();

closio.ReportingView.prototype.unloadProcessing = function () {
    $(window).off('.reportingView');
};

closio.ReportingView.prototype.resize = function () {
    var self = this;
    var available = self.$element.width() - self.$revenuePerClient.outerWidth(true) - self.$textWidgets.outerWidth(true);

    if (available >= 400)
        self.$paymentsList.width(available);
    else self.$paymentsList.width(self.$element.width());

    self.rebuildYearlyRevenueGraph();
};

closio.ReportingView.prototype.postRenderProcessing = function () {
    this.buildYearlyRevenueGraph();
    this.buildClientRevenueGraph();

    this.resize();

    this.$element.find('.nano').nanoScroller();
};

closio.ReportingView.prototype.rebuildYearlyRevenueGraph = function () {
    //since the morris charts don't automatically resize, we will rebuild it when the window size changes
    var $chart = $('<div id="revenue-chart"></div>');

    this.$element.find('#revenue-chart').empty().replaceWith($chart);

    this.buildYearlyRevenueGraph();
};

closio.ReportingView.prototype.buildYearlyRevenueGraph = function () {
    var revenue = this.model.paymentTotalsByMonth,
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        year = new Date().getFullYear();

    new Morris.Line({
        // ID of the element in which to draw the chart.
        element:'revenue-chart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data:$.map(revenue, function (monthRevenue, monthNum) {
            monthNum = parseInt(monthNum) + 1;
            var month = monthNum < 10 ? '0' + monthNum : monthNum;

            return{
                month:year + '-' + month + '-01',
                value:parseFloat(monthRevenue)
            }
        }),
        // The name of the data record attribute that contains x-values.
        xkey:'month',
        // A list of names of data record attributes that contain y-values.
        ykeys:['value'],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels:[closio.config.currency_symbol],
        xLabelFormat:function (x) {
            return moment(x).format('MMM');
        },
        lineWidth:6,
        pointSize:8,
        lineColors:['#4ACAB4', '#878BB6', '#FF8153', '#FFEA88', '#96CFFB', '#FE5D55', '#B4D967', '#43444F']
    });
};

closio.ReportingView.prototype.buildClientRevenueGraph = function () {
    var clientRevenue = this.model.paymentsByClient;

    new Morris.Donut({
        // ID of the element in which to draw the chart.
        element:'client-revenue-chart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data:$.map(clientRevenue, function (client, key) {
            return{
                label:client.name,
                value:client.total_payments
            }
        }),
        colors:['#4ACAB4', '#878BB6', '#FF8153', '#FFEA88', '#96CFFB', '#FE5D55', '#B4D967', '#43444F']
    });
};

closio.RunningTimerView = function(taskModel){
    //todo: when we leave a task and navigate back, then click the timer tab, the timer should sync with the running timer view
    this.template = 'running-timer';

    this.domElements = {
        $elapsed:'.timer-elapsed',
        $stop:'.timer-stop'
    };

    this.initialize(taskModel);

    this.addTo({
        $anchor:closio.headerViewInstance.$runningTimerSpace
    });
};

closio.RunningTimerView.prototype = new closio.View();

closio.RunningTimerView.prototype.setTime = function(time){
    this.$elapsed.html(time);
};

closio.RunningTimerView.prototype.bindEvents = function(){
    var self = this;

    this.$element.on('click', function(){
        closio.navigate(self.model.url());
    });

    this.$stop.on('click', function(e){
        closio.runningTimer.stop();

        closio.runningTimer = null;
        closio.runningTimerView = null;


        self.blink(self.$elapsed, 3, function () {
            self.$element.fadeOut(400, function () {
                self.unload();
            });
        });

        closio.evtMgr.publish('runningTaskTimerStopped');

    });
};

closio.RunningTimerView.prototype.blink = function($el, times, callback){
        var self = this;

        //hide the el
        $el.css('opacity', 0);

        //wait 300 ms then show the el
        setTimeout(function(){
            $el.css('opacity', 1);

            //if we're still blinking wait 300ms before hiding the el again
            if(times > 0){
                setTimeout(function(){
                    self.blink($el, times - 1, callback);
                }, 300);
            }
            else setTimeout(callback, 300);
        }, 300);

    //callback();
};

closio.NewDealFromTemplateView = function(templateModel){
    this.initForm({
        name:'new-deal-from-template',
        isModal:true,
        title:ut.lang('newDealFromTemplateForm.title'),
        data:templateModel.createDeal(),
        submitAction:function (deal) {

        }
    });
};

closio.NewDealFromTemplateView.prototype = new closio.FormView();

closio.NewDealFromTemplateView.prototype.postInitProcessing = function(){
    var self = this,
        form = new closio.NewDealView(this.model, false);
    this.$element.find('#template-deal-form').append(form.$element);
form.model.on('saved', function(e, response){
    //todo:huge hack, getting errors on ckeditor and with primary list loading if I remove this.
    setTimeout(function(){
        closio.navigate('deals/' + response.data);
        self.close();
    }, 1000);

});


};

closio.ArchiveDealView = function (deal) {
    //double confirm the deletion of deals
    closio.confirm({
        title:'Archive Deal',
        message:'Are you sure you want to archive ' + deal.name + '? This will remove it from the active deals list',
        actionName:'Archive deal',
        callback:function () {
            closio.panelTwo.panel.notify('Archiving deal', false);
            $.when(deal.archive()).done(function () {
                closio.panelTwo.panel.$notification.fadeOut();
                closio.navigate('deals/x');
            });
        }
    });
};

closio.UnarchiveDealView = function (deal) {
    //double confirm the deletion of deals
    closio.confirm({
        title:'Move Deal to In Progress',
        message:'Are you sure you want to move ' + deal.name + ' to In Progress?',
        actionName:'Move to In Progress',
        callback:function () {
            closio.panelTwo.panel.notify('Archiving deal', false);
            $.when(deal.unarchive()).done(function () {
                closio.panelTwo.panel.$notification.fadeOut();
                closio.navigate('deals/x');
            });
        }
    });
};

closio.PanelFilterView = function (data) {
    this.template = 'panel-filter';

    this.domElements = {
        $selectedFilterName:'.selected-filter-name'
    };

    data.selected = this.getDefaultFilter(data.filters).name;

    this.collectionToFilter = data.collection;

    this.initialize(data);
};

closio.PanelFilterView.prototype = new closio.View();

closio.PanelFilterView.prototype.getDefaultFilter = function(filters){

        var defaultFilter = '';

        $.each(filters, function (i, filter) {
            if (filter.isDefault && filter.isDefault === true) {
                defaultFilter = filter;
                return false;
            }
        });

        return defaultFilter;

};

closio.PanelFilterView.prototype.filter = function(filterParam, filterValue){
    var filter = {}, filtered;

    filter[filterParam] = filterValue;

     return this.collectionToFilter.filter(filter);
};

closio.PanelFilterView.prototype.bindEvents = function () {
    var self = this;

    this.$element.on('click', function (e) {
        self.$element.addClass('active');
        e.stopPropagation();
    });

    this.$element.on('click', 'li', function (e) {
        var $this = $(this), filtered;
        $this.addClass('selected').siblings().removeClass('selected');

        //hide the filter dropdowm
        self.$element.removeClass('active');

        //update the filter dropdown text
        self.$selectedFilterName.text($this.text());

        filtered = self.filter($this.data('param'), $this.data('value'))

        self.publish('filterApplied', filtered);

        //id we don't stop propagation, the $element level click handler will add the active class, keeping the filter
        //visible
        e.stopPropagation();
    });
    $('html').on('click.panel-filter-' + self.id, function () {
        self.$element.removeClass('active');
    });

};

closio.PanelFilterView.prototype.unloadProcessing = function () {
    $('html').off('click.panel-filter-' + +this.id);
};

closio.PanelSortView = function(){
    this.template = 'panel-sort';



    this.initialize();
};

closio.PanelSortView.prototype = new closio.View();

closio.PanelSortView.prototype.bindEvents = function(){
    var self = this, order;

    this.$element.on('click', function(){

        if(self.order == 'descending')
            self.order = 'ascending';
        else self.order = 'descending';

        self.$element.removeClass('ascending descending').addClass(self.order);

        self.publish('sorted', self.order);


    });
};

closio.insertProfileImage = function ($element, model) {
    if (model && model.userImage && model.userImage.length) {
        $element.find('.user-image').append('<img src="' + model.userImage + '"/>')
            .attr('href', '#users/' + model.userId);
    }
};

//TODO: this shouldn't be here...
$(function () {
    closio.start();
});



closio.Hello = function(){
    this.template = 'hello';
    this.initialize();
};

closio.Hello.prototype = new closio.View();

