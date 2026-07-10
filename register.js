document.addEventListener("DOMContentLoaded", () => {

    const registerBtn = document.getElementById("registerBtn");

    registerBtn.addEventListener("click", () => {

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!username  !email  !password) {
            alert("Заполните все поля.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find(user => user.email === email);

        if (exists) {
            alert("Пользователь уже зарегистрирован.");
            return;
        }

        const newUser = {
            id: Date.now(),
            username: username,
            email: email,
            password: password,
            avatar: "",
            city: "",
            age: "",
            phone: "",
            about: "",
            photos: [],
            favorites: [],
            createdAt: new Date().toLocaleDateString()
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        alert("Регистрация прошла успешно!");

        window.location.href = "profile.html";

    });

});