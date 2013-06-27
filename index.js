var gp = require('gp-controls')

module.exports = gamepad

function gamepad(game) {
  var controls = gp({
      '<up>': 'up'
    , '<down>': 'down'
    , '<left>': 'left'
    , '<right>': 'right'
    , '<action 1>': 'jump'
    , '<shoulder-top-right>': 'fire'
    , '<shoulder-top-left>': 'firealt'
    , '<axis-left-x>': 'move_x'
    , '<axis-left-y>': 'move_y'
    , '<axis-right-x>': 'look_x'
    , '<axis-right-y>': 'look_y'
  })

  var inputs = controls.inputs
    , looker = game.controls.createWriteRotationStream()

  game.on('tick', function() {
    controls.poll()
    if (!controls.enabled) return

    looker.write({
        dx: threshold(inputs.look_x, 0.1) * +11
      , dy: threshold(inputs.look_y, 0.1) * -11
    })

    game.controls.write({
        forward: inputs.move_y < -0.1
      , backward: inputs.move_y > 0.1
      , left: inputs.move_x < -0.1
      , right: inputs.move_x > 0.1
      , fire: inputs.fire > 0.1
      , firealt: inputs.firealt > 0.1
      , jump: inputs.jump > 0.1
    })
  })

  return controls
}

// Makes sure the axes start moving
// at 0.1 and -0.1, rather than 0. Most
// gamepads might have very low values
// when idle, causing a subtle drift in view!
function threshold(n, t) {
  if (Math.abs(n) < t) return 0
  return n > 0 ? n - t : n + t
}
