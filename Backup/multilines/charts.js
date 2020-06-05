class Charts{
	constructor(player1, player2){
		this.player1 = player1; 
		this.player2 = player2; 
	}
	
	interactionStateChart(p1Tracker, p2Tracker){
      // 2. Use the margin convention practice 
	
var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 600 - margin.left - margin.right // Use the window's width 
  , height = 300 - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = p1Tracker.length;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line2 = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
//var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
//console.log("P1Tracker "  + this.p1Tracker); 
//var dataset =d3.range(n).map(function(d) {return this.p1Tracker}); 
var dataset = p1Tracker; 
var dataset2 = p2Tracker; 

// 1. Add the SVG to the page and employ #2
document.getElementById('my_dataviz').innerHTML = ""; 
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 3)
    //.attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

svg.append("path")
    .datum(dataset2) // 10. Binds data to the line 
    //.attr("class", "line") // Assign a class for styling 
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("d", line2); // 11. Calls the line generator 
/*
// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 1)
      .on("mouseover", function(a, b, c) { 
        console.log(a) 
        this.attr('class', 'focus')
    })
      .on("mouseout", function() {  })
*/

//create a legend 
svg.append("circle").attr("cx",20).attr("cy",20).attr("r", 6).style("fill", "blue")
svg.append("circle").attr("cx",20).attr("cy",40).attr("r", 6).style("fill", "red")
svg.append("text").attr("x", 27).attr("y", 20).text(this.player1.name).style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 27).attr("y", 40).text(this.player2.name).style("font-size", "15px").attr("alignment-baseline","middle")

//create title
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Interaction States (0= Drawing .5 = Thinking 1 = Waiting)");

  }

  distanceChart(maxY, player1Data, player2Data){
      // 2. Use the margin convention practice 


var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 600 - margin.left - margin.right // Use the window's width 
  , height = 300 - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = player2Data.length;
//console.log("Player1Data.length: " + n); 

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, maxY]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line2 = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
//var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
//console.log("P1Tracker "  + this.p1Tracker); 
//var dataset =d3.range(n).map(function(d) {return this.p1Tracker}); 

var dataset = player1Data; 
var dataset2 = player2Data; 

// 1. Add the SVG to the page and employ #2
document.getElementById('distanceChart').innerHTML = ""; 
var svg = d3.select("#distanceChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 3)
    //.attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

svg.append("path")
    .datum(dataset2) // 10. Binds data to the line 
    //.attr("class", "line") // Assign a class for styling 
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("d", line2); // 11. Calls the line generator 
/*
// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 1)
      .on("mouseover", function(a, b, c) { 
        console.log(a) 
        this.attr('class', 'focus')
    })
      .on("mouseout", function() {  })
*/

//create a legend 
svg.append("circle").attr("cx",20).attr("cy",20).attr("r", 6).style("fill", "blue")
svg.append("circle").attr("cx",20).attr("cy",40).attr("r", 6).style("fill", "red")
svg.append("text").attr("x", 27).attr("y", 20).text(this.player1.name).style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 27).attr("y", 40).text(this.player2.name).style("font-size", "15px").attr("alignment-baseline","middle")

//create title
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Drawing Distance Per Turn");

  }

lineLengthChart(p1LineLength, p2LineLength, minY, maxY){
      // 2. Use the margin convention practice 
	
var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 600 - margin.left - margin.right // Use the window's width 
  , height = 300 - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = p2LineLength.length;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([minY, maxY]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line2 = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
//var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
//console.log("P1Tracker "  + this.p1Tracker); 
//var dataset =d3.range(n).map(function(d) {return this.p1Tracker}); 
var dataset = p1LineLength; 
var dataset2 = p2LineLength; 

// 1. Add the SVG to the page and employ #2
document.getElementById('lineLengthChart').innerHTML = ""; 
var svg = d3.select("#lineLengthChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 3)
    //.attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

svg.append("path")
    .datum(dataset2) // 10. Binds data to the line 
    //.attr("class", "line") // Assign a class for styling 
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("d", line2); // 11. Calls the line generator 
/*
// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 1)
      .on("mouseover", function(a, b, c) { 
        console.log(a) 
        this.attr('class', 'focus')
    })
      .on("mouseout", function() {  })
*/

//create a legend 
svg.append("circle").attr("cx",20).attr("cy",20).attr("r", 6).style("fill", "blue")
svg.append("circle").attr("cx",20).attr("cy",40).attr("r", 6).style("fill", "red")
svg.append("text").attr("x", 27).attr("y", 20).text(this.player1.name).style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 27).attr("y", 40).text(this.player2.name).style("font-size", "15px").attr("alignment-baseline","middle")

//create title
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Line Length Per Turn");

  }


  intCoupleChart(intCouplings){
      // 2. Use the margin convention practice 
	
var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 600 - margin.left - margin.right // Use the window's width 
  , height = 300 - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = intCouplings.length;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line2 = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
//var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
//console.log("P1Tracker "  + this.p1Tracker); 
//var dataset =d3.range(n).map(function(d) {return this.p1Tracker}); 
var dataset = intCouplings; 


// 1. Add the SVG to the page and employ #2
document.getElementById('intCoupleChart').innerHTML = ""; 
var svg = d3.select("#intCoupleChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 3)
    //.attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

/*
// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 1)
      .on("mouseover", function(a, b, c) { 
        console.log(a) 
        this.attr('class', 'focus')
    })
      .on("mouseout", function() {  })
*/

//create title
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Interaction Couplings Over Time");

  }



}