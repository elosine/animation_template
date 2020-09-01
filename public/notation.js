// GLOBAL VARIABLES ----------------------------------------------------- //
// CLOCK ------------------------- >
var framect = 0;
var delta = 0.0;
var lastFrameTimeMs = 0.0;
// TIMING ------------------------ >
var FRAMERATE = 60.0;
var MSPERFRAME = 1000.0 / FRAMERATE;
// SVG --------------------------- >
var SVG_NS = "http://www.w3.org/2000/svg";
////////////////////////////////////////////////////////////////////////////


// START UP SEQUENCE ---------------------------------------------------- //
// 01: START TIME SYNC ENGINE ---------------- >
var ts = timesync.create({
  //server: 'https://safe-plateau-48516.herokuapp.com/timesync',
  server: '/timesync',
  interval: 1000
});
//01 MAKE NOTATION OBJECT
var dial = mkDialNO(0, 200, 200, 50, 20)
// LAST: START TIME SYNC ENGINE -------------- >
requestAnimationFrame(animationEngine);
////////////////////////////////////////////////////////////////////////////

// CREATE DIAL NOTATION OBJECT ------------------------------------------- //
function mkDialNO(ix, w, h, x, y) {
  var t_cx = w / 2;
  var t_cy = h / 2;
  var t_radius = (w/2)/2;
  // Create OBJECT
  var t_NO = {}
  // Generate ID
  var t_id = 'dial' + ix;
  t_NO['id'] = t_id;
  // Make SVG Canvas ------------- >
  var t_canvasID = t_id + 'canvas';
  var t_cvs = mkSVGcanvas(t_canvasID, w, h);
  t_NO['canvas'] = t_cvs;
  // Make jsPanel ----------------- >
  var t_panelID = t_id + 'panel';
  var t_panel = mkpanel(t_panelID, t_cvs, x, y, w, h, 'Dial ' + ix);
  t_NO['panel'] = t_panel;
  // Create Static Elements --------- >
  //// Ring ---------- //
  var t_ring = document.createElementNS(SVG_NS, "circle");
  t_ring.setAttributeNS(null, "cx", t_cx);
  t_ring.setAttributeNS(null, "cy", t_cy);
  t_ring.setAttributeNS(null, "r", t_radius);
  t_ring.setAttributeNS(null, "stroke", "rgb(153, 255, 0)");
  t_ring.setAttributeNS(null, "stroke-width", 4);
  t_ring.setAttributeNS(null, "fill", "none");
  var t_ringID = t_id + 'ring';
  t_ring.setAttributeNS(null, "id", t_ringID);
  t_cvs.appendChild(t_ring);
  t_NO['ring'] = t_ring;
  //// Wand
  return t_NO;
}
////////////////////////////////////////////////////////////////////////////


// MAKE SVG CANVAS ------------------------------------------------------ //
function mkSVGcanvas(canvasID, w, h) {
  var tsvgCanvas = document.createElementNS(SVG_NS, "svg");
  tsvgCanvas.setAttributeNS(null, "width", w);
  tsvgCanvas.setAttributeNS(null, "height", h);
  tsvgCanvas.setAttributeNS(null, "id", canvasID);
  tsvgCanvas.style.backgroundColor = "black";
  return tsvgCanvas;
}
////////////////////////////////////////////////////////////////////////////


// MAKE JSPANEL ------------------------------------------------------ //
function mkpanel(panelid, svgcanvas, posx, posy, w, h, title) {
  var tpanel;
  jsPanel.create({
    position: 'center-top',
    id: panelid,
    contentSize: w.toString() + " " + h.toString(),
    header: 'auto-show-hide',
    headerControls: {
      minimize: 'remove',
      smallify: 'remove',
      maximize: 'remove',
      close: 'remove'
    },
    contentOverflow: 'hidden',
    headerTitle: title,
    theme: "light",
    content: svgcanvas,
    resizeit: {
      aspectRatio: 'content',
      resize: function(panel, paneldata, e) {}
    },
    callback: function() {
      tpanel = this;
    }
  });
  return tpanel;
}
////////////////////////////////////////////////////////////////////////////


// UPDATE --------------------------------------------------------------- //
function update(aMSPERFRAME, currTimeMS) {
  framect++;
}
////////////////////////////////////////////////////////////////////////////


// DRAW ----------------------------------------------------------------- //
function draw() {}
////////////////////////////////////////////////////////////////////////////


// ANIMATION ENGINE ----------------------------------------------------- //
function animationEngine(timestamp) {
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;
  while (delta >= MSPERFRAME) {
    update(MSPERFRAME);
    draw();
    delta -= MSPERFRAME;
  }
  requestAnimationFrame(animationEngine);
}
////////////////////////////////////////////////////////////////////////////
