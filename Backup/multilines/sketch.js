
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var lineCounter = 0; 
var lines = new Array(); 

var player1 = new Player("Tom"); 
var player2 = new Player("Jerry"); 
//player1.soundOff(); 
//player2.soundOff(); 
var activePlayer = player1; 
var inactivePlayer = player2; 
var analyzer = new Analyzer(player1,player2, lines); 
var display = new Display(analyzer); 

var turnStart = 0; 
var turnEnd = 0; 

var lineStartTime = 0; 
var lineEndTime = 0; 

var turn; 

var sessionID; 
var statTime = 0; 
var startStart = 0; 
var statEnd= 0; 
var statCount = 0; 
var statScreen = false; 
var intCoupleRecord = new Array(); 

var showLines = false; 

var p1Tracker = new Array(); 
var p2Tracker = new Array(); 

var drawingType = "multiLine";
var firstTurn = true; 


window.setInterval(trackPlayers, 1000); 

//setCanvas Height
var c = document.getElementById("canvas"); 
c.width = window.innerWidth; 
c.height = window.innerHeight; 

function trackPlayers(){
  var p1State = 0; 
  var p2State = 0; 

  if(paint == true){
    if(activePlayer ==player1){
      p1State = 0; 
      p2State = 1; 
    }else{
      p1State = 1; 
      p2State = 0; 
    }
  }else{
    if(activePlayer == player1){
      p1State = .5; 
      p2State = 1; 
    }else{
      p1State = 1; 
      p2State = .5; 
    }
  }

  //console.log("p1State: " + p1State + "p1State: " + p2State); 
  if(statScreen == false){
    p1Tracker.push({"y": p1State}); 
    p2Tracker.push({"y": p2State}); 
}
  if(statScreen == false && analyzer.interactionSequence==true){
    intCoupleRecord.push({"y": 1}); 
  }
  else if(statScreen == false && analyzer.interactionSequence==false){
    intCoupleRecord.push({"y":0}); 
  }

  //Each time step define two variables as current activity of 
}


var endTurnButton = document.getElementById("endTurnButton"); 
endTurnButton.onclick = function(){
  //console.log("In endTurnButton onclick"); 
  var d = new Date(); 
  turnEnd = d.getTime(); 
  if(!firstTurn){
  turn = new Turn(activePlayer, inactivePlayer, lines, previousLines, turnStart, turnEnd); 
  analyzer.setDrawingType(drawingType); 
  analyzer.analyzeTurn(turn); 
}
  previousLines = lines; 
  lines = new Array(); 
  lineCounter = 0; 
  turnStart = d.getTime(); 
  firstTurn = false; 

  if (activePlayer == player1){
      inactivePlayer = player1;
      activePlayer = player2; 
  }
  else{
    activePlayer = player1;
    inactivePlayer = player2;  
  }
  document.getElementById("playerName").innerHTML = "Player: " + activePlayer.name;




}

var submitButton = document.getElementById("submitButton")
submitButton.onclick = function(){
  //close window
  //document.getElementById('exampleModal').style.display='none'

  //Enter player names, session ID
  p1Name = document.getElementById('player1NameInput').value; 
  p2Name= document.getElementById('player2NameInput').value; 

  player1 = new Player(p1Name); 
  player2 = new Player(p2Name); 
  activePlayer = player1; 

  sessionID = document.getElementById('sessionIDInput').value; 
  document.getElementById("playerName").innerHTML = "Player: " + activePlayer.name;
  //empty the elements to start a new session
  lineCounter = 0; 
  lines = new Array(); 
  analyzer = new Analyzer(player1, player2, lines); 
  display = new Display(analyzer); 

  //clear the canvas
  var width = document.getElementById('canvas').width; 
  var height = document.getElementById('canvas').height; 
  var c = document.getElementById('canvas'); 
  var ctx = c.getContext("2d"); 
  ctx.clearRect(0,0,width,height); 
  //make the canvas white not transparent
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  intCoupleRecord = new Array(); 

  drawingType = document.getElementById('drawingTypeInput').value; 

  if(drawingType == "singleLine"){
    document.getElementById('endTurnButton').style.display = "none"; 
  }
  else{
    document.getElementById('endTurnButton').style.display ="inline";
  }



}
var showLinesButton = document.getElementById("showLinesButton"); 
showLinesButton.onclick = function(){

    if(showLines == false){
      showLines = true; 
      showLinesButton.innerHTML = "Hide Lines"; 
      console.log("showlines: " + showLines); 
    } else {
      console.log("In else"); 
      showLines = false; 
      showLinesButton.innerHTML = "Show Lines"; 
    }
    displayLines();
}

var statButton = document.getElementById("statButton"); 
statButton.onclick = function(){
	//console.log("In the onclick for location");
	//location.href='stats.html';
	document.getElementById('id01').style.display='block'
	display.display(); 
  var d = new Date(); 
  var time = d.getTime(); 
  startStart = time; 
  statCount++; 
  analyzer.setStatCount(statCount); 
  statScreen = true; 
  var chart = new Charts(player1, player2); 
  chart.interactionStateChart(p1Tracker, p2Tracker); 
  displayDistanceChart(); 
  displayLineLengthChart(); 
  displayInteractionCouplingChart(); 

  }


var closeButton = document.getElementById("closeButton")
closeButton.onclick = function(){
  document.getElementById('id01').style.display='none'
  //start over playerturn timer
  var d = new Date(); 
  turn.setTurnStart(d.getTime()); 
  turnStart = d.getTime(); 

  //end the timer for stat window
  var d = new Date(); 
  var time = d.getTime(); 
  statEnd = time; 
  statTime += (statEnd - startStart) /1000
  analyzer.setStatTime(statTime); 
  statScreen = false; 
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


var saveButton = document.getElementById("saveButton"); 
//saveButton.setAttribute('download', 'MintyPaper.png');
//saveButton.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
saveButton.click(); 
saveButton.onclick = function(){
	var save = new Save(analyzer); 
	var saveText = save.save(); 
	download(sessionID, saveText); 

  //save the canvas to PNG
  var canavs = document.getElementById('canvas'); 
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  window.location.href=image; // it will save locally
/*
  var link = document.getElementById('saveButton');
  link.setAttribute('download', 'MintyPaper.png');
  link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click();
*/

}

function displayInteractionCouplingChart(){

  var chart = new Charts(player1, player2); 
  chart.intCoupleChart(intCoupleRecord); 

}

function displayLineLengthChart(){
  var p1LineLength = new Array(); 
  var p2LineLength = new Array(); 
  var minY = 10000; 
  var maxY = 0; 
  for(var i = 0; i<analyzer.turns.length; i++){    
      var p1total = 0; 
      var p2total = 0; 
    for(var j = 0; j<analyzer.turns[i].currentLines.length; j++){
      if(analyzer.turns[i].activePlayer ==player1){
        p1total += analyzer.turns[i].currentLines[j].length;
        //console.log("p1total: " + p1total);
      }else{
        p2total += analyzer.turns[i].currentLines[j].length;
        //console.log("p2total: " + p2total);
      }

      if(p1total > maxY){
        maxY = p1total; 
      } 
      if(p2total > maxY){
        maxY = p2total; 
      }
      if(p1total < minY){
        minY = p1total; 
      }
      if(p2total < minY){
        minY = p2total; 
      }
    }
    if(analyzer.turns[i].activePlayer == player1){
      p1LineLength.push({"y": p1total})
    } else {
      p2LineLength.push({"y": p2total})
    }

  }

  var chart = new Charts(player1, player2); 
  chart.lineLengthChart(p1LineLength, p2LineLength, minY, maxY); 
}

function displayDistanceChart(){
  var p1Dist = new Array(); 
  var p2Dist = new Array(); 
  var maxY = 0; 
  for(var i = 0; i< analyzer.turns.length; i++){
      if(analyzer.turns[i].activePlayer == player1){
        //console.log("In p1 if distance:  " + analyzer.turns[i].distance); 
        var dist = {"y": analyzer.turns[i].distance}; 
        //console.log("Dist:" + dist.y); 
        p1Dist.push(dist); 
        //console.log("P1Distance: " + p1Dist[0].y);
      }else{
        var dist2 = {"y": analyzer.turns[i].distance}
        //console.log('P2 Dist: ' + dist2 .y); 
        p2Dist.push(dist2); 
        //console.log("In p2 if distance:  " + analyzer.turns[i].distance); 
        //console.log("P2Distance: " + p2Dist[0].y)

      }
      if(analyzer.turns[i].distance > maxY){
        maxY = analyzer.turns[i].distance; 
      }
      //console.log("Distance from turn: " + analyzer.turns[i].distance); 
      //console.log("P1Distance: " + p1Distance[i].y + "p2Distance: " + p2Distance[i].y); 
  }

  var chart = new Charts(player1, player2); 
  chart.distanceChart(maxY, p1Dist, p2Dist)
}

function displayLines(){
  //cycle through analyzer.turns to draw each line
  var c = document.getElementById("canvas"); 
  var context = c.getContext("2d"); 
  context.fillStyle = "white";
  context.fillRect(0,0,c.width, c.height); 

  for (var i = 0; i<analyzer.turns.length; i++){
    if(i==0){
    for (var j = 0; j<analyzer.turns[i].previousLine.points.length-1; j++){
      context.strokeStyle = "blue";

      if(showLines == false){
        context.strokeStyle = "black"; 
      }
      context.beginPath();
      context.moveTo(analyzer.turns[i].previousLine.points[j].x, analyzer.turns[i].previousLine.points[j].y)
      context.lineTo(analyzer.turns[i].previousLine.points[j+1].x, analyzer.turns[i].previousLine.points[j+1].y);
      context.closePath();
      context.stroke();
    }
  }

    for (var j = 0; j<analyzer.turns[i].currentLine.points.length-1; j++){
      if(analyzer.turns[i].activePlayer == player1){
        context.strokeStyle = "blue";

      }
      else         
        context.strokeStyle = "red";
      if(showLines == false){
        context.strokeStyle = "black"; 
      }
      context.beginPath();
      context.moveTo(analyzer.turns[i].currentLine.points[j].x, analyzer.turns[i].currentLine.points[j].y)
     context.lineTo(analyzer.turns[i].currentLine.points[j+1].x, analyzer.turns[i].currentLine.points[j+1].y);
     context.closePath();
     context.stroke();
    }
  }

  //Display legend
  if(showLines == true){
  context.font = "18px Arial";
  context.fillStyle = "black";
  context.fillText(player1.name+"'s lines = blue", 10, 30);
  context.fillText(player2.name+"'s lines = red", 10, 55);

}

}


$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop ;
  var point = new Point(mouseX, mouseY); 
  var line = new Line(activePlayer); 
  lines.push(line); 
  line.points.push(point); 	
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
  var d = new Date(); 
  lineStartTime = d.getTime(); 
  //console.log("LineStart: "+ lineStartTime);
  //var d = new Date();
 // turnStart= d.getTime();
  //console.log("Getting start time " + turnStart); 


});

$('#canvas').mousemove(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
   
    redraw();
    var point = new Point(mouseX, mouseY); 
    lines[lineCounter].points.push(point);
 	//line.push(point);
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
  clickX = new Array ();
  clickY = new Array ();
  //player1.add(lines[lineCounter]);
  var d = new Date();
  turnEnd= d.getTime();
  lineEndTime = turnEnd; 
  //console.log("Getting end time " + turnEnd); 
  lines[lineCounter].setTime(lineStartTime,lineEndTime); 
  lines[lineCounter].updateLength();  
  activePlayer.add(lines[lineCounter]);
  //line = new Array(); 

    if (firstTurn == false && drawingType =="singleLine") {
      console.log("LineCounter: " + lineCounter); 
      turn = new Turn(activePlayer, inactivePlayer, lines, previousLines, turnStart, turnEnd); 
      analyzer.setDrawingType(drawingType); 
      analyzer.analyzeTurn(turn) ; 
  }
  lineCounter++; 

if(drawingType == "singleLine"){


  if (activePlayer == player1){
      inactivePlayer = player1;
      activePlayer = player2; 
  }
  else{
    activePlayer = player1;
    inactivePlayer = player2;  
  }

  //console.log("Current player: " + activePlayer.name)
  //$('#playerName').value = activePlayer.name; 
  document.getElementById("playerName").innerHTML = "Player: " + activePlayer.name;
  turnStart= 0; 
  turnEnd=0; 
  var d = new Date(); 
  turnStart = d.getTime();
  previousLines = lines; 
  lines = new Array(); 
  lineCounter = 0; 
  firstTurn = false; 
  console.log("First Turn: " + firstTurn); 

}


   



});

$('#canvas').mouseleave(function(e){
  paint = false;
});


function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  //xcontext.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 2;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

