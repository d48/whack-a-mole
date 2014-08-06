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
        , setup = {}

        /**
         * Merge object b into a
         * 
         * @name merge
         * @param {object} a -  object with keys to merge into
         * @param {object} b - object with keys to merge from
         * @returns {object} a - object a modified 
         * @example 
         * merge({a: 1}, {a: 2}); // returns {a: 2} 
         * merge({a: 1}, {b: 2}); // returns {a: 2, b:2} 
         * merge({a: 1}, {b: 2}); // returns {a: 2, b:2} 
         * @method 
         * @memberof WhackGame
         * @author Ryan Regalado 
         */
        , merge = function(a,b) {
            if (a && b) {
                for (var key in b) {
                    if (b.hasOwnProperty(key)) {
                        a[key] = b[key];
                    }
                }
            } else {
                return;
            }
            return a;
        }
    ;

    function init(opts) {
        return 'initing the game';
    }

    return {
        init: init
        , state: state
        , messages: messages
        , defaults: this.defaults
    }
};

module.exports = WhackGame;
