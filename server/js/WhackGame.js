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
            // time in seconds
            start: function(interval) {
                console.log('starting timer', interval);        

                var interval = interval || 0, intervalId;

                // every second, check the interval
                // intervalId = setInterval(function() {
                //     this.clock = interval;
                //     interval--;
                // }, 1000);

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


        /**
         * Merge options with defaults to be used in object lifecycle
         * 
         * @name setupDefaults
         * @param {object} opts - options for game
         * @returns {object} this.defaults - width, height, timer 
         * @method 
         * @memberof WhackGame
         * @author Ryan Regalado <ryan.regalado@blackline.com>
         */
        , setupDefaults = function(opts) {
            return this.defaults = merge(this.defaults, opts);
        }
        , getTimer = function() {
            return this.clock;
        }
    ;

    // initialize game
    function init(opts) {
        var time
            , opts = opts || {}
        ;
        // setupDefaults.call(this, opts);

        this.defaults = merge(this.defaults, opts);
        timer.start.call(this, this.defaults.timer);
        this.state.bGameStarted = true;

        return 'starting the game';
    }

    return {
        init: init
        , state: state
        , messages: messages
        , defaults: defaults
        , setupDefaults: setupDefaults
        , getTimer: getTimer
    }
};

module.exports = WhackGame;
