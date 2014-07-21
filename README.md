# Node.js Whack-a-mole game using WebSockets

Work in progress: http://d48-whack.herokuapp.com

A tiny demo using the [einaros/ws](http://einaros.github.io/ws/) WebSockets implementation for a whack-a-mole game.

![screenshot](http://f.cl.ly/items/18360S0w332S2F0b1D3H/Image%202014-07-17%20at%2011.59.38%20AM.png)

# Running Locally

    npm install
    npm start

# Running on Heroku

    heroku create
    git push heroku master
    heroku open

# Status
Work in progress

# Todo
* ~~deploy to Heroku with custom url so everyone can hit~~
* ~~create `emit` method to set event name as in `ws.emit('boom', {data: 'boom'});`~~
* ~~broadcast user count on `connection.close`~~
* begin whack-a-mole game and object state setup

