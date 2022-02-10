//FOR LOGIN
async function login(){
    var usernameElement = document.getElementById('exampleInputEmail1');
    var usernameValue = usernameElement.value;

    var passwordElement = document.getElementById('exampleInputPassword1');
    var passwordValue = passwordElement.value;

    var loginData = {
        username: usernameValue,
        password: passwordValue,
    };

    console.log(loginData);

    const serverResponse = await axios.post('/loginscript', loginData); // milame me ton server, stelnontas tou ena POST request 
    console.log(serverResponse.data);

    if (serverResponse.data == 'success, go to mainpage') {
        window.location.href = '/mainpage?#';
    }
    else if(serverResponse.data == 'success, go to admin'){
        window.location.href = '/admin';
    }
    else {
        alert('Η σύνδεση απέτυχε');
        window.location.href = '/login';
    }
}
