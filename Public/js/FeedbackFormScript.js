function enablebutton() {
	button.disabled=false;
}

//Submits the Information and Clears the inputs out

function submitmessage() {
	let formvalidate = false;

	if(emailaddress.value === '') {
		emailaddress.style.border = "4px solid red";
		formvalidate = true;
}

	if(firstname.value === '') {
		firstname.style.border = "4px solid red";
		formvalidate = true;
}
	if(lastname.value === '') {
		lastname.style.border = "4px solid red";
		formvalidate = true;
}
	if(commentsection.value === '') {
		commentsection.style.border = "4px solid red";
		formvalidate = true;
}
	if(phonenumber.value.length<12) {
		phonenumber.style.border = "4px solid red";
		formvalidate = true;
}
	if(emailaddress.value.indexOf('@') === -1 || emailaddress.value.indexOf('.') === -1){
		emailaddress.style.border = "4px solid red";
		formvalidate = true;
}

	if(formvalidate === true){
		window.alert("ERROR! Required Criteria not met!");
}
	else {
		window.alert("Thank you for your submission!");
		emailaddress.style.border = "4px solid transparent";
		firstname.style.border = "4px solid transparent";
		lastname.style.border = "4px solid transparent";
		commentsection.style.border = "4px solid transparent";
		phonenumber.style.border = "4px solid transparent";
		window.location.reload()
}
}



