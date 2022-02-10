//FOR REGISTER
async function Register() {
    var emailElement = document.getElementById('exampleInputEmail1');
    var emailValue = emailElement.value;
    
    var usernameElement = document.getElementById('exampleInputUsername1');
    var usernameValue = usernameElement.value;

    var passwordElement = document.getElementById('exampleInputPassword1');
    var passwordValue = passwordElement.value;


    var RegisterData = {
        username: usernameValue,
        password: passwordValue,
        email: emailValue,
    };

    console.log(RegisterData);


    const serverResponse = await axios.post('/registerscript', RegisterData); // milame me ton server, stelnontas tou ena POST request 
    console.log(serverResponse.data);

}

var check = function() {
if (document.getElementById('exampleInputPassword1').value == document.getElementById('exampleInputConfPassword1').value && document.getElementById('exampleInputEmail1').value !='' && document.getElementById('exampleInputUsername1').value !='') {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching';
    document.getElementById("myBtn").disabled = false;
} else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
    document.getElementById("myBtn").disabled = true;
}}

function verifyPassword() { 
      var password = document.getElementById('exampleInputPassword1').value;  
      const decimal= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g;
      if(password.match(decimal)){
          return true;
      }
      else{
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Must contain at least 8 characters, 1 capital letter, and 1 special character'
        return false;
      }}

async function Registeruser() {
    if (verifyPassword()){
        Register();
        window.location.href = '/mainpage';
    }
    else {}
}
