
$('.hex').click(function() {
  $(this).toggleClass('alive')
})

$('#loop-toggle').click(function() {
  var $this      = $(this),
      nextStatus = $this.text()

  if (nextStatus === 'Run') {
    $this.text('Stop')
  }

  if (nextStatus === 'Stop') {
    $this.text('Run')
    $('.hex').toggleClass('alive')
  }
})

var createWorld    = gamesOfLife.createWorld,
    transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3),
    hexagonal      = gamesOfLife.space.hexagonal

var world = createWorld(hexagonal)

var evolve = world(transitionRule)

