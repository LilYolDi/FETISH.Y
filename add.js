document.addEventListener("DOMContentLoaded", () => {

    const saveBtn = document.getElementById("saveBtn");
    const photoInput = document.getElementById("photo");
    const preview = document.getElementById("preview");

    let photoData = "";

    // Загрузка фото
    photoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            photoData = e.target.result;

            if (preview) {
                preview.src = photoData;
                preview.style.display = "block";
            }

        };

        reader.readAsDataURL(file);

    });

    // Кнопка "Опубликовать"
    saveBtn.addEventListener("click", function () {

        const name = document.getElementById("name").value.trim();
        const city = document.getElementById("city").value;
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value.trim();

        if (!name || !description) {
            alert("Заполните все обязательные поля.");
            return;
        }

        const ads = JSON.parse(localStorage.getItem("ads")) || [];

        ads.push({
            name: name,
            city: city,
            category: category,
            description: description,
            photo: photoData
        });

        localStorage.setItem("ads", JSON.stringify(ads));

        alert("Объявление опубликовано!");

        window.location.href = "index.html";

    });

});