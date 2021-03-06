var extension = require('bindings')('alienfx.node');

var assert = require('assert');
var utilities = require('../utilities');


describe('exports: structural tests', function () {

    describe('getVersion()', function () {
        this.timeout(0);

        it('should be a function', function () {
            assert.equal(typeof extension.getVersion, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.getVersion();
            }, Error);
        });

        it('should allow callback as a first argument', function (done) {
            assert.throws(function () {
                extension.getVersion(null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getVersion(done);
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.getVersion(done);

            assert.strictEqual(completed, false);
        });
    });


    describe('getVersionSync()', function () {
        this.timeout(0);

        it('should be a function', function () {
            assert.equal(typeof extension.getVersionSync, 'function');
        });

        it('should require atleast 1 argument', function () {
            assert.doesNotThrow(function () {
                extension.getVersionSync({});
            });

            assert.throws(function () {
                extension.getVersionSync();
            }, Error);
        });

        it('should require first argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.getVersionSync({});
            });

            assert.throws(function () {
                extension.getVersionSync(null);
            }, TypeError);
        });
    });


    describe('initialize()', function () {
        this.timeout(0);

        it('should be a function', function () {
            assert.equal(typeof extension.initialize, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.initialize();
            }, Error);
        });

        it('should allow callback as a first argument', function (done) {
            assert.throws(function () {
                extension.initialize(null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.initialize(function () {
                    extension.releaseSync();
                    done();
                });
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.initialize(function () {
                extension.releaseSync();
                done();
            });

            assert.strictEqual(completed, false);
        });
    });


    describe('initializeSync()', function () {
        this.timeout(0);

        it('should be a function', function () {
            assert.equal(typeof extension.initializeSync, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.initializeSync();
            });

            extension.releaseSync();
        });
    });


    describe('release', function () {
        this.timeout(0);

        it('should be a function', function () {
            assert.equal(typeof extension.release, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.release();
            }, Error);
        });

        it('should allow callback as a first argument', function (done) {
            assert.throws(function () {
                extension.release(null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.release(done);
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.release(done);

            assert.strictEqual(completed, false);
        });
    });


    describe('releaseSync()', function () {
        this.timeout(0);

        it('should be a function', function () {
            assert.equal(typeof extension.releaseSync, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.releaseSync();
            });
        });
    });


    describe('reset()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.reset, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.reset();
            });
        });
    });


    describe('light()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.light, 'function');
        });

        it('should require atleast 2 arguments', function () {
            assert.doesNotThrow(function () {
                extension.light(0, 0);
            });

            assert.throws(function () {
                extension.light();
            }, Error);

            assert.throws(function () {
                extension.light(0);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.light(0, 0);
            });

            assert.throws(function () {
                extension.light(null, 0);
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.light(0, 0);
            });

            assert.throws(function () {
                extension.light(0, null);
            }, TypeError);
        });

        it('should allow negative numbers as second argument', function () {
            var color = (0x80000000 | 0);

            assert.doesNotThrow(function () {
                extension.light(0, color);
            });
        });
    });


    describe('actionColor()', function () {

        it('should be a function', function () {
            assert.strictEqual(typeof extension.actionColor, 'function');
        });

        it('should require atleast 3 arguments', function () {
            assert.doesNotThrow(function () {
                extension.actionColor(0, extension.Action.COLOR, 0);
            });

            assert.throws(function () {
                extension.actionColor();
            }, Error);

            assert.throws(function () {
                extension.actionColor(0, extension.Action.COLOR);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.actionColor(0, extension.Action.COLOR, 0);
            });

            assert.throws(function () {
                extension.actionColor(null, extension.Action.COLOR, 0);
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.actionColor(0, extension.Action.COLOR, 0);
            });

            assert.throws(function () {
                extension.actionColor(0, null, 0);
            }, TypeError);
        });

        it('should require third argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.actionColor(0, extension.Action.COLOR, 0);
            });

            assert.throws(function () {
                extension.actionColor(0, extension.Action.COLOR, null);
            }, TypeError);
        });

        it('should allow negative numbers as third argument', function () {
            var color = (0x80000000 | 0);

            assert.doesNotThrow(function () {
                extension.actionColor(0, extension.Action.COLOR, color);
            });
        });
    });


    describe('actionColorEx()', function () {

        it('should be a function', function () {
            assert.strictEqual(typeof extension.actionColorEx, 'function');
        });

        it('should require atleast 4 arguments', function () {
            assert.doesNotThrow(function () {
                extension.actionColorEx(0, extension.Action.COLOR, 0, 0);
            });

            assert.throws(function () {
                extension.actionColorEx();
            }, Error);

            assert.throws(function () {
                extension.actionColorEx(0, extension.Action.COLOR);
            }, Error);

            assert.throws(function () {
                extension.actionColorEx(0, extension.Action.COLOR, 0);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.actionColorEx(0, extension.Action.COLOR, 0, 0);
            });

            assert.throws(function () {
                extension.actionColorEx(null, extension.Action.COLOR, 0, 0);
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.actionColorEx(0, extension.Action.COLOR, 0, 0);
            });

            assert.throws(function () {
                extension.actionColorEx(0, null, 0, 0);
            }, TypeError);
        });

        it('should require third argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.actionColorEx(0, extension.Action.COLOR, 0, 0);
            });

            assert.throws(function () {
                extension.actionColorEx(0, extension.Action.COLOR, null, 0);
            }, TypeError);
        });

        it('should allow negative numbers as third argument', function () {
            var color = (0x80000000 | 0);

            assert.doesNotThrow(function () {
                extension.actionColorEx(0, extension.Action.COLOR, color, 0);
            });
        });

        it('should require fourth argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.actionColorEx(0, extension.Action.COLOR, 0, 0);
            });

            assert.throws(function () {
                extension.actionColorEx(0, extension.Action.COLOR, 0, null);
            }, TypeError);
        });

        it('should allow negative numbers as fourth argument', function () {
            var color = (0x80000000 | 0);

            assert.doesNotThrow(function () {
                extension.actionColorEx(0, extension.Action.COLOR, 0, color);
            });
        });
    });


    describe('update()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.update, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.update();
            });
        });
    });


    describe('updateDefault()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.updateDefault, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.updateDefault();
            });
        });
    });


    describe('Color', function () {

        it('should be an object', function () {
            assert.equal(typeof extension.Color, 'object');
        });

        it('should contain predefined colors constants', function () {
            assert.equal(extension.Color.OFF, 0x00000000);
            assert.equal(extension.Color.BLACK, 0x00000000);
            assert.equal(extension.Color.RED, 0x00FF0000);
            assert.equal(extension.Color.GREEN, 0x0000FF00);
            assert.equal(extension.Color.BLUE, 0x000000FF);
            assert.equal(extension.Color.WHITE, 0x00FFFFFF);
            assert.equal(extension.Color.YELLOW, 0x00FFFF00);
            assert.equal(extension.Color.ORANGE, 0x00FF8000);
            assert.equal(extension.Color.PINK, 0x00FF80FF);
            assert.equal(extension.Color.CYAN, 0x0000FFFF);
        });
    });


    describe('Brightness', function () {

        it('should be an object', function () {
            assert.equal(typeof extension.Brightness, 'object');
        });

        it('should contain predefined brightness constants', function () {
            assert.equal(extension.Brightness.FULL, 0xFF000000);
            assert.equal(extension.Brightness.HALF, 0x80000000);
            assert.equal(extension.Brightness.MIN, 0x00000000);
        });
    });


    describe('DeviceType', function () {

        it('should be an object', function () {
            assert.equal(typeof extension.DeviceType, 'object');
        });

        it('should contain predefined device type constants', function () {
            assert.equal(extension.DeviceType.UNKNOWN, 0x00);
            assert.equal(extension.DeviceType.NOTEBOOK, 0x01);
            assert.equal(extension.DeviceType.DESKTOP, 0x02);
            assert.equal(extension.DeviceType.SERVER, 0x03);
            assert.equal(extension.DeviceType.DISPLAY, 0x04);
            assert.equal(extension.DeviceType.MOUSE, 0x05);
            assert.equal(extension.DeviceType.KEYBOARD, 0x06);
            assert.equal(extension.DeviceType.GAMEPAD, 0x07);
            assert.equal(extension.DeviceType.SPEAKER, 0x08);
            assert.equal(extension.DeviceType.OTHER, 0xFF);
        });
    });


    describe('Position', function () {

        it('should be an object', function () {
            assert.equal(typeof extension.Position, 'object');
        });

        it('should contain predefined position constants', function () {

            // Near Z-plane light definitions
            assert.equal(extension.Position.FRONT_LOWER_LEFT, 0x00000001);
            assert.equal(extension.Position.FRONT_LOWER_CENTER, 0x00000002);
            assert.equal(extension.Position.FRONT_LOWER_RIGHT, 0x00000004);
            assert.equal(extension.Position.FRONT_MIDDLE_LEFT, 0x00000008);
            assert.equal(extension.Position.FRONT_MIDDLE_CENTER, 0x00000010);
            assert.equal(extension.Position.FRONT_MIDDLE_RIGHT, 0x00000020);
            assert.equal(extension.Position.FRONT_UPPER_LEFT, 0x00000040);
            assert.equal(extension.Position.FRONT_UPPER_CENTER, 0x00000080);
            assert.equal(extension.Position.FRONT_UPPER_RIGHT, 0x00000100);

            // Mid Z-plane light definitions
            assert.equal(extension.Position.MIDDLE_LOWER_LEFT, 0x00000200);
            assert.equal(extension.Position.MIDDLE_LOWER_CENTER, 0x00000400);
            assert.equal(extension.Position.MIDDLE_LOWER_RIGHT, 0x00000800);
            assert.equal(extension.Position.MIDDLE_MIDDLE_LEFT, 0x00001000);
            assert.equal(extension.Position.MIDDLE_MIDDLE_CENTER, 0x00002000);
            assert.equal(extension.Position.MIDDLE_MIDDLE_RIGHT, 0x00004000);
            assert.equal(extension.Position.MIDDLE_UPPER_LEFT, 0x00008000);
            assert.equal(extension.Position.MIDDLE_UPPER_CENTER, 0x00010000);
            assert.equal(extension.Position.MIDDLE_UPPER_RIGHT, 0x00020000);

            // Far Z-plane light definitions
            assert.equal(extension.Position.REAR_LOWER_LEFT, 0x00040000);
            assert.equal(extension.Position.REAR_LOWER_CENTER, 0x00080000);
            assert.equal(extension.Position.REAR_LOWER_RIGHT, 0x00100000);
            assert.equal(extension.Position.REAR_MIDDLE_LEFT, 0x00200000);
            assert.equal(extension.Position.REAR_MIDDLE_CENTER, 0x00400000);
            assert.equal(extension.Position.REAR_MIDDLE_RIGHT, 0x00800000);
            assert.equal(extension.Position.REAR_UPPER_LEFT, 0x01000000);
            assert.equal(extension.Position.REAR_UPPER_CENTER, 0x02000000);
            assert.equal(extension.Position.REAR_UPPER_RIGHT, 0x04000000);

            // Combination bit masks
            assert.equal(extension.Position.ALL, 0x07FFFFFF);
            assert.equal(extension.Position.ALL_RIGHT, 0x04924924);
            assert.equal(extension.Position.ALL_LEFT, 0x01249249);
            assert.equal(extension.Position.ALL_UPPER, 0x070381C0);
            assert.equal(extension.Position.ALL_LOWER, 0x001C0E07);
            assert.equal(extension.Position.ALL_FRONT, 0x000001FF);
            assert.equal(extension.Position.ALL_REAR, 0x07FC0000);
        });
    });


    describe('Result', function () {

        it('should be an object', function () {
            assert.equal(typeof extension.Result, 'object');
        });

        it('should contain predefined result constants', function () {
            assert.equal(extension.Result.SUCCESS, 0x00);
            assert.equal(extension.Result.FAILURE, 0x01);
            assert.equal(extension.Result.NOINIT, 0x02);
            assert.equal(extension.Result.NODEVS, 0x03);
            assert.equal(extension.Result.NOLIGHTS, 0x04);
            assert.equal(extension.Result.BUFFSIZE, 0x05);
        });
    });


    describe('Action', function () {
        
        it('should be an object', function () {
            assert.equal(typeof extension.Action, 'object');
        });

        it('should contain predefined action constants', function () {
            assert.equal(extension.Action.MORPH, 0x00000001);
            assert.equal(extension.Action.PULSE, 0x00000002);
            assert.equal(extension.Action.COLOR, 0x00000003);
        });
    });


    describe('isAvailable', function () {

        it('should be a boolean', function () {
            assert.equal(typeof extension.isAvailable, 'boolean');
        });
    });


    describe('getNumDevices()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getNumDevices, 'function');
        });

        it('should not require any arguments', function () {
            assert.doesNotThrow(function () {
                extension.getNumDevices();
            });
        });

        it('should allow callback as a first argument', function (done) {
            assert.throws(function () {
                extension.getNumDevices(null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getNumDevices(done);
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.getNumDevices(done);

            assert.strictEqual(completed, false);
        });
    });


    describe('getNumDevicesSync()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getNumDevicesSync, 'function');
        });

        it('should require atleast 1 argument', function () {
            assert.doesNotThrow(function () {
                extension.getNumDevicesSync({});
            });

            assert.throws(function () {
                extension.getNumDevicesSync();
            }, Error);
        });

        it('should require first argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.getNumDevicesSync({});
            });

            assert.throws(function () {
                extension.getNumDevicesSync(null);
            }, TypeError);
        });
    });


    describe('getDeviceDescription()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getDeviceDescription, 'function');
        });

        it('should require atleast 1 argument', function (done) {
            assert.throws(function () {
                extension.getDeviceDescription();
            }, Error);

            assert.doesNotThrow(function () {
                extension.getDeviceDescription(0, done);
            }, Error);
        });

        it('should require first argument of type number', function (done) {
            assert.throws(function () {
                extension.getDeviceDescription(null, utilities.functions.empty);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getDeviceDescription(0, done);
            });
        });

        it('should allow callback as a second argument', function (done) {
            assert.throws(function () {
                extension.getDeviceDescription(0, null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getDeviceDescription(0, done);
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.getDeviceDescription(0, done);

            assert.strictEqual(completed, false);
        });
    });


    describe('getDeviceDescriptionSync()', function () {

       it('should be a function', function () {
            assert.equal(typeof extension.getDeviceDescriptionSync, 'function');
        });

        it('should require atleast 2 arguments', function () {
            assert.doesNotThrow(function () {
                extension.getDeviceDescriptionSync(0, {});
            });

            assert.throws(function () {
                extension.getDeviceDescriptionSync();
            }, Error);

            assert.throws(function () {
                extension.getDeviceDescriptionSync(0);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.getDeviceDescriptionSync(0, {});
            });

            assert.throws(function () {
                extension.getDeviceDescriptionSync(null, {});
            }, TypeError);
        });

        it('should require second argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.getDeviceDescriptionSync(0, {});
            });

            assert.throws(function () {
                extension.getDeviceDescriptionSync(0, null);
            }, TypeError);
        });
    });


    describe('getNumLights()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getNumLights, 'function');
        });

        it('should require atleast 1 argument', function (done) {
            assert.throws(function () {
                extension.getNumLights();
            }, Error);

            assert.doesNotThrow(function () {
                extension.getNumLights(0, done);
            }, Error);
        });

        it('should require first argument of type number', function (done) {
            assert.throws(function () {
                extension.getNumLights(null, utilities.functions.empty);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getNumLights(0, done);
            });
        });

        it('should allow callback as a second argument', function (done) {
            assert.throws(function () {
                extension.getNumLights(0, null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getNumLights(0, done);
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.getNumLights(0, done);

            assert.strictEqual(completed, false);
        });
    });


    describe('getNumLightsSync()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getNumLightsSync, 'function');
        });

        it('should require atleast 2 arguments', function () {
            assert.doesNotThrow(function () {
                extension.getNumLightsSync(0, {});
            });

            assert.throws(function () {
                extension.getNumLightsSync();
            }, Error);

            assert.throws(function () {
                extension.getNumLightsSync(0);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.getNumLightsSync(0, {});
            });

            assert.throws(function () {
                extension.getNumLightsSync(null, {});
            }, TypeError);
        });

        it('should require second argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.getNumLightsSync(0, {});
            });

            assert.throws(function () {
                extension.getNumLightsSync(0, null);
            }, TypeError);
        });
    });


    describe('getLightDescription()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getLightDescription, 'function');
        });

        it('should require atleast 2 arguments', function (done) {
            assert.throws(function () {
                extension.getLightDescription();
            }, Error);

            assert.throws(function () {
                extension.getLightDescription(0);
            }, Error);

            assert.doesNotThrow(function () {
                extension.getLightDescription(0, 0, done);
            });
        });

        it('should require first argument of type number', function (done) {
            assert.throws(function () {
                extension.getLightDescription(null, 0, utilities.functions.empty);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightDescription(0, 0, done);
            });
        });

        it('should require second argument of type number', function (done) {
            assert.throws(function () {
                extension.getLightDescription(0, null, utilities.functions.empty);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightDescription(0, 0, done);
            });
        });

        it('should allow callback as a third argument', function (done) {
            assert.throws(function () {
                extension.getLightDescription(0, 0, null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightDescription(0, 0, done);
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.getLightDescription(0, 0, done);

            assert.strictEqual(completed, false);
        });
    });


    describe('getLightDescriptionSync()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getLightDescriptionSync, 'function');
        });

        it('should require atleast 3 arguments', function () {
            assert.doesNotThrow(function () {
                extension.getLightDescriptionSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightDescriptionSync();
            }, Error);

            assert.throws(function () {
                extension.getLightDescriptionSync(0);
            }, Error);

            assert.throws(function () {
                extension.getLightDescriptionSync(0, 0);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.getLightDescriptionSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightDescriptionSync(null, 0, {});
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.getLightDescriptionSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightDescriptionSync(0, null, {});
            }, TypeError);
        });

        it('should require third argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.getLightDescriptionSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightDescriptionSync(0, 0, null);
            }, TypeError);
        });
    });


    describe('getLightLocation()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getLightLocation, 'function');
        });

        it('should require atleast 2 arguments', function (done) {
            assert.throws(function () {
                extension.getLightLocation();
            }, Error);

            assert.throws(function () {
                extension.getLightLocation(0);
            }, Error);

            assert.doesNotThrow(function () {
                extension.getLightLocation(0, 0, done);
            });
        });

        it('should require first argument of type number', function (done) {
            assert.throws(function () {
                extension.getLightLocation(null, 0, utilities.functions.empty);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightLocation(0, 0, done);
            });
        });

        it('should require second argument of type number', function (done) {
            assert.throws(function () {
                extension.getLightLocation(0, null, utilities.functions.empty);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightLocation(0, 0, done);
            });
        });

        it('should allow callback as a third argument', function (done) {
            assert.throws(function () {
                extension.getLightLocation(0, 0, null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightLocation(0, 0, done);
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.getLightLocation(0, 0, done);

            assert.strictEqual(completed, false);
        });
    });


    describe('getLightLocationSync()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getLightLocationSync, 'function');
        });

        it('should require atleast 3 arguments', function () {
            assert.doesNotThrow(function () {
                extension.getLightLocationSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightLocationSync();
            }, Error);

            assert.throws(function () {
                extension.getLightLocationSync(0);
            }, Error);

            assert.throws(function () {
                extension.getLightLocationSync(0, 0);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.getLightLocationSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightLocationSync(null, 0, {});
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.getLightLocationSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightLocationSync(0, null, {});
            }, TypeError);
        });

        it('should require third argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.getLightLocationSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightLocationSync(0, 0, 0);
            }, TypeError);
        });
    });


    describe('getLightColor()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getLightColor, 'function');
        });

        it('should require atleast 2 arguments', function (done) {
            assert.throws(function () {
                extension.getLightColor();
            }, Error);

            assert.throws(function () {
                extension.getLightColor(0);
            }, Error);

            assert.doesNotThrow(function () {
                extension.getLightColor(0, 0, done);
            });
        });

        it('should require first argument of type number', function (done) {
            assert.throws(function () {
                extension.getLightColor(null, 0, utilities.functions.empty);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightColor(0, 0, done);
            });
        });

        it('should require second argument of type number', function (done) {
            assert.throws(function () {
                extension.getLightColor(0, null, utilities.functions.empty);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightColor(0, 0, done);
            });
        });

        it('should allow callback as a third argument', function (done) {
            assert.throws(function () {
                extension.getLightColor(0, 0, null);
            }, TypeError);

            assert.doesNotThrow(function () {
                extension.getLightColor(0, 0, done);
            });
        });

        it('should not complete synchonously', function (done) {
            var completed = false;

            extension.getLightColor(0, 0, done);

            assert.strictEqual(completed, false);
        });
    });


    describe('getLightColorSync()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.getLightColorSync, 'function');
        });

        it('should require atleast 3 arguments', function () {
            assert.doesNotThrow(function () {
                extension.getLightColorSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightColorSync();
            }, Error);

            assert.throws(function () {
                extension.getLightColorSync(0);
            }, Error);

            assert.throws(function () {
                extension.getLightColorSync(0, 0);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.getLightColorSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightColorSync(null, 0, {});
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.getLightColorSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightColorSync(0, null, {});
            }, TypeError);
        });

        it('should require third argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.getLightColorSync(0, 0, {});
            });

            assert.throws(function () {
                extension.getLightColorSync(0, 0, null);
            }, TypeError);
        });
    });


    describe('setLightColor()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.setLightColor, 'function');
        });

        it('should require atleast 3 arguments', function () {
            assert.doesNotThrow(function () {
                extension.setLightColor(0, 0, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightColor();
            }, Error);

            assert.throws(function () {
                extension.setLightColor(0);
            }, Error);

            assert.throws(function () {
                extension.setLightColor(0, 0);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setLightColor(0, 0, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightColor(null, 0, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setLightColor(0, 0, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightColor(0, null, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require third argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.setLightColor(0, 0, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightColor(0, 0, null);
            }, TypeError);
        });
    });


    describe('setLightActionColor()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.setLightActionColor, 'function');
        });

        it('should require atleast 4 arguments', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColor(0, 0, extension.Action.MORPH, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColor();
            }, Error);

            assert.throws(function () {
                extension.setLightActionColor(0);
            }, Error);

            assert.throws(function () {
                extension.setLightActionColor(0, 0);
            }, Error);

            assert.throws(function () {
                extension.setLightActionColor(0, 0, extension.Action.MORPH);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColor(0, 0, extension.Action.MORPH, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColor(null, 0, extension.Action.MORPH, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColor(0, 0, extension.Action.MORPH, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColor(0, null, extension.Action.MORPH, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require third argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColor(0, 0, extension.Action.MORPH, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColor(0, 0, null, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require fourth argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColor(0, 0, extension.Action.MORPH, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColor(0, 0, extension.Action.MORPH, null);
            }, TypeError);
        });
    });


    describe('setLightActionColorEx()', function () {

        it('should be a function', function () {
            assert.equal(typeof extension.setLightActionColorEx, 'function');
        });

        it('should require atleast 5 arguments', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, utilities.colors.NONE, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColorEx();
            }, Error);

            assert.throws(function () {
                extension.setLightActionColorEx(0);
            }, Error);

            assert.throws(function () {
                extension.setLightActionColorEx(0, 0);
            }, Error);

            assert.throws(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, utilities.colors.NONE);
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, utilities.colors.NONE, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColorEx(null, 0, extension.Action.MORPH, utilities.colors.NONE, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require second argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, utilities.colors.NONE, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColorEx(0, null, extension.Action.MORPH, utilities.colors.NONE, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require third argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, utilities.colors.NONE, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColorEx(0, 0, null, utilities.colors.NONE, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require fourth argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, utilities.colors.NONE, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, null, utilities.colors.NONE);
            }, TypeError);
        });

        it('should require fifth argument of type object', function () {
            assert.doesNotThrow(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, utilities.colors.NONE, utilities.colors.NONE);
            });

            assert.throws(function () {
                extension.setLightActionColorEx(0, 0, extension.Action.MORPH, utilities.colors.NONE, null);
            }, TypeError);
        });
    });


    describe('setTiming()', function () {

        it('should be a function', function () {
            assert.strictEqual(typeof extension.setTiming, 'function');
        });

        it('should require atleast 1 argument', function () {
            assert.doesNotThrow(function () {
                extension.setTiming(200);
            });

            assert.throws(function () {
                extension.setTiming();
            }, Error);
        });

        it('should require first argument of type number', function () {
            assert.doesNotThrow(function () {
                extension.setTiming(200);
            });

            assert.throws(function () {
                extension.setTiming(null);
            }, TypeError);
        });
    });

});
