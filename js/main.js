(function() {
    var btn = document.querySelector('#mybtn')
    , userId = document.querySelector('#userId')
    , numUsers = document.querySelector('#numUsers')
    , events = document.querySelector('#events')
    , host = location.origin.replace(/^http/, 'ws')
    , ws = new WebSocket(host)
    , user = ''
    , thisUserId
    ;

    userId.innerHTML = thisUserId = (new Date()).getTime();

    ws.emit = function (event, opts) {
        this.send(JSON.stringify({
            type: event
            , message: opts.message || null
            , userId: opts.userId || null
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
            message: "user is whacking you"
            , userId: thisUserId
        });
    });
})();

