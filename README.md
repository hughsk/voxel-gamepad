# voxel-gamepad #

Adds gamepad support for voxel.js using the HTML5 Gamepad API.

If you're looking for a gamepad which works well cross-platform, try the
[Logitech F310](http://www.logitech.com/en-au/support/gamepad-f310). An Xbox
controller should suffice on Windows.

Not working? Try the [gamepad tester](http://www.html5rocks.com/en/tutorials/doodles/gamepad/gamepad-tester/tester.html)
and see how it goes - otherwise, open an issue :)

## Installation ##

``` bash
npm install voxel-gamepad
```

## Usage ##

### `require('voxel-gamepad')(game)` ###

Call the function on the game instance to load up gamepad support. Now, you
should be able to connect your controller, open up the game, and press one of
the controller's face buttons to start using your gamepad.

``` javascript
var engine = require('voxel-engine')
  , gamepad = require('voxel-gamepad')

var game = engine({
    materials: ['#fff', '#000']
  , materialFlatColor: true
  , chunkDistance: 2
  , contols: {
    discreteFire: true
  }
})

gamepad(game)
```
