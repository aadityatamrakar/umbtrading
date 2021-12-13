
// Search function
function show_result()
{
  let stock = document.getElementById('search-value').value.toLowerCase();

  if (stock!==''){

    let stocks = [];

    var count = 0;

    for (let i=0; i<10; i++){
        stocks.push(document.getElementsByClassName("stock")[i].id);
    }

    for (var i = 0; i < stocks.length; i++)
    {
      if (stocks[i]!==stock) {
        document.getElementsByClassName("stock")[i].style.display = "none";
        count++;
      }
    }
    if (count===10)
    {
      document.getElementsByClassName("error")[0].style.display = "block";
      // document.getElementsByClassName("show-all")[0].style.display = "block";
      document.getElementById('search-value').value='';
    };
    document.getElementsByClassName("show-all")[0].style.display = "block";
  };
};

// Show all function
function show_all()
{
  location.reload();
};

// Slider menu function
function show_menu()
{
  document.getElementById('sidebar').classList.toggle('active');
  document.getElementsByClassName('frame-button')[0].classList.toggle('active');
  document.getElementsByClassName('frame-button').disabled = false;
  document.getElementsByClassName('hidden-button')[0].classList.toggle('active');
  document.getElementsByClassName('hidden-button').disabled = false;
  document.getElementsByClassName('logo-screen')[0].classList.toggle('active');
  document.getElementsByClassName('search-bar')[0].classList.toggle('active');
  document.getElementsByClassName('error')[0].classList.toggle('active');
  document.getElementsByClassName('show-all')[0].classList.toggle('active');
  document.getElementsByClassName('stocks-scroll')[0].classList.toggle('active');
  document.getElementsByClassName('stocks-scroll p.head')[0].classList.toggle('active');
  document.getElementsByClassName('stocks-scroll p.subhead')[0].classList.toggle('active');
  document.getElementsByClassName('stocks-scroll p.content')[0].classList.toggle('active');


  var status = document.getElementById('sidebar').classList.value;
  if (status === 'active')
  {
      document.getElementById('search-value').readOnly = true;
  }
  else
  {
    document.getElementById('search-value').readOnly = false;
  }
};

// // Hide side bar function
function hide_sidebar()
{

  document.getElementById('sidebar').classList.value='';
  document.getElementsByClassName('frame-button')[0].classList.value = 'frame-button';
  document.getElementsByClassName('frame-button').disabled = true;
  document.getElementsByClassName('hidden-button')[0].classList.value = 'hidden-button';
  document.getElementsByClassName('hidden-button').disabled = true;
  document.getElementsByClassName('logo-screen')[0].classList.value='logo-screen';
  document.getElementsByClassName('search-bar')[0].classList.value='search-bar';
  document.getElementsByClassName('error')[0].classList.value='error';
  document.getElementsByClassName('show-all')[0].classList.value='show-all';
  document.getElementsByClassName('stocks-scroll')[0].classList.value='stocks-scroll';

  var status = document.getElementById('sidebar').classList.value;
  if (status === 'active')
  {
      document.getElementById('search-value').readOnly = true;
  }
  else
  {
    document.getElementById('search-value').readOnly = false;
  }

};

function success(){

  var state = location.search.substring(1);

  let form_data = JSON.parse(localStorage.getItem('current_user')) || [];

  var name = form_data.firstname;

  document.getElementsByClassName('heading')[0].textContent = "Hello, "+name;

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"}

  if(state==='login'){
    toastr.success("Logged-in successfully!", "UMBTrading");
  }
  if(state==='created'){
    toastr.success("Account created successfully!", "UMBTrading");
  }
}
