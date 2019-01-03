var express = require("express");
var app = express();
var http = require("http").Server(app);
var path = require("path");
var io = require("socket.io")(http);
var expressStaticGzip = require("express-static-gzip");
var enforce = require("express-sslify");
const distPath = path.join(__dirname, "/dist");

if (process.env.NODE_ENV === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
app.use(expressStaticGzip(distPath));
// for client side routing serve index.html when no match
app.use("/*", expressStaticGzip(distPath));

// WebSockets
io.on("connection", function(socket) {
    const room = socket.handshake.query.room;
    const clientId = { clientId: socket.handshake.query.clientId };
    console.log("connection", clientId, room);
    socket.join(room);
    socket.to(room).broadcast.emit("user connected", clientId);

    socket.on("message to others", data => {
        console.log("message to others", clientId, data);
        socket.to(room).broadcast.emit("message to others", data);
    });

    socket.on("send model", data => {
        console.log("send model", data);
        socket.to(data.id).emit("send model", data);
    });

    socket.on("disconnect", function() {
        console.log("disconnect", clientId, room);
        socket.to(room).broadcast.emit("user disconnected", clientId);
    });

    socket.on("error", error => {
        console.log("Error", clientId, error);
    });

    if (io.sockets.adapter.rooms[room]) {
        const ids = Object.keys(io.sockets.adapter.rooms[room].sockets);
        if (ids.length > 0) {
            socket.to(ids[0]).emit("ask for model", { id: socket.id });
        }
    }
});

http.listen(process.env.PORT || 3000, function() {});
