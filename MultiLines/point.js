class Point{
	constructor (x, y){
	this.x = x; 
	this.y = y; 
	}
	distance(targetPoint){
	//	console.log('Target Point X: ' + targetPoint.x  + 'targetPoint Y: ' + targetPoint.y); 
	 var distance = Math.sqrt(Math.pow(targetPoint.x-this.x, 2) + Math.pow(targetPoint.y-this.y, 2) )
	 return distance; 
	}
}