// html elements
var totalCost = document.getElementById('totalCost');
var orderQuantity = document.getElementById('orderQuantity');
var marketPrice = document.getElementById('marketPrice');

function roundOff(amount) {
	return String(parseInt(amount)).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")
}

function init() {
	console.log('order confirmation page');
	let stockPrice = window.localStorage.getItem('stock_price');
	let quantity = window.localStorage.getItem('quantity');

	marketPrice.innerHTML = '$' + roundOff(stockPrice);
	orderQuantity.innerHTML = roundOff(quantity);
	totalCost.innerHTML = '$' + roundOff(stockPrice * quantity);

	let order_size = parseInt(stockPrice * quantity);
	let funds = parseInt(window.localStorage.getItem('funds'));
	window.localStorage.setItem('funds', (funds - order_size));
	window.localStorage.setItem('margin_used', order_size);
}

init();