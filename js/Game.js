(function() {
    var Game = function() {
        function init() {
            return 'This is client initing';
        }

        return {
            init: init
        }
    };

    window.Game = Game;
})();

