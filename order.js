// Stock Parameters
var riskExposure = 0;
var stockName = 'Apple';
var stockPrice = 505;
var availableFunds = 15000;
var orderSize = 'quantity';
var transactionType = 'Buy';

// html elements
var handle = document.getElementById('risk_handle');
var riskRangeImg = document.getElementById('risk_range');
var orderQuantity = document.getElementById('orderQuantity');
var quantityTypeElem = document.getElementById('quantityType');
var orderByQuantity = document.getElementById('orderByQuantity');
var orderByAmount = document.getElementById('orderByAmount');
// transition first time
handle.style.transition = 'left 1s';

function roundOff(amount) {
	return String(parseInt(amount)).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")
}

function getQueryParams() {
	var searchParams = window.location.search
		.replace('?', '')
		.split('&')
		.reduce((obj, elm) => (elm = elm.split('='), obj[elm[0]] = elm[1], obj), {});

	stockName = searchParams.stock;
	stockPrice = searchParams.price;
	transactionType = searchParams.type;
}

function updateRequiredMargin(margin) {
	if (margin) {
		document.getElementById('margin_required').innerHTML = "Margin Required: $ " + roundOff(margin);
	} else {
		document.getElementById('margin_required').innerHTML = "";
	}
}

function updateAvailableMargin(margin) {
	document.getElementById('available_funds').innerHTML = "Available Funds: $ " + roundOff(margin);
}

function updateStockName(stock) {
	document.getElementById('stock_name').innerHTML = stock;
	window.localStorage.setItem('stock_name', stock);
}

function updateStockPrice(price) {
	document.getElementById('stock_price').innerHTML = '$ ' + roundOff(price);
	window.localStorage.setItem('stock_price', price);
}

function updatePlaceButtonColor(type) {
	let setColor = 'var(--green)';
	if (type == 'Sell') setColor = 'var(--chestnut)';
	document.getElementById('slider').style.backgroundColor = setColor;
	// document.getElementById('placeBtn').style.backgroundColor = setColor;
	document.getElementById('swipe_text').innerHTML = "Swipe to " + type;
}

function onClickOrderByQuantity(e) {
	quantityTypeElem.style.left = 0;
	quantityTypeElem.style.right = 'auto';
	orderSize = 'quantity';
	updateMargin();
}

function onClickOrderByAmount(e) {
	quantityTypeElem.style.left = 'auto';
	quantityTypeElem.style.right = '5px';
	orderSize = 'amount';
	updateMargin();
}

function init() {
	getQueryParams();
	updateStockName(stockName);
	updateStockPrice(stockPrice);
	availableFunds = parseInt(window.localStorage.getItem('funds'));
	updateAvailableMargin(availableFunds);
	onRiskExposureChange();
	updatePlaceButtonColor(transactionType);

	orderByQuantity.onclick = onClickOrderByQuantity;
	orderByAmount.onclick = onClickOrderByAmount;

	for (let i = 0; i < 50; i++) {
		setTimeout(function () {
			riskExposure = i;
			updateMargin();
		}, 15 * i);
	}
	setHandle(50);

	orderQuantity.onclick = function () {
		handle.style.animation = 'shake-horizontal 200ms ease-in-out infinite';
		setTimeout(function () {
			handle.style.animation = 'none';
		}, 200);
	}

	// orderQuantity.contentEditable = true;
	// orderQuantity.onkeydown = function (e) {
	// 	// console.log(e.keyCode);
	// 	if (e.keyCode === 13) {
	// 		e.preventDefault();
	// 	}
	// };
	// orderQuantity.onkeyup = function (e) {
	// 	console.log(orderQuantity.innerHTML);
	// 	updateMargin();
	// };

	setTimeout(function () {
		handle.style.transition = false;
	}, 1500);
}

function setHandle(percent) {
	handle.style.left = (Math.round(riskRangeImg.clientWidth * (percent / 100)) - 5) + 'px';
}

function updateMargin(quantity) {
	if (typeof quantity != 'number') {
		quantity = Math.floor((availableFunds * (riskExposure / 100)) / stockPrice);
		if (quantity == 0) quantity = 1;
	}
	window.localStorage.setItem('quantity', quantity);

	if (orderSize == 'quantity') {
		orderQuantity.innerHTML = quantity;
		updateRequiredMargin(quantity * stockPrice)
	} else if (orderSize == 'amount') {
		orderQuantity.innerHTML = '$' + (quantity * stockPrice);
		updateRequiredMargin(false);
	}
}

function _moveHandle(e) {
	e.preventDefault();
	handle.style.left = (e.offsetX - 5) + 'px';
	riskExposure = Math.round(e.offsetX * 100 / e.target.clientWidth);
	riskExposure = riskExposure > 98 ? 100 : riskExposure;
	riskExposure = riskExposure < 3 ? 1 : riskExposure;
	updateMargin();
}

function onRiskExposureChange() {
	riskRangeImg.onmousedown = function (e) {
		e.preventDefault();
		_moveHandle(e);
		riskRangeImg.onmousemove = _moveHandle;
		handle.onmouseup = function (e) {
			riskRangeImg.onmousemove = null;
		}
	};
}

init();

var initialMouse = 0;
var slideMovementTotal = 0;
var mouseIsDown = false;
var slider = $('#slider');

slider.on('mousedown touchstart', function (event) {
	mouseIsDown = true;
	slideMovementTotal = $('#button-background').width() - $(this).width() + 10;
	initialMouse = event.clientX || event.originalEvent.touches[0].pageX;
});

$(document.body, '#slider').on('mouseup touchend', function (event) {
	if (!mouseIsDown)
		return;
	mouseIsDown = false;
	var currentMouse = event.clientX || event.changedTouches[0].pageX;
	var relativeMouse = currentMouse - initialMouse;

	if (relativeMouse < slideMovementTotal) {
		$('.slide-text').fadeTo(300, 1);
		slider.animate({
			left: "-10px"
		}, 300);
		return;
	}
	slider.addClass('unlocked');


	let toggleGlass = false;
	$('#locker').text('hourglass_top');
	setInterval(_ => {
		if (slider.hasClass('unlocked')) {
			if (toggleGlass) {
				$('#locker').text('hourglass_bottom');
			} else $('#locker').text('hourglass_top');
			toggleGlass = !toggleGlass;
		}
	}, 500);

	let togglePlace = true;
	setTimeout(function () {
		if (togglePlace && slider.hasClass('unlocked')) {
			window.location.href = './order-confirmation-page.html';
		}
	}, 3500);

	setTimeout(function () {
		slider.on('click tap', function (event) {
			togglePlace = false;
			if (!slider.hasClass('unlocked'))
				return;
			slider.removeClass('unlocked');
			$('#locker').text('arrow_forward_ios');
			slider.off('click tap');
		});
	}, 0);
});

$(document.body).on('mousemove touchmove', function (event) {
	if (!mouseIsDown)
		return;

	var currentMouse = event.clientX || event.originalEvent.touches[0].pageX;
	var relativeMouse = currentMouse - initialMouse;
	var slidePercent = 1 - (relativeMouse / slideMovementTotal);

	$('.slide-text').fadeTo(0, slidePercent);

	if (relativeMouse <= 0) {
		slider.css({
			'left': '-10px'
		});
		return;
	}
	if (relativeMouse >= slideMovementTotal + 10) {
		slider.css({
			'left': slideMovementTotal + 'px'
		});
		return;
	}
	slider.css({
		'left': relativeMouse - 10
	});
});