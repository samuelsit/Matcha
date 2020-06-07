let bodyParser = require('body-parser');
let app = require('express')();
let http = require('http').Server(app)
let io = require('socket.io')(http)
let cors = require('cors');
let connection = require('./bdd')

// Import routes
let membersRoutes = require("./routes/membersRoute");
let messagesRoutes = require("./routes/messagesRoute");
let interactionsRoutes = require("./routes/interactionsRoute");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('dotenv').config()

// Setup server port
var port = process.env.PORT || 5000;

app.use(cors());

// Use Api routes in the App
app.use('/', membersRoutes);
app.use('/', messagesRoutes);
app.use('/', interactionsRoutes);

function isOpen(socket) { return socket.readyState === socket.OPEN }

io.on('connection', socket => {
    if (!isOpen(socket)) return;
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    })
    socket.on('notification', notification => {
        io.emit('notification', notification)
    })
})

// Launch app to listen to specified port
http.listen(port, function () {
    console.log("Running matchaback on port " + port);
});