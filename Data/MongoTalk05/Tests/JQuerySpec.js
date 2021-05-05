/**
 * @author Charlie Calvert
 */

define(function() {
    // function test() {
    describe('Jasmine-JQuery example suite', function() {
        jasmine.getFixtures().fixturesPath = './public/';

        it('proves jasmine-jquery suite is called and working', function() {
            expect(true).toBe(true);
        });

        it('Manually finds if the word *talk* has been loaded into the page', function(done) {
            $('#test').load('./public/Pieces.html #introTemplate', function() {
                var test = $('#test');
                var foo = test.text();
                expect(foo).toContain('Talk');
                test.empty();
                done();
            });
        });

        it('Uses Jasmine-JQuery to check for the word *talk* using loadFixtures and toContainText', function() {
            loadFixtures('Pieces.html');
            expect($('#introTemplate')).toContainText('Talk');
        });

        it('Uses Jasmine-JQuery to spy on a button click version 1', function(done) {
            loadFixtures('Pieces.html');
            var elementName = '#readAll';
            $(elementName).click(function(event, data) {
                console.log(data);
                expect(event.type).toBe('click');
                done();
            });
            // $(elementName).click(mongoData.readAll);
            $(elementName).click();
        });

        it('Uses Jasmine-JQuery to spy on a button click version 2', function() {
            loadFixtures('Pieces.html');
            const elementName = '#readAll';
            var spyEvent = spyOnEvent(elementName, 'click');
            $(elementName).click();
            expect('click').toHaveBeenTriggeredOn(elementName);
            expect(spyEvent).toHaveBeenTriggered();
        });
    });
});

/*
$(document).ready(function() {
    test();
});*/
