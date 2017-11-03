function boxShadow(event){
		var alternator = 0;
		var hShadow = 2;
		var vShadow = 2;
		var blur = 4;
		var color = "rgba(20,20,20,.9)";
		var vTranslation = -2;
		var frames = 17;
		
		event.target.animate = true
		event.target.style.boxShadow = hShadow + "px " + vShadow + "px " + blur + "px " + color;
		event.target.style.transform = "translate(0px, -1px)";
		
		var animation = setInterval(frame, 100);
		
		function frame() {
			
			if(event.target.animate){
				
				event.target.style.boxShadow = hShadow + "px " + vShadow + "px " + blur + "px " + color;
				event.target.style.transform = "translate(0px, " + vTranslation + ")";
				
				if(alternator%frames < (frames-1)/2){
					hShadow++;
					vShadow += 1;
					vTranslation--;
				}					
				//do nothing when alternator is 8.					
				if(alternator%frames > (frames-1)/2){
					hShadow--;
					vShadow += -1;
					vTranslation++;
				}
				alternator++;
			}
			else{
				clearInterval(animation);
			}
		}
		
}
	
function removeBoxShadow(event){
	event.target.style.boxShadow = "";
	event.target.style.transform = "";
	event.target.animate=false;
}