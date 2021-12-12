// Stcoks list
var stocks = [{
    name: "Apple",
    prices: ["$505", "+$25"]
  },
  {
    name: "Shell",
    prices: ["$330", "-$17"]
  },
  {
    name: "Instagram",
    prices: ["$770", "+$42"]
  },
  {
    name: "Tesla",
    prices: ["$1500", "-$103"]
  },
  {
    name: "McDonald's",
    prices: ["$237", "+$63"]
  },
  {
    name: "Volkswagen",
    prices: ["$645", "-$22"]
  },
  {
    name: "Mastercard",
    prices: ["$890", "+$33"]
  },
  {
    name: "KFC",
    prices: ["$120", "-$29"]
  },
  {
    name: "Nike",
    prices: ["$436", "+$19"]
  },
  {
    name: "Huawei",
    prices: ["$337", "-$86"]
  }
];

// Update stock details function
function update_stock() {

  var stock = location.search.substring(1);

  if (stock === 'McDonald%27s') {
    stock = "McDonald's";
  }

  document.getElementById('heading').textContent = stock;

  for (let i = 0; i < stocks.length; i++) {
    if (stocks[i].name === stock) {
      document.getElementById('prices').cells[0].textContent = stocks[i].prices[0];
      document.getElementById('prices').cells[1].textContent = stocks[i].prices[1];

      let stock_price = parseInt(stocks[i].prices[0].replace('$', ''));
      updateBidAskTbl(stock_price);
    }
  }
};

function updateBidAskTbl(price) {
  if (!price) price = 505;
  let total_bid_qty = 0,
    total_ask_qty = 0;
  for (let i = 1; i < 6; i++) {
    document.getElementById('bid_' + i).innerHTML = price - i;
    document.getElementById('ask_' + i).innerHTML = price + i;

    let bid_qty = parseInt(Math.random() * 899) + 100;
    let ask_qty = parseInt(Math.random() * 899) + 100;
    document.getElementById('bidqty_' + i).innerHTML = bid_qty;
    document.getElementById('askqty_' + i).innerHTML = ask_qty;
    total_bid_qty += bid_qty;
    total_ask_qty += ask_qty;
  }
  document.getElementById('bidqty_total').innerHTML = total_bid_qty;
  document.getElementById('askqty_total').innerHTML = total_ask_qty;
}

// Slider menu function
function show_menu() {
  document.getElementById('sidebar').classList.toggle('active');
  document.getElementsByClassName('frame-button')[0].classList.toggle('active');
  document.getElementsByClassName('frame-button').disabled = false;
  document.getElementsByClassName('hidden-button')[0].classList.toggle('active');
  document.getElementsByClassName('hidden-button').disabled = false;
  document.getElementsByClassName('logo-screen')[0].classList.toggle('active');
  document.getElementById('heading').classList.toggle('active');
  document.getElementsByClassName('price-group')[0].classList.toggle('active');
  document.getElementsByClassName('price-table')[0].classList.toggle('active');
  document.getElementsByClassName('button-table')[0].classList.toggle('active');
};

// // Hide side bar function
function hide_sidebar() {

  document.getElementById('sidebar').classList.value = '';
  document.getElementsByClassName('frame-button')[0].classList.value = 'frame-button';
  document.getElementsByClassName('frame-button').disabled = true;
  document.getElementsByClassName('hidden-button')[0].classList.value = 'hidden-button';
  document.getElementsByClassName('hidden-button').disabled = true;
  document.getElementsByClassName('logo-screen')[0].classList.value = 'logo-screen';
  document.getElementById('heading').classList.value = '';
  document.getElementsByClassName('price-group')[0].classList.value = 'price-group';
  document.getElementsByClassName('price-table')[0].classList.value = 'price-table';
  document.getElementsByClassName('button-table')[0].classList.value = 'button-table';
};