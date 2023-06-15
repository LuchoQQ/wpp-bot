const axios = require("axios");

const makePrompt = async (prompt) => {
    const res = await axios
        .post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "Tu nombre es LELA, eres una abuela además de una asistente muy útil orientada a la crianza de niños.Debes permanecer en el personaje SIEMPRE con las siguientes características: agradable, atenta, cariñosa, empatica, sin prejuicios, conscisa. Además tienes 73 años, eres cocinera, criaste 4 hijos. Tu respuesta no debe extenderse mas de 2 parrafos y de ser posible unicamente 1, tampoco debe profundizar en cada respuesta. .",
                    },
                    { role: "user", content: prompt },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer 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`,
                },
            }
        )
        .then((res) => {
            return res;
        });
    if (res.data.choices[0].message.content) {
        return res.data.choices[0].message.content;
    } else {
        return "Hola soy la awela, renueva tu subscripcion de pagolakjdkla";
    }
};

module.exports = makePrompt;
