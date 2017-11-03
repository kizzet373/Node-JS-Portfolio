$(document).ready(function () {
	$("#updateCardsBtn").mouseover(function(event){boxShadow(event)});
	$("#updateCardsBtn").mouseleave(function(event){removeBoxShadow(event)});
	
	$("#updateCardsBtn").click(function(){
		$.get("/api/updatePriceList", function(data){
			$('#cardTableBody').empty();
			getMtgCards(true);
		});
	});
});

function getMtgCards(isUpdating){
	var sets = ["AER","AKH","KLD","MS2","XLN"];
	var finishedRequests = 0;
	
	$.tablesorter.destroy('#cardTable',false); //destroy all previous data stored by the tablesorter.
	
	for (let index in sets){
		$.get('/get'+sets[index]+'PriceList',function(data){
			$('#cardTable').css("display","table-header-group"); //as soon as any data is received, make table visible.
			$('#cardTableBody').append(data); //asynchronously append table with cards from each set.
			finishedRequests++;
			
			if(finishedRequests == sets.length){ //if all requests are finished,
				$("#cardTable").tablesorter(); //initialize tablesorter with new data
				if(isUpdating){	//if this is updating card stats, rather than just pulling from database.
					$("#updateCardsBtn").removeClass("btn-info").addClass("btn-success");
					$("#updateCardsBtn").val("Updated!");
				}
			}
		});
	}
}