class Auth {
    constructor() {
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            const id = JSON.stringify(data[data.length - 1].id);
            this.validateAuth(id); 
        })
        .catch(error => console.log('Um erro ocorreu', error));
    }

    validateAuth(id) {
        if (!id) {
            //lembra de redirecionar o usuario pra fora daqui
            // window.location.replace("../login/login.html");   
            alert("Você não está registrado" + id);

        } else {
            console.log("Usuario registrado" + id)
        }
    }

    logOut() {
        localStorage.removeItem("auth");
        window.location.replace("/");
    }
}
