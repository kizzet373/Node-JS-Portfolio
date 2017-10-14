var logic = [];

logic.sortCardsByDescending = function(a,b){
	var regex = /((\+|-)?(\d+.\d+))%$/;
	var aFloat = parseFloat(regex.exec(a.dailyPriceChange)[1]);
	var bFloat = parseFloat(regex.exec(b.dailyPriceChange)[1]);
	if(aFloat < bFloat)
		return -1;
	if(aFloat > bFloat)
		return +1;
	return 0;
}

module.exports = logic;