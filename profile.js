document.addEventListener("DOMContentLoaded", () => {

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        alert("Сначала зарегистрируйтесь.");
        window.location.href = "register.html";
        return;
    }

    const avatar = document.getElementById("avatar");
    const avatarInput = document.getElementById("avatarInput");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const age = document.getElementById("age");
    const city = document.getElementById("city");
    const about = document.getElementById("about");

    profileName.textContent = user.username || "";
    profileEmail.textContent = user.email || "";
    age.value = user.age || "";
    city.value = user.city || "Ивано-Франковск";
    about.value = user.about || "";

    if (user.avatar) {
        avatar.src = user.avatar;
    }

    avatarInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            avatar.src = e.target.result;
            user.avatar = e.target.result;

        };

        reader.readAsDataURL(file);

    });

    document.getElementById("saveProfile").addEventListener("click", () => {

        user.age = age.value;
        user.city = city.value;
        user.about = about.value;

        localStorage.setItem("currentUser", JSON.stringify(user));

        let users = JSON.parse(localStorage.getItem("users")) || [];

        users = users.map(u => {
            if (u.email === user.email) {
                return user;
            }
            return u;
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Профиль успешно сохранён!");

    });

});