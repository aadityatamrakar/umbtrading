const signUp = e => {
    let firstname = document.getElementById("first_name").value,
        lastname = document.getElementById("last_name").value,
        email = document.getElementById("Email").value,
        password = document.getElementById("password").value;

    let form_data = JSON.parse(localStorage.getItem('form_data')) || [];

    let exist = form_data.length &&
        JSON.parse(localStorage.getItem('form_data')).some(data => {
            if (data.email.toLowerCase() == email && data.password.toLowerCase() == password) {
                localStorage.setItem('current_user', JSON.stringify(data));
                return true;
            } else return false;
        });

    if (!exist) {
        let current_user = {
            firstname,
            lastname,
            email,
            password
        };
        form_data.push(current_user);
        localStorage.setItem('form_data', JSON.stringify(form_data));
        localStorage.setItem('current_user', JSON.stringify(current_user));
        document.querySelector('form').reset();
        document.getElementById("Email").focus();

        // alert("Account Created.\n\nPlease Sign In using the link below.");
        window.location.href = "./landing-page.html";
    } else {
        alert("You account already exist, Logging in using same credentials...");
        window.location.href = "./landing-page.html";
    }
    e.preventDefault();
}

function signIn(e) {
    let email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;
    let form_data = JSON.parse(localStorage.getItem('form_data')) || [];
    let exist = form_data.length &&
        JSON.parse(localStorage.getItem('form_data')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
    if (!exist) {
        alert("Incorrect login credentials");
    } else {
        location.href = "/";
    }
    e.preventDefault();
}