//UPLOAD FOR COVID FORM
async function submitcase() {
   try {
        covidform_upload();
        alert('Case submitted');
    }catch(error){
        console.log("error,",error);
    }    
}


async function covidform_upload() {
    var username = document.getElementById('Username').value;
    var firstname = document.getElementById('Firstname').value;
    var lastname = document.getElementById('Lastname').value;
    
    var input = document.getElementById("exampleInputDate").value;
    var dateEntered = new Date(input);

    let caseinfo = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        date: dateEntered,
    }

    let response = await axios.post('/covidformupload', caseinfo)
    alert('Case submitted');
    console.log(response);
}