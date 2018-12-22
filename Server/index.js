var express = require("express");
var app = express();
var http = require("http").Server(app);
var path = require("path");
var io = require("socket.io")(http);

const distPath = path.join(__dirname, "/dist");

app.use(express.static(distPath));

io.on("connection", function(socket) {
    console.log("a user connected");
    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
});

app.get("/*", (req, res) => {
    res.sendFile(distPath + "/index.html");
});

http.listen(3000, function() {
    console.log("listening on *:3000");
});
