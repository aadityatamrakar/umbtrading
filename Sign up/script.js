const signUp = e => {
    let firstname = document.getElementById("first_name").value,
        lastname = document.getElementById("last_name").value,
        email = document.getElementById("Email").value,
        password = document.getElementById("password").value;

    let form_data = JSON.parse(localStorage.getItem('form_data')) || [];

    let exist = form_data.length && 
        JSON.parse(localStorage.getItem('form_data')).some(data => 
            data.firstname.toLowerCase() == firstname.toLowerCase() && 
            data.lastname.toLowerCase() == lastname.toLowerCase()
        );

    if(!exist){
        form_data.push({ firstname, lastname, email, password });
        localStorage.setItem('form_data', JSON.stringify(form_data));
        document.querySelector('form').reset();
        document.getElementById("Email").focus();
        alert("Account Created.\n\nPlease Sign In using the link below.");
    }
    else{
        alert("Ooopppssss... Duplicate found!!!\nYou have already signed up");
    }
    e.preventDefault();
}

function signIn(e) {
    let email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
    let form_data = JSON.parse(localStorage.getItem('form_data')) || [];
    let exist = form_data.length && 
    JSON.parse(localStorage.getItem('form_data')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
    if(!exist){
        alert("Incorrect login credentials");
    }
    else{
        location.href = "/";
    }
    e.preventDefault();
}