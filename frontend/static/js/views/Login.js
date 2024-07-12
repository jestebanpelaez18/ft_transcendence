window.isLoggedIn = false;
console.log(`Initial state: ${window.isLoggedIn}`);

import AView from "./AView.js";
import textInputField from './TextInputView.js';

export default class extends AView {
	constructor(params){
		super(params);//call the constructor of the parent class
		this.setTitle("Login");
	}

	async getHtml(){
		const title = this.createHeader('log-in', 'Log In', 'h1');
		title.classList.add('text-center');
	
		const form = this.createForm('loginform');
		const usernameInput = textInputField('username', 'Username', 'username', 'text');
		const passwordInput = textInputField('password', 'Password', 'password', 'password');
		const loginButton = this.createButton('log-in', 'Login');
		form.appendChild(usernameInput);
		form.appendChild(passwordInput);
		form.appendChild(loginButton);
		
		const registerSuggestion = this.createParagraph('register', 'Don\'t have an account?');
		const registerLink = this.createAnchor('register-link', 'Register here');
		registerLink.href = '/register';
		registerLink.setAttribute("data-link", "");
		registerLink.setAttribute('id', "register-link");
	
		form.addEventListener('submit', this.handleFormSubmit.bind(this));

		window.localStorage.setItem('page', 'Login');
		this.updateView(title, form, registerSuggestion, registerLink);
		return ;
	}
	
	async handleFormSubmit(event) {
		event.preventDefault();
		
		const username = event.target.username.value;
		const password = event.target.password.value;
		console.log(`Username: ${username}, Password: ${password}`);
		
		const data = {
				username: username,
				password: password
		};
	
		try {
				const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/login`, {
						method: 'POST',
						headers: {
								'Content-Type': 'application/json'
							},
						body: JSON.stringify(data)
				});

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const responseData = await response.json();
				if (responseData.success) {
					window.location.href = '/dashboard';
				} else {
					console.error('Login failed:', responseData.message);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
			console.log(import.meta.env.VITE_API_ENDPOINT); // will be deleted later. now currently checkig if .env in frontend works
    }
}
		// return `
		// 	<div class="container">
		// 		<h2 class="text-center">Login</h2>
		// 		<br>
		// 		<form action="/login.php" class="loginForm">
		// 			<div class="input-group">
		// 				<label for="username" class="label">Username</label>
		// 				<input type="text" id="username" class="input">
		// 				<span class="error-message"></span>
		// 			</div>
		// 			<br>
		// 			<div class="input-group">
		// 				<label for="password" class="label">Password</label>
		// 				<input type="password" id="password" class="input">
		// 				<span class="error-message"></span>
		// 			</div>
		// 			<button class = "login button" data-action="logged-in">
		// 				Login</button>
		// 			<p>Not registered yet? <a href="/register" id ="registerLink" data-link>Register here</a></p>
		// 		</form>
		// 	</div>
		// 	`;