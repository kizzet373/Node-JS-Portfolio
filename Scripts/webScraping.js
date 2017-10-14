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
			//$("#div1").html(data);
		});
	});
});