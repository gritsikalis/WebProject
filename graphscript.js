async function viewvisitors() {
    
  let serverResponsevisitors = await axios.post('/viewvisitors');
 
  console.log(serverResponsevisitors.data.length);
  document.getElementById("name").innerHTML = serverResponsevisitors.data.length;
  //return serverResponsevisitors;
  
} 

async function viewcases() {
    
  let serverResponsevisitors = await axios.post('/viewcases');
 
  console.log(serverResponsevisitors.data.length);
  document.getElementById("cases").innerHTML = serverResponsevisitors.data.length;
  //return serverResponsevisitors;
  
} 

async function viewactivecases() {

  let serverResponsevisitors = await axios.post('/viewactivecases');

  console.log(serverResponsevisitors.data.length);
  document.getElementById("activecases").innerHTML = serverResponsevisitors.data.activeCases;
}