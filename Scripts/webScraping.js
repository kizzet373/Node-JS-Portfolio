$(document).ready(function () {				
	var sets = ["AER","AKH","KLD","MS2","XLN"]
	for (index in sets){
		$.get('/get'+sets[index]+'PriceList',function(data){
			$('#cardTable').append(data);
		});
	}
	
	$("#getCardsBtn").click(function(){
		$.get("/api/updatePriceList", function(data){
			console.log(data);
			document.getElementById("getCardsBtn").style.backgroundColor = "green";
			document.getElementById("span1").style.backgroundColor = "purple";
			document.getElementById("span1").innerHTML = data[0];
			document.getElementById("span2").style.backgroundColor = "red";
			document.getElementById("span2").innerHTML = data[1];
			//$("#div1").html(data);
		});
	});
});