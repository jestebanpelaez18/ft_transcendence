import AView from "./AView.js";
import textInputField from "./TextInputView.js";

export default class extends AView {
	constructor(params){
		super(params);//call the constructor of the parent class
		this.setTitle('Settings');
	}

	async getHtml(){

		const title = this.createHeader('header', 'tervetuloo', 'h2');
		title.classList.add('text-center');

		const form = this.createForm('settings');
		const firstnameInput = textInputField('firstname', 'Firstname', 'firstname', 'text');
		const lastnameInput = textInputField('lastname', 'Lastname', 'lastname', 'text');
		const emailInput = textInputField('email', 'Email', 'email', 'text');
		const usernameInput = textInputField('username', 'Username', 'username', 'text');
		const passwordInput = textInputField('password', 'Password', 'password', 'password');
		const confirmPasswordInput = textInputField('password-again', 'Confirm password', 'confirm-password', 'password');
		const signupButton = this.createButton('save', 'save');
		
		form.appendChild(firstnameInput);
		form.appendChild(lastnameInput);
		form.appendChild(emailInput);
		form.appendChild(usernameInput);
		form.appendChild(passwordInput);
		form.appendChild(confirmPasswordInput);
		form.appendChild(signupButton);

		form.addEventListener('submit', this.handleSettingsFormSubmit.bind(this));
		
		const buttonEn = this.createLanguageButton('english', 'lang-toggle', 'English');
		const buttonFi = this.createLanguageButton('finnish', 'lang-toggle', 'Finnish');
		const buttonSp = this.createLanguageButton('spanish', 'lang-toggle', 'Spanish');
		
		window.localStorage.setItem('page', 'Settings');
		this.updateView(title, form, buttonEn, buttonFi, buttonSp);
		return ;
	}

	//add delete account with a confirmation pop up

	async handleSettingsFormSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const firstname = event.target.firstname.value;
        const lastname = event.target.lastname.value;
        const email = event.target.email.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        const confirmPassword = event.target['confirm-password'].value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Create the JSON object to be sent
        const data = {
			firstname: firstname,
			lastname: lastname,
			email: email,
            username: username,
            password: password
        };

		console.log(data);

	// do I need to create the settings endpoint? maybe we can connect this later
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/settings`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const responseData = await response.json();
    //         console.log(responseData);
    //     } catch (error) {
    //         console.error('There was a problem with the fetch operation:', error);
    //     }
    }
}
