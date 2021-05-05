/**
 * @author Charlie Calvert
 */

describe("mycontrollertest", function() {
    'use strict';
    var myController = null;

    var fix = null;

    beforeEach(function() {
        myController = new LoadJson();
        setFixtures("<p id='showJson'> </p>");
        fix = $('#showJson');
    });

    it("Tests load json", function() {
        var data = {
            "name": "NPC01",
            "hitPoints": 1,
            "damage": 2
        };
        spyOn($, "getJSON").and.returnValue({
            fail: function(error) {
                error('This error is expected in a test');
            }
        });
        myController.loadJson({
            data: {
                fileName: "../BackEndData.json"
            }
        });
        expect($.getJSON).toHaveBeenCalledWith("../BackEndData.json", jasmine.any(Function));
    });

    it("Tests load json02", function() {
        var data = {
            "name": "NPC01",
            "hitPoints": 1,
            "damage": 2
        };
        fix.html(data.name);
        console.log('ShowJson:', $('#showJson').html());
        expect($('#showJson')).toHaveText('NPC01');
    });
});
