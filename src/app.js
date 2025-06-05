import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    const novoUsuario = { username, avatar }

    if (!username || typeof username !== "string" || !avatar || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    usuarios.push(novoUsuario);
    res.status(201).send("Ok");
});

app.post("/tweets", (req, res) => {
    const { user } = req.headers;
    const { tweet } = req.body;

    const novoTweet = { username: user, tweet };
    const usuarioCadastrado = usuarios.find(u => u.username === user);

    if (!usuarioCadastrado) {
        return res.status(401).send("Usuário Não Autorizado!");
    }

    if (!user || typeof user !== "string" || !tweet || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    tweets.push(novoTweet);
    res.status(201).send("Ok");

});

app.get("/tweets", (req, res) => {
    const page = Number(req.query.page);

    if (req.query.page && (isNaN(page) || page < 1)) {
        return res.status(400).send("Informe uma página válida!");
    }

    const tweetComAvatar = tweets.map((tweet) => {
        const usuario = usuarios.find(u => u.username === tweet.username);

        return {
            username: tweet.username,
            avatar: usuario.avatar,
            tweet: tweet.tweet
        };
    });
    if (page) {
        const limit = 10;
        const start = (page - 1) * limit;
        const end = page * limit;

        return res.send(tweetComAvatar.slice(start, end).reverse());
    }

    res.send(tweetComAvatar.slice(-10).reverse());
});

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;

    const tweetUsuario = tweets
        .filter((tweet) => tweet.username === username)
        .map((tweet) => {
            const usuario = usuarios.find(u => u.username === tweet.username);
            return {
                username: tweet.username,
                avatar: usuario.avatar,
                tweet: tweet.tweet
            };
        });

    res.send(tweetUsuario);
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));