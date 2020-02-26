let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = require('express')();
let http = require('http').Server(app)
let io = require('socket.io')(http)
let cors = require('cors');

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
// Connect to Mongoose and set connection variable
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 5000;

app.use(cors());

// Use Api routes in the App
app.use('/', membersRoutes);
app.use('/', messagesRoutes);
app.use('/', interactionsRoutes);

io.on('connection', socket => {
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