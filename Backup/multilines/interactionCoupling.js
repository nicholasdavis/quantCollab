class InteractionCoupling{
	constructor(player1,player2){
		this.turns = new Array(); 
		this.numTurns; 
		this.numLines; 
		this.avgLineLength; 
		this.totalLineLength; 
		this.totalTime; 
		this.numSimilarLines; 
		//this.numLines; //not relevant until multi turn
		this.initiatedBy; 
		this.foundedBy; 
		this.decoupledBy = null; 
		this.areaCovered; 
		this.dominantPlayer; 
		this.dominantPercent; 
		this.location; 
		this.centerPoint; 
		this.totalLineLength; 
		this.player1 = player1; 
		this.player2 = player2; 
		this.percentFluid = 0; 
		this.structuralCoupling = ""; 
	}
	
	add(turn){
		if(turn != this.turns[this.turns.length -1]){
			this.turns.push(turn); 
		}
	}
	
	getNumLines(){
		var lineCount = 0; 
		for(var i = 0; i< this.turns.length; i++){
				lineCount += this.turns[i].currentLines.length; 
		}
		console.log("getNumLines(): "+ this.numLines); 
		this.numLines = lineCount; 
		return this.numLines; 
	}

	getStructuralCoupling(){
		if(this.percentFluid > 50){
			this.structuralCoupling = "tight"; 
		}else {
			this.structuralCoupling = "loose"
		}
		return this.structuralCoupling; 
	}

	getNumTurns(){
		this.numTurns = this.turns.length; 
		return this.numTurns; 
	}

	getAvgLineLength(){
		var sum = 0; 
		var totalLines = 0; 
		for(var i = 0; i<this.turns.length; i++){
			for(var j = 0; j<this.turns[i].currentLines.length; j++){
				sum+= this.turns[i].currentLines[j].length; 
				totalLines++; 
			}
		}
/*
		var sum = 0; 
		for (var i= 0 ; i<this.turns.length; i++){
			var lineLength = 0; 
			var length = this.turns[i].currentLine.length; 
			sum += length; 
		}
		*/
		
		var avg = sum/totalLines; 
		this.avgLineLength = avg; 
		return this.avgLineLength; 
	}

	getTotalTime(){
		var sum = 0; 
		for(var i = 0; i<this.turns.length; i++){
			sum += this.turns[i].turnTime; 
		}
		this.totalTime = sum; 
		return this.totalTime; 
	}

	getNumSimilarLines(){
		var sum = 0; 
		for(var i = 0; i<this.turns.length; i++){
			if(this.turns[i].proximity == "near")
				sum++
		}
		this.numSimilarLines = sum; 
		return this.numSimilarLines; 
	}

	getInitiatedBy(){
		var player = this.turns[0].activePlayer; 
		this.initiatedBy = player; 
		return this.initiatedBy; 
	}

	getFoundedBy(){
		this.foundedBy = this.turns[0].inactivePlayer; 
		return this.turns[0].inactivePlayer; 

	}

	setDecoupledBy(player){
		this.decoupledBy = player; 
	}

	getDecoupledBy(){
		return this.decoupledBy; 
	}

	getAreaCovered(){
		var xmin = 10000; 
		var xmax = 0; 
		var ymin = 10000; 
		var ymax = 0; 

		for(var i = 0; i<this.turns.length; i++){
			for(var j = 0; j<this.turns[i].currentLines.length; j++){
				for(var k = 0; k<this.turns[i].currentLines[j].points.length; k++){
					var point = this.turns[i].currentLines[j].points[k]; 
					if(point.x < xmin){
					xmin = point.x; 
					}
					if(point.x > xmax){
						xmax = point.x; 
					}
					if(point.y < ymin){
						ymin = point.y;
					}
					if(point.y > ymax){
						ymax = point.y;
					}

				}
			}
		}

/*
		for(var i=0; i<this.turns.length; i++){
			for(var j=0; j<this.turns[i].currentLine.points.length; j++){
				var point = this.turns[i].currentLine.points[j]; 
				if(point.x < xmin){
					xmin = point.x; 
				}
				if(point.x > xmax){
					xmax = point.x; 
				}
				if(point.y < ymin){
					ymin = point.y;
				}
				if(point.y > ymax){
					ymax = point.y;
				}
			}
			 
		}
		*/
		var width = xmax - xmin; 
		var height = ymax - ymin; 
		var area = (width * height); 
		this.areaCovered = area; 
		var centerPointX = xmin + width/2; 
		var centerPointY = ymin + height/2; 
		var center = new Point(centerPointX, centerPointY)
		this.centerPoint = center; 
		return this.areaCovered; 
	}

	getDominantPlayer(){
		var p1LineLength = 0; 
		var p2LineLength = 0; 
		for(var i=0; i<this.turns.length; i++){
			for(var j=0; j<this.turns[i].currentLines.length; j++){
				if(this.turns[i].activePlayer == this.player1){
					p1LineLength += this.turns[i].currentLines[j].length; 
				}
				else{
					p2LineLength += this.turns[i].currentLines[j].length; 
				}
			}
		}
		//console.log("p1LineLength: " + p1LineLength + "p2LineLength" + p2LineLength ); 
		if(p1LineLength > p2LineLength){
			this.dominantPlayer = this.player1;
			this.dominantPercent = (p1LineLength / (p1LineLength + p2LineLength)) * 100
		}
		else{
			this.dominantPlayer = this.player2; 
			this.dominantPercent = (p2LineLength / (p1LineLength + p2LineLength)) * 100

		}
		//console.log("Dominant Player: " + this.dominantPlayer); 
		return this.dominantPlayer.name; 
	}

	getLocation(){
		var canvas = document.getElementById('canvas');
		var width = canvas.width;
		var height = canvas.height;
		var yaxis = width/2; 
		var xaxis = height/2
		if(this.centerPoint.x>xaxis && this.centerPoint.y > yaxis){
			this.location = "Bottom Right"
		}
		else if(this.centerPoint.x>xaxis && this.centerPoint.y < yaxis){
			this.location = "Top Right"
		}
		else if(this.centerPoint.x < xaxis && this.centerPoint.y > yaxis){
			this.location = "Bottom Left"
		}
		else if(this.centerPoint.x < xaxis && this.centerPoint.y < yaxis){
			this.location = "Top Left"
		}
		return this.location; 
	}

	getTotalLineLength(){
		var sum = 0; 
		for(var i = 0; i<this.turns.length; i++){
			for(var j = 0; j<this.turns[i].currentLines.length; j++){
				sum += this.turns[i].currentLines[j].length; 
			}
		}
		/*

		var sum = 0; 
		for(var i = 0; i<this.turns.length; i++){
			sum += this.turns[i].currentLine.length;
		}
		*/
		this.totalLineLength = sum; 
		return this.totalLineLength; 
	}

	getPercentFluid(){
		var fluidCounter = 0; 
		for(var i = 0; i<this.turns.length; i++){
			if(this.turns[i].fluidity == "fluid"){
				fluidCounter++
			}
		}
		var percent = (fluidCounter/this.turns.length)*100; 
		this.percentFluid = percent; 
		//console.log("Percent fluid = " + this.percentFluid);
		return this.percentFluid; 
	}


}