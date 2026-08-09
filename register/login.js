window.onTelegramAuth = async function (telegramUser) {
    setStatus("Проверяем Telegram...");

    try {
        const response = await fetch(
            "https://fetish-y.onrender.com/auth/telegram",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(telegramUser),
                credentials: "include"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Ошибка авторизации"
            );
        }

        setStatus(
            "Вы вошли в Y-FETISH",
            "success"
        );

        setTimeout(function () {
            window.location.href =
                "https://lilyoldi.github.io/FETISH.Y/index.html";
        }, 1000);

    } catch (error) {
        console.error(error);

        setStatus(
            error.message || "Ошибка входа",
            "error"
        );
    }
};
