(function() {
    var Utils = {
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
         * @memberof Game
         * @author Ryan Regalado 
         */
         merge: function(a,b) {
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
    };

    window.Utils = Utils;
})();

