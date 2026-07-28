const vipChats = [

{
    name: "Y-FETISH | ЗНАКОМСТВА | ПОИСК ГОСПОЖИ",
    city: "BDSM",
    image: "img/vip1.jpg",
    members: "88 участников",
    description: "Знакомства поиск Госпожи",
    link: "https://t.me/Y_FETISH"
},

{
    name: "Чат 18+",
    city: "CUCKOLD",
    image: "img/vip0.jpg",
    members: "3999 участников",
    description: "Telegram чат",
    link: "https://t.me/yourchat4"
},

{
    name: "Чат 18+",
    city: "ЗНАКОМСВО",
    image: "img/vip0.jpg",
    members: "1836 участников",
    description: "Общение и знакомства",
    link: "https://t.me/yourchat6"
},

{
    name: "Чат 18+",
    city: "ПОИСК ГОСПОЖИ",
    image: "img/vip0.jpg",
    members: "2145 участников",
    description: "Общение и знакомства",
    link: "https://t.me/yourchat9"
},

];

const allChats = [

{
    name: "Чат 18+",
    city: "BDSM",
    image: "img/vip0.jpg",
    members: "2814 участников",
    description: "Telegram чат",
    link: "https://t.me/yourchat2"
},

{
    name: "Чат 18+",
    city: "CUCKOLD",
    image: "img/vip0.jpg",
    members: "4210 участников",
    description: "Общение и знакомства",
    link: "https://t.me/yourchat3"
},

{
    name: "Чат 18+",
    city: "ЗНАКОМСВО",
    image: "img/vip0.jpg",
    members: "2648 участников",
    description: "Telegram чат",
    link: "https://t.me/yourchat7"
},

{
    name: "Винница 18+",
    city: "ПОИСК ГОСПОЖИ",
    image: "img/vip0.jpg",
    members: "1975 участников",
    description: "Знакомства и общение",
    link: "https://t.me/yourchat8"
},

{
    name: "Чат 18+",
    city: "BDSM",
    image: "img/vip0.jpg",
    members: "5245 участников",
    description: "Знакомства и общение",
    link: "https://t.me/yourchat1"
},

{
    name: "Чат 18+",
    city: "CUCKOLD",
    image: "img/vip0.jpg",
    members: "2814 участников",
    description: "Telegram чат",
    link: "https://t.me/yourchat2"
},

{
    name: "Чат 18+",
    city: "ЗНАКОМСВО",
    image: "img/vip0.jpg",
    members: "4210 участников",
    description: "Общение и знакомства",
    link: "https://t.me/yourchat3"
},

{
    name: "Чат 18+",
    city: "ПОИСК ГОСПОЖИ",
    image: "img/vip0.jpg",
    members: "3999 участников",
    description: "Telegram чат",
    link: "https://t.me/yourchat4"
},

{
    name: "Чат 18+",
    city: "BDSM",
    image: "img/vip0.jpg",
    members: "1836 участников",
    description: "Общение и знакомства",
    link: "https://t.me/yourchat6"
},

{
    name: "Чат 18+",
    city: "CUCKOLD",
    image: "img/vip0.jpg",
    members: "2145 участников",
    description: "Общение и знакомства",
    link: "https://t.me/yourchat9"
},

{
    name: "Чат 18+",
    city: "ЗНАКОМСВО",
    image: "img/vip0.jpg",
    members: "2648 участников",
    description: "Telegram чат",
    link: "https://t.me/yourchat7"
},

{
    name: "Винница 18+",
    city: "ПОИСК ГОСПОЖИ",
    image: "img/vip0.jpg",
    members: "1975 участников",
    description: "Знакомства и общение",
    link: "https://t.me/yourchat8"
}

];

const vipContainer = document.getElementById("vipChats");
const listContainer = document.getElementById("chatList");
const search = document.getElementById("search");

function createCard(chat){

    return `
    <div class="card">

        <div class="card-top">
            <img src="${chat.image}">
        </div>

        <div class="card-content">

            <h3>${chat.name}</h3>

            <p>📍 ${chat.city}</p>

            <p>👥 ${chat.members}</p>

            <p>${chat.description}</p>

            <a class="telegram-btn"
               href="${chat.link}"
               target="_blank">

               Перейти в Telegram

            </a>

        </div>

    </div>
    `;
}

function render(city = "Все", text = ""){

    vipContainer.innerHTML = "";
    listContainer.innerHTML = "";

    vipChats.forEach(chat => {


if(city !== "Все" && chat.city !== city) return;

        if(
            !chat.name.toLowerCase().includes(text.toLowerCase()) &&
            !chat.city.toLowerCase().includes(text.toLowerCase())
        ) return;

        vipContainer.innerHTML += createCard(chat);

    });

    allChats.forEach(chat => {

        if(city !== "Все" && chat.city !== city) return;

        if(
            !chat.name.toLowerCase().includes(text.toLowerCase()) &&
            !chat.city.toLowerCase().includes(text.toLowerCase())
        ) return;

        listContainer.innerHTML += createCard(chat);

    });

}

render();

search.addEventListener("input", () => {

    const active = document.querySelector(".city-btn.active");
    const city = active ? active.dataset.city : "Все";

    render(city, search.value);

});

document.querySelectorAll(".city-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".city-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        render(btn.dataset.city, search.value);

    });

});

document.querySelector(".city-btn[data-city='Все']").classList.add("active");

render();