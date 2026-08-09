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
                credentials: "include",
                body: JSON.stringify(telegramUser)
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

        window.location.replace(
            "https://lilyoldi.github.io/FETISH.Y/index.html"
        );

    } catch (error) {
        console.error(error);

        setStatus(
            error.message || "Ошибка входа",
            "error"
        );
    }
};
