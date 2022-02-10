//GET POI INFORMATION
async function getpoisvisited(){

    var username = document.getElementById('Username').value;

    let user = {
        username: username
    }

    let response = await axios.post('/getpois',user);
    console.log(response.data[0].poi);

    console.log(response.data.length);


    const arr = new Array();

    for (let i = 0; i<response.data.length; i++) {

        const listElement = document.createElement("li");
        const el = response.data[i].poi;
        const val = el.value
        arr.push(val);
        el.value = null;
        listElement.textContent = arr[i];
        document.body.appendChild(listElement);  
    }  
}