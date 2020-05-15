const http=require("http");
const webss=require("ws").Server;
const app=require("express")();
var server=http.createServer(app);
var wss= new webss({server:server, path:"/picam"});

app.get('/',function(req,res){
    res.end("Server working");
})

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        client.send(msg);
     });
};

wss.on('connection',function(ws){
    ws.on('message',function(data){
        wss.broadcast(data);
    })
})

server.listen(process.env.PORT || 8001);