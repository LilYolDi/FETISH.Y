const BOT_USERNAME =
    "YOUR_BOT_USERNAME";


const statusEl =
    document.getElementById(
        "status"
    );

const accountEl =
    document.getElementById(
        "account"
    );

const avatarEl =
    document.getElementById(
        "avatar"
    );

const accountNameEl =
    document.getElementById(
        "account-name"
    );

const accountUsernameEl =
    document.getElementById(
        "account-username"
    );

const logoutBtn =
    document.getElementById(
        "logout"
    );

const widget =
    document.getElementById(
        "telegram-widget"
    );


// ========================================
// TELEGRAM WIDGET
// ========================================

function loadTelegramWidget() {

    const script =
        document.createElement(
            "script"
        );

    script.async = true;

    script.src =
        "https://telegram.org/js/telegram-widget.js?22";


    script.setAttribute(
        "data-telegram-login",
        BOT_USERNAME
    );

    script.setAttribute(
        "data-size",
        "large"
    );

    script.setAttribute(
        "data-userpic",
        "true"
    );

    script.setAttribute(
        "data-request-access",
        "write"
    );

    script.setAttribute(
        "data-onauth",
        "onTelegramAuth(user)"
    );


    widget.appendChild(
        script
    );
}


// ========================================
// TELEGRAM CALLBACK
// ========================================

window.onTelegramAuth =
    async function (telegramUser) {

        setStatus(
            "Проверяем Telegram..."
        );


        try {

            const response =
                await fetch(
                    "/auth/telegram",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                telegramUser
                            )
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Ошибка авторизации"
                );
            }


            showAccount(
                data.user
            );


            setStatus(
                "Вы вошли в Y-FETISH",
                "success"
            );


            setTimeout(
                () => {

                    window.location.href =
                        "index.html";

                },
                700
            );


        } catch (error) {

            console.error(error);

            setStatus(
                error.message ||
                "Ошибка входа",
                "error"
            );
        }
    };


// ========================================
// CURRENT USER
// ========================================

async function checkSession() {

    try {

        const response =
            await fetch(
                "/auth/me"
            );


        const data =
            await response.json();


        if (
            data.loggedIn &&
            data.user
        ) {

            showAccount(
                data.user
            );

            setStatus(
                "Вы уже авторизованы",
                "success"
            );
        }

    } catch (error) {

        console.error(error);
    }
}


// ========================================
// SHOW ACCOUNT
// ========================================

function showAccount(user) {

    accountEl
        .classList
        .remove("hidden");


    if (user.photo_url) {

        avatarEl.src =
            user.photo_url;

        avatarEl.style.display =
            "block";

    } else {

        avatarEl.style.display =
            "none";
    }


    const fullName =
        [
            user.first_name,
            user.last_name
        ]
        .filter(Boolean)
        .



join(" ");


    accountNameEl.textContent =
        fullName ||
        "Пользователь";


    accountUsernameEl.textContent =
        user.username
            ? "@" + user.username
            : "Telegram";
}


// ========================================
// LOGOUT
// ========================================

logoutBtn.addEventListener(
    "click",
    async () => {

        try {

            await fetch(
                "/auth/logout",
                {
                    method: "POST"
                }
            );


            accountEl
                .classList
                .add("hidden");


            setStatus(
                "Вы вышли из аккаунта"
            );


        } catch (error) {

            console.error(error);
        }
    }
);


// ========================================
// STATUS
// ========================================

function setStatus(
    text,
    type = ""
) {

    statusEl.textContent =
        text;

    statusEl.className =
        "status " + type;
}


// ========================================
// START
// ========================================

loadTelegramWidget();

checkSession();		