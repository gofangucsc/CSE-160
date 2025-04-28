// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotation;
  void main() {
    gl_Position = u_GlobalRotation * u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`


//Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let gAnimalGlobalRotation;

function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  //gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", {preservedDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
/*
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
*/
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix){
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  gAnimalGlobalRotation = gl.getUniformLocation(gl.program, 'u_GlobalRotation');
  if (!gAnimalGlobalRotation){
    console.log('Failed to get the storage location of u_GlobalRotaion');
    return;
  }

  //Set an initial value fo rhtis matrix to identity
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);

}

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

//Globals related UI elements
let g_selectedColor=[1.0,1.0,1.0,1.0];
let g_selectedSize=5;
let g_selectedType=POINT;
let g_selectedSegment=10;
let g_globalAngle=0;
let g_uppertAngle=0;
let g_lowertAngle=0;
let g_finAngle=0;
let g_uppertAnimation=false;
let g_lowertAnimation=false;
let g_finAnimation=false;

//Set up actions for the HTML UI elements
function addActionsForHtmlUI(){

  // Button Events (Shape Type)
  document.getElementById('animationLowertOffButton').onclick = function() {g_lowertAnimation=false;};
  document.getElementById('animationLowertOnButton').onclick = function() {g_lowertAnimation=true;};
  document.getElementById('animationUppertOffButton').onclick = function() {g_uppertAnimation=false;};
  document.getElementById('animationUppertOnButton').onclick = function() {g_uppertAnimation=true;};
  document.getElementById('animationFinOffButton').onclick = function() {g_finAnimation=false;};
  document.getElementById('animationFinOnButton').onclick = function() {g_finAnimation=true;};
  document.getElementById('animationallOffButton').onclick = function() {g_finAnimation=false; g_lowertAnimation=false; g_uppertAnimation=false;};
  document.getElementById('animationallOnButton').onclick = function() {g_finAnimation=true; g_lowertAnimation=true; g_uppertAnimation=true;};

  // Color Slider Events
  //document.getElementById('redSlide').addEventListener('mouseup',   function() { g_selectedColor[0] = this.value/100;});
  document.getElementById('uppertSlide').addEventListener('mousemove', function() { g_uppertAngle = this.value; renderAllShapes();});
  document.getElementById('lowertSlide').addEventListener('mousemove',  function() { g_lowertAngle = this.value; renderAllShapes();});
  document.getElementById('finSlide').addEventListener('mousemove',  function() { g_finAngle = this.value; renderAllShapes();});

  //Size Slider Events
  document.getElementById('angleSlide').addEventListener('mousemove', function() {g_globalAngle = this.value; renderAllShapes(); });
  
}

function main() {

  //Set up canvas and gl variables
  setupWebGL();
  //Set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  //Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  //canvas.onmousemove = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev) } };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.5, 0.6, 0.7);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  //renderAllShapes();
  requestAnimationFrame(tick);

}

var g_startTime=performance.now()/1000.0;
var g_seconds=performance.now()/1000.0-g_startTime;


// Called by browser repeatedly whenever its time
function tick() {
  g_seconds=performance.now()/1000.0-g_startTime;
  console.log(g_seconds);

  // Update Animation Angles
  updateAnimationAngles();

  // Draw everything
  renderAllShapes();

  // Tell the browser to update again when it has time
  requestAnimationFrame(tick);
}

//Update the angles of everything if currently animated
function updateAnimationAngles() {
  if (g_uppertAnimation){
    g_uppertAngle = (15*Math.sin(g_seconds));
  }

  if (g_lowertAnimation){
    g_lowertAngle = (25*Math.sin(g_seconds+5));
  }

  if (g_finAnimation){
    g_finAngle = (25*Math.sin(g_seconds+10));
  }
  

}

//Draw every shape that is supposed to be in the canvas
function renderAllShapes(){

  //Check the time at the start of this funciton
  var startTime = performance.now();

  //Pass the matrix to u_ModelMatrix attribute
  var globalRotMat=new Matrix4().rotate(g_globalAngle,0,1,0);
  gl.uniformMatrix4fv(gAnimalGlobalRotation, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //var len = g_points.length;
  //var len = g_shapesList.length;
  //for(var i = 0; i < len; i++) {
  //  g_shapesList[i].render();
  //}

  //Draw a test Triangle
  //drawTriangle3D( [-1.0,0.0,0.0, -0.5,-1.0,0.0, 0.0,0.0,0.0] );
/*
  //Draw the body cube
  var body = new Cube();
  body.color = [1.0,0.0,0.0,1.0];
  body.matrix.translate(-.25, -.75, 0.0);
  body.matrix.rotate(-5,1,0,0);
  body.matrix.scale(0.5, .3, .5);
  body.render();*/

  //Draw a main body
  var mainBod = new Cube();
  mainBod.color = [.1,0,.8,1];
  mainBod.matrix.translate(0, -.3, -.3);
  //mainBod.matrix.rotate(-5,1,0,0);
  //mainBod.matrix.rotate(-g_yellowAngle,0,0,1);
  var upperMouthCoordinates=new Matrix4(mainBod.matrix);
  var lowerMouthCoordinates=new Matrix4(mainBod.matrix);
  var bodyCoordinates=new Matrix4(mainBod.matrix);
  var leftfinCoordinates=new Matrix4(mainBod.matrix);
  var rightfinCoordinates=new Matrix4(mainBod.matrix);
  var dorsalfinCoordinates=new Matrix4(mainBod.matrix);
  var lefteyeCoordinates=new Matrix4(mainBod.matrix);
  var righteyeCoordinates=new Matrix4(mainBod.matrix);
  mainBod.matrix.scale(.35, .35, .5);
  mainBod.matrix.translate(-.3, 0, 0);
  mainBod.render();

  // Draw Upper tail
  var upperTail = new Cube();
  upperTail.color = [0,0,.8,1];
  upperTail.matrix = bodyCoordinates;
  upperTail.matrix.translate(.005,.025,.4);
  upperTail.matrix.rotate(-g_uppertAngle,0,2,0);
  var lowertailCoordinates=new Matrix4(upperTail.matrix);
  upperTail.matrix.scale(.3,.3,.4);
  upperTail.matrix.translate(-.3,0,-0.0001);
  upperTail.render();

  // Draw Lower tail
  var lowerTail = new Cube();
  lowerTail.color = [0,0,.8,1];
  lowerTail.matrix = lowertailCoordinates;
  lowerTail.matrix.translate(.015,.05,.3);
  lowerTail.matrix.rotate(-g_lowertAngle,0,2,0);
  var topfinCoordinates=new Matrix4(lowerTail.matrix);
  var botfinCoordinates=new Matrix4(lowerTail.matrix);
  lowerTail.matrix.scale(.2,.2,.4);
  lowerTail.matrix.translate(-.3,0,-0.0001);
  lowerTail.render();

  // Top Tailfin
  var topFin = new Cube();
  topFin.color = [0,0,.8,.5];
  topFin.matrix = topfinCoordinates;
  topFin.matrix.translate(.035,.05,.3);
  topFin.matrix.rotate(-30,1,0,0);
  topFin.matrix.rotate(-g_finAngle,0,2,0);
  topFin.matrix.scale(.05,.15,.35);
  topFin.matrix.translate(-.3,0,-0.0001);
  topFin.render();

  // Bottom Tailfin
  
  var botFin = new Cube();
  botFin.color = [0,0,.8,.5];
  botFin.matrix = botfinCoordinates;
  botFin.matrix.translate(.035,0,.3);
  botFin.matrix.rotate(30,1,0,0);
  botFin.matrix.rotate(-g_finAngle,0,2,0);
  botFin.matrix.scale(.05,.12,.2);
  botFin.matrix.translate(-.3,0,-0.0001);
  botFin.render();

  //Left Fin

  var leftFin = new Cube();
  leftFin.color = [0,0,.8,.5];
  leftFin.matrix = leftfinCoordinates;
  leftFin.matrix.translate(-.2, 0, .15);
  leftFin.matrix.rotate(-45,0,0,1);
  leftFin.matrix.scale(.05,.15,.2);
  leftFin.matrix.translate(-.3, 0, 0);
  leftFin.render();

  //Right Fin
  var rightFin = new Cube();
  rightFin.color = [0,0,.8,.5];
  rightFin.matrix = rightfinCoordinates;
  rightFin.matrix.translate(.3, 0, .15);
  rightFin.matrix.rotate(45,0,0,1);
  rightFin.matrix.scale(.05,.15,.2);
  rightFin.matrix.translate(-.3, 0, 0);
  rightFin.render();

  //Dorsal Fin
  var dorsalFin = new Cube();
  dorsalFin.color = [0,0,.8,.5];
  dorsalFin.matrix = dorsalfinCoordinates;
  dorsalFin.matrix.translate(.055, .1, .4);
  dorsalFin.matrix.rotate(-45,1,0,0);
  dorsalFin.matrix.scale(.05,.25,.35);
  dorsalFin.matrix.translate(-.3, 0, 0);
  dorsalFin.render();
  //Eyes

  var leftEye = new Cube();
  leftEye.color = [1,0,0,1];
  leftEye.matrix = lefteyeCoordinates;
  leftEye.matrix.translate(-.12, .2, -.1);
  //leftEye.matrix.rotate(45,0,0,1);
  var leftpupilCoordinates=new Matrix4(leftEye.matrix);
  leftEye.matrix.scale(.05,.15,.15);
  leftEye.matrix.translate(-.3, 0, 0);
  leftEye.render();

  var rightEye = new Cube();
  rightEye.color = [1,0,0,1];
  rightEye.matrix = righteyeCoordinates
  rightEye.matrix.translate(.25, .2, -.15);
  //rightEye.matrix.rotate(45,0,0,1);
  var rightpupilCoordinates=new Matrix4(rightEye.matrix);
  rightEye.matrix.scale(.05,.15,.15);
  rightEye.matrix.translate(-.3, 0, 0);
  rightEye.render();

  //Pupils
  var leftPupil = new Cube();
  leftPupil.color = [0,0,0,1];
  leftPupil.matrix = leftpupilCoordinates;
  leftPupil.matrix.translate(-.03, .035, .02);
  leftPupil.matrix.scale(.05,.075,.075);
  leftPupil.matrix.translate(-.3, 0, 0);
  leftPupil.render();

  var rightPupil = new Cube();
  rightPupil.color = [0,0,0,1];
  rightPupil.matrix = rightpupilCoordinates
  rightPupil.matrix.translate(0.03, .035, .02);
  rightPupil.matrix.scale(.05,.075,.075);
  rightPupil.matrix.translate(-.3, 0, 0);
  rightPupil.render();





  //Upper head
  var upperHead = new Ramp();
  upperHead.color = [.1,0,.5,1];
  upperHead.matrix = upperMouthCoordinates;
  upperHead.matrix.translate(0, .18, -.6);
  upperHead.matrix.scale(.35,.35,.6);
  upperHead.matrix.translate(-.3, 0, 0);
  upperHead.render();

  //Lower head
  var lowerHead = new Ramp();
  lowerHead.color = [.1,.3,.5,1];
  lowerHead.matrix = lowerMouthCoordinates;
  lowerHead.matrix.translate(.14, .18, -.75);
  lowerHead.matrix.rotate(180,0,0,1);
  lowerHead.matrix.scale(.35,.35,.75);
  lowerHead.matrix.translate(-.3, 0, 0);
  lowerHead.render();


  //Check the time at the end of the funciton and show on web page
  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");

}


//var g_shapesList = [];

//var g_points = [];  // The array for the position of a mouse press
//var g_colors = [];  // The array to store the color of a point
//var g_sizes = [];

function click(ev) {
  
  //Extract the event click and return it in WebGL coordinates
  let [x,y] = convertCoordinatesEventToGL(ev);

  //Create and store the new point
  let point;
  if (g_selectedType==POINT) {
    point = new Point();
  } else if (g_selectedType==TRIANGLE) {
    point = new Triangle();
  } else {
    point = new Circle();
    point.segments = g_selectedSegment;
  }
  point.position=[x,y];
  point.color=g_selectedColor.slice();
  point.size=g_selectedSize;
  g_shapesList.push(point);

  // Store the coordinates to g_points array
  //g_points.push([x, y]);

  //Store the coordinates to g_points array
  //g_colors.push(g_selectedColor.slice());

  //Store the size to the g_sizes array
  //g_sizes.push(g_selectedSize);

  //g_colors.push([g_selectedColor[0], g_selectedColor[1], g_selectedColor[2], g_selectedColor[3]]);
  
//  if (x >= 0.0 && y >= 0.0) {      // First quadrant
//    g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
//  } else if (x < 0.0 && y < 0.0) { // Third quadrant
//    g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
//  } else {                         // Others
//    g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
//  }

  //Draw every shape that is supposed to be in the canvas
  renderAllShapes();
  
}

//Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}



function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm){
    console.log("Failed to get " + htmlID + " from HTML");
    return;
    
  }
  htmlElm.innerHTML = text;
}
