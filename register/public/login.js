function setStatus(text, type) {
    const status = document.getElementById("status");

    if (!status) return;

    status.textContent = text;
    status.className = "status " + (type || "");
}


window.onTelegramAuth = async function (telegramUser) {

    console.log("Telegram callback получен:", telegramUser);

    setStatus("Проверяем Telegram...");


    try {

        const response = await fetch(
            "https://fetish-y.onrender.com/auth/telegram",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify(telegramUser)
            }
        );


        const data = await response.json();


        console.log("Ответ сервера:", data);


        if (!response.ok) {

            throw new Error(
                data.error || "Ошибка авторизации"
            );
        }


        setStatus(
            "Вы вошли в Y-FETISH",
            "success"
        );


        console.log("АВТОРИЗАЦИЯ УСПЕШНА");


        // Переход на главную страницу
        window.location.assign(
            "https://lilyoldi.github.io/FETISH.Y/index.html"
        );

    } catch (error) {

        console.error(
            "Ошибка авторизации:",
            error
        );


        setStatus(
            error.message || "Ошибка входа",
            "error"
        );
    }
};
