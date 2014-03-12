var closio = closio || {};

//for each route or path /view/action/:id add it here then below write a method to handle the path. 
//modelType and dealType are used thorughout this class, they refer to the same thing 
//modelType = 'proposals' is also dealType = 'proposals'  This class needs touched 
//for each new module (modelType,dealType) is created

closio.routes = {
    routes:{
        'deals/:id/:entityType':'dealEntityList',
        'deals/:id/:entityType/:entityId':'dealEntity',
        'deals/:id/proposals/:proposalId/:proposalAction':'proposalScreens',
        'deals/:id':'dealEntityList',
        'deals':'dealEntityList',
        'templates/:id/:entityType':'templateEntityList',
        'templates/:id/:entityType/:entityId':'templateEntity',
        'templates/:id':'templateEntityList',
        'templates':'templateEntityList',
        'tasks/:id':'task',
        'tasks':'task',
        'clients/:id':'client',
        'clients':'client',
        'users/:id':'user',
        'users':'user',
        'proposals':'proposal',
        'proposals/:id':'proposal',
        'files':'file',
        'files/:id':'file',
        'login':'login',
        'logout':'logout',
		'linkedin':'linkedin',
        'dashboard':'dashboard',
        'profile':'myProfile',
        'search/:query':'search',
        'forgot_password':'forgotPassword',
        'admin':'admin',
        'reporting':'reporting',
		'hello':'hello',
        '*path':'dashboard'
    },
	//sets up deal specific entities (ie. tasks, calendar, proposals) for collection
    dealEntityList:function (dealId, entityType, dealType) {
        var args, panelLoaded, params;

        dealType = dealType || 'deal';
		
        //initial loading of main panel
        panelLoaded = closio.routeHelpers.initPrimaryPanel(dealType, dealId);
        args = arguments;
        //upon load set second panel
        $.when(panelLoaded).done(function () {
            params = closio.routeHelpers.initSecondaryPanel(args);

            if(params.deal){
                closio.panelTwo.setTitle(params.deal.name);
                closio.panelTwo.setModel(params.deal);
            }
            //set up any models needed in the collection manager
            function collectionHandler() {
                var collection, view;

                collection = new closio.Collection({
                    model:params.activeModelSingular,
                    url:params.deal.entityUrl(params.activeModelSingular)
                });

                //todo: maybe some kind of loading text while the collection is loading for slow connections
                //TODO:clicking on any of these list items reloads the entire page. not cool
                collection.on('loaded', function () {
					//initiates what view to load
                    view = new closio[closio.utils.ucFirst(params.activeModelSingular) + 'ListView'](collection, params.deal);
                    closio.routeHelpers.panelTwoHandler(params, view);
                });

                collection.load();
            }
            //handles any model setup needed for the specific route
            function modelHandler() {
                var modelName, model, viewNamePrefix, view;

                modelName = params.activeModelName;
                if(closio[modelName]){
                    model = new closio[modelName];
                }
                else {
                    modelName = ut.ucFirst(dealType) + params.activeModelName;
                    model = new closio[modelName];
                }

                model.on('loaded', function () {
                    viewNamePrefix = closio.utils.ucFirst(params.activeModelName);

                    if(closio[viewNamePrefix + 'View'])
                        view = new closio[viewNamePrefix + 'View'](model);
                    else view = new closio['Deal' + viewNamePrefix + 'View'](model);

                    closio.routeHelpers.panelTwoHandler(params, view);
                });

                model.load(dealId);
            }

            if (params.activeModel != 'calendar' && params.activeModel != 'details' && params.activeModel != 'notes') {
                collectionHandler();
            }
            else {
                modelHandler();
            }
        });

        closio.evtMgr.publish('messagesContextChanged');
    },
    dealEntity:function (dealId, entityType, entityId, dealType) {
        var args, panelLoaded, params;

        dealType = dealType || 'deal';

        panelLoaded = closio.routeHelpers.initPrimaryPanel(dealType, dealId);
        args = arguments;

        $.when(panelLoaded).done(function () {
            params = closio.routeHelpers.initSecondaryPanel(args);
            closio.panelTwo.setModel(params.deal);

            var activeModelUppercase = closio.utils.ucFirst(params.activeModelSingular);
            var model = new closio[activeModelUppercase];

            model.on('loaded', function () {
               // closio.context(params.activeModelSingular, model.id);
                var view = new closio[activeModelUppercase + 'View'](model);
                closio.panelTwo.setInnerContent(view);
                closio.panelTwo.itemCategories.setSelected('deal-' + params.activeModel);
            });

            model.load(params.activeModelId);
        });

        closio.evtMgr.publish('messagesContextChanged');

    },
    templateEntityList:function(dealId, entityType){
        closio.routes.dealEntityList(dealId, entityType, 'template');
    },
    templateEntity:function(dealId, entityType, entityId){
        closio.routes.dealEntity(dealId, entityType, entityId, 'template');
    },
    proposalScreens:function (dealId, proposalId, proposalAction) {
        var proposal, view, args, params,
            panelLoaded = closio.routeHelpers.initPrimaryPanel('deal', dealId);

        args = arguments;

        $.when(panelLoaded).done(function () {
            proposal = new closio.Proposal();
            params = closio.routeHelpers.initSecondaryPanel(args);

            closio.panelTwo.setModel(params.deal);

            //prevent a user from opening up the build or import views
            //if opened, they still wouldn't be able to modify the proposal because it's restricted on the server side
            if(!closio.userIsAdmin() && proposalAction != 'preview')
                return false;

            proposal.on('loaded', function () {
                if(proposalAction == 'build')
                    view = new closio.ProposalEditorView(proposal);
                else if(proposalAction == 'import')
                    view = new closio.ProposalImportView(proposal);
                else if (proposalAction == 'preview')
                    view = new closio.ProposalPreviewView(proposal);

                closio.routeHelpers.panelTwoHandler(params, view);
            });

            proposal.load(proposalId);
        });
    },
	
	//set up models to deal with each route here 
    task:function (id) {
        var task, view, taskData;
//todo:base model route?
        closio.baseModelRoute('task', id);
    },
    client:function (id) {
        closio.baseModelRoute('client', id);
    },
    hello:function (id) {
        closio.baseModelRoute('hello', id);
    },
    user:function (id) {
        closio.baseModelRoute('user', id);
    },
    proposal:function (id) {
        closio.baseModelRoute('proposal', id);
    },
   
    file:function (id) {
        closio.baseModelRoute('file', id);
    },
    dashboard:function () {
        var dashboardView,
            dashboard = new closio.Dashboard();

        //closio.context('dashboard', 1);

        //todo:this route is getting called before the initialization has completed, causing this if statement to be required. This shouldn't be necessary.
        if(closio.initComplete == true){
            closio.panelTwo.setTitle('Dashboard'); //todo:lang file
            closio.panelTwo.setModel(dashboard);

            closio.panelOne.hide();

            closio.panelTwo.setContent(closio.panelTwo.loadingView.$get());
        }

        dashboard.on('loaded', function(){
            dashboardView = new closio.DashboardView(dashboard);

            closio.panelTwo.setContent(dashboardView);
        });
        dashboard.load(1);
    },
    login:function () {
		
		//see if linkedin is in window.location hash if so request app/linkedin esle stop()
		//alert("login");
		
		if(window.location.hash == '#linkedin')
		{
			/*
			//alert("linked in");
			new closio.Request({
			            url:'app/linkedin',
			            success:function(){
			                 //window.location = '#' + closio.config.default_route;
			            }
			});
			*/
		} else {
			 closio.stop();  //in main.js see stop()
			
		}
		
       
    },
    logout:function(){
        new closio.Request({
            url:'app/logout',
            success:function(){
                 window.location = '#' + closio.config.default_route;
            }
        });
    },
    linkedin:function(){
		
    },
	
    myProfile:function(){
        this.user(closio.my.id);
        closio.panelOne.hide();
    },
    search:function (query) {
        var searchModel = new closio.Search();


        //closio.context('search', 1);
        closio.panelTwo.setTitle('Search results for \'' + query + '\''); //todo:lang file
        closio.panelTwo.setModel(searchModel);
        closio.panelTwo.removeTitleWidget();

        closio.panelOne.hide();

        searchModel.on('loaded', function () {
            var searchResultsView = new closio.SearchResultsView(searchModel);

            closio.panelTwo.setContent(searchResultsView);
        });

        searchModel.load(query);
    },
    forgotPassword:function(){
        var forgotPasswordView = new closio.ForgotPasswordView();
        forgotPasswordView.addTo({$anchor:$('body')});
    },
    admin:function(){
        if(!closio.userIsAdmin())
            return false;

        var adminView = new closio.AdminView();

        //closio.context('admin-settings', 1);
        closio.panelTwo.setTitle('Admin Settings'); //todo:lang file
        closio.panelTwo.setModel(); //todo:lang file

        closio.panelOne.hide();

        closio.panelTwo.setContent(adminView);
    },
    reporting:function(){
        var reports = new closio.Reports();
        //closio.context('reporting', 1);
        closio.panelTwo.setTitle('Reporting');
        closio.panelTwo.setModel();

        closio.panelOne.hide();

        reports.on('loaded', function(){
            var reportingView = new closio.ReportingView(reports);
            closio.panelTwo.setContent(reportingView);
        });

        reports.load(1);
    }

};



//common functions used throughout the routes
closio.routeHelpers = {
    initPrimaryPanel:function (dealType, dealId) {
        //dealType = deal or template
//        if(dealId)
//            closio.context(dealType, dealId);
//        else closio.clearContext();

        return closio.panelOne.setContent(dealType, dealId);
    },
    initSecondaryPanel:function (params) {
        var collection, view, activeModel, activeModelSingular, activeModelName, deal, params, dealId, activeModelId;

        //secondary panel
        dealId = params[0];
        activeModel = params[1] || closio.options.defaultDealTab;
        activeModelName = closio.utils.ucFirst(activeModel);
        activeModelId = params[2];
        activeModelSingular = closio.utils.trim(activeModel, 's');

        deal = dealId ? closio.panelOne.collection.get(dealId) : false;

        closio.panelTwo.item = deal; //TODO: store the item in state instead?

        return{
            activeModel:activeModel,
            activeModelName:activeModelName,
            activeModelId:activeModelId,
            activeModelSingular:activeModelSingular,
            deal:deal
        };
    },
    collectionHandler:function () {
    },
    panelTwoHandler:function (params, view) {
        var context;

        closio.panelTwo.itemCategories.setSelected('deal-' + params.activeModel);
        closio.panelTwo.setInnerContent(view); //TODO: Think about having a closio.setContent('panelTwo', view.get()), basically an app level set content function?

        context = closio.context();

        if (context && (context.object == 'deal')) {
            var progressWidget = new closio.DealProgressTitleWidgetView(params.deal);
            closio.panelTwo.setTitleWidget(progressWidget);
        }
    }
};
//gets title of panels. when panels loaded puts content
closio.baseModelRoute = function (modelType, id) {
	//model type i.e. file, task, calendar
    var model, view, modelData, modelTypeU = closio.utils.ucFirst(modelType);

    function getTitle(){
        var type = model.type,
            title = '';

        switch(type){
            case 'deal':
            case 'client':
			case 'hello':
            case 'file':
                title = model.name;
                break;
            case 'task':
                title = 'Task: ' + model.task.substr(0, 10) + '...';
                break;
            
            case 'proposal':
                title = 'Proposal ' + model.number;
                break;	
            case 'user':
                title = model.firstName + ' ' + model.lastName;
                break;
            case 'dashboard':
                title = 'Dashboard';
                break;
        }

        return title;
    }

    //primary panel
    var panelLoaded = closio.panelOne.setContent(modelType, id);

    $.when(panelLoaded).done(function () {
        modelData = id || closio.panelOne.firstItem;

        //secondary panel
        model = new closio[modelTypeU];

        model.on('loaded', function () {
          //  closio.context(modelType, model.id);
            if(closio[modelTypeU + 'DetailsView'])
                view = new closio[modelTypeU + 'DetailsView'](model);
            else view = new closio[modelTypeU + 'View'](model);

            closio.panelTwo.removeTitleWidget();
            closio.panelTwo.setTitle(getTitle());
            closio.panelTwo.setContent(view);
            closio.panelTwo.setModel(model);
        });

        model.load(modelData);

        closio.evtMgr.publish('messagesContextChanged');
    });
};
