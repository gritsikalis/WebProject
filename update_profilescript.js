//UPDATE PROFILE
async function updateprofile() {
    if (verifyPassword()){
        profile_page();
        alert('Οι αλλαγές αποθηκεύτηκαν επιτυχώς!');
    }
    else {}    
}

async function profile_page() {
    var usernameElement = document.getElementById('exampleInputUsername1');
    var usernameValue = usernameElement.value;

    var newusernameElement = document.getElementById('exampleInputNewUsername1');
    var newusernameValue = newusernameElement.value;

    var passwordElement = document.getElementById('exampleInputPassword1');
    var passwordValue = passwordElement.value;

    var newpasswordElement = document.getElementById('exampleInputNewPassword1');
    var newpasswordValue = newpasswordElement.value;

    var ChangeData = {
        usr: usernameValue,
        pswd: passwordValue,
        username: newusernameValue,
        password: newpasswordValue,
    };

    console.log(ChangeData);

    const serverResponse = await axios.post('/update_profilecript', ChangeData);
        console.log(serverResponse.data);
}

var check = function() {
    if (document.getElementById('exampleInputNewPassword1').value == document.getElementById('exampleInputConfNewPassword1').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
        document.getElementById("myBtn").disabled = false;
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
        document.getElementById("myBtn").disabled = true;
    }
}

function verifyPassword() { 
      var password = document.getElementById('exampleInputPassword1').value;  
      const decimal= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g;
      if(password.match(decimal)){
          return true;
      }
      else{
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Must contain at least 8 characters, 1 capital letter, and 1 special character';
        return false;
      }
}

async function istoriko() {

    var usernameElement = document.getElementById('exampleInputUsername1');
    var usernameValue = usernameElement.value;

    var istorikoData = {
        usr: usernameValue
    };
    document.getElementById('exampleInputUsername1', istorikoData);


    const resp = await axios.post('/istoriko');
    document.getElementById('exampleInputUsername1').innerHTML=resp.data;
    console.log(resp.data);
}