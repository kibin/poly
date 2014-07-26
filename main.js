(function(){
  var $morph, $top, $bottom, setPartsColor, partsBgc, $win, lastTop, scrollHeight, squareSide;
  $morph = $('.polymorph');
  $top = $morph.find('.top');
  $bottom = $morph.find('.bottom');
  setPartsColor = setColor($top, $bottom);
  partsBgc = setRandomColor();
  $win = $(window);
  lastTop = $win.scrollTop();
  scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  squareSide = Math.ceil(window.innerWidth / 10);
  setMorphPosition();
  setMorphForm();
  centerMorph();
  $(window).on('scroll touchmove', function(e){
    var ref$;
    e.preventDefault();
    if (0 < (ref$ = $win.scrollTop()) && ref$ < scrollHeight) {
      setPartsColor(++partsBgc);
    }
    setMorphPosition();
    return setMorphForm();
  }).on('resize', function(){
    squareSide = Math.ceil(window.innerWidth / 10);
    scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    setMorphPosition();
    setMorphForm();
    return centerMorph();
  });
  function setRandomColor(){
    var hue;
    hue = Math.floor(Math.random() * 256);
    setPartsColor(hue);
    return hue;
  }
  function setColor($top, $bottom){
    return function(hue){
      var color;
      color = "hsla(" + hue + ", 100%, 50%, 100)";
      $top.css('border-bottom-color', color);
      return $bottom.css('border-top-color', color);
    };
  }
  function setMorphPosition(){
    var height;
    height = window.innerHeight - $morph.outerHeight(true);
    return $morph.css('top', $win.scrollTop() / scrollHeight * height);
  }
  function centerMorph(){
    return $morph.css('left', (window.innerWidth - $morph.outerWidth(true)) / 2);
  }
  function setMorphForm(){
    var sizes, settings, styles;
    sizes = getSizes();
    settings = getMorphSettings(sizes);
    styles = getMorphStyles(settings);
    $morph.css(styles.morph);
    $top.css(styles.top);
    return $bottom.css(styles.bottom);
  }
  function getMorphStyles(settings){
    var styles, name, object, style, ref$, value, delta, percent;
    styles = {};
    for (name in settings) {
      object = settings[name];
      styles[name] == null && (styles[name] = {});
      for (style in ref$ = object.start) {
        value = ref$[style];
        delta = object.end[style] - value;
        percent = $win.scrollTop() / scrollHeight;
        if (percent > 0.5) {
          percent -= 0.5;
        }
        styles[name][style] = percent * delta * 2 + value;
      }
    }
    return styles;
  }
  function getSizes(){
    var squareDiagonal, squareMargin, triangleHeight, triangleWide, triangleWideHeight, circleDiameter;
    squareDiagonal = Math.ceil(squareSide * Math.sqrt(2));
    squareMargin = Math.ceil((squareDiagonal - squareSide) / 2);
    triangleHeight = Math.sqrt(3) / 2 * squareDiagonal;
    triangleWide = Math.ceil(squareSide * 3 / Math.sqrt(3));
    triangleWideHeight = Math.ceil(Math.sqrt(3) / 2 * triangleWide);
    circleDiameter = squareSide * 2;
    return {
      side: squareSide,
      diagonal: squareDiagonal,
      margin: squareMargin,
      diameter: circleDiameter,
      height: triangleHeight,
      wideSide: triangleWide,
      wideHeight: triangleWideHeight
    };
  }
  function getMorphSettings(szs){
    var top, bottom, morph;
    if ($win.scrollTop() < scrollHeight / 2) {
      top = {
        start: {
          marginTop: (szs.diameter - szs.diagonal) / 2,
          borderBottomWidth: szs.diagonal / 2,
          borderLeftWidth: szs.diagonal / 2,
          borderRightWidth: szs.diagonal / 2,
          marginLeft: (szs.diameter - szs.diagonal) / 2
        },
        end: {
          marginTop: (szs.diameter - szs.diagonal * Math.sqrt(3) / 1.5) / 2,
          borderBottomWidth: szs.height,
          borderLeftWidth: szs.diagonal / 2,
          borderRightWidth: szs.diagonal / 2,
          marginLeft: (szs.diameter - szs.diagonal) / 2
        }
      };
      bottom = {
        start: {
          borderLeftWidth: szs.diagonal / 2,
          borderRightWidth: szs.diagonal / 2,
          marginLeft: (szs.diameter - szs.diagonal) / 2,
          borderTopWidth: szs.diagonal / 2
        },
        end: {
          borderLeftWidth: szs.diagonal / 2,
          borderRightWidth: szs.diagonal / 2,
          marginLeft: (szs.diameter - szs.diagonal) / 2,
          borderTopWidth: 0
        }
      };
      morph = {
        start: {
          width: szs.diameter,
          height: szs.diameter,
          margin: 0
        },
        end: {
          width: szs.diameter,
          height: szs.diameter,
          margin: 0
        }
      };
    } else {
      top = {
        start: {
          marginTop: (szs.diameter - szs.diagonal * Math.sqrt(3) / 1.5) / 2,
          borderBottomWidth: szs.height,
          borderLeftWidth: szs.diagonal / 2,
          borderRightWidth: szs.diagonal / 2,
          marginLeft: (szs.diameter - szs.diagonal) / 2
        },
        end: {
          marginTop: szs.side / -2 - 10,
          borderBottomWidth: Math.ceil(szs.wideHeight + 10),
          marginLeft: (szs.diagonal - szs.wideSide) / 2 - szs.margin,
          borderLeftWidth: Math.ceil(szs.wideSide / 2),
          borderRightWidth: Math.ceil(szs.wideSide / 2)
        }
      };
      bottom = {
        start: {
          borderLeftWidth: szs.diagonal / 2,
          borderRightWidth: szs.diagonal / 2,
          marginLeft: (szs.diameter - szs.diagonal) / 2,
          borderTopWidth: 0
        },
        end: {
          marginLeft: (szs.diagonal - szs.wideSide) / 2 - szs.margin,
          borderLeftWidth: Math.ceil(szs.wideSide / 2),
          borderRightWidth: Math.ceil(szs.wideSide / 2),
          borderTopWidth: 0
        }
      };
      morph = {
        start: {
          width: szs.diameter,
          height: szs.diameter,
          margin: 0
        },
        end: {
          width: szs.side,
          height: szs.side,
          margin: szs.side / 2
        }
      };
    }
    return {
      top: top,
      bottom: bottom,
      morph: morph
    };
  }
}).call(this);
