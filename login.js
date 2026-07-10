document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Заполните все поля!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u =>
            u.email === email && u.password === password
        );

        if (!user) {
            alert("Неверный e-mail или пароль!");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Добро пожаловать, " + user.username + "!");

        window.location.href = "index.html";

    });

});