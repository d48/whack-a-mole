# Node.js Whack-a-mole game using WebSockets

A tiny demo using the [einaros/ws](http://einaros.github.io/ws/) WebSockets implementation.

# Running Locally

``` bash
npm install
npm start
```

# Running on Heroku

``` bash
heroku create
git push heroku master
heroku open
```

# Status
Work in progress

# Todo
* create `emit` method to set event name as in `ws.emit('boom', {data: 'boom'});`
* begin whack-a-mole game and object state setup
