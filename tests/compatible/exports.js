var extension = require('bindings')('alienfx.node');

var assert = require('assert');
var utilities = require('../utilities');


describe('exports: compatible hardware tests', function () {

    describe('initialize()', function () {

    });


    describe('release()', function () {

    });


    describe('reset()', function () {
        this.timeout(0);

        it('should reset the lights', function (done) {
            extension.initialize();
            extension.reset();
            extension.update();

            utilities.ask.lightsAre('all turned off', function (answer) {
                extension.release();

                assert.ok(answer);
                done();
            });
        });
    });


    describe('light()', function () {
        this.timeout(0);

        it('should color the lights', function (done) {
            extension.initialize();
            extension.reset();

            var position = 0x07FFFFFF; // All lights
            var color = extension.Color.GREEN | extension.Brightness.FULL;

            extension.light(position, color);
            extension.update();

            utilities.ask.lightsAre('all turned green', function (answer) {
                extension.release();

                assert.ok(answer);
                done();
            });
        });
    });


    describe('update()', function () {

    });


    describe('updateDefault()', function () {
        this.timeout(0);

        it('should set system power-on state', function (done) {
            extension.initialize();
            extension.reset();

            var position = extension.Position.ALL;
            var color = extension.Color.RED | extension.Brightness.FULL;

            extension.light(position, color);
            extension.updateDefault();
            extension.release();

            utilities.ask.lightsAre('all turned red (it may not work on some hardware)', function (answer) {
                assert.ok(answer);
                done();
            });
        });
    });


    describe('getNumDevices()', function () {
        this.timeout(0);

        it('should return a number of compatible devices', function () {
            extension.initialize();

            assert.doesNotThrow(function () {
                var numberOfDevices = extension.getNumDevices();
                console.info('Your system has %d AlienFX compatible devices.', numberOfDevices);
            });

            extension.release();
        });

        it('should fail if system is not initialized', function () {
            assert.throws(function () {
                extension.getNumDevices();
            }, Error);
        });
    });


    describe('getDeviceDescription()', function () {
        this.timeout(0);

        it('should get description of a device', function () {
            extension.initialize();

            var description = extension.getDeviceDescription(0);
            console.info('Description of a first device:', description);

            extension.release();

            assert.notEqual(description, null);
        });
    });


    describe('getNumLights()', function () {
        this.timeout(0);

        it('should get number of lights on a device', function () {
            extension.initialize();
            
            assert.doesNotThrow(function () {
                var numberOfLights = extension.getNumLights(0);
                console.info('Your device has %d lights.', numberOfLights);
            });

            extension.release();
        });
    });


    describe('getLightDescription()', function () {
        this.timeout(0);

        it('should get description of a light', function () {
            extension.initialize();

            assert.doesNotThrow(function () {
                var description = extension.getLightDescription(0, 0);
                console.info('Description of first light of first device:', description);
            });

            extension.release();
        });
    });
});