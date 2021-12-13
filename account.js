function init() {
	let form_data = JSON.parse(localStorage.getItem('current_user')) || [];

	document.getElementById('user_name').innerHTML = "Hello " + form_data['firstname'] + "";
	document.getElementById('first_name').innerHTML = form_data['firstname'];
	document.getElementById('last_name').innerHTML = form_data['lastname'];
	document.getElementById('email').innerHTML = form_data['email'];
}

function logout() {
	window.location.href = 'signin-page.html?success';
}

init();