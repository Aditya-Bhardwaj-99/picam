const http=require("http");
const AvcServer = require('../lib/server')
const webss=require("ws").Server;
const app=require("express")();
var server=http.createServer(app);
var wss= new webss({server:server,path:'/picam'});

app.get('/',function(req,res){
    res.end("Server working");
})

app.use(express.static(path.resolve(__dirname, '/lib')))

const avcServer = new AvcServer(wss, width, height)

// handling custom events from client
avcServer.client_events.on('custom_event_from_client', e => {
    console.log('a client sent', e)
    // broadcasting custom events to all clients (if you wish to send a event to specific client, handle sockets and new connections yourself)
    avcServer.broadcast('custom_event_from_server', { hello: 'from server' })
})

wss.on('connection',function(ws){
    ws.on('message',function(data){
        avcServer.setVideoStream(JSON.parse(data).data);
    })
})


server.listen(process.env.PORT || 8001);