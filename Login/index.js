function signIn(e) {
  let email = document.getElementById("login_email").value, 
      password = document.getElementById("login_password").value;
      
  let form_data = JSON.parse(localStorage.getItem('form_data')) || [];

  let exist = form_data.length && 
  JSON.parse(localStorage.getItem('form_data')).some(data => 
    data.email.toLowerCase() == email && 
    data.password.toLowerCase() == password);

  if(!exist){
      alert("Incorrect login credentials");
  }
  else{
      location.href = "yes.html";
  }
  e.preventDefault();
}