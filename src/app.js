import express from "express";
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [
    {
        username: "bobesponja",
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
        tweet: "Eu amo hambúrguer de siri!"
    },
    {
        username: "Zeus",
        avatar: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh4xk8tcTtPAH5BK-MJUk43us44NQjGfYKqJe4FKh2MO4tDIzxkBI41goMtbZFC6rfwShFxBBO97VhLWXzauoUBxcrWNpmMkPDuSfST8hskGIGHcUhjSfc1d2YkSZqZ4hkcndHUr0qgNY/w452-h640/muller-pereira-zeus3lowq-bymuller.jpg",
        tweet: "SOU O DEUS SUPREMO"
    }
];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    const novoUsuario = {
        username,
        avatar
    }
    usuarios.push(novoUsuario);
    res.send("deu certo");
});

app.get("/tweets", (req, res) => {

    const tweetComAvatar = tweets.map(tweet => {
        const usuario = usuarios.find(u => u.username === tweet.username);

        return {
            username: tweet.username,
            avatar: usuario ? usuario.avatar : tweet.avatar,
            tweet: tweet.tweet
        };
    });
    res.send(tweetComAvatar.slice(-10));
});

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    const novoTweet = {
        username,
        tweet
    }
    tweets.push(novoTweet);
    res.send("certinho");

});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));