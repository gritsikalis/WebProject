//MAP
var layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFyaW9zMjU5OCIsImEiOiJja3poMWJ5YXcwMDlzMm90N2QwY3N6c2dtIn0.Qz-5tsTlUpx3l2fKOO4KfQ'
    // get access from here :https://api.mapbox.com
    //old: pk.eyJ1IjoibGZrc2pmZGtsc2pmbGtzZGpmbGtzZGZqbGsiLCJhIjoiY2twZHZ2emJyMXJpOTJubnhoNXE3dGF5MiJ9.tFk1NMKkfjT7F-0OJ4Z-Sw
})


var map = L.map('map', {
    selectedArea: true,
    center: [38.245865, 21.732860],
    zoom: 13,
    layers: [layer]
})


function success(details) {
    mylat = details.coords.latitude;
    mylng = details.coords.longitude;

    var marker = L.marker([mylat,mylng]).addTo(map)
    .bindPopup('You are here!')
    .openPopup();

        
    var circle = L.circle([mylat, mylng], {radius:5000}).addTo(map);;
}

function error(error) {
    alert('getCurrentPosition() failed');
    console.log(error);
}

var options = {
    timeout: 5000,
    maximumAge: 0,

}
//bres th topo8esia tou xrhsth
navigator.geolocation.getCurrentPosition(success, error, options);


//MARKER COLORS
var greenMarker = new L.Icon({ 
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var redMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var orangeMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});






//SEARCH BAR
//sunarthsh gia na doume ti mera einai
function myDate(day) {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var r = weekdays[day];
    return r;
}

//search, add markers, view form for visit, submit visit
async function SearchDatabase(){
    window.location.href = '/mainpage?#'


    
    var poiname = document.getElementById('Searchfield').value;
    var poi= {
        poi: poiname
    };
    const serverResponse = await axios.post('/searchdatabase', poi); // milame me ton server
    var poilat = serverResponse.data.coordinates.x;
    var poilng = serverResponse.data.coordinates.y;
    //console.log(serverResponse.data.pupularTimes);
    


    //PAIRNOUME THN TIMH THS MERAS KAI THS WRAS
    var today = new Date();
    var day = today.getDay();
    var dayname = myDate(day);
    //console.log(dayname);
    var currenttime = today.getHours();
    //console.log(currenttime);


    //METASXHMATIZOUME TA POPULAR TIMES GIA TA MARKERS
    var populartimes = serverResponse.data.pupularTimes;
    
        //MONDAY
        var mon = populartimes.substring(populartimes.search("Monday") +16, populartimes.search("Tuesday") -12);
        var monday = mon.split(',').map(Number);
        //console.log("monday");
        //console.log(mon);
        //console.log(monday);
        

        //TUESDAY
        var tue = populartimes.substring(populartimes.search("Tuesday") +17, populartimes.search("Wednesday") -12);
        var tuesday = tue.split(',').map(Number);
        //console.log("tuesday");
        //console.log(tue);
        //console.log(tuesday);

        //WEDNESDAY
        var wed = populartimes.substring(populartimes.search("Wednesday") +19, populartimes.search("Thursday") -12);
        var wednesday = wed.split(',').map(Number);
        //console.log("wednesday");
        //console.log(wed);
        //console.log(wednesday);

        //THURSDAY
        var thu = populartimes.substring(populartimes.search("Thursday") +18, populartimes.search("Friday") -12);
        var thursday = thu.split(',').map(Number);
        //console.log("thursday");
        //console.log(thu);
        //console.log(thursday);

        //FRIDAY
        var fri = populartimes.substring(populartimes.search("Friday") +16, populartimes.search("Saturday") -12);
        var friday = fri.split(',').map(Number);
        //console.log("friday");
        //console.log(fri);
        //console.log(friday);

        //SATURDAY
        var sat = populartimes.substring(populartimes.search("Saturday") +18, populartimes.search("Sunday") -12);
        var saturday = sat.split(',').map(Number);
        //console.log("saturday");
        //console.log(sat);
        //console.log(saturday);

        //SUNDAY
        var sun = populartimes.substring(populartimes.search("Sunday") +17, populartimes.search("]}]") -0);
        var sunday = sun.split(',').map(Number);
        //console.log("sunday");
        //console.log(sun);
        //console.log(sunday);


        var dataformymarker;
        if(dayname=="Monday"){dataformymarker = monday[currenttime];}
        if(dayname=="Tuesday"){dataformymarker = tuesday[currenttime];}
        if(dayname=="Wednesday"){dataformymarker = wednesday[currenttime];}
        if(dayname=="Thursday"){dataformymarker = thursday[currenttime];}
        if(dayname=="Friday"){dataformymarker = friday[currenttime];}
        if(dayname=="Saturday"){dataformymarker = saturday[currenttime];}
        if(dayname=="Sunday"){dataformymarker = sunday[currenttime];}


        //console.log(dataformymarker);

        if(dataformymarker<=32){var marker = L.marker([poilat, poilng], {icon: greenMarker}).addTo(map);}
        else if(dataformymarker<=65){var marker = L.marker([poilat, poilng], {icon: orangeMarker}).addTo(map);}
        else{var marker = L.marker([poilat, poilng], {icon: redMarker}).addTo(map);}

    
    //if dist <20m
    //Briskei thn apostash tou poi apo emena se metra
    const R = 6371e3; // metres
    const f1 = poilat * Math.PI/180; // f, l in radians
    const f2 = mylat * Math.PI/180;

    const df = (mylat-poilat) * Math.PI/180;
    const dl = (mylng-poilng) * Math.PI/180;
    const a = Math.sin(df/2) * Math.sin(df/2) + Math.cos(f1) * Math.cos(f2) * Math.sin(dl/2) * Math.sin(dl/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    //console.log(d);


    var template = '<form id="popup-form">\
    <label></label>\<br>\
    <label for="usernameinput">Username</label>\<br>\
    <input id="username" class="popup-input" />\<br>\
    <label for="poiinput">Poi name</label>\<br>\
    <input id="poi_name" class="popup-input"/>\<br>\
    <label for="Timestamp">timestamp</label>\<br>\
    <input type="datetime-local" id="meeting-time" name="meeting-time" value="2022-02-04T19:30" min="2022-02-04T00:00" max="2026-06-14T00:00">\<br>\
    <label for="est_people">Estimated people there</label>\<br>\
    <input id="est_people" class="popup-input" type="number" />\<br>\
    <button id="button-submit" type="button">Submit visit</button>\<br>\
    </form>';

    //an to katasthma brhsketai entos 20 metrwn apo to xrhsth,sto popup emfanizetai kai h forma kataxwrishs episkepshs, an oxi tote emfanizetai mono to onoma tou katasthmatos
    if(d<=5000){
        marker.bindPopup(template);
        marker.openPopup();

        var buttonSubmit = L.DomUtil.get('button-submit');
        L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
            var answer = window.confirm("are you sure you want to register your visit?");
            if (answer) {
                marker.closePopup();
                visitform_upload();
            }  
        });
    }
    else{
        marker.bindPopup(serverResponse.data.name , dataformymarker);
        marker.openPopup();
    }

    map.flyTo([poilat, poilng]);   
}

//VISIT
async function visitform_upload() {
    var username = document.getElementById('username').value;
    var poiname = document.getElementById('poi_name').value;
    var timestamp = document.getElementById('meeting-time').value;
    var est_people = document.getElementById('est_people').value;

    // const currentDate = new Date(); 
    // const timestamp = currentDate.getTime();
    console.log(timestamp);

    // var input = document.getElementById("exampleInputDate").value;
    // var dateEntered = new Timestamp(input);

    let visitinfo = {
        username: username,
        poiname: poiname,
        timestamp: timestamp,
        est_people: est_people,
    }
    console.log(visitinfo);

    let response = await axios.post('/mainpagescript', visitinfo);
    console.log("test2222222");
    console.log(response);
}


//LOGOUT
async function Logout(){
    window.location.href = '/login'
}


//GO TO COVID FORM
async function goto_covidform(){
    window.location.href = '/covidform';
}

//GO TO UPDATE PROFILE
async function goto_updateprofile(){
    window.location.href = '/updateprofile';
}

//GO INFORMATION
async function goto_information(){
    window.location.href = '/information';
}