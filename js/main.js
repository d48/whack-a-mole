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
    ;

    userId.innerHTML = thisUserId = (new Date()).getTime();

    ws.emit = function (event, data) {
        this.send(JSON.stringify({
            type: event
            , message: data.message || null
            , userId: data.userId || null
        }));
    };

    ws.onmessage = function (event) {
        var oData = JSON.parse(event.data)
        , type = oData.type
        , message = oData.message
        , aUserId = oData.userId
        ;

        switch (type) {
            case 'connected':
                numUsers.innerHTML  = message;
                break;
            case 'disconnected':
                numUsers.innerHTML  = message;
                var li = document.createElement('li');
                li.innerHTML = 'some user has been disconnected';
                events.insertBefore(li, events.firstChild);
                break;
            case 'whack:received':
                var li = document.createElement('li');
                li.innerHTML = message;
                events.insertBefore(li, events.firstChild);
            default:
                break;
        }
    };

    btn.addEventListener('click', function() {
        ws.emit('whack', {
            message: strUserPrefix + thisUserId + " is whacking you!"
            , userId: thisUserId
        });
    });
})();

