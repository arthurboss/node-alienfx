![node-alienfx](https://cloud.githubusercontent.com/assets/2787454/4907947/d318e4e8-6465-11e4-8ab1-8e3ccb914d69.png)

node-alienfx
============

[Node.js][Node] native extension for Dell [AlienFX][AlienFX] API.


This module offers bindings for AlienFX API provided by AlienFX.dll. The main design goal of this project is to keep JavaScript bindings close to their native counterparts as much as possible. It allows line-by-line porting of existing AlienFX enabled apps to [Node.js][Node]. Provided APIs feels bit alien to JavaScript so high-level wrapper around `node-alienfx` is comming soon. Stay tuned.

Installation
------------
First of all make sure that AlienFX.dll is installed on your system, the easiest way to do so - install Alienware Command Center.

NPM package is comming soon...

Compatibility
-------------
**Operating Systems**: Windows

**Node**: 4.4.5 (32 bit, unfortunatelly there is a bug in 64-bit version of LightFX.dll that prevents AlienFX from initializing correctly)


Currently we are bound to operating systems that AlienFX.dll can run on. Strictly speaking it is possible to bypass [AlienFX][AlienFX] API and talk directly to the underlaying hardware, which requires us to send byte arrays to USB HID device. This will allow to support wider range of operating systems, but it is significantly harder to implement and what's more important, all of the device differences have to be handled. Awesome libraries implemented this way exist [pyalienfx][pyalienfx]. Please let me know if you really interested to see this module working on Linux. 

Example
-------
### Async

```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.reset();
    
    var position = alienfx.Position.ALL;
    var color = alienfx.Color.GREEN | alienfx.Brightness.FULL;
    
    alienfx.light(position, color);
    alienfx.update();
    
    alienfx.release();
});
```

### Sync

```javascript
var alienfx = require('alienfx');

alienfx.initializeSync();
alienfx.reset();

var position = alienfx.Position.ALL;
var color = alienfx.Color.GREEN | alienfx.Brightness.FULL;

alienfx.light(position, color);
alienfx.update();

alienfx.releaseSync();
```

More samples can be found in samples folder. It contains line-by-line ported apps from [AlienFX][AlienFX] SDK.

Build & Test
-----
Install [node-gyp]:
```javascript
npm install -g node-gyp
```

Build:
```javascript
node-gyp configure
node-gyp build
```

Test:
```javascript
npm test
```


Debugging
---------
In order to debug extension in Visual Studio, open ```build/Release/binding.sln``` go to ```Project Property Settings -> Debugging``` and put following settings:

| Property          | Value                                                |
| ----------------- |------------------------------------------------------|
| Command           | node.exe                                             |
| Command Arguments | ./tests/all.js                                       |
| Working Directory | $(ProjectDir)..\                                     |


This will allow to run unit tests with Visual Studio native debugger attached every time you hit F5.


API Reference
---
- [Functions & Properties](#functions-&-properties)
    - [isAvailable -> Boolean](#isavailable---boolean)
    - [initialize([callback]) -> Undefined](#initializecallback---undefined)
    - [initializeSync() -> Number](#initializesync---number)
    - [release([callback]) -> Undefined](#releasecallback---undefined)
    - [releaseSync() -> Number](#releasesync---number)
    - [getVersion([callback]) -> Undefined](#getversioncallback---undefined)
    - [getVersionSync(*out* version) -> Number](#getversionsyncout-version---number)
    - [reset() -> Number](#reset---number)
    - [update() -> Number](#update---number)
    - [updateDefault() -> Number](#updatedefault---number)
    - [light(position, color) -> Number](#lightposition-color---number)
    - [actionColor(position, action, color) -> Number](#actioncolorposition-action-color---number)
    - [actionColorEx(position, action, primaryColor, secondaryColor) -> Number](#actioncolorexposition-action-primarycolor-secondarycolor---number)
    - [getNumDevices([callback]) -> Undefined](#getnumdevicescallback---undefined)
    - [getNumDevicesSync(*out* numberOfDevices) -> Number](#getnumdevicessyncout-numberofdevices---number)
    - [getDeviceDescription(deviceIndex[, callback]) -> Undefined](#getdevicedescriptiondeviceindex-callback---undefined)
    - [getDeviceDescriptionSync(deviceIndex, *out* deviceDescription) -> Number](#getdevicedescriptionsyncdeviceindex-out-devicedescription---number)
    - [getNumLights(deviceIndex[, callback]) -> Undefined](#getnumlightsdeviceindex-callback---undefined)
    - [getNumLightsSync(deviceIndex, *out* numberOfLights) -> Undefined](#getnumlightssyncdeviceindex-out-numberoflights---undefined)
    - [getLightDescription(deviceIndex, lightIndex[, callback]) -> Undefined](#getlightdescriptiondeviceindex-lightindex-callback---undefined)
    - [getLightDescriptionSync(deviceIndex, lightIndex, *out* lightDescription) -> Undefined](#getlightdescriptionsyncdeviceindex-lightindex-out-lightdescription---undefined)
    - [getLightLocation(deviceIndex, lightIndex[, callback]) -> Undefined](#getlightlocationdeviceindex-lightindex-callback---undefined)
    - [getLightLocationSync(deviceIndex, lightIndex, *out* lightLocation) -> Undefined](#getlightlocationsyncdeviceindex-lightindex-out-lightlocation---undefined)
    - [getLightColor(deviceIndex, lightIndex[, callback]) -> Undefined](#getlightcolordeviceindex-lightindex-callback---undefined)
    - [getLightColorSync(deviceIndex, lightIndex, *out* lightColor) -> Number](#getlightcolorsyncdeviceindex-lightindex-out-lightcolor---number)
    - [setLightColor(deviceIndex, lightIndex, color) -> Number](#setlightcolordeviceindex-lightindex-color---number)
    - [setLightActionColor(deviceIndex, lightIndex, action, color) -> Number](#setlightactioncolordeviceindex-lightindex-action-color---number)
    - [setLightActionColorEx(deviceIndex, lightIndex, action, primaryColor, secondaryColor) -> Number](#setlightactioncolorexdeviceindex-lightindex-action-primarycolor-secondarycolor---number)
    - [setTiming(timing) -> Number](#settimingtiming---number)
- [Data Structures](#data-structures)
    - [Result](#result)
    - [Color](#color)
    - [Brightness](#brightness)
    - [DeviceType](#devicetype)
    - [Position](#position)
    - [Action](#action)

### Functions & Properties

#### isAvailable -> Boolean

*Description*: Indicates whether AlienFX.dll is found. If its not, all other functions will fail.

```javascript
var alienfx = require('alienfx');
alienfx.isAvailable; // Boolean
```

#### initialize([callback]) -> Undefined

*Description*: Initializes Alineware AlienFX system. It must be called prior to other library calls made. If this function is not called, the system will not be initialized and the other library functions will return ```Result.NOINIT``` or ```Result.FAILURE```.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    data.result; // Status code
});
```


#### initializeSync() -> Number

*Description*: Synchronously initializes Alineware AlienFX system. It must be called prior to other library calls made. If this function is not called, the system will not be initialized and the other library functions will return ```Result.NOINIT``` or ```Result.FAILURE```.

*Behavior*: Blocking.


```javascript
var alienfx = require('alienfx');
var result = alienfx.initializeSync();

result; // Status code
```


#### release([callback]) -> Undefined

*Description*: Releases Alienware AlienFX system. It may be called when the system is no longer needed. An application may choose to release the system and reinitialize it again, in response to a device arrival notification. Doing so will account for new devices added while the application is running.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.release(function (err, data) {
        data.result; // Status code
    });
});
```


#### releaseSync() -> Number

*Description*: Synchronously releases Alienware AlienFX system. It may be called when the system is no longer needed. An application may choose to release the system and reinitialize it again, in response to a device arrival notification. Doing so will account for new devices added while the application is running.

*Behavior*: Blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    var result = alienfx.releaseSync();
    result; // Status code
});
```


#### getVersion([callback]) -> Undefined

*Description*: Gets version of AlienFX SDK installed.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.getVersion(function (err, data) {
        data.version; // String
        data.result; // Status code
        
        alienfx.release();
    });
});
```


#### getVersionSync(*out* version) -> Number

*Description*: Gets version of AlienFX SDK installed in ```version``` argument and status code as return value.

*Behavior*: Blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    var out = {};
    var result;
    
    result = alienfx.getVersionSync(out);
    
    result; // Status code
    out.version; // String
    
    alienfx.release();
});
```


#### reset() -> Number

*Description*: Sets all lights in the Alienware AlienFX system to their "off" or uncolored state. Note that the change to the physical lights do not occur immediately. These changes occur only after a call to ```update```. For example, to disable all lights, call ```reset``` followed by ```update```.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    var result = alienfx.reset();
    alienfx.release();
    
    result; // Status code
});
```


#### update() -> Number

*Description*: Updates the Alienware AlienFX system by submitting any state changes (since the last call to ```reset```) to hardware.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.reset();
    var result = alienfx.update();
    alienfx.release();
    
    result; // Status code
});
```


#### updateDefault() -> Number

*Description*: Updates the Alienware AlienFX system by submitting any state changes (since the last call to ```reset```) to hardware, as well as setting the appropriate flags to enable the updated state to be the new power-on default. **Important Note**: as of now, this function has no effect. Heads up for future updates.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.reset();
    var result = alienfx.updateDefault();
    alienfx.release();
    
    result; // Status code
});
```


#### light(position, color) -> Number

*Description*: Submits a light command into the command queue, which sets the current color of any lights within the provided location mask to the provided color setting. Similar to ```setLightColor```, settings are changed in the active state and must be submitted with a call to ```update```. Location mask is a 32-bit field, where each of the first 27 bits represents a zone in the virtual cube representing the system. Color is packed into a 32-bit value as ARGB, with the alpha value corresponding to brightness.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.reset();
    
    var position = alienfx.Position.ALL;
    var color = alienfx.Color.GREEN | alienfx.Brightness.FULL;
    
    var result = alienfx.light(position, color);
    result; // Status code
    
    alienfx.update();
    alienfx.release();
});
```

#### actionColor(position, action, color) -> Number

*Description*: Sets the primary color and an action type for any devices with lights in a location. This function changes the current primary color and action type stored in the active state since the last ```reset``` call. It does NOT immediately update the physical light settings, until a call to ```update``` is made. If the action type is a morph, then the secondary color for the action is black.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.reset();

    var position = alienfx.Position.ALL;
    var action = alienfx.Action.MORPH;
    var color = alienfx.Color.GREEN | alienfx.Brightness.FULL;

    alienfx.actionColor(position, action, color);
    alienfx.update();
    
    alienfx.release();
});
```

#### actionColorEx(position, action, primaryColor, secondaryColor) -> Number

*Description*: Sets the primary and secondary color and an action type for any devices with lights in a location. It does NOT immediately update the physical light settings, until a call to ```update``` is made. If the action type is not a morph, then the secondary color is ignored.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.reset();

    var position = alienfx.Position.ALL;
    var action = alienfx.Action.MORPH;
    var primaryColor = alienfx.Color.GREEN | alienfx.Brightness.FULL;
    var secondaryColor = alienfx.Color.RED | alienfx.Brightness.FULL;

    alienfx.actionColorEx(position, action, primaryColor, secondaryColor);
    alienfx.update();
    
    alienfx.release();
});
```

#### getNumDevices([callback]) -> Undefined

*Description*: Gets the number of Alienware AlienFX devices attached to the system.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.getNumDevices(function (err, data) {
        data.result; // Status code
        data.numberOfDevices; // Number
    
        alienfx.release();
    });
});
```


#### getNumDevicesSync(*out* numberOfDevices) -> Number

*Description*: Synchronously gets the number of Alienware AlienFX devices attached to the system.

*Behavior*: Blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    var out = {};
    var result;

    result = alienfx.getNumDevicesSync(out);
    
    result; // Status code
    out.numberOfDevices; // Number
    
    alienfx.release();
});
```

#### getDeviceDescription(deviceIndex[, callback]) -> Undefined

*Description*: Gets the description and type of a device attached to the system.

*Behavior*: Non-blocking.


```javascript
var alienfx = require('alienfx');

alienfx.initialize(function (err, data) {
    alienfx.getDeviceDescription(0, function (err, data) {
        data.result; // Status code
        data.model; // String
        data.type; // Number
        
        alienfx.release();
    });
});
```

#### getDeviceDescriptionSync(deviceIndex, *out* deviceDescription) -> Number

*Description*: Synchronously gets the description and type of a device attached to the system.

*Behavior*: Blocking.


```javascript
alienfx.initialize(function (err, data) {
    var out = {};
    var result;

    result = alienfx.getDeviceDescriptionSync(0, out);
    
    result; // Status code
    out.model; // String
    out.type; // Number
        
    alienfx.release();
});
```


#### getNumLights(deviceIndex[, callback]) -> Undefined

*Description*: Gets the number of Alienware AlienFX lights attached to a device in the system.

*Behavior*: Non-blocking.


```javascript
alienfx.initialize(function (err, data) {
    alienfx.getNumLights(0, function (err, data) {
        data.result; // Status code
        data.numberOfLights; // Number
    
        alienfx.release();
    });
});
```

#### getNumLightsSync(deviceIndex, *out* numberOfLights) -> Undefined

*Description*: Synchronously gets the number of Alienware AlienFX lights attached to a device in the system.

*Behavior*: Blocking.


```javascript
alienfx.initialize(function (err, data) {
    var out = {};
    var result;

    result = alienfx.getNumLightsSync(0, out);
    
    result; // Status code
    out.numberOfLights; // Number
    
    alienfx.release();
});
```

#### getLightDescription(deviceIndex, lightIndex[, callback]) -> Undefined

*Description*: Gets the description of a light attached to the system.

*Behavior*: Non-blocking.


```javascript
alienfx.initialize(function (err, data) {
    alienfx.getLightDescription(0, 0, function (err, data) {
        data.result; // Status code
        data.lightDescription; // String
        
        alienfx.release();
    });
});
```

#### getLightDescriptionSync(deviceIndex, lightIndex, *out* lightDescription) -> Undefined

*Description*: Synchronously gets the description of a light attached to the system.

*Behavior*: Blocking.


```javascript
alienfx.initialize(function (err, data) {
    var out = {};
    var result;

    result = alienfx.getLightDescriptionSync(0, 0, out);
    
    result; // Status code
    out.lightDescription; // String
    
    alienfx.release();
});
```


#### getLightLocation(deviceIndex, lightIndex[, callback]) -> Undefined

*Description*: Gets the location of a light attached to the system.

*Behavior*: Non-blocking.


```javascript
alienfx.initialize(function (err, data) {
    alienfx.getLightLocation(0, 0, function (err, data) {
        data.result; // Status code
        data.lightLocation.x; // Number
        data.lightLocation.y; // Number
        data.lightLocation.z; // Number
        
        alienfx.release();
    });
});
```


#### getLightLocationSync(deviceIndex, lightIndex, *out* lightLocation) -> Undefined

*Description*: Synchronously gets the location of a light attached to the system.

*Behavior*: Blocking.


```javascript
alienfx.initialize(function (err, data) {
    var out = {};
    var result;

    result = alienfx.getLightLocationSync(0, 0, out);
    
    result; // Status code
    out.lightLocation.x; // Number
    out.lightLocation.y; // Number
    out.lightLocation.z; // Number
    
    alienfx.release();
});
```


#### getLightColor(deviceIndex, lightIndex[, callback]) -> Undefined

*Description*: Gets the color of a light attached to the system. This function provides the current color stored in the active state. It does not necessarily represent the color of the physical light. To ensure that the returned value represents the state of the physical light, call this function immediately after a call to ```update``` and before the next call to ```reset```. Also note that some hardware has limitations such as index color, which preclude obtaining the exact RGB representation.

*Behavior*: Non-blocking


```javascript
alienfx.initialize(function (err, data) {
    alienfx.getLightColor(0, 0, function (err, data) {
        data.result; // Status code
        data.lightColor.red; // Number
        data.lightColor.green; // Number
        data.lightColor.blue; // Number
        data.lightColor.brightness; // Number
        
        alienfx.release();
    });
});
```


#### getLightColorSync(deviceIndex, lightIndex, *out* lightColor) -> Number

*Description*: Synchronously gets the color of a light attached to the system. This function provides the current color stored in the active state. It does not necessarily represent the color of the physical light. To ensure that the returned value represents the state of the physical light, call this function immediately after a call to ```update``` and before the next call to ```reset```. Also note that some hardware has limitations such as index color, which preclude obtaining the exact RGB representation.

*Behavior*: Blocking


```javascript
alienfx.initialize(function (err, data) {
    var out = {};
    var result;

    result = alienfx.getLightColorSync(0, 0, out);
    
    result; // Status code
    out.lightColor.red; // Number
    out.lightColor.green; // Number
    out.lightColor.blue; // Number
    out.lightColor.brightness; // Number
        
    alienfx.release();
});
```


#### setLightColor(deviceIndex, lightIndex, color) -> Number

*Description*: Submits a light command into the command queue, which sets the current color of a light to the provided color value. This function changes the current color stored in active state since the last reset. It does not immediately update the physical light settings, instead requiring a call to ```update```.

*Behavior*: Non-blocking.


```javascript
alienfx.initialize(function (err, data) {
    alienfx.reset();
    
    var color = {
        red: 0xFF,
        green: 0x00,
        blue: 0x00,
        brightness: 0xFF
    };

    var result = alienfx.setLightColor(0, 0, color);
    result; // Status code
    
    alienfx.update();
    alienfx.release();
});
```


#### setLightActionColor(deviceIndex, lightIndex, action, color) -> Number

*Description*: Sets the primary color and an action type of a light. This function changes the current color and action type stored in the active state since the last ```reset``` call. It does NOT immediately update the physical light settings, until a call to ```update``` is made. If the action type is a morph, then the secondary color for the action is black.

*Behavior*: Non-blocking.


```javascript
alienfx.initialize(function (err, data) {
    alienfx.reset();
    
    var color = {
        red: 0xFF,
        green: 0x00,
        blue: 0x00,
        brightness: 0xFF
    };
    
    var action = alienfx.Action.MORPH;

    var result = alienfx.setLightActionColor(0, 0, action, color);
    result; // Status code
    
    alienfx.update();
    alienfx.release();
});
```

#### setLightActionColorEx(deviceIndex, lightIndex, action, primaryColor, secondaryColor) -> Number

*Description*: Sets the primary and secondary colors and an action type of a light. This function changes the current color and action type stored in the active state since the last ```reset``` call. It does NOT immediately update the physical light settings, until a call to ```update``` is made. If the action type is a morph, then the secondary color for the action is black.

*Behavior*: Non-blocking.


```javascript
alienfx.initialize(function (err, data) {
    alienfx.reset();
    
    var primaryColor = {
        red: 0xFF,
        green: 0x00,
        blue: 0x00,
        brightness: 0xFF
    };

    var secondaryColor = {
        red: 0x00,
        green: 0xFF,
        blue: 0x00,
        brightness: 0xFF
    };
    
    var action = alienfx.Action.MORPH;

    var result = alienfx.setLightActionColorEx(0, 0, action, primaryColor, secondaryColor);
    result; // Status code
    
    alienfx.update();
    alienfx.release();
});
```


#### setTiming(timing) -> Number

*Description*: Sets the tempo for actions. This function changes the current tempo or timing to be used for the next actions. It does NOT immediately update the physical light settings, until a call to ```update``` is made.

*Behavior*: Non-blocking.


```javascript
alienfx.initialize(function (err, data) {
    alienfx.reset();

    var result = alienfx.setTiming(200);
    result; // Status code
    
    alienfx.update();
    alienfx.release();
});
```


### Data Structures

#### Result

*Description*: Represents status code of an operation.

*Type*: Number

*Predefined values*:
```javascript
alienfx.Result.SUCCESS
alienfx.Result.FAILURE
alienfx.Result.NOINIT
alienfx.Result.NODEVS
alienfx.Result.NOLIGHTS
alienfx.Result.BUFFSIZE
```

#### Color

*Description*: 32-bit value as ARGB, with the alpha value corresponding to brightness.

*Type*: Number

*Predefined values*:
```javascript
alienfx.Color.OFF
alienfx.Color.BLACK
alienfx.Color.RED
alienfx.Color.GREEN
alienfx.Color.BLUE
alienfx.Color.WHITE
alienfx.Color.YELLOW
alienfx.Color.ORANGE
alienfx.Color.PINK
alienfx.Color.CYAN
```
 

#### Brightness

*Description*: 32-bit value represents brightness of a light. Actual brightness is encoded in 4-th byte of a value.

*Type*: Number

*Predefined values*:
```javascript
alienfx.Color.FULL
alienfx.Color.HALF
alienfx.Color.MIN
```


#### DeviceType

*Description*: Represents type of AlienFX device.

*Type*: Number.

*Predefined values*:
```javascript
alienfx.DeviceType.UNKNOWN
alienfx.DeviceType.NOTEBOOK
alienfx.DeviceType.DESKTOP
alienfx.DeviceType.SERVER
alienfx.DeviceType.DISPLAY
alienfx.DeviceType.MOUSE
alienfx.DeviceType.KEYBOARD
alienfx.DeviceType.GAMEPAD
alienfx.DeviceType.SPEAKER
alienfx.DeviceType.OTHER
```

#### Position

*Description*: Represents position of a light.

*Type*: Number

*Predefined values*:
```javascript
// Near Z-plane light definitions
alienfx.Position.FRONT_LOWER_LEFT
alienfx.Position.FRONT_LOWER_CENTER
alienfx.Position.FRONT_LOWER_RIGHT
alienfx.Position.FRONT_MIDDLE_LEFT
alienfx.Position.FRONT_MIDDLE_CENTER
alienfx.Position.FRONT_MIDDLE_RIGHT
alienfx.Position.FRONT_UPPER_LEFT
alienfx.Position.FRONT_UPPER_CENTER
alienfx.Position.FRONT_UPPER_RIGHT

// Mid Z-plane light definitions
alienfx.Position.MIDDLE_LOWER_LEFT
alienfx.Position.MIDDLE_LOWER_CENTER
alienfx.Position.MIDDLE_LOWER_RIGHT
alienfx.Position.MIDDLE_MIDDLE_LEFT
alienfx.Position.MIDDLE_MIDDLE_CENTER
alienfx.Position.MIDDLE_MIDDLE_RIGHT
alienfx.Position.MIDDLE_UPPER_LEFT
alienfx.Position.MIDDLE_UPPER_CENTER
alienfx.Position.MIDDLE_UPPER_RIGHT

// Far Z-plane light definitions
alienfx.Position.REAR_LOWER_LEFT
alienfx.Position.REAR_LOWER_CENTER
alienfx.Position.REAR_LOWER_RIGHT
alienfx.Position.REAR_MIDDLE_LEFT
alienfx.Position.REAR_MIDDLE_CENTER
alienfx.Position.REAR_MIDDLE_RIGHT
alienfx.Position.REAR_UPPER_LEFT
alienfx.Position.REAR_UPPER_CENTER
alienfx.Position.REAR_UPPER_RIGHT

// Combination bit masks
alienfx.Position.ALL
alienfx.Position.ALL_RIGHT
alienfx.Position.ALL_LEFT
alienfx.Position.ALL_UPPER
alienfx.Position.ALL_LOWER
alienfx.Position.ALL_FRONT
alienfx.Position.ALL_REAR
```

#### Action

*Description*: Represents type of an action that can be applied to a light.

*Type*: Number

*Predefined values*:
```javascript
alienfx.Action.MORPH
alienfx.Action.PULSE
alienfx.Action.COLOR
```


[Node]: http://nodejs.org
[AlienFX]: http://www.alienware.com/landings/alienfx/
[pyalienfx]: https://code.google.com/p/pyalienfx/
[node-gyp]: https://github.com/TooTallNate/node-gyp
