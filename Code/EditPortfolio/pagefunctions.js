document.addEventListener("DOMContentLoaded", function () {

const form = document.querySelector("#formEl");

form.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    const formData = new FormData(form);

    const myInputs = Object.fromEntries(formData);
    console.log(myInputs);  

})

});