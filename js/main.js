(function() {
    var btn = document.querySelector('#mybtn')
    , userId = document.querySelector('#userId')
    , elUserPrefix = document.querySelector('#userPrefix')
    , numUsers = document.querySelector('#numUsers')
    , events = document.querySelector('#events')
    , host = location.origin.replace(/^http/, 'ws')
    , ws = new WebSocket(host)
    , user = ''
    , thisUserId
    , strClassPrefix = 'whack--'
    , strUserPrefix = 'Player: '
    , strDisconnected = 'Some user disconnected'
    , strWhackSuffix = ' is whacking you!'

    // helper functions
    , logEvent = function(msg) {
        var li = document.createElement('li');
        li.innerHTML = msg;
        li.className = strClassPrefix + 'event-log';
        events.insertBefore(li, events.firstChild);
    }
    , updateUserCount = function(num) {
        numUsers.innerHTML = num;
    }
    , game = window.game = new Game()
    ;

    elUserPrefix.innerHTML = strUserPrefix;

    ws.emit = function (event, data) {
        this.send(JSON.stringify({
            type: event
            , message: data.message || null
            , userId: data.userId || null
        }));
    };

    // parse broadcast message from server
    ws.onmessage = function (event) {
        var oData;
        try {
            oData = JSON.parse(event.data);
        } catch (e) {
            console.error('mad errors yo', e);
            return;
        }

        var type = oData.type
        , message = oData.message
        , aUserId = oData.userId
        ;

        switch (type) {
            case 'connected':
                updateUserCount(message);
                break;
            case 'disconnected':
                updateUserCount(message);
                logEvent(strDisconnected);
                break;
            case 'game:started':
                logEvent(message);
            default:
                break;
        }
    };

    btn.addEventListener('click', function() {
        ws.emit('game:start', {
            message: strUserPrefix + thisUserId + strWhackSuffix
            , userId: thisUserId
        });
    });
})();

