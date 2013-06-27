var highlight = require('voxel-highlight')
var createGame = require('voxel-engine')
var player = require('voxel-player')
var voxel = require('voxel')
var walk = require('voxel-walk')
var gamepad = require('./')
var notice = document.getElementById('notice')

setTimeout(function() {
  var game = window.game = createGame({
      materials: ['#fff', '#000']
    , materialFlatColor: true
    , generate: voxel.generator['Valley']
    , chunkDistance: 2
    , contols: {
      discreteFire: true
    }
    // Only if you don't want pointer lock
    // as well...
    , optout: true
  })

  game.appendTo(document.body)

  var controls = gamepad(game)
  var createPlayer = player(game)
  var avatar = createPlayer('player.png')

  avatar.possess()
  avatar.yaw.position.set(2, 20, 4)

  var currentMaterial = 1
  var target = game.controls.target()
  var blockPosPlace, blockPosErase
  var hl = game.highlighter = highlight(game, { color: 0xff0000 })
  hl.on('highlight', function (voxelPos) { blockPosErase = voxelPos })
  hl.on('remove', function (voxelPos) { blockPosErase = null })
  hl.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })
  hl.on('remove-adjacent', function (voxelPos) { blockPosPlace = null })

  game.on('fire', function (target, state) {
    var position = blockPosPlace
    if (position) {
      game.createBlock(position, 1)
    }
    else {
      position = blockPosErase
      if (position) game.setBlock(position, 0)
    }
  })

  var pastEnabled = false
  var message = {
      connected: 'Gamepad connected!'
    , disconnected: 'Gamepad not detected. Click on the screen, connect your gamepad and press a face button to continue!'
  }

  notice.innerHTML = message.disconnected
  game.on('tick', function() {
    walk.render(target.playerSkin)
    var vx = Math.abs(target.velocity.x)
    var vz = Math.abs(target.velocity.z)
    if (vx > 0.001 || vz > 0.001) walk.stopWalking()
    else walk.startWalking()

    if (controls.enabled && !pastEnabled) {
      notice.innerHTML = message.connected
    } else
    if (!controls.enabled && pastEnabled) {
      notice.innerHTML = message.disconnected
    }
    pastEnabled = controls.enabled
  })
}, 500)
