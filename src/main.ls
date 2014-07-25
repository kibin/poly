$morph = $ \.polymorph
$top = $morph.find \.top
$bottom = $morph.find \.bottom
set-parts-color = set-color $top, $bottom
parts-bgc = set-random-color!
last-top = window.scroll-y
scroll-height = document.document-element.scroll-height - window.inner-height
square-side = Math.ceil window.inner-width / 10

set-morph-position!
set-morph-form!
center-morph!

##
# Events
$ window
  .on 'scroll touchmove', ->
    set-parts-color ++parts-bgc if 0 < window.scroll-y < scroll-height
    set-morph-position!
    set-morph-form!
  .on \resize, ->
    square-side := Math.ceil window.inner-width / 10
    scroll-height :=
      document.document-element.scroll-height - window.inner-height

    set-morph-position!
    set-morph-form!
    center-morph!
###

##
# Colors
function set-random-color
  hue = Math.floor Math.random! * 256

  set-parts-color hue
  hue

function set-color $top, $bottom
  (hue) ->
    color = "hsla(#{hue}, 100%, 50%, 100)"
    $top.css \border-bottom-color, color
    $bottom.css \border-top-color, color
###

##
# Forms
function set-morph-position
  height = window.inner-height - $morph.outer-height true

  $morph.css \top, window.scroll-y / scroll-height * height

function center-morph
  $morph.css \left, (window.inner-width - $morph.outer-width true) / 2

function set-morph-form
  sizes = get-sizes!
  settings = get-morph-settings sizes
  styles = get-morph-styles settings

  $morph.css styles.morph
  $top.css styles.top
  $bottom.css styles.bottom

function get-morph-styles settings
  styles = {}
  for name, object of settings
    styles[name] ?= {}

    for style, value of object.start
      delta = object.end[style] - value
      percent = window.scroll-y / scroll-height
      percent -= 0.5 if percent > 0.5

      styles[name][style] = percent * delta * 2 + value

  styles

###

##
# Settings
function get-sizes
  square-diagonal = Math.ceil square-side * Math.sqrt 2
  square-margin = Math.ceil (square-diagonal - square-side) / 2
  triangle-height = (Math.sqrt 3) / 2 * square-diagonal
  triangle-wide = Math.ceil square-side * 3 / Math.sqrt 3
  triangle-wide-height = Math.ceil (Math.sqrt 3) / 2 * triangle-wide
  circle-diameter = square-side * 2

  side: square-side
  diagonal: square-diagonal
  margin: square-margin
  diameter: circle-diameter
  height: triangle-height
  wide-side: triangle-wide
  wide-height: triangle-wide-height

# Страхота длиннокота. Просто получаем значения в начале, середине, конце.
function get-morph-settings szs
  if window.scrollY < scroll-height / 2
    top =
      start:
        margin-top: (szs.diameter - szs.diagonal) / 2
        border-bottom-width: szs.diagonal / 2
        border-left-width: szs.diagonal / 2
        border-right-width: szs.diagonal / 2
        margin-left: (szs.diameter - szs.diagonal) / 2
      end:
        margin-top: (szs.diameter - szs.diagonal * (Math.sqrt 3) / 1.5) / 2
        border-bottom-width: szs.height
        border-left-width: szs.diagonal / 2
        border-right-width: szs.diagonal / 2
        margin-left: (szs.diameter - szs.diagonal) / 2

    bottom =
      start:
        border-left-width: szs.diagonal / 2
        border-right-width: szs.diagonal / 2
        margin-left: (szs.diameter - szs.diagonal) / 2
        border-top-width: szs.diagonal / 2
      end:
        border-left-width: szs.diagonal / 2
        border-right-width: szs.diagonal / 2
        margin-left: (szs.diameter - szs.diagonal) / 2
        border-top-width: 0

    morph =
      start:
        width: szs.diameter
        height: szs.diameter
        margin: 0
      end:
        width: szs.diameter
        height: szs.diameter
        margin: 0
  else
    top =
      start:
        margin-top: (szs.diameter - szs.diagonal * (Math.sqrt 3) / 1.5) / 2
        border-bottom-width: szs.height
        border-left-width: szs.diagonal / 2
        border-right-width: szs.diagonal / 2
        margin-left: (szs.diameter - szs.diagonal) / 2
      end:
        margin-top: szs.side / -2 - 10                        # хакота
        border-bottom-width: Math.ceil szs.wide-height + 10   # хакота
        margin-left: (szs.diagonal - szs.wide-side) / 2 - szs.margin
        border-left-width: Math.ceil szs.wide-side / 2
        border-right-width: Math.ceil szs.wide-side / 2

    bottom =
      start:
        border-left-width: szs.diagonal / 2
        border-right-width: szs.diagonal / 2
        margin-left: (szs.diameter - szs.diagonal) / 2
        border-top-width: 0
      end:
        margin-left: (szs.diagonal - szs.wide-side) / 2 - szs.margin
        border-left-width: Math.ceil szs.wide-side / 2
        border-right-width: Math.ceil szs.wide-side / 2
        border-top-width: 0

    morph =
      start:
        width: szs.diameter
        height: szs.diameter
        margin: 0
      end:
        width: szs.side
        height: szs.side
        margin: szs.side / 2

  { top, bottom, morph }
###
