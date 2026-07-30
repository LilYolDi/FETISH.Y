/* ===========================
   VIP АНКЕТЫ
=========================== */

const vipAnkets = [

{
    name: "Y-FETISH VIP",
    city: "Киев",
    age: "25 лет",
    image: "img/vip0.jpg",
    description: "VIP анкета",
    link: "https://t.me/Y_FETISH"
},

{
    name: "Анна",
    city: "Львов",
    age: "28 лет",
    image: "img/vip0.jpg",
    description: "Знакомства и общение",
    link: "https://t.me/yourchat4"
},

{
    name: "Марина",
    city: "Одесса",
    age: "26 лет",
    image: "img/vip0.jpg",
    description: "Общение и знакомства",
    link: "https://t.me/yourchat6"
}

];



/* ===========================
   ВСЕ АНКЕТЫ
=========================== */

const allAnkets = [

{
    name: "Алина",
    city: "Киев",
    age: "24 года",
    image: "img/vip0.jpg",
    description: "Новые знакомства",
    link: "https://t.me/yourchat2"
},


{
    name: "Елена",
    city: "Харьков",
    age: "30 лет",
    image: "img/vip0.jpg",
    description: "Общение и встречи",
    link: "https://t.me/yourchat3"
},


{
    name: "Виктория",
    city: "Львов",
    age: "27 лет",
    image: "img/vip0.jpg",
    description: "Анкета пользователя",
    link: "https://t.me/yourchat7"
},


{
    name: "Ольга",
    city: "Одесса",
    age: "29 лет",
    image: "img/vip0.jpg",
    description: "Знакомства",
    link: "https://t.me/yourchat8"
}



];



/* ===========================
   HTML БЛОКИ
=========================== */

const vipContainer = document.getElementById("vipAnkets");

const listContainer = document.getElementById("anketList");

const search = document.getElementById("search");



/* ===========================
   СОЗДАНИЕ КАРТОЧКИ АНКЕТЫ
=========================== */

function createAnketCard(anket){

return `

<div class="card">


<div class="card-top">

<img src="${anket.image}">

</div>



<div class="card-content">


<h3>
${anket.name}
</h3>


<p>
📍 ${anket.city}
</p>


<p>
🎂 ${anket.age}
</p>


<p>
${anket.description}
</p>



<a class="telegram-btn"

href="${anket.link}"

target="_blank">

Открыть анкету

</a>


</div>


</div>

`;

}



/* ===========================
   ВЫВОД АНКЕТ
=========================== */

function render(city = "Все", text = ""){


vipContainer.innerHTML = "";

listContainer.innerHTML = "";



/* VIP */

vipAnkets.forEach(anket => {



if(city !== "Все" && anket.city !== city)

return;



if(

!anket.name.toLowerCase().includes(text.toLowerCase())

&&

!anket.city.toLowerCase().includes(text.toLowerCase())

)

return;



vipContainer.innerHTML += createAnketCard(anket);



});





/* ВСЕ АНКЕТЫ */


allAnkets.forEach(anket => {



if(city !== "Все" && anket.city !== city)

return;



if(

!anket.name.toLowerCase().includes(text.toLowerCase())

&&

!anket.city.toLowerCase().includes(text.toLowerCase())

)

return;



listContainer.innerHTML += createAnketCard(anket);



});


}



/* ===========================
   ПЕРВЫЙ ЗАПУСК
=========================== */

render();



/* ===========================
   ПОИСК
=========================== */

search.addEventListener("input",()=>{


const active = document.querySelector(".city-btn.active");


const city = active 
? active.dataset.city 
: "Все";


render(city, search.value);


});



/* ===========================
   КНОПКИ ГОРОДОВ
=========================== */

document.querySelectorAll(".city-btn")
.forEach(btn=>{


btn.addEventListener("click",()=>{


document.querySelectorAll(".city-btn")
.forEach(b=>b.classList.remove("active"));



btn.classList.add("active");



render(
btn.dataset.city,
search.value
);



});


});



/* ===========================
   АКТИВНАЯ КНОПКА
=========================== */

const allButton =
document.querySelector(".city-btn[data-city='Все']");


if(allButton){

allButton.classList.add("active");

}


render();


/* ===========================
   КНОПКА ОТКРЫТИЯ МЕНЮ
=========================== */

const menuButton = document.getElementById("menuButton");


/* ===========================
   ВЫЕЗЖАЮЩАЯ ПАНЕЛЬ
=========================== */

const sideMenu = document.getElementById("sideMenu");



/* ===========================
   ОТКРЫТИЕ / ЗАКРЫТИЕ МЕНЮ
=========================== */

menuButton.addEventListener("click", ()=>{


    // Добавляем или убираем класс открытия

    sideMenu.classList.toggle("open");


});



/* ===========================
   ЗАКРЫТИЕ ПРИ НАЖАТИИ НА ССЫЛКУ
=========================== */

document.querySelectorAll(".side-link")
.forEach(link=>{


    link.addEventListener("click",()=>{


        sideMenu.classList.remove("open");


    });


});



/* ===========================
   ЗАКРЫТИЕ ПРИ НАЖАТИИ ВНЕ МЕНЮ
=========================== */

document.addEventListener("click",(event)=>{


    if(

        !sideMenu.contains(event.target)

        &&

        !menuButton.contains(event.target)

    ){

        sideMenu.classList.remove("open");

    }


});