// ======= Меню =======

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});


// ======= Переходы =======

document.getElementById("loginBtn").onclick = () => {
    location.href = "login.html";
};

document.getElementById("registerBtn").onclick = () => {
    location.href = "register.html";
};

document.getElementById("addProfileBtn").onclick = () => {
    location.href = "add.html";
};


// ======= Объявления =======

let ads = JSON.parse(localStorage.getItem("ads")) || [];

const adsBox = document.getElementById("ads");

function showAds(list = ads){

    adsBox.innerHTML = "";

    if(list.length===0){

        adsBox.innerHTML = "<h2 style='text-align:center'>Объявлений пока нет</h2>";

        return;

    }

    list.reverse().forEach((ad,index)=>{

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


// ======= Поиск =======

document.getElementById("searchBtn").onclick=()=>{

    let text=document.getElementById("searchInput").value.toLowerCase();

    let result=ads.filter(ad=>

        ad.name.toLowerCase().includes(text) ||

        ad.city.toLowerCase().includes(text) ||

        ad.category.toLowerCase().includes(text)

    );

    showAds(result);

};


// ======= Открыть объявление =======

function openAd(i){

    localStorage.setItem("currentAd",i);

    location.href="ad.html";

}
