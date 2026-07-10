const ads = JSON.parse(localStorage.getItem("ads")) || [];

const index = localStorage.getItem("currentAd");

const ad = ads[index];

if (!ad) {
    location.href = "index.html";
}

document.getElementById("adPhoto").src = ad.photo;
document.getElementById("adName").textContent = ad.name;
document.getElementById("adCity").textContent = "📍 " + ad.city;
document.getElementById("adCategory").textContent = "📂 " + ad.category;
document.getElementById("adDescription").textContent = ad.description;

// Избранное
document.getElementById("favoriteBtn").onclick = function () {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.push(ad);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Добавлено в избранное");

};

// Сообщение
document.getElementById("messageBtn").onclick = function () {

    alert("Чат появится в следующей версии сайта.");

};

// Телефон
document.getElementById("phoneBtn").onclick = function () {

    alert("Телефон: +380 XX XXX XX XX");

};