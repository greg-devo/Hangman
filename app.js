const path = require('path');
const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser')
const app = express();

app.engine('hbs', expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main_layout",
    layoutsDir: "views/layouts"
}))
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

const hangmanRoutes = require('./routes/hangman_routes');
app.use('/hangman', hangmanRoutes.routes);

let port = 3333;
console.log(`Listening on: http://localhost:${port}/hangman`);

app.listen(port);

