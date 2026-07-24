// ======= Меню =======

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

// ======= Кнопки =======

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) loginBtn.onclick = () => location.href = "login.html";

const registerBtn = document.getElementById("registerBtn");
if (registerBtn) registerBtn.onclick = () => location.href = "register.html";

const addProfileBtn = document.getElementById("addProfileBtn");
if (addProfileBtn) addProfileBtn.onclick = () => location.href = "add.html";

// ======= Объявления =======

let ads = JSON.parse(localStorage.getItem("ads")) || [];

const adsBox = document.getElementById("ads");

function showAds(list = ads) {

    if (!adsBox) return;

    adsBox.innerHTML = "";

    if (list.length === 0) {
        adsBox.innerHTML = "<h2 style='text-align:center'>Объявлений пока нет</h2>";
        return;
    }

    [...list].reverse().forEach((ad, index) => {

        adsBox.innerHTML += `
        <div class="card" onclick="openAd(${index})">
            <img src="${ad.photo}">
            <div class="info">
                <h2>${ad.name}</h2>
                <p>${ad.city}</p>
                <p>${ad.category}</p>
            </div>
        </div>
        `;

    });

}

showAds();

// ======= Поиск VIP-карточек =======

const city = document.getElementById("city");
const category = document.getElementById("category");
const searchInput = document.getElementById("searchInput");

function searchAll() {

    const selectedCity = city.value.toLowerCase();
    const selectedCategory = category.value.toLowerCase();
    const text = searchInput.value.toLowerCase();

    document.querySelectorAll(".vip-card").forEach(card => {

        const p = card.querySelectorAll("p");

        const cardCity = p[0].textContent.toLowerCase();
        const cardCategory = p[1].textContent.toLowerCase();
        const cardText = card.textContent.toLowerCase();

        const cityOk = selectedCity === "" || cardCity === selectedCity;
        const categoryOk = selectedCategory === "" || cardCategory === selectedCategory;
        const textOk = text === "" || cardText.includes(text);

        if (cityOk && categoryOk && textOk) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}

if (city) city.addEventListener("change", searchAll);
if (category) category.addEventListener("change", searchAll);
if (searchInput) searchInput.addEventListener("input", searchAll);

const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
    searchBtn.addEventListener("click", searchAll);
}

searchAll();

// ======= Открыть объявление =======

function openAd(i) {
    localStorage.setItem("currentAd", i);
    location.href = "ad.html";
}





const cities = {
    ua: [
        "Винница",
        "Днепр",
        "Донецк",
        "Житомир",
        "Запорожье",
        "Ивано-Франковск",
        "Киев",
        "Кропивницкий",
        "Луганск",
        "Луцк",
        "Львов",
        "Николаев",
        "Одесса",
        "Полтава",
        "Ровно",
        "Сумы",
        "Тернополь",
        "Ужгород",
        "Харьков",
        "Херсон",
        "Хмельницкий",
        "Черкассы",
        "Чернигов",
        "Черновцы"
    ],

    ru: [
        "Абакан",
        "Анадырь",
        "Архангельск",
        "Астрахань",
        "Барнаул",
        "Белгород",
        "Биробиджан",
        "Благовещенск",
        "Брянск",
        "Великий Новгород",
        "Владивосток",
        "Владикавказ",
        "Владимир",
        "Волгоград",
        "Вологда",
        "Воронеж",
        "Горно-Алтайск",
        "Грозный",
        "Екатеринбург",
        "Иваново",
        "Ижевск",
        "Иркутск",
        "Йошкар-Ола",
        "Казань",
        "Калининград",
        "Калуга",
        "Кемерово",
        "Киров",
        "Кострома",
        "Краснодар",
        "Красноярск",
        "Курган",
        "Курск",
        "Кызыл",
        "Липецк",
        "Магадан",
        "Магас",
        "Майкоп",
        "Махачкала",
        "Москва",
        "Мурманск",
        "Нальчик",
        "Нарьян-Мар",
        "Нижний Новгород",
        "Новосибирск",
        "Омск",
        "Орел",
        "Оренбург",
        "Пенза",
        "Пермь",
        "Петрозаводск",
        "Петропавловск-Камчатский",
        "Псков",
        "Ростов-на-Дону",
        "Рязань",
        "Салехард",
        "Самара",
        "Санкт-Петербург",
        "Саранск",
        "Саратов",
        "Севастополь",
        "Смоленск",
        "Ставрополь",
        "Сыктывкар",
        "Тамбов",
        "Тверь",
        "Томск",
        "Тула",
        "Тюмень",
        "Улан-Удэ",
        "Ульяновск",
        "Уфа",
        "Хабаровск",
        "Ханты-Мансийск",
        "Чебоксары",
        "Челябинск",
        "Черкесск",
        "Чита",
        "Элиста",
        "Южно-Сахалинск",
        "Якутск",
        "Ярославль"
    ]
};

const country = document.getElementById("country");
const citySelect = document.getElementById("city");

if (country && citySelect) {
    country.addEventListener("change", () => {
        citySelect.innerHTML = '<option value="">Выберите город</option>';

        if (!cities[country.value]) return;

        cities[country.value].forEach(c => {
            const option = document.createElement("option");
            option.value = c;
            option.textContent = c;
            citySelect.appendChild(option);
        });
    });
}
