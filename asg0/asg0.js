// DrawRectangle.js
   function main() {
    // Retrieve <canvas> element                                  <- (1)
     var canvas = document.getElementById('example');
     if (!canvas) {
       console.log('Failed to retrieve the <canvas> element');
       return;
     }

    // Get the rendering context for 2DCG                          <- (2)
    var ctx = canvas.getContext('2d');
 
    // Draw a blue rectangle                                       <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
    
    //let v1 = new Vector3([3, 5, 0]);
    //let v2 = new Vector3([2 ,3, 0]);
    //Vector3.dot(v1, v2);
    //console.log(v1.elements[0]);
    //drawVector(v1, "red");

  

  
}

function drawVector(v, color){
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = color;

  let cx = canvas.width/2;
  let cy = canvas.height/2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + (v.elements[0]*20), cy - (v.elements[1]*20));
  ctx. stroke();
}

function handleDrawEvent(){
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var x1 = document.getElementById("x1").value
  var y1 = document.getElementById("y1").value
  let v1 = new Vector3([x1, y1, 0]);

  var x2 = document.getElementById("x2").value
  var y2 = document.getElementById("y2").value
  let v2 = new Vector3([x2, y2, 0]);

  drawVector(v1, "red")
  drawVector(v2, "blue")
}

function handleDrawOperationEvent(){
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var x1 = document.getElementById("x1").value
  var y1 = document.getElementById("y1").value
  let v1 = new Vector3([x1, y1, 0]);

  var x2 = document.getElementById("x2").value
  var y2 = document.getElementById("y2").value
  let v2 = new Vector3([x2, y2, 0]);

  drawVector(v1, "red");
  drawVector(v2, "blue");

  let v3 = new Vector3();
  let v4 = new Vector3();
  var op = document.getElementById("operations").value
  if(op == "Add"){
    v3.set(v1);
    v3.add(v2);
    drawVector(v3, "green");
  }

  if(op == "Subtract"){
    v3.set(v1);
    v3.sub(v2);
    drawVector(v3, "green");
  }

  if(op == "Multiply"){
    var scaler = document.getElementById("scaler").value
    if(!scaler){
      console.log("Multiply Error: no scaler value");
      return;
    }

    v3.set(v1);
    v3.mul(scaler);
    v4.set(v2);
    v4.mul(scaler);

    drawVector(v3, "green");
    drawVector(v4, "green");
  }

  if(op == "Divide"){
    var scaler = document.getElementById("scaler").value
    if(!scaler){
      console.log("Divide Error: no scaler value");
      return;
    }

    v3.set(v1);
    v3.div(scaler);
    v4.set(v2);
    v4.div(scaler);

    drawVector(v3, "green");
    drawVector(v4, "green");
  }

  if(op == "Magnitude"){
    m1 = v1.magnitude();
    m2 = v2.magnitude();
    console.log("Magnitude v1: " + m1);
    console.log("Magnitude v2: " + m2);

  }

  if(op == "Normalize"){
    m1 = v1.magnitude();
    m2 = v2.magnitude();
    v3.set(v1);
    v4.set(v2);
    v3.normalize();
    v4.normalize();

    drawVector(v3, "green");
    drawVector(v4, "green");
    
  }

  if(op == "AngleBetween"){
    console.log("Angle: " + angleBetween(v1,v2));
  }

  if(op == "Area"){
    console.log("Area of the triangle: " + areaTriangle(v1, v2));
  }


}

function angleBetween(v1, v2){
  var dot = Vector3.dot(v1, v2);
  var m1 = v1.magnitude()
  var m2 = v2.magnitude()
  var angle = Math.acos(dot/(m1*m2)) * (180 / Math.PI);

  return angle;
}

function areaTriangle(v1, v2){
  let c = Vector3.cross(v1, v2);
  var area = c.magnitude() / 2;

  return area;
  
}
