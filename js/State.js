(function() {
    var State = function() {
        this.states = {};
        this.currentState = '';
    };

    State.prototype.init = function() {
        this.currentState = 'started';
        return 'State is initing';
    };

    // Node
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = State;
        }
        exports.State = State;
    } 
    // AMD/Require
    else if (typeof define === 'function' && define.amd) {
        define(function(require) { return State; });
    } 
    // Browser
    else if (window) {
        window.State = State;
    }
})();

