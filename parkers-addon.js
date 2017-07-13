console.log('start parkers addon');
var itemList = document.querySelector(".search-results__list").childNodes;
var deals = [];
var dealCounter = 0;
for (var i = 0; i < itemList.length; i++) {
	if (itemList[i].className == "infinite-item") {
	  deals[dealCounter] = itemList[i];
	  dealCounter++;
	}        
}

for (var i = 0; i < deals.length; i++){
	var price = parseInt(deals[i].querySelector(".leasing-result-item__price__value").innerHTML.replace(/[^0-9.]/g, '').slice(0, -2))
	var initialPayment;
	var adminFee;
	var term;
	var targetDiv = deals[i].querySelector(".leasing-result-item__details");
	var detailItems = targetDiv.getElementsByTagName("div");
	for (var j = 0; j < detailItems.length; j++){
		var label = detailItems[j].querySelector(".leasing-result-item__details__label");
		var value = detailItems[j].querySelector(".leasing-result-item__details__value");
		if(label != null)
		{
			if(label.innerHTML == "Initial Payment:")
			{
				initialPayment = parseInt(value.innerHTML.replace(/[^0-9.]/g, ''));
			}
			if(label.innerHTML == "Admin Fee:")
			{
				adminFee = parseInt(value.innerHTML.replace(/[^0-9.]/g, ''));
				if(isNaN(adminFee))
				{
					adminFee = 0;
				}
			}
			if(label.innerHTML == "Term:")
			{
				term = parseInt(value.innerHTML.replace(/[^0-9]/g, ''));
			}
		}		
	}
	var totalInitial = adminFee + initialPayment;
	var initialMonthly = totalInitial/term;
	var totalMonthly = price + initialMonthly;
	
	var node = document.createElement("div");
	var labelSpan = document.createElement("span");
	labelSpan.className = "leasing-result-item__details__label";
	labelSpan.innerHTML = "Adjusted Monthly Total:";
	var valueSpan = document.createElement("span");
	valueSpan.className = "leasing-result-item__details__value";
	valueSpan.innerHTML = "£" + totalMonthly.toFixed(2);
	node.appendChild(labelSpan);
	node.appendChild(valueSpan);
	targetDiv.appendChild(node);
}
console.log('end parkers addon');