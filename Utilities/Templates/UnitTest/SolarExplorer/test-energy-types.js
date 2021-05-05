/**
 * Created by charlie on 5/20/16.
 */

describe('Energy Types Suite', function() {

    'use strict';

    var $httpBackend;
    var scope;
    var settings = { useDatabase: false };

    // Set up the module
    beforeEach(module('elfApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$controller_) {
        scope = _$rootScope_.$new();
        var $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        _$controller_('EnergyTypesController', {
            $scope: scope,
            settings: settings
        });
    }));

    beforeEach(function() {
        // console.log("Settings useDatabase", JSON.stringify(settings, null, 4));
        var requestHandler = $httpBackend
            .when('GET', 'data/EnergyTypes.json')
            .respond(energyTypes);

        $httpBackend.expectGET('data/EnergyTypes.json');
        scope.getEnergyTypes();
        $httpBackend.flush();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('proves we can test', function() {
        expect(true).toBe(true);
    });

    it('shows we can find each of the 12 MSN types', function() {
        var msns = scope.msnTypes;
        //console.log("MSN TYPES IN TEST", JSON.stringify(msns, null, 4));
        expect(msns.length).toBe(12);

    });

});
