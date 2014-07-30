var WhackGame = function() {
    var
        state = {
            bGameStarted: false
        }
        , messages = {
            sGameAlreadyStarted: 'Game has already started'
        }
        , defaults = {
            rows: 7
            , columns: 7
            , timer: 20
        }
    ;

    function init() {
        return 'initing the game';
    }

    return {
        init: init
        , state: state
        , messages: messages
    }
};

module.exports = WhackGame;
