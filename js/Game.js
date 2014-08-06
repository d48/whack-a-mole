(function() {
    var Game = function() {
        this.game = {};

        /**
         * Set up grid based on passed in options
         * 
         * @name setupGrid
         * @param {object} opts - options for setting up the grid
         * @param {number} opts.columns - columns for the grid
         * @param {number} opts.rows - rows for the grid
         * @param {number} opts.timer - time in seconds to run the game
         * @returns {void} - build out DOM elements
         * @example 
         * setupGrid({columns:4, row: 3, timer: 20}); 
         * @method 
         * @memberof Game
         */
        function setupGrid(opts) {
            var cols = opts.columns
                , rows = opts.rows
                , elTable = Utils.createEl('table', 'game--container', 'game--container')
                , elContainer = document.querySelector('#game')
                , i = 0, j = 0
                , frag = document.createDocumentFragment()
                , row 
                , col
            ;
            for (i; i < rows; i++) {
                row = Utils.createEl('tr', 'game--row', 'game--row' + i);
                for (j; j < cols; j++) {
                    col = Utils.createEl('td', 'game--col', 'game--col'+ i + '' + j);
                    row.appendChild(col);
                }
                j = 0;
                frag.appendChild(row);
            }

            elTable.appendChild(frag);
            elContainer.appendChild(elTable);
        }

        function init(opts) {
            setupGrid(opts.defaults);
            return this;
        }

        return {
            init: init
        }
    };

    window.Game = Game;
})();
