function setStatus(text, type) {

    const status =
        document.getElementById("status");

    if (!status) {
        return;
    }

    status.textContent = text;

    status.className =
        "status " + (type || "");
}


window.onTelegramAuth = async function (telegramUser) {

    console.log(
        "Telegram authorization received:",
        telegramUser
    );

    setStatus(
        "Проверяем Telegram..."
    );


    try {

        const response =
            await fetch(
                "https://fetish-y.onrender.com/auth/telegram",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    credentials: "include",

                    body:
                        JSON.stringify(
                            telegramUser
                        )
                }
            );


        const data =
            await response.json();


        console.log(
            "Server response:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Ошибка авторизации"
            );
        }


        setStatus(
            "Вы вошли в Y-FETISH",
            "success"
        );


        /*
         * Успешная авторизация.
         * Переходим на главную страницу.
         */

        window.location.href =
            "https://lilyoldi.github.io/FETISH.Y/index.html";

    }


    catch (error) {

        console.error(
            "AUTH ERROR:",
            error
        );


        setStatus(
            error.message ||
            "Ошибка входа",
            "error"
        );

    }

};
