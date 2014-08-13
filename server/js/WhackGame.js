var WhackGame = function() {
    var
        self = this
        , state = {
            bGameStarted: false
        }
        , messages = {
            sGameAlreadyStarted: 'Game has already started'
        }
        , defaults = {
            rows: 4 
            , columns: 7
            , timer: 20 
        }
        , setup = {}
        , clock

        // in seconds
        , timer = {
            start: function(time) {
                console.log('starting timer', time);        
            }
            , stop: function() {

            }
        }


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

        , setupDefaults = function(opts) {
            this.defaults = merge(this.defaults, opts);
        }
    ;

    // initialize game
    function init(opts) {
        var time
            , opts = opts || {}
        ;
        setupDefaults.call(this, opts);
        timer.start(this.defaults.timer);
        this.state.bGameStarted = true;

        return 'starting the game';
    }

    return {
        init: init
        , state: state
        , messages: messages
        , defaults: defaults
        , setupDefaults: setupDefaults
    }
};

module.exports = WhackGame;
