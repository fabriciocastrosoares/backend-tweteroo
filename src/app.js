import express from "express";
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    const novoUsuario = {
        username,
        avatar
    }
    if(!username || !avatar){
        return res.status(400).send("Todos os campos são obrigatórios!"); 
    }
    usuarios.push(novoUsuario);
    res.send("Ok");
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
    res.send(tweetComAvatar.slice(-10).reverse());
});

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    const novoTweet = {
        username,
        tweet
    }
    const usuarioCadastrado = usuarios.find(u => u.username === username);

     if(!usuarioCadastrado){
       return res.status(401).send("Usuário não Cadastrado!");  
    }

    if(!username || !tweet){
        return res.send("Todos os campos são obrigatórios!"); 
    }

    tweets.push(novoTweet);
    res.send("Ok");

});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));