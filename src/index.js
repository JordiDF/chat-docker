const express = require('express');
const app = express();
const http = require ('http').Server(app);
const io = require('socket.io')(http);


const PORT = process.env.PORT || 8080;

// const PORT = process.env.PORT || 0;

app.get('/', (req,res) => {
    // renderizado de la vista mediante package ejs
    res.render('index.ejs');
});

// socket activo
io.sockets.on("connection", (socket) => {
    
    // unirse al chat
    socket.on("username", (username) => {
        socket.username = username;
        io.emit("is_online", `<i> ${socket.username} se ha unido al chat</i>`);
    });

    // desconectarse del chat
    socket.on("disconnect", (username) => {
        socket.username = username;
        io.emit("is_online", `<i> ${socket.username} ha abandonado el chat</i>`);
    });

    // escribir en el chat
    socket.on("chat_message", (message) => {
        io.emit("is_online", `<strong> ${socket.username} </strong> ${message}`)
    });
})

const server = http.listen(PORT, () => {
    // console.log(`Escuchando por el puerto ${PORT}`);
    console.log(`Escuchando por el puerto ${server.address().port}`);
})