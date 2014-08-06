var WebSocketServer = require("ws").Server
, Game = require("./server/js/WhackGame.js")()
, http = require("http")
, express = require("express")
, app = express()
, port = process.env.PORT || 5000
, server
, users = 0
, _bGameStarted = false
, _sGameAlreadyStarted = 'Game has already started'
, _gState = Game.state
, _gMessages = Game.messages
, _gDefaults = Game.defaults
, wss
;

app.use(express.static(__dirname + "/"));
server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);
wss = new WebSocketServer({server: server});
console.log("websocket server created");

/**
 * Broadcasts message to all clients connected
 * @name broadcast
 * @param {string} event - determines what type should be set to for client
 * @param {object} data - object for what to send to client
 * @param {string} data.message - message to send to client
 * @param {number} data.userId - unique id of client
 * @returns {void} - sends WebSocket message to all clients connected
 * @example 
 *      wss.broadcast('hit', {
 *          message: 'user has been hit'
 *          , userId: 14514513143
 *      });
 * @method 
 * @memberof wss
 * @author Ryan Regalado 
 */
wss.broadcast = function(event, data) {
    for(var i in this.clients) {
        this.clients[i].send(JSON.stringify({
            type: event
            , message: data.message || null
            , userId: data.userId || null
        }));
    }
};

// upon connection
wss.on("connection", function(ws) {
    console.log('websocket connection opened');
    users++;

    if (_gState.bGameStarted) {
        ws.send(JSON.stringify({
            type: 'default'
            , message: 'already started, initing the game on the client'
            , userId: null
        }));
    }

    wss.broadcast('connected', {
        message: users
        , userId: null
    });

    // main listener
    ws.on('message', function(data, flags) {
        var oData;
        try {
            oData = JSON.parse(data);
        } catch (e) {
            console.error('mad errors yo', e);
            return;
        }

        var type = oData.type
        , message = oData.message
        , userId = oData.userId
        ;

        // parse message
        switch(type) {
            case 'game:start':
                // @todo make call to game but let the game manage the state instead of this 
                //       server file
                var str = !_gState.bGameStarted ? Game.init() : _gMessages.sGameAlreadyStarted
                    , obj = {
                        str: str 
                        , defaults: _gDefaults
                    }
                ;
                wss.broadcast('game:started', {
                    message: obj
                    , userId: userId
                });
                _gState.bGameStarted = true;
                break;
            default:
                break;
        }
    });

    ws.on("close", function() {
        console.log("websocket connection closed");
        users--;
        wss.broadcast('disconnected', {
            message: users
            , userId: null
        });
    });
});
