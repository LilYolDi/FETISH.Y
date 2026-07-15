// =======================================
// Y-FETISH
// БОКОВОЕ МЕНЮ
// =======================================

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menuBtn");

// Открыть меню
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });
}

// Закрыть меню
if (overlay) {
    overlay.addEventListener("click", closeMenu);
}

function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

// Закрытие по клавише Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeMenu();
    }
});

// Закрывать меню после нажатия на ссылку
const menuLinks = document.querySelectorAll(".sidebar a");

menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});





