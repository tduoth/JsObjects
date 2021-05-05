/**
 * Created by charlie on 10/7/15.
 */

describe("Elvenware Simple Plain Suite", function() {

    'use strict';

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

});

describe("Elvenware Object Number Suite", function () {

    'use strict';

    it("Call a function in getNumber that returns 9", function () {
        expect(getNine()).toBe(9);
    });


    it("Test that we can parse the value expected to be returned from getJSON call", function() {
        var response = {nine: 10};
        queryServer.parseSimpleJson(response);
        expect(queryServer.queryResult).toBe(10);
    });

    it("tests ajax call", function() {
        spyOn($, 'ajax').and.callFake(function (ajaxConfig) {
            ajaxConfig.success({"nine": 9});
        });
        queryServer.getAjaxServerNine();
        expect(queryServer.queryResult).toBe(9);
    });

    it("tests getJSON call", function() {
        // getJSON is wrapper around ajax, so spyOn it, as it is more flexible
        spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({"nine": 9});
        });
        queryServer.getJsonServerNine();
        expect(queryServer.queryResult).toBe(9);
    });


    /**
     * This can also be solved with sinon, as shown in JasmineMockAjaxSinon.
     */
    it("tests getJSON call with fail 9", function () {
        spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "nine": 9
            });
            return {
                fail: function() {}
            };
        });
        queryServer.getJsonServerNineWithFail();
        expect(queryServer.queryResult).toBe(9);
    });

    it("tests getJSON call with fail 91", function () {
        spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "nine": 91
            });
            return {
                fail: function() {}
            };
        });
        queryServer.getJsonServerNineWithFail();
        expect(queryServer.queryResult).toBe(91);
    });

    it("tests getJSON fails with bad url", function () {
        spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "nine": 91
            });
            return {
                fail: function() {}
            };
        });
        queryServer.url = "foo"; // Set bad url;
        queryServer.getJsonServerNineWithFail();
        expect(queryServer.queryResult).toBe(91);
    });

});

