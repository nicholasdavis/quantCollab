class Player{
	constructor(playerName){
		this.name = playerName; 
		this.lines = new Array(); 
		this.similarLines = 0; 
		this.nearLines = 0; 
	}

	add(line){
		this.lines.push(line); 
		this.averageLine(); 
	}

	addSimilarLine(){
		this.similarLines++;
	}
	addNearLine(){
		this.nearLines++;
	}

	averageLine(){
		//console.log("here is the current lines object" + this.lines); '
		var lineCounter = new Array();

		for (var i= 0 ; i<this.lines.length; i++){
			var lineLength = 0; 
			//console.log("this.lines: " + this.lines); 
			for (var j= 0 ; j<this.lines[i].points.length - 1; j++){
				//console.log('x2: ' + this.lines[i].points[j+1] + "x1: " +this.lines[i].points[j])
				var distance = this.lines[i].points[j].distance(this.lines[i].points[j+1])
				//console.log("Distance: " +distance); 
				lineLength = lineLength + distance
			}
			lineCounter.push(lineLength); 
			lineLength = 0; 

		}
		var total = 0; 
		for (var i = 0; i< lineCounter.length; i++)
		{
			total = total + lineCounter[i]
		}
		var finalAverage = total/this.lines.length; 
		return finalAverage; 
		console.log('Average line length for player ' + this.name + ": " + finalAverage); 
	}

	soundOff(){
	console.log("Player: " + this.name); 
	}
}