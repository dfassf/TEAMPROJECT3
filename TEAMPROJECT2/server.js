const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');
const PORT = '3000';


const {sequelize} = require('./models');



// const router = require('./routers/index');
//console.log(router);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
});

app.use(cors());

app.use(session({
    secret:'aaa',
    resave:false,
    saveUninitialized:true,
}));

sequelize.sync({force:false,})
.then(() => {
    console.log('access successful')
}).catch(() => {
    console.log('access failed')
})

// app.use('/',router)

app.listen(PORT,() => {
    console.log(`server listening on port ${PORT}`);
})
