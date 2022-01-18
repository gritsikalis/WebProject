var express = require('express');
var ejs = require('ejs')
var bodyParser = require('body-parser');
const { promisifiedPool } = require('./Config/config');
const fileUpload = require('express-fileupload');


const app = express();
var path = require('path');


const user = {
    username: 'testUser',
    password: 'pass'
}


app.use(express.static(__dirname + 'public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/public', express.static(path.join(__dirname, "public")));


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(fileUpload())

app.listen(3000, function () {
    console.log("Server Started on port: 3000");
});


//MAINPAGE
app.get('/mainpage', function (req, res) {
    res.render('mainpage.ejs')
})


//LOGIN
app.get('/login', function (req, res) {
    res.render('login.ejs')
})

app.post('/login', async function (req, res) {
    console.log('im in ');
    console.log(req.body);

    const usernameFromClient = req.body.username;
    const passwordFromClient = req.body.password

    // 8a domoume poio 8a einai to query mas   IIIIIIIII kotsaroume thn timi tis metavlitis sto string grafontas ${} DEDOMENOU OTI TO STRING einai mesa se  tetoia aftia ` ` 
    const sqlQueryString = `SELECT * FROM users WHERE username='${usernameFromClient}' AND password='${passwordFromClient}'; `;

    //let a = 'select * from users';
    //console.log(sqlQueryString);
    const resultFromDatabase = await promisifiedPool.query(sqlQueryString);


    console.log(resultFromDatabase[0][0]);


    if(resultFromDatabase[0].length > 0 ){ // o user exei oristei panw panw
         console.log('o server epistrefei success');
         res.send('success');
     } else {
         console.log('o server epistrefei fail');
         res.send('fail');
     }
})


//REGISTER
app.get('/register', function (req, res) {
    res.render('register.ejs')
})

app.post('/register', async function (req, res) {
    const usernameFromClient = req.body.username;
    const passwordFromClient = req.body.password;
    const emailFromClient = req.body.email;

    const sqlQueryString = `INSERT INTO users(\`username\`, \`password\`, \`email\`, \`isAdmin\`) VALUES('${usernameFromClient}', '${passwordFromClient}', '${emailFromClient}', 0)`
    const resultFromDatabase = await promisifiedPool.query(sqlQueryString);

    console.log(resultFromDatabase[0])
})


//ADMIN
app.get('/admin', function (req, res) {
    res.render('admin.ejs')
})

app.post('/sendpoifile', async function (req, res) {
    //1 9a tou e8ei to arxeio
    //2 8a to diavasei gia 3exwrisei tis eggrafes
    //3 9a tis eggrefes perasei sthn vahs

    //1
    const file = req.files.myFile;

    //2 
    const fileData = JSON.parse(file.data);

    const myDesiredEggrafes = fileData.map(eggrafh => {
        return {
            id: eggrafh.id,
            name: eggrafh.name,
            types: eggrafh.types,
            address: eggrafh.address,
            coordinates: eggrafh.coordinates,
            populartimes: eggrafh.populartimes,
        }
    })

    console.log(myDesiredEggrafes);

    // INSERT INTO poi (adress, coordinates, name) VALUES (Point(32.4234 , 12.1989))
    // promisifiedPool.query(`INSERT INTO`)
    myDesiredEggrafes.map(async (niosti_eggrafi) => {
        const sql = `INSERT INTO poi (address, coordinates, name) VALUES ('${niosti_eggrafi.address}', Point(${niosti_eggrafi.coordinates.lat}, ${niosti_eggrafi.coordinates.lng}), '${niosti_eggrafi.name}')`
        const result = await promisifiedPool.query(sql);
    })


    //3 prepei na perasoun oi eggrafes sthn vash


    res.send();
})

app.get('/admindata', async function (req, res) {

    //1 edw 8a prepei na vroume tis aparetites times gia ta grafiamta..
    // pou 8a tis vroume , 8a milisoume me thn vash gia na antlisoume authjn thn pliroforia..

    //estw milame me thn vash

    //kai h apanthsh ths vashs einai auto

    const sql = `select * from poi`;
    const dbResp = await promisifiedPool.query(sql);
    console.log(dbResp[0]);
    
    // thn plhroforia gia ta grafimata
    const responseFromDatabase = {
        sunolikaKrousmata: 90,
        plithosEpiskepseon: 20
    }

    res.send(responseFromDatabase)
})

app.get('/poi-locations', async function (req, res) {
    const sql = `select * from poi`;
    const dbResp = await promisifiedPool.query(sql);
   
    res.send(dbResp[0])
})