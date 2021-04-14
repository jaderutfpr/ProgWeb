document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        axios.post('https://reqres.in/api/login', {
            email: document.getElementById("email__login").value,
            password: document.getElementById("password__login").value
        })
        .then(function (response) {
            console.log(response);
            if(response.status === 200){
                localStorage.setItem('logged', 1)
                window.location = 'index.html'
            }
        })
        .catch(function (error) {
            console.log(error.response);
        });
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        axios.post('https://reqres.in/api/register', {
            email: document.getElementById("email__register").value,
            password: document.getElementById("password__register").value
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response);
        });
    });

});