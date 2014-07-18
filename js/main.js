(function() {
    var btn = document.querySelector('#mybtn')
    , userId = document.querySelector('#userId')
    , numUsers = document.querySelector('#numUsers')
    , events = document.querySelector('#events')
    , host = location.origin.replace(/^http/, 'ws')
    , ws = new WebSocket(host)
    , user = ''
    , thisUserId
    , strUserPrefix = 'WHACKY_MOFO_'
    , strDisconnected = 'Some user disconnected'
    , strWhackSuffix = ' is whacking you!'

    // helper functions
    , showMessage = function(msg) {
        var li = document.createElement('li');
        li.innerHTML = msg;
        events.insertBefore(li, events.firstChild);
    }
    , updateUserCount = function(num) {
        numUsers.innerHTML = num;
    }
    ;

    userId.innerHTML = thisUserId = (new Date()).getTime();

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
                showMessage(strDisconnected);
                break;
            case 'whack:received':
                showMessage(message);
            default:
                break;
        }
    };

    btn.addEventListener('click', function() {
        ws.emit('whack', {
            message: strUserPrefix + thisUserId + strWhackSuffix
            , userId: thisUserId
        });
    });
})();

