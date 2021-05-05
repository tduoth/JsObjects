/*jshint jquery: true, browser: true, devel: true */

function Presidents(displayInit) {
    'use strict';
    // var that = this;
    this.display = displayInit;
    this.presidentMode = false;
    this.selectedItem = '';
}

var presidents = new Presidents(new Display());

$(document).ready(function() {
    'use strict';
    $('button:#listDomains').click(presidents.listDomains);
    $('button:#createDomain').click(presidents.createDomain);
    $('button:#dirname').click(presidents.dirName);
    $('button:#port').click(presidents.port);
    $('button:#getPresidents').click(presidents.getPresidents);
    $('button:#getitem').click(presidents.getItem);
    $('button:#putitem').click(presidents.putItem);
    $('button:#update').click(presidents.update);
    $('button:#deleteitem').click(presidents.deleteItem);
    $('button:#deleteAll').click(presidents.deleteAll);
    $('button:#listAllItemNames').click(presidents.listAllItemNames);
    $('button:#addListOfPresidents').click(presidents.addListOfPresidents);
    $('button:#testAzureSimpleDb').click(presidents.testAzureSimpleDb);
});

Presidents.prototype.radioSelection = function() {
    'use strict';
    this.selectedItem = $("input[name=responseGroup]:checked").attr('id');
    var firstName = $("input[name=responseGroup]:checked").attr('first');
    var middleName = $("input[name=responseGroup]:checked").attr('middle');
    if (middleName !== undefined)
        middleName = ($.trim(middleName) === '-' ? '' : $.trim(middleName));
    var lastName = $("input[name=responseGroup]:checked").attr('last');
    this.display.showDebug(this.selectedItem);
    $('#firstName').val(firstName);
    $('#middleName').val(middleName);
    $('#lastName').val(lastName);
};

Presidents.prototype.clearResponse = function(debugMessage) {
    'use strict';
    this.presidentMode = false;
    this.display.clearResponse();
    this.display.showDebug(debugMessage);
};

Presidents.prototype.listAllItemNames = function() {
    'use strict';
    this.clearResponse('Called List AllItemNames');
    $.ajax({
        type: "get",
        url: '/listItems',
        cache: false,
        dataType: "json",
        success: function(data) {
            $(data).each(function() {
                this.display.showResponse(this[$ItemName]); // show the list
            });
        },
        error: this.display.showError
    });
};

Presidents.prototype.listDomains = function() {
    'use strict';
    this.clearResponse('List Domains called');
    $.ajax({
        type: "get",
        url: '/listDomains',
        cache: false,
        dataType: "json",
        success: function(data) {
            $(data).each(function() {
                this.display.showResponse(this); // show the list
            });
        },
        error: this.display.showError
    });
};

Presidents.prototype.testAzureSimpleDb = function() {
    'use strict';
    window.location.replace('/testAzureSimpleDb');
};

Presidents.prototype.createDomain = function() {
    'use strict';
    this.clearResponse("Create Domain Called");
    this.simpleQuery('/createDomain');
};

Presidents.prototype.port = function() {
    'use strict';
    this.clearResponse("Get Port Called");
    this.simpleQuery('/port');
};

Presidents.prototype.dirName = function() {
    'use strict';
    this.clearResponse("Dir Name Called");
    this.simpleQuery('/dirname');
};

Presidents.prototype.addListOfPresidents = function() {
    'use strict';
    this.clearResponse("Add List of Presidents Called");
    this.simpleQuery('/addListOfPresidents');
};

Presidents.prototype.deleteAll = function() {
    'use strict';
    this.clearResponse("Delete all Presidents Called");
    this.simpleQuery('/deleteAll');
};

Presidents.prototype.simpleQuery = function(query) {
    'use strict';
    $.ajax({
        type: "get",
        url: query,
        cache: false,
        dataType: "json",
        success: function(data) {
            this.display.showResponse(data.result);
        },
        error: this.display.showError
    });
};

Presidents.prototype.getPresidents = function(callback) {
    'use strict';
    this.clearResponse("Get Presidents called");
    this.presidentMode = true;
    $.ajax({
        type: "get",
        url: '/history',
        cache: false,
        dataType: "json",
        success: function(data) {
            $(data).each(function() {
                $(this).each(function() {
                    this.display.displayRow(this);
                });
            });
            $("input[name=responseGroup]:radio").click(this.radioSelection);
            $("input[name=responseGroup]:radio:first").attr('checked', true);
            this.radioSelection();
            if (typeof(callback) == 'function') {
                this.display.showDebug("Callback coming");
                callback();
            }
        },
        error: this.display.showError
    });
};


/*Presidents.prototype.displayRow = function(row) {
	display.showResponse(row.$ItemName + " " + row.FirstName + " " + row.LastName);
};*/

Presidents.prototype.getItem = function() {
    'use strict';
    this.clearResponse('called getitem');
    var query = "itemName=First";
    $.ajax({
        type: "get",
        data: query,
        url: '/getitem',
        cache: false,
        dataType: "json",
        success: function(data) {
            this.displayRow(data);
        },
        error: this.display.showError
    });
};

function isEmptyString(value) {
    'use strict';
    return ((!value) || (value === ""));
}

function readyForUpdate(firstName, lastName) {
    'use strict';
    var failure = isEmptyString(firstName) || isEmptyString(lastName);
    return !failure;
}

function getNames() {
    'use strict';
    var names = {};
    names.firstName = $.trim($('#firstName').val());
    names.middleName = $.trim($('#middleName').val());
    names.lastName = $.trim($('#lastName').val());
    if (!readyForUpdate(names.firstName, names.lastName)) {
        alert("Please enter a name");
        return null;
    }
    return names;
}

Presidents.prototype.putItem = function() {
    'use strict';
    var names = getNames();
    if (names) {
        this.insertRecord(names.firstName, names.middleName, names.lastName);
    }
};

Presidents.prototype.update = function() {
    'use strict';
    if (!this.presidentMode) {
        alert("You must select Get President before updating.");
        return;
    }

    var names = getNames();
    if ((names) === null) {
        return;
    }

    var query = "uuid=" + this.selectedItem +
        "&firstName=" + names.firstName +
        '&middleName=' + names.middleName +
        "&lastName=" + names.lastName;

    $.ajax({
        type: "get",
        data: query,
        url: '/update',
        cache: false,
        dataType: "json",
        success: function(data) {
            this.display.showResponse("success: " + data);
        },
        error: this.display.showError
    });
};


Presidents.prototype.insertRecord = function(firstName, middleName, lastName) {
    'use strict';
    this.display.showDebug("inserting: " + firstName + " " + middleName + " " + lastName);
    this.clearResponse('called putitem');
    var query = "firstName=" + firstName +
        "&middleName=" + middleName +
        "&lastName=" + lastName;
    $.ajax({
        type: "get",
        data: query,
        url: '/putItem',
        cache: false,
        dataType: "json",
        success: function(data) {
            this.display.showResponse("success: " + data);
        },
        error: this.display.showError
    });
};

Presidents.prototype.deleteItem = function() {
    'use strict';
    if (!this.presidentMode) {
        alert("You must select Get Presidents before trying to delete a president");
        return;
    }
    this.clearResponse('Called delete item: ' + this.selectedItem);
    var query = "itemName=" + this.selectedItem;
    $.ajax({
        type: "get",
        data: query,
        url: '/delete',
        cache: false,
        dataType: "json",
        success: function(data) {
            this.display.showResponse("success: " + data);
        },
        error: this.display.showError
    });
};

function Display() {
    'use strict';
    // We have to give it a unique name in this context
    // var thisDisplay = this;
}

Display.prototype.clearResponse = function() {
    'use strict';
    $('#response').empty();
};

Display.prototype.isValidRow = function(row) {
    'use strict';
    return !((row.MiddleName === undefined) ||
        (row.MiddleName === '[object Object]') ||
        (row.MiddleName === '-'));
};


Display.prototype.displayRow = function(row) {
    'use strict';
    var middle = (!this.isValidRow(row)) ? '' : row.MiddleName;
    var displayMiddle = (!this.isValidRow(row)) ? '-' : row.MiddleName;
    var textToDisplay = row.FirstName + " " + middle + " " + row.LastName;
    $('#response').append('<li><input id=' + row.$ItemName +
        ' first=' + row.FirstName +
        ' middle=' + displayMiddle +
        ' last=' + row.LastName +
        ' type=radio name=responseGroup />' +
        textToDisplay + '</li>');
};

Display.prototype.showResponse = function(textToDisplay) {
    'use strict';
    $('#response').append('<li>' + textToDisplay + '</li>');
};

Display.prototype.showDebug = function(textToDisplay) {
    'use strict';
    $("#debug").append('<li>' + textToDisplay + '</li>');
};

Display.prototype.showError = function(request, ajaxOptions, thrownError) {
    'use strict';
    this.showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
    this.showDebug(request.status);
    this.showDebug(request.statusText);
    this.showDebug(request.getAllResponseHeaders());
    this.showDebug(request.responseText);
};
