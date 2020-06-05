class One {
  write(){
    console.log("Yes! I did!");
  }
}

class Two {
   constructor() {
       this.one = new One();
   }

   tryingMethod(){
     this.one.write();
   }
}

class Three {
	touchTheSky(){
		console.log("I'm touching the sky"); 
	}
}

