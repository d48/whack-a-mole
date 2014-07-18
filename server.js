var WebSocketServer = require("ws").Server
, http = require("http")
, express = require("express")
, app = express()
, port = process.env.PORT || 5000
, server
, users = 0
, wss
;

app.use(express.static(__dirname + "/"));
server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);
wss = new WebSocketServer({server: server});
console.log("websocket server created");


// utility functions
wss.broadcast = function(event, data) {
    for(var i in this.clients) {
        this.clients[i].send(JSON.stringify({
            type: event
            , message: data.message || null
            , userId: data.userId || null
        }));
    }
};



wss.on("connection", function(ws) {
    users++;

    wss.broadcast('connected', {
        message: users
        , userId: null
    });

    console.log("websocket connection open");

    // main listener
    ws.on('message', function(data, flags) {
        var oData = JSON.parse(data)
        , type = oData.type
        , message = oData.message
        , userId = oData.userId
        ;

        switch(type) {
            case 'whack':
                wss.broadcast('whack:received', {
                    message: 'WHACKY_MOFO_' + userId +  ' is whacking you!'
                    , userId: userId
                });
                break;
            default:
                break;
        }
    });

    ws.on("close", function() {
        console.log("websocket connection close");
        users--;
        wss.broadcast('disconnected', {
            message: users
            , userId: null
        });
    });
});
