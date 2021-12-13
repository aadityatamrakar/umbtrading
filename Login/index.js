function success(){

  var state = location.search.substring(1);

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

  if(state==='logout'){
    toastr.success("Logged out successfully!", "UMBTrading");
}
}

function signIn(e) {
  let email = document.getElementById("login_email").value,
    password = document.getElementById("login_password").value;

  let form_data = JSON.parse(localStorage.getItem('form_data')) || [];

  let exist = form_data.length &&
    JSON.parse(localStorage.getItem('form_data')).some(data => {
      if (data.email.toLowerCase() == email && data.password.toLowerCase() == password) {
        localStorage.setItem('current_user', JSON.stringify(data));
        return true;
      } else return false;
    });

  if (!exist) {
    alert("Login Failed, Please check your email and password.");
  } else {
    location.href = "landing-page.html?login";
  }
  e.preventDefault();
}
