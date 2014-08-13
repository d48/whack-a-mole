(function() {
    var btn           = document.querySelector('#mybtn')
    , elTimer         = document.querySelector('#timer')
    , userId          = document.querySelector('#userId')
    , elUserPrefix    = document.querySelector('#userPrefix')
    , numUsers        = document.querySelector('#numUsers')
    , events          = document.querySelector('#events')
    , host            = location.origin.replace(/^http/, 'ws')
    , ws              = new WebSocket(host)
    , user            = ''
    , thisUserId
    , strClassPrefix  = 'whack--'
    , strUserPrefix   = 'Player: '
    , strDisconnected = 'Some user disconnected'
    , strWhackSuffix  = ' is whacking you!'

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
    , game = null
    , is = { 
        'defined': function(obj) {
            return typeof obj !== 'undefined';
        }
    }
    , _clickHandle = function() {
        console.log('clicking');
        ws.emit('game:start', {
            message: strUserPrefix + thisUserId + strWhackSuffix
            , userId: thisUserId
        });
    }
    , addListeners = function() {
        btn.addEventListener('click', _clickHandle);
    }
    , removeListeners = function() {
        btn.removeEventListener('click', _clickHandle);
    }
    , disableButton = function() {
        btn.setAttribute('disabled', 'true');
        btn.className = 'disabled';
    }
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
                thisUserId = Date.now();
                userId.innerText = thisUserId;
                break;
            case 'disconnected':
                updateUserCount(message);
                logEvent(strDisconnected);
                break;
            case 'game:started':
                logEvent(message.str);
                if (!game) {
                    game = new Game().init({defaults: message.defaults});
                    removeListeners(); 
                    disableButton();
                    // will just receive tick event from server
                    elTimer.innerText = message.defaults.timer;                    
                }
                break;
            case 'default':
                logEvent(message);
                break;
            default:
                break;
        }
    };

    addListeners();

})();

