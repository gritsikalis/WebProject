//
const { promisifiedPool } = require('./Config/config');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
const mysql = require('mysql2/promise');
//const { promisePool } = require('./Config/config');
const fileupload = require('express-fileupload');


app.set('view engine', 'ejs');
app.set('views', './views')
app.use('/public', express.static(path.join(__dirname, "public")));
app.use(fileupload());
app.use(express.json());



app.listen(3000, function () {
    console.log("running on port 3000");
})


app.get('/history', function (req, res) {
    res.render('history.ejs')
})


app.get('/TEST', function (req, res) {
    res.render('TEST.ejs')
})




//MAINPAGE
app.get('/mainpage', function (req, res) {
    res.render('mainpage.ejs')
})

// function myDate(day) {
//         var weekdays = new Array(7);
//         weekdays[0] = "Sunday";
//         weekdays[1] = "Monday";
//         weekdays[2] = "Tuesday";
//         weekdays[3] = "Wednesday";
//         weekdays[4] = "Thursday";
//         weekdays[5] = "Friday";
//         weekdays[6] = "Saturday";
//         var r = weekdays[day];
//         return r;
// }

app.post('/searchdatabase', async function (req, res) {
    const value = req.body.poi;
    //console.log(value);

    //an h anazitisi tairiazei me ena apo ta types h to name enos poi ths vasis
    const sql = `SELECT * FROM poi WHERE name LIKE '%${value}%' OR types LIKE '%${value}%' `;
    var dbResp
    try{
        dbResp = await promisifiedPool.query(sql);
    }catch(error){
        console.log("error,",error);
    }
    
    //console.log(dbResp);
    // var today = new Date();

    // var day = today.getDay();
    // var dayname = myDate(day);
    // console.log(dayname);

    // var time = today.getHours();
    // console.log(time);


    //console.log(dbResp[0][0].coordinates.x);
    //console.log(dbResp[0][0].coordinates.y);
    
    //pinakas.append(dbResp[0][0]);

    //console.log(dbResp[0][0].popularTimes.name.data);
    res.send(dbResp[0][0]);
    console.log(dbResp[0][0]);
    //console.log(JSON.stringify(dbResp[0][0].types[0]));
    //console.log("testtest");
})   


app.post('/mainpagescript', async function (req, res) {

    const usernameFromVisit = req.body.username;
    const PoiFromVisit = req.body.poiname;
    const TimestampFromVisit = req.body.timestamp;
    const Est_people = req.body.est_people;

    //console.log(TimestampFromVisit);

    const sqlQueryString = `INSERT INTO visits(\`username\`, \`poi\`, \`timestamp\`, \`est_numberofpeople\`) VALUES('${usernameFromVisit}', '${PoiFromVisit}', '${TimestampFromVisit}', '${Est_people}')`;
    var resultFromDatabase;
    try{
        resultFromDatabase = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }
    console.log(resultFromDatabase[0])
})



//LOGIN
app.get('/login', function (req, res) {
    res.render('login.ejs')
})

app.post('/loginscript', async function (req, res) {
    console.log(req.body);

    const usernameFromClient = req.body.username;
    const passwordFromClient = req.body.password

    // 8a domoume poio 8a einai to query mas  
    const sqlQueryString = `SELECT * FROM users WHERE username='${usernameFromClient}' AND password='${passwordFromClient}'; `;

  
    //console.log(sqlQueryString);
    var resultFromDatabase;
    try{
        resultFromDatabase = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }

    console.log(resultFromDatabase[0][0]);


    if(resp[0].length > 0 ){ // o user exei oristei panw panw
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

app.post('/registerscript', async function (req, res) {
    const usernameFromClient = req.body.username;
    const passwordFromClient = req.body.password;
    const emailFromClient = req.body.email;

    const sqlQueryString = `INSERT INTO users(\`username\`, \`password\`, \`email\`, \`isAdmin\`) VALUES('${usernameFromClient}', '${passwordFromClient}', '${emailFromClient}', 0)`
    var resp;
    try{
        resp = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }

    console.log(resp[0]);
})




//UPDATE_PROFILE
app.get('/updateprofile', function (req, res) {
    res.render('update_profile.ejs')
})

app.post('/update_profilecript', async function (req, res) {

    console.log(req.body);
    const usrFromClient = req.body.usr;
    const pswdFromClient = req.body.pswd;
    const newusernameFromClient = req.body.username;
    const newpasswordFromClient = req.body.password;

    const select1Sql = `SELECT userId FROM users WHERE username = '${usrFromClient}' AND password = '${pswdFromClient}'`;
    var resultFromDatabase1;
    try{
        resultFromDatabase1 = await promisifiedPool.query(select1Sql);
    }catch(error){
        console.log("error,",error);
    }
    
    //console.log(resultFromDatabase1[0][0]);
    const result = resultFromDatabase1[0][0].userId;

    const sqlQueryString = `UPDATE users SET username = '${newusernameFromClient}' , password = '${newpasswordFromClient}' WHERE userId = ${result}`  
    var resultFromDatabase2;
    try{
        resultFromDatabase2 = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }


    console.log(resultFromDatabase2[0]);
})





//REPORT A CASE
app.get('/covidform', function (req, res) {
    res.render('covidform.ejs')
})


app.post('/covidformscript', async function (req, res) {
    const usernameFromCase = req.body.username;
    const FirstnameFromCase = req.body.firstname;
    const LastnameFromCase = req.body.lastname;
    const dateFromCase = req.body.date;


    const sqlQueryString = `INSERT INTO case_reports(\`username\`, \`First name\`, \`Last name\`, \`Date\`) VALUES('${usernameFromCase}', '${FirstnameFromCase}', '${LastnameFromCase}', '${dateFromCase}')`
    var resp;
    try{
        resp = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }
    

    console.log(resultFromDatabase[0])
})


//INFORMATION
app.get('/information', function (req, res) {
    res.render('information.ejs')
})





//ADMIN
app.get('/admin', function (req, res) {
    res.render('admin.ejs')
})

//upload pois
app.post('/adminscript', async function (req, res) {
    //1 upload sto server
    //2 8a to diavasei gia 3exwrisei tis eggrafes, like jsobject.js
    //3 pername tis eggrafes sth vash

    //1
    console.log(req);
    const myfiles = req.files.myFile; 
    const filedata = myfiles.data;

    //edw exoume diavasei to arxeio
    const getfilejsondata = JSON.parse(filedata);
    console.log(getfilejsondata);

    //2
    const pois = getfilejsondata.map(poi => {
        return {
            id: poi.id,
            name: poi.name,
            types: poi.types,
            coordinates: poi.coordinates,
            populartimes: poi.populartimes,
        }
    });
 
    //console.log(pois);


    // `INSERT INTO users(\`username\`, \`password\`, \`email\`, \`isAdmin\`) VALUES('${usernameFromClient}', '${passwordFromClient}', '${emailFromClient}', 0)`
    //3
    pois.map(async (poi) => {
        //ftiaxnw to query
        const sqlQueryString = `INSERT INTO poi(\`name\`, \`types\`, \`coordinates\`, \`pupularTimes\`)
        VALUES('${poi.name}','${JSON.stringify(poi.types)}', Point(${poi.coordinates.lat}, ${poi.coordinates.lng}), '${JSON.stringify(poi.populartimes)}')`
        //console.log(sql);
        //ektelese to query
        var resp;
        try{
            resp = await promisifiedPool.query(sqlQueryString);
        }catch(error){
            console.log("error,",error);
        }
    })
});


//delete poi uploads
app.post('/deletefile', async function (req, res) {
   
    const sqlQueryString = `DELETE FROM poi`
    var resp;
    try{
        resp = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }
    
});


//update pois
app.post('/updatefile', async function (req, res) {
   
    console.log(req.body);
    

    const oldpoiname = req.body.oldpoiname;
    const newnameFromAdmin = req.body.poiname;
    const newtypesFromAdmin = req.body.poitypes;
    const newcoordslatFromAdmin = req.body.poicoordslat;
    const newcoordslngFromAdmin = req.body.poicoordslng;
    const newpopulartimesFromAdmin = req.body.poipopulartimes;

    //console.log(newcoordslatFromAdmin);

    const select1Sql = `SELECT poi_id FROM poi WHERE name = '${oldpoiname}'`;

    var result1;
    try{
        result1 = await promisifiedPool.query(select1Sql);
    }catch(error){
        console.log("error name not found,",error);
    }
    
    //console.log(result1[0][0].poi_id);
    const poi_id = result1[0][0].poi_id;

    //const sqlQueryString = `INSERT INTO poi(\`name\`, \`types\`, \`coordinates\`, \`pupularTimes\`)
    //VALUES('${poi.name}','${JSON.stringify(poi.types)}', Point(${poi.coordinates.lat}, ${poi.coordinates.lng}), '${JSON.stringify(poi.populartimes)}')`
    
    const sqlQueryString = `UPDATE poi SET name = '${newnameFromAdmin}' , types = '${newtypesFromAdmin}', coordinates = Point(${newcoordslatFromAdmin},
    ${newcoordslngFromAdmin}), pupularTimes = '${newpopulartimesFromAdmin}' WHERE poi_id = ${poi_id}`;

    var result2;
    try{
        result2 = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }


    console.log(result2[0]);

    //IT WORKS!!! maybe...
    
});




//view visitors
app.post('/viewvisitors', async function (req, res) {

    const sqlQueryString = `SELECT * FROM visits`;
    
    
    var resp;
    try{
        resp = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }
    

    //console.log(resp[0].length);
    res.send(resp[0]);
})




























//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//const resultFromDatabase = await promisifiedPool.query(sqlQueryString);


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




