//SERVER
const { promisifiedPool } = require('./Config/config');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
const mysql = require('mysql2/promise');
const fileupload = require('express-fileupload');


app.set('view engine', 'ejs');
app.set('views', './views')
app.use('/public', express.static(path.join(__dirname, "public")));
app.use(fileupload());
app.use(express.json());


//RUN SERVER ON PORT 3000
app.listen(3000, function () {
    console.log("running on port 3000");
})


//RENDER PAGES
app.get('/history', function (req, res) {
    res.render('history.ejs')
})


app.get('/TEST', function (req, res) {
    res.render('TEST.ejs')
})

app.get('/charttest', function (req, res) {
    res.render('charttest.ejs')
})


//MAINPAGE
app.get('/mainpage', function (req, res) {
    res.render('mainpage.ejs')
})

//search bar 
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
    
    res.send(dbResp[0][0]);
    console.log(dbResp[0][0]);
   
})   

//submit a visit
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

//for login
app.post('/loginscript', async function (req, res) {
    console.log(req.body);

    const usernameFromAdmin = req.body.username;
    const passwordFromAdmin = req.body.password;

    // 8a domoume poio 8a einai to query mas  
    const sqlQueryString = `SELECT * FROM users WHERE username='${usernameFromAdmin}' AND password='${passwordFromAdmin}'; `;

  
    //console.log(sqlQueryString);
    var resultFromDatabase;
    try{
        resultFromDatabase = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }


    console.log(resultFromDatabase[0][0]);
    console.log(resultFromDatabase[0][0].isAdmin);
    

    if(resultFromDatabase[0].length > 0 && resultFromDatabase[0][0].isAdmin == 0 ){ 
         console.log('o server epistrefei success mainpage');
         res.send('success, go to mainpage');
     } else if(resultFromDatabase[0].length > 0 && resultFromDatabase[0][0].isAdmin == 1 ){
         console.log('o server epistrefei success admin');
         res.send('success, go to admin');
     } else {
        console.log('o server epistrefei fail');
        res.send('fail');
     }


})



//REGISTER
app.get('/register', function (req, res) {
    res.render('register.ejs')
})

//for register
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

app.post('/istoriko', async function (req, res) {

    const usrFromClient = req.body.usr;

    const selectSQL1 = `SELECT * FROM case_reports  WHERE username = '${usrFromClient}'`;
    const selectSQL2 = `SELECT * FROM visits  WHERE username = '${usrFromClient}'`;

    var resultFromDatabase1;
    try{
        resultFromDatabase1 = await promisifiedPool.query(selectSQL1);
    }catch(error){
        console.log("error,",error);
    }
    //console.log(resultFromDatabase1[0]);
    res.send(resultFromDatabase1[0]);

        
    var resultFromDatabase2;
    try{
        resultFromDatabase2 = await promisifiedPool.query(selectSQL2);
    }catch(error){
        console.log("error,",error);
    }
    //console.log(resultFromDatabase2[0]);
    res.send(resultFromDatabase2[0]);

})





//REPORT A CASE
app.get('/covidform', function (req, res) {
    res.render('covidform.ejs')
})

//upload covid form
app.post('/covidformupload', async function (req, res) {
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
    

    //console.log(resultFromDatabase[0])
})


//INFORMATION
app.get('/information', function (req, res) {
    res.render('information.ejs')
})

//get visits information
app.post('/getpois', async function (req, res) {

    const username = req.body.username
   
    const sqlQueryString = `SELECT * FROM visits WHERE username = '${username}'`;
    var resp;
    try{
        resp = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }
    console.log(resp[0]);
    res.send(resp[0]);
});




//ADMIN
app.get('/admin', function (req, res) {
    res.render('admin.ejs')
})

//upload pois
app.post('/uploadfile', async function (req, res) {
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
    
});





//RENDER graph.ejs
app.get('/graphs', function (req, res) {
    res.render('graphs.ejs')
})

// a. Συνολικός αριθμός επισκέψεων που έχουν καταγραφεί.
app.post('/viewvisitors', async function (req, res) {

    const sqlQueryString = `SELECT * FROM visits`;


    var resp;
    try{
        resp = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }


    console.log(resp[0].length);
    res.send(resp[0]);
})

//b. Συνολικός αριθμός κρουσμάτων που έχουν δηλωθεί.
app.post('/viewcases', async function (req, res) {

    const sqlQueryString = `SELECT * FROM case_reports`;


    var resp;
    try{
        resp = await promisifiedPool.query(sqlQueryString);
    }catch(error){
        console.log("error,",error);
    }


    console.log(resp[0].length);
    res.send(resp[0]);
})



app.post('/viewactivecases', async function (req, res) {
    
    const sqlQueryString2 = `SELECT count(*) as activeCases FROM case_reports INNER JOIN visits on case_reports.username=visits.username where DATE(visits.timestamp) BETWEEN 
    DATE_SUB(case_reports.Date, INTERVAL 7 DAY) AND DATE_ADD(case_reports.Date , INTERVAL 14 DAY)`;
    var resp2;
    try{
        resp2 = await promisifiedPool.query(sqlQueryString2);
    }catch(error){
        console.log("error,",error);
    }
    console.log(resp2[0])
    res.send({activeCases:  resp2[0][0].activeCases});

})