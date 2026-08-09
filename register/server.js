const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error("ERROR: TELEGRAM_BOT_TOKEN is not set in .env");
    process.exit(1);
}

// ========================================
// MIDDLEWARE
// ========================================

app.use(express.json());

app.use(
    session({
        secret:
            process.env.SESSION_SECRET ||
            crypto.randomBytes(32).toString("hex"),

        resave: false,

        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);

// ========================================
// STATIC FILES
// ========================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

// ========================================
// TELEGRAM VERIFICATION
// ========================================

function verifyTelegram(data) {

    if (!data || !data.hash) {
        return false;
    }

    const receivedHash = data.hash;

    const checkData = Object.keys(data)
        .filter(key => key !== "hash")
        .sort()
        .map(key => `${key}=${data[key]}`)
        .join("\n");

    const secretKey = crypto
        .createHash("sha256")
        .update(BOT_TOKEN)
        .digest();

    const calculatedHash = crypto
        .createHmac(
            "sha256",
            secretKey
        )
        .update(checkData)
        .digest("hex");

    if (calculatedHash !== receivedHash) {
        return false;
    }

    // Проверяем время авторизации Telegram

    const authDate = Number(data.auth_date);

    if (!authDate) {
        return false;
    }

    const now = Math.floor(Date.now() / 1000);

    const age = now - authDate;

    if (age < 0 || age > 86400) {
        return false;
    }

    return true;
}

// ========================================
// TELEGRAM LOGIN
// ========================================

app.post(
    "/auth/telegram",
    (req, res) => {

        try {

            const telegramUser = req.body;

            const valid =
                verifyTelegram(
                    telegramUser
                );

            if (!valid) {

                return res.status(401).json({
                    success: false,
                    error:
                        "Недействительные данные Telegram"
                });
            }

            // Сохраняем пользователя в сессии

            req.session.user = {

                telegram_id:
                    telegramUser.id,

                first_name:
                    telegramUser.first_name ||
                    "",

                last_name:
                    telegramUser.last_name ||
                    "",

                username:
                    telegramUser.username ||
                    "",

                photo_url:
                    telegramUser.photo_url ||
                    ""
            };

            return res.json({

                success: true,

                user:
                    req.session.user
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                error:
                    "Ошибка сервера"
            });
        }
    }
);

// ========================================
// CURRENT USER
// ========================================

app.get(
    "/auth/me",
    (req, res) => {

        if (!req.session.user) {

            return res.json({
                loggedIn: false
            });
        }

        return res.json({

            loggedIn: true,

            user:
                req.session.user
        });
    }
);

// ========================================
// LOGOUT

// ========================================

app.post(
    "/auth/logout",
    (req, res) => {

        req.session.destroy(
            err => {

                if (err) {

                    return res.status(500).json({
                        success: false
                    });
                }

                res.clearCookie(
                    "connect.sid"
                );

                return res.json({
                    success: true
                });
            }
        );
    }
);

// ========================================
// PROTECTED PROFILE
// ========================================

app.get(
    "/api/profile",
    (req, res) => {

        if (!req.session.user) {

            return res.status(401).json({

                error:
                    "Вы не авторизованы"
            });
        }

        return res.json({

            success: true,

            profile:
                req.session.user
        });
    }
);

// ========================================
// MAIN PAGE
// ========================================

app.get(
    "/",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "public",
                "index.html"
            )
        );
    }
);

// ========================================
// START SERVER
// ========================================

app.listen(
    PORT,
    () => {

        console.log("");

        console.log(
            "================================="
        );

        console.log(
            " Y-FETISH SERVER"
        );

        console.log(
            "================================="
        );

        console.log(
            "Server started on port " + PORT
        );

        console.log("");
    }
);