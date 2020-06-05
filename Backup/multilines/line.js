class Line{
	constructor(player){
	this.points = new Array(); 
	this.player = player; 
	this.length = 0; 
	this.startTime = 0; 
	this.endTime = 0 ; 
	this.totalTime = 0; 
	}

	add(point){
		console.log("In add"); 
		//this.line.push(point); 
		this.updateLength(); 
	}

	distance(targetLine){
		var minDistance = 10000; 
		for (var i = 0; i< this.points.length; i++){
			//console.log("In first for loop"); 
			for(var j = 0; j< targetLine.points.length; j++){
			//	console.log("In second for loop"); 
				var distance = this.points[i].distance(targetLine.points[j]); 
			//	console.log('Point Object' + targetLine[j]);
			//	console.log('Distance proces calc: ' + distance); 
				if (distance < minDistance)
					minDistance = distance; 
			}
		}
		return minDistance; 
	}
	updateLength(){ 
		for(var i=1; i<this.points.length; i++){
			var currentDistance = this.points[i].distance(this.points[i-1]); 
			//console.log("currentDistance: " + currentDistance); 
			this.length = this.length + currentDistance; 
		}
		//console.log("LineLength: " +this.length); 
	}

	setTime(startTime, endTime){
		this.startTime = startTime; 
		this.endTime = endTime; 
		this.totalTime = endTime - startTime; 
		//console.log("Line start: " + this.startTime + " Line end: " + this.endTime); 
	}
}