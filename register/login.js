window.onTelegramAuth = async function (telegramUser) {
    setStatus("Проверяем Telegram...");

    try {
        const response = await fetch("/auth/telegram", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(telegramUser)
        });

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

        // Переходим на главную страницу
        window.location.href = "/";

    } catch (error) {
        console.error(error);

        setStatus(
            error.message || "Ошибка входа",
            "error"
        );
    }
};
