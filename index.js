const express = require("express")
const graphHTTP = require("express-graphql").graphqlHTTP;
const schema = require('./schema/schema');
const cors = require('cors')

const app = express();
var mongoose = require('mongoose');
//for parsing the body in post request
var bodyParser = require('body-parser');

const DB = 'mongodb+srv://amir272:makakamir@cluster0.h6b0krt.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log("Connected")
}).catch((err)=>{
    console.log("Error in connection");
});

app.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log("App listening on 4000 and yay we have graphql")
})