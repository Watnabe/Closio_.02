var closio = closio || {};


//Task Model
closio.Task = function () {
    this.type = 'task';

    this.rules = {
        task:'required'
        //rules for maximum weight and minimum weight will be set in the getMaximum wieght function after we get the
        //maximum weight from the server
    };

    this.isComplete = false;

    this.weight = parseInt(this.weight, 10);
};

closio.Task.prototype = new closio.Model();

closio.Task.prototype.getFiles = function () {
    var self = this,
        gettingTasks;

    gettingTasks = new closio.Request({
        url:'tasks/' + self.id + '/get_files',
        success:function (response) {
            self.files = response.data;
        }
    });

    return gettingTasks.isComplete;
};

closio.Task.prototype.getTimeEntries = function () {
    var self = this,
        gettingTimeEntries;

    gettingTimeEntries = new closio.Request({
        url:'tasks/' + self.id + '/get_time_entries',
        success:function (response) {
            var timeEntriesCollection = new closio.Collection({model:'TimeEntry'});
            timeEntriesCollection.load(response.data);
            timeEntriesCollection.sort('startDate', 'desc');

            //we need to keep track of the collection for adding/deleting time entries
            self.timeEntriesCollection = timeEntriesCollection;

            //we need an array for the initial render (Hogan)
            self.timeEntries = timeEntriesCollection.toArray();
        }
    });

    return gettingTimeEntries.isComplete;
};

//todo: I have issues with this entire function, perhaps its just the name, but the model shouldn't be prepping anything for the view
closio.Task.prototype.prepViewProperties = function () {
    var self = this;

    //isComplete will be a string, turn it into a boolean
    self.isComplete = self.isComplete.length && self.isComplete != '0';
    self.isSection = (typeof self.isSection != 'undefined') && (self.isSection != '0') && (self.isSection != '');

    self.completeClass = self.isComplete ? 'complete' : '';

    self.dueDateHumanized = self.humanizedEndOfDay(self.dueDate);

    self.dueDateText = self.formatDate(self.dueDate, 'MMM DD, YYYY');

    self.completedDateText = self.formatDate(self.completedDate, 'MMM DD, YYYY');

    if (self.statusText)
        self.statusClass = self.statusText.toLowerCase().replace(' ', '-');

    if (parseInt(self.totalTime, 10) != 0)
        self.formattedTotalTime = closio.Timer.prototype.secondsToFormattedTime(self.totalTime);

    if (self.weight == 0)
        self.weightText = '-';
    else self.weightText = self.weight + '%';
};

closio.Task.prototype.toggleComplete = function () {
    var isComplete;

    //complete status is currently a string, we need a boolean. String -> Int -> Boolean
    if (typeof this.isComplete != 'boolean') {
        isComplete = parseInt(this.isComplete, 10);
        isComplete = Boolean(isComplete);
    }
    else isComplete = this.isComplete;

    this.isComplete = !isComplete;

    return this.save();
};

closio.Task.prototype.getMaximumWeight = function () {
    var self = this,
    //can't use the deferred created by the request because it resolves before the success function runs
        isComplete = new $.Deferred();

    //make sure the current weight is set
    self.weight = self.weight || 0;

    new closio.Request({
        url:'deals/' + self.dealId + '/get_available_task_weight',
        success:function (response) {
            //the maximum weight for a task is the available weight (1 - 99) + this task
            if (response.isValid()) {
                self.maximumWeight = parseInt(response.data, 10) + parseInt(self.weight, 10);
            }

            //set the validation rules for the maximum value
            self.rules.weight = 'max[' + self.maximumWeight + ']';

            isComplete.resolve();
        }
    });

    return isComplete;
};

closio.Task.prototype.url = function(){

    return 'deals/' + this.dealId + '/tasks/' + this.id;
};


closio.TasksManager = function () {
    this.type = 'tasks-manager';
};

closio.TasksManager.prototype = new closio.Model();

closio.Timer = function (task, callback) {
    var self = this, timer;

    //https://gist.github.com/1185904
    function Interval(duration, callback) {
        this.baseline;

        this.run = function () {
            var end, nextTick;

            if (typeof this.baseline == 'undefined') {
                this.baseline = new Date().getTime();
            }
            callback(this);
            end = new Date().getTime();
            this.baseline += duration;

            nextTick = duration - (end - this.baseline);
            if (nextTick < 0) {
                nextTick = 0;
            }
            (function (i) {
                i.timer = setTimeout(function () {
                    i.run(end);
                }, nextTick);
            }(this));
        };

        this.stop = function () {
            clearTimeout(this.timer);
        }
    }

    this.time = this.secondsToTime(0);
    this.elapsed = 0;

    this.start = function () {
        var self = this;

        this.timeEntry = new closio.TimeEntry();

        this.timeEntry.taskId = task.id;

        timer = new Interval(1000, function () {
            //get time in hh:mm:ss
            self.time = self.secondsToTime(self.elapsed);
            self.elapsed += 1;

            //if the save interval has been met, save the task
            if (self.elapsed % closio.config.task_timer_save_interval == 0)
                self.timeEntry.save({time:self.elapsed});

            //run the callback
            if (callback && $.isFunction(callback))
                callback();
        });

        timer.run()
    };

    this.stop = function () {
        var self = this;

        timer.stop();
        this.timeEntry.save({time:self.elapsed});
    };

    this.setCallback = function(newCallback){
        callback = newCallback;
    };
};

closio.Timer.prototype.secondsToTime = function (secs) {
    //http://codeaid.net/javascript/convert-seconds-to-hours-minutes-and-seconds-(javascript)
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h":hours,
        "m":minutes,
        "s":seconds
    };
    return obj;
};

closio.Timer.prototype.generateTimeText = function (timeObject) {
    var h,
        time = timeObject || this.time;

    function pad(n) {
        return n > 9 ? "" + n : "0" + n;
    }

    //we don't always want to show hours, but we always want to show mins and secs
    h = time.h == 0 ? '' : time.h + ':';

    return h + pad(time.m) + ':' + pad(time.s);
};

closio.Timer.prototype.generateHumanizedTimeText = function (timeObject) {
    var hoursText, minutesText, secondsText, textArray = [], timeText = '';

    if (timeObject.h !== 0) {
        hoursText = timeObject.h > 1 ? ' hrs' : ' hr';
        textArray.push(timeObject.h + hoursText);
    }

    if (timeObject.m !== 0) {
        minutesText = timeObject.m > 1 ? ' mins' : ' min';
        textArray.push(timeObject.m + minutesText);
    }

    if (timeObject.s !== 0) {
        secondsText = timeObject.s > 1 ? ' secs' : ' sec';
        textArray.push(timeObject.s + secondsText);
    }

    return textArray.join(', ');
};

closio.Timer.prototype.secondsToFormattedTime = function (secs) {
    var timeObject = closio.Timer.prototype.secondsToTime(secs);

    return closio.Timer.prototype.generateHumanizedTimeText(timeObject);
};

closio.TimeEntry = function () {
    this.type = 'timeEntry';

    this.startDate = moment().unix();

    this.userName = closio.my.first_name + ' ' + closio.my.last_name;

    //the time in total seconds
    this.time = 0;

    //the time in hours, minutes, and seconds. Only set if this is a manual time entry
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
};

closio.TimeEntry.prototype = new closio.Model();

closio.TimeEntry.prototype.prepViewProperties = function () {
    this.startDateText = this.formatDate(this.startDate, 'M/D/YY h:mm a');
    this.timeText = closio.Timer.prototype.secondsToFormattedTime(this.time);
};

closio.TimeEntry.prototype.timeComponentsToSecs = function () {
    var secs = 0;

    secs = parseInt(this.hours, 10) * 3600;
    secs += parseInt(this.minutes, 10) * 60;
    secs += parseInt(this.seconds);

    this.time = secs;

    return secs;
};


closio.File = function () {
    this.type = 'file';
};

closio.File.prototype = new closio.Model();

closio.File.prototype.prepViewProperties = function () {
    this.downloadUrl = 'files/download/' + this.id;
    this.formattedUploadDate = this.formattedDueDate = this.formatDate(this.created, 'MMM D, YYYY');
    this.sizeKilobytes = Math.round(this.size / 1024);
};

closio.File.prototype.getFileUrl = function () {
    var self = this;

    var request = new closio.Request({
        url:self.downloadUrl,
        success:function (response) {
            if (response.isValid())
                self.url = response.data;
            else self.url = false;
        }
    });

    return request.isComplete;
};






//PROPOSALS
closio.Proposal = function () {
    this.type = 'proposal';

    this.proposalItems = {};

    this.taxRate = parseFloat(closio.config.tax_rate).toFixed(2);
};

closio.Proposal.prototype = new closio.Model();

closio.Proposal.prototype.postLoadProcessing = function () {
    var self = this,
        tmpProposalItems = $.extend(true, {}, this.proposalItems);

    this.proposalItems = {};

    //todo:load collection from array?
    $.each(tmpProposalItems, function (i, item) {
        var proposalItem = new closio.ProposalItem();

        proposalItem.load(item);
        self.proposalItems[proposalItem.id] = proposalItem;
    });
};

closio.Proposal.prototype.prepViewProperties = function () {
    var self = this;

    self.isCompleteClass = self.isComplete === 1 ? 'complete' : 'incomplete';

    self.dueDateHumanized = self.humanizedEndOfDay(self.dueDate);
    self.dateText = self.formatDate(self.date, 'MM/DD/YYYY');
    self.dueDateText = self.formatDate(self.dueDate, 'MMM Do');
    self.dateSentText = (self.dateSent != 0) ? self.formatDate(self.dateSent, 'MMM Do') : 'Not yet sent'; //todo:lang

    self.formattedTotal = !isNaN(self.total) ? self.formatMoney(self.total) : '-';
    self.formattedTax = !isNaN(self.tax) ? self.formatMoney(self.tax) : '-';
    self.formattedSubtotal = self.formatMoney(self.subtotal);
    self.formattedBalance = self.formatMoney(self.balance);

    if (self.statusText)
        self.statusClass = closio.utils.lcFirst(self.statusText);

    if (typeof self.taxRate != 'undefined')
        self.formattedTaxRate = (self.taxRate * 100).toFixed(0) + '%';

    if (self.statusText)
        self.statusClass = closio.utils.lcFirst(self.statusText);
};

closio.Proposal.prototype.addItem = function (item) {
    var self = this;

    item = item || closio.make('ProposalItem', {proposalId:self.id});

    //todo: update the set function so it accepts more complex inputs and we don't have to manually change the changed var
    this.proposalItems[item.get_id()] = item;
    this.changed = true;

    return item;
};

closio.Proposal.prototype.updateComputedValues = function () {
    var self = this;

    self.total = 0;
    self.subtotal = 0;
    self.taxRate = closio.utils.isNumber(self.taxRate) ? self.taxRate : 0;

    $.each(self.proposalItems, function (id, proposalItem) {
        self.subtotal += parseFloat(proposalItem.subtotal);
    });

    self.tax = self.subtotal * parseFloat(self.taxRate);

    self.total = self.subtotal + self.tax;
};

closio.Proposal.prototype.setDate = function (date) {
    this.set('date',moment(date, 'MM-DD-YY').unix());
};

closio.Proposal.prototype.setDueDate = function (date) {
    this.set('dueDate', moment(date, 'MM-DD-YY').unix());
};

closio.Proposal.prototype.deleteLineItem = function (lineItem) {
    var isDestroyed;

    if (this.proposalItems[lineItem.get_id()])
        delete this.proposalItems[lineItem.get_id()];

    isDestroyed = lineItem.destroy();

    this.set('total', this.total);

    return isDestroyed;
};

closio.Proposal.prototype.send = function () {
    var self = this, sendingComplete;

    sendingComplete = new closio.Request({
        url:'proposals/' + self.id + '/send'
    });

    return sendingComplete;
};

closio.Proposal.prototype.forceDelete = function(proposalNumber){
    var request;

    request = new closio.Request({
        url:'proposals/force_delete',
        data:{proposalNumber:proposalNumber}
    });

    return request.isComplete;
};

closio.ProposalItem = function (data) {
    this.item = '';
    this.quantity = '';
    this.rate = '';
    this.taskId = null;
    this.proposalId = null;
    this.type = 'proposalitem';
};


closio.ProposalItem.prototype = new closio.Model();

closio.ProposalItem.prototype.setProposalId = function (proposalId) {
    this.proposalId = proposalId;
    if (this.task instanceof closio.Task)
        this.task.proposalId = proposalId;
};

closio.ProposalItem.prototype.isValid = function () {
    var isNumber = closio.utils.isNumber;

    this.errors = {};

    if ((typeof this.item == 'undefined') || !this.item.length)
        this.errors.item = 'Please complete this mandatory field';

    if ((typeof this.quantity == 'undefined') || !isNumber(this.quantity))
        this.errors.quantity = 'not valid';

    if ((typeof this.rate == 'undefined') || !isNumber(this.rate))
        this.errors.rate = 'not valid';

    return $.isEmptyObject(this.errors);
};

closio.ProposalItem.prototype.prepViewProperties = function () {
    var self = this;

    self.formattedSubtotal = self.formatMoney(self.subtotal);
    self.formattedRate = self.formatMoney(self.rate);
};

closio.ProposalItem.prototype.updateComputedValues = function () {
    var isNumber = closio.utils.isNumber;

    if (isNumber(this.rate) && isNumber(this.quantity))
        this.subtotal = this.rate * this.quantity;
    else this.subtotal = 0;
};

closio.ProposalItem.prototype.load = function (data) {
    //import the task data if this item is created from a task
    if (data && data instanceof closio.Task) {
        //we need to save a reference to the task just in case anything changes about this proposal item
        //for example, if it's removed from the proposal we need to change the task proposal id
        this.task = data;

        //import other vars from the task
        this.item = data.task;
        this.quantity = this.secondsToProposalQuantity(data.totalTime);
        this.rate = data.rate || 0;
        this.taskId = data.id;
    }
    else closio.Model.prototype.load.call(this, data);
};

closio.ProposalItem.prototype.secondsToProposalQuantity = function (seconds) {
    return (parseInt(seconds, 10) / 3600).toFixed(2);
};




//PROJECTS
closio.Deal = function () {
    this.type = 'deal';

    this.name = '';

    this.client_id = null;

    this.dueDate = 0;
};

closio.Deal.prototype = new closio.Model();

closio.Deal.prototype.entityUrl = function (entity) {
    //returns url in the format deals/1/tasks
    return 'deals/' + this.id + '/' + entity + 's';
};

closio.Deal.prototype.calculateProgress = function (tasks) {
    //pulled directly from the server side logic. We don't want to have to wait for the server to update the progress
    //so lets calculate it on the client side as well.
    var unweighted_incomplete_tasks = [],
        weighted_incomplete_tasks = [],

        unweighted_completed_tasks = [],
        weighted_completed_tasks = [],

        total_percentage_for_unweighted_tasks = 100,
        total_percentage_for_weighted_tasks = 0,

        total_unweighted_tasks = 0,
        unweighted_task_implied_weight,
        progress_from_unweighted,
        progress_from_weighted,
        progress = 0;

    //sort the tasks into groups
    $.each(tasks.models, function (i, task) {

        if (task.isSection == false) {
            if (task.isComplete) {
                if (task.weight > 0)
                    weighted_completed_tasks.push(task);
                else unweighted_completed_tasks.push(task);
            }
            else {
                if (task.weight > 0)
                    weighted_incomplete_tasks.push(task);
                else unweighted_incomplete_tasks.push(task);
            }
        }
    });

    //figure out how much of the total deal progress should be allocated to unweighted tasks
    $.each(weighted_completed_tasks, function (i, task) {
        total_percentage_for_unweighted_tasks -= task.weight;
    });

    $.each(weighted_incomplete_tasks, function (i, task) {
        total_percentage_for_unweighted_tasks -= task.weight;
    });

    //each unweighted task will have an 'implied' weight that is calculated. Determine that value here
    total_unweighted_tasks = unweighted_completed_tasks.length + unweighted_incomplete_tasks.length;
    unweighted_task_implied_weight = total_percentage_for_unweighted_tasks / total_unweighted_tasks;

    //calculate progress
    progress_from_unweighted = 0;
    progress_from_weighted = 0;

    //determine how much of the deal is completed by unweighted tasks
    progress_from_unweighted = unweighted_task_implied_weight * unweighted_completed_tasks.length;

    //determine how much of th deal is completed by weighted tasks
    $.each(weighted_completed_tasks, function (i, task) {
        progress_from_weighted += task.weight;
    });

    progress = progress_from_unweighted + progress_from_weighted;

    //we want a whole number for progress
    progress = Math.round(progress);

    //this.progress = progress;
    this.set('progress', progress);

    return progress;
};

closio.Deal.prototype.prepViewProperties = function () {
    var progressDifference = this.progress - this.expectedProgress,
    //negative numbers will already have the minus sign, but we need to add the plus sign for positive numbers
        progressDirection = progressDifference < 0 ? '' : '+';

    this.formattedDueDate = this.formatDate(this.dueDate, 'MMM D');

    if (this.statusText){
        this.formattedStatusText = this.formatStatusText(this.statusText);
    }


    this.progressDifference = progressDirection + progressDifference.toString();
};

closio.Deal.prototype.formatStatusText = function(statusText){
    var formattedStatusText;

    //todo:simplify
    formattedStatusText = statusText.replace('-', '_');
    formattedStatusText = closio.utils.camelCase(formattedStatusText);
    formattedStatusText = ut.lang('dealDetails.' + formattedStatusText);

    return formattedStatusText;
};

closio.Deal.prototype.archive = function () {
    this.isArchived = true;
    return this.save();
};

closio.Deal.prototype.unarchive = function () {
    this.isArchived = false;
    return this.save();
};


closio.Template = function(){
    this.type = 'template';
};

closio.Template.prototype = closio.Deal.prototype;

closio.Template.prototype.createDeal = function(){
    var deal = new closio.DealFromTemplate();
    deal.load(this.modelParams());

    return deal;
};

//A dummy model that will allow us to call templates/create_deal when the new deal (from template) form is submitted
//Without this model, the save request would be sent to temlates/save, which is not what we want.
//
//It may seem like it would be a good idea to populate the form with a deal model so that we can call
//deals/save on the server side to create the deal, but this is problematic because some values are unique to the
//template, we don't want them saved on the new deal. We need to call templates/create_deal to process the
//values before the new deal is created....
closio.DealFromTemplate = function(){
	//console.log("DealFromTemplate");
    this.type = 'deal-from-template';

    this.saveUrl = 'template/create_deal';
};

closio.DealFromTemplate.prototype = new closio.Model();


closio.Message = function () {
    var context = false;

    this.type = 'message';

    this.message = '';

    this.referenceObject = false;

    this.referenceId = false;

    this.is_read = false;

    //reference object, id
    context = closio.context();
    this.referenceObject = context.object;
    this.referenceId = context.id;

    this.messageUrl = document.URL;
};

closio.Message.prototype = new closio.Model();

//todo: why not combine with postLoadProcessing?
closio.Message.prototype.prepViewProperties = function () {
    var self = this;
    self.dateText = self.humanizedDate(this.createdDate);
    self.formattedDateText = this.formatDate(this.createdDate, 'ddd MMM D, h:mm a');

    //if the user image isn't set, assume the message is being created by the current user
    if (!this.userImage)
        this.userImage = closio.my.image;
};

closio.Message.prototype.markRead = function () {
    this.is_read = true;
};





//client
closio.Client = function () {
    this.type = 'client';

};

closio.Client.prototype = new closio.Model();

closio.Client.prototype.getEntity = function (type) {
	//console.log(type);// returns deals, users, proposals
    var self = this,
        gettingEntity;

    gettingEntity = new closio.Request({
		
        url:'clients/' + self.id + '/get_' + type,
        success:function (response) {

            self[type] = new closio.Collection({model:type.slice(0, -1)});
            self[type].load(response.data);
        }
    });

    return gettingEntity.isComplete;
};

closio.Client.prototype.prepViewProperties = function () {
    this.hasPrimaryContact = this.primaryContactId != '0';
    this.noPrimaryContact = !this.hasPrimaryContact;
};

closio.Client.prototype.addClientUser = function(c_id){
    var request;

    request = new closio.Request({
        url:'client/addClientUser',
        data:{c_id:c_id}
    });

    return request.isComplete;
};








//USER
closio.User = function () {
    this.type = 'user';

    this.rules = {
        first_name:'required',
        last_name:'required',
        email:'required|email'
    };
};

closio.User.prototype = new closio.Model();

closio.User.prototype.prepViewProperties = function(){

    if(this.role == 'admin' || this.role == 'user')
        this.isAdmin = true;

    if(this.role == 'client')
        this.isClient = true;
};





//ADMIN
closio.Admin = function () {
    this.type = 'admin';

    this.saveUrl = 'users/new_admin';
};

closio.Admin.prototype = new closio.Model();

closio.Calendar = function () {
    this.type = 'calendar';
};




//CALENDAR
closio.Calendar.prototype = new closio.Model();

closio.Calendar.prototype.postLoadProcessing = function () {

    var taskCollection = new closio.Collection({model:'task'});

    this.taskCollection = taskCollection;

    taskCollection.on('loaded', function () {
        $.each(taskCollection.models, function (i, task) {
            task.title = task.task;
            task.start = task.dueDate;
        });
    });

    taskCollection.load(this.tasks);
};

closio.StripePayment = function () {
    this.type = "payment";

    this.rules = {
        first_name:'required',
        last_name:'required',
        'card_number':'required',
        'card_cvc':'required',
        'card_expiry_month':'required',
        'card_expiry_year':'required'
    };

    this.cardNumber = false;
    this.cardCvc = false;
    this.cardExpiryMonth = false;
    this.cardExpiryYear = false;
    this.stripeToken = false;
};

closio.StripePayment.prototype = new closio.Model();

closio.StripePayment.prototype.save = function () {
    var self = this,
        submitToStripe,
        submitToStripePromise,
    //we need a new deferred to track when this payment has been saved, since we have to first submit to stripe, which is
    //also asynchronous
        saving = new $.Deferred();

    this.validate();

    if (this.isValid()) {

        submitToStripe = stripeNS.stripeHandleSubmit(this.modelParams());

        submitToStripePromise = $.when(submitToStripe);

        submitToStripePromise.done(function (token) {
            self.stripeToken = token;

            //we don't need (or want) to send any cc info to the server
            self.cardNumber = false;
            self.cardCvc = false;
            self.cardExpiryMonth = false;
            self.cardExpiryYear = false;

            self.createSaveRequest();
        });

        submitToStripePromise.fail(function () {
            saving.reject();
            self.publish('invalid');
            //Stripe submit fail logic? It doesn't look there needs to be anything here, just allow them to resubmit the payment
        });
    }

    return saving;
};

closio.PaypalPayment = function () {
    this.type = 'payment';
};

closio.PaypalPayment.prototype = new closio.Model();

closio.ManualPayment = function () {
    this.type = 'payment';

    this.rules = {
        amount:'required|number',
        payment_method:'required'
    }
};

closio.ManualPayment.prototype = new closio.Model();

closio.DealDetails = function () {
    this.type = 'deal-details';

    this.loadUrl = 'dealdetails/';
};

closio.DealDetails.prototype = new closio.Model();

closio.DealDetails.prototype.prepViewProperties = function () {
    this.formattedDueDate = this.formatDate(this.deal.due_date, 'MMM D');
    this.formattedStatusText = closio.Deal.prototype.formatStatusText(this.deal.status_text);


    if (!this.deal.progress)
        this.deal.progress = 0;

    if (this.deal.status_text == 'not-started')
        this.dealProgress = '-';
    else this.dealProgress = this.deal.progress + '%';
};

closio.TemplateDetails = closio.DealDetails;


closio.ActivityItem = function () {
    this.type = 'activity-item';
};

closio.ActivityItem.prototype = new closio.Model();

closio.ActivityItem.prototype.prepViewProperties = function () {
    this.formattedDate = this.humanizedDate(this.activityDate);
    this.dateText = this.formatDate(this.activityDate, 'ddd MMM D h:mm a');

    //should the activity text us 'a' or 'an'
    this.article = this.getArticle(this.objectType);
    this.hasLinkedObject = typeof this.linkedObjectType != 'undefined' && this.linkedObjectType != '';

    //should the activity text us 'a' or 'an'
    this.linkedArticle = this.getArticle(this.linkedObjectType);

    if (this.objectType != 'message')
        this.objectLink = this.generateLink(this.dealId, this.objectType, this.objectId);
    else {

        this.objectLink = this.generateLink(this.dealId, this.linkedObjectType, this.linkedObjectId);
    }

    this.linkedObjectLink = this.generateLink(this.dealId, this.linkedObjectType, this.linkedObjectId);

    if (this.userId != 0) {
        this.isUserGenerated = true;
    }
};

closio.ActivityItem.prototype.generateLink = function (dealId, objectType, objectId) {
    if (objectType == 'deal')
        return '#' + objectType + 's/' + objectId;
    else return  '#deals/' + dealId + '/' + objectType + '/' + objectId;
};

closio.ActivityItem.prototype.generateMessageLink = function (dealId, objectType, objectId) {
    return  '#deals/' + dealId + '/' + objectType + '/' + objectId;
};

closio.ActivityItem.prototype.getArticle = function (objectType) {
    //determine whether to use 'a' or 'an'. This isn't 100% acurate because the rule is to an for a vowel sound, but we're
    //checking against actual vowels. (i.e. it's possible to get a vowel sound even if the first letter isn't a vowel
    //e.g. 'hour'
    return $.inArray(objectType[0], ['a', 'e', 'i', 'o', 'u']) == -1 ? 'a' : 'an';
};

closio.Dashboard = function () {
    this.type = 'dashboard';
};

closio.Dashboard.prototype = new closio.Model();

closio.Dashboard.prototype.postLoadProcessing = function () {
    var self = this,
        deals;

    deals = new closio.Collection({model:'deal'});

    deals.on('loaded', function () {
        self.deals = deals.models;
    });

    deals.load(self.deals);
};

closio.DealNotes = function () {
    this.type = 'deal-notes';
};

closio.DealNotes.prototype = new closio.Model();

closio.TemplateNotes = closio.DealNotes;

closio.Search = function () {
    this.type = 'search';

    this.loadUrl = 'search/get/';
};

closio.Search.prototype = new closio.Model();

closio.Search.prototype.postLoadProcessing = function () {
    if (this.deals.length) {
        this.initSearchEntity('deal');
    }

    if (this.tasks.length) {
        this.initSearchEntity('task');
    }

    if (this.proposals.length) {
        this.initSearchEntity('proposal');
    }

    if (this.files.length) {
        this.initSearchEntity('file');
    }

    if (this.clients.length) {
        this.initSearchEntity('client');
    }

    if (this.messages.length) {
        this.initSearchEntity('message');
    }
};

closio.Search.prototype.initSearchEntity = function (entityType) {
    //this.hasMessages = true;
    this['has' + closio.utils.ucFirst(entityType) + 's'] = true;

    //this.messagesCollection = new closio.Collection({model:'message'});
    this[entityType + 'sCollection'] = new closio.Collection({model:entityType});

    //this.messagesCollection.load(this.messages);
    this[entityType + 'sCollection'].load(this[entityType + 's']);

    //this.messages = this.messagesCollection.modelParams();
    this[entityType + 's'] = this[entityType + 'sCollection'].modelParams();
};

closio.Search.prototype.getEntityUrl = function (entityType, id) {
    var url = '', dealId, message;

    if ($.inArray(entityType, ['task', 'file', 'proposal']) !== -1) {
        dealId = this[entityType + 'sCollection'].modelsById[id].dealId;
        url = 'deals/' + dealId + '/' + entityType + 's/' + id;
    }
    else if (entityType == 'message') {
        message = this.messagesCollection.modelsById[id];
        url = message.referenceObject + 's/' + message.referenceId;
    }
    else url = entityType + 's/' + id;

    return url;
};


closio.ForgotPassword = function () {
    this.type = 'forgot-password';

    this.saveUrl = 'user/forgot_password';
};

closio.ForgotPassword.prototype = new closio.Model();

closio.ChangePassword = function () {
    this.type = 'change-password';

    this.saveUrl = 'user/change_password';
};

closio.ChangePassword.prototype = new closio.Model();

closio.FileUploadNotification = function () {
    this.type = 'file-upload-notification';

    this.saveUrl = 'file/upload_notification';
};

closio.FileUploadNotification.prototype = new closio.Model();


closio.Reports = function () {
    this.type = 'reports';

    this.loadUrl = 'reports/';
};

closio.Reports.prototype = new closio.Model();

closio.Reports.prototype.prepViewProperties = function () {
    var self = this,
        change = this.paymentsThisMonthChangePercentage;

    this.paymentsThisMonthChangePercentage = Math.round(this.paymentsThisMonthChangePercentage);

    this.paymentsThisMonthDollars = this.formatMoney(this.paymentsThisMonth).slice(0, -3);
    this.paymentsThisMonthCents = this.formatMoney(this.paymentsThisMonth).slice(-2);
    this.paymentsThisMonth = this.formatMoney(this.paymentsThisMonth);

    this.changeDirection = change > 0 ? 'Up' : change < 0 ? 'Down' : false;

    this.outstandingProposalsTotalDollars = this.formatMoney(this.outstandingProposalsTotal).slice(0, -3);
    this.outstandingProposalsTotalCents = this.formatMoney(this.outstandingProposalsTotal).slice(-2);
    this.outstandingProposalsTotal = this.formatMoney(this.outstandingProposalsTotal);

    if (Array.isArray(this.payments)) {
        $.each(this.payments, function (key, payment) {
            self.payments[key].payment_date = self.formatDate(payment.payment_date, 'MMM D, YY');
        });
    }
};

closio.SendPassword = function(){
    this.type = 'send-password';

    this.saveUrl = 'users/send_password' ;
};

closio.SendPassword.prototype = new closio.Model();

//HELLO WORLD MODULE
closio.Hello = function () {
    this.type = 'hello';
	this.name = 'hello world';

    this.loadUrl = 'hello';
};

closio.Hello.prototype = new closio.Model();



