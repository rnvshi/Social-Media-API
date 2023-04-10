const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialmediaAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = connection;