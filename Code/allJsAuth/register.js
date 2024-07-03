document.addEventListener('DOMContentLoaded', function () {
    class Register{
    constructor(form, fields){
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    }
    

    validateOnSubmit(){
        let self = this;
        this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
            var usernameValue, passwordValue;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;  
				}
                if (field === 'username') {
                    usernameValue = input.value.trim();
                } else if (field === 'password') {
                    passwordValue = input.value.trim();
                }
			});
			if (error == 0) {
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    body: JSON.stringify({
                        username: usernameValue,
                        password: passwordValue,
                        postedporfolioid: null,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      }
                    });
				// console.log("sucess");
				// localStorage.setItem("auth", 1);
				// this.form.submit();
			}
		});
	}
    validateFields(field){
        if(field.value.trim() === ""){
            this.setStatus(
                field,
                `${field.nextElementSibling.innerText} não pode ficar em branco`,
                "error"
            );
            return false;
        }
        else{
            if(field.type == "password"){
                if(field.value.length < 8){
                    this.setStatus(
                        field,
                        `${field.nextElementSibling.innerText} tem que ter pelo menos 8 caracteres`,
                        "error"
                    );
                    return false; 
                }
                else{
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else{
                this.setStatus(field, null, "sucess");
                return true;
            }
        }
       
    }

    setStatus(field, message, status){
        const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
    }
}

    const form = document.querySelector('#loginForm');
    if(form){
        const fields = ['username', 'password'];
        const validator = new Register(form, fields)
    }
})