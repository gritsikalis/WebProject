//FOR ADMIN UPLOAD
async function uploadFile() {
    //pare to arxeio pou exei epilex8ei sto input
    const htmlelement = document.getElementById('formFile');
    
    const selectedfile = htmlelement.files[0];
    console.log(htmlelement.files[0]);
    
    //gia na steilw arxeio sto server prepei na mpei se morfh formdata
    var pinakas = new FormData(); //edw 8a valoume ta arxeia mas;
    
    pinakas.append('myFile',selectedfile);
    
    console.log(pinakas);
    //to stelnw sto server. Me to axios 
    await axios.post('/uploadfile',pinakas);
   
    console.log("test3");
}

//FOR ADMIN DELETE
async function deleteFile() {

    var answer = window.confirm("You are about to delete all pois, are you sure?");
    if (answer) {
        axios.post('/deletefile')
        .then(function(response) {
            alert('All pois deleted');
        }).catch(function(error) {
            alert(error);
        });
         
    }
    
}

//FOR ADMIN UPDATE
async function updateFile() {
    var oldpoinameElement = document.getElementById('oldpoiname');
    var oldpoinameValue = oldpoinameElement.value;

    var newpoinameElement = document.getElementById('newpoiname');
    var newpoinameValue = newpoinameElement.value;

    var newpoitypesElement = document.getElementById('newpoitypes');
    var newpoitypesValue = newpoitypesElement.value;

    var newpoicoordinateslatElement = document.getElementById('newpoicoordinateslat');
    var newpoicoordinateslatValue = newpoicoordinateslatElement.value;

    var newpoicoordinateslngElement = document.getElementById('newpoicoordinateslng');
    var newpoicoordinateslngValue = newpoicoordinateslngElement.value;

    var newpoipopulartimesElement = document.getElementById('newpoipopulartimes');
    var newpoipopulartimesValue = newpoipopulartimesElement.value;

    var ChangeData = {
        oldpoiname: oldpoinameValue,
        poiname: newpoinameValue,
        poitypes: newpoitypesValue,
        poicoordslat: newpoicoordinateslatValue,
        poicoordslng: newpoicoordinateslngValue,
        poipopulartimes: newpoipopulartimesValue,
    };

    console.log(ChangeData);

    const serverResponse = await axios.post('/updatefile', ChangeData);
    console.log(serverResponse.data);
  
}


//GO TO GRAPHS
async function goto_graphs(){
    window.location.href = '/graphs';
}


async function viewvisitors() {
    
    let serverResponsevisitors = await axios.post('/viewvisitors');
   
    //console.log(serverResponsevisitors.data.length);
    document.getElementById("name").innerHTML = serverResponsevisitors.data.length;
    //return serverResponsevisitors;
    
}


