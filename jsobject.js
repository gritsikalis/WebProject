let object = {
    key: 'value',  
    key1: 'value',

    a: 1,
    b: 2,
    c: 3,

    array1: ['john', 'jeny', 'joe'],
    array2: [1,2,3, 'test', 'tost'],
    array3: [1,2,3, ['john', 'jeny', 'joe'], [4465465456,645645]],

    user: {
        username: 'user1',
        pass: '1234',
        phone: '12465745344'
    },

    users: [
            {
              username: 'user1',
              password: '1234',
              email: 'user1@gmail.com',
              isAdmin: 0,
              userId: 1
            },
            {
              username: 'user2',
              password: '1234',
              email: 'user2@gmail.com',
              isAdmin: 0,
              userId: 2
            },
            {
              username: 'user3',
              password: '1234',
              email: 'user3@gmail.com',
              isAdmin: 1,
              userId: 3
            },
            {
              username: 'user3fwds',
              password: '1234',
              email: 'undefined',
              isAdmin: 0,
              userId: 4
            },
            {
              username: 'test1234',
              password: ';lksdfljksdlkjdsflkj',
              email: 'undefined',
              isAdmin: 0,
              userId: 5
            },
            {
              username: 'user3fwds',
              password: '1234',
              email: 'undefined',
              isAdmin: 0,
              userId: 6
            },
            {
              username: 'test1234',
              password: ';lksdfljksdlkjdsflkj',
              email: 'req.body.email@gmail.co,m',
              isAdmin: 0,
              userId: 7
            },
            {
              username: 'test1234',
              password: ';lksdfljksdlkjdsflkjfsdfsdf',
              email: 'req.body.email@gmail.co,m',
              isAdmin: 0,
              userId: 8
            },
            {
              username: 'test1234',
              password: ';lksdfljksdlkjdsflkjfsdfsdf',
              email: 'req.body.email@gmail.com',
              isAdmin: 0,
              userId: 9
            }
    ]

}


const users= object.users;

//console.log(users);

let problematicUsers=[];
for(i=0; i<users.length; i++){
    const user = users[i];
    
    if(user.email == 'undefined' || user.email == undefined ||  user.email == ''){
        problematicUsers.push(user.userId)
    }
}

console.log(problematicUsers);
//ZHTAME TOUS XRISTES ME EMAIL undefined

// 8elw olous tous user apo ton pinaka users ara { users.filter(user) }  
//oi opoioi { => } 
// plhroun auta ta kritiria {user.email == 'undefined' || user.email == undefined ||  user.email == ''}
let undefinedUsers = users.filter(user => user.email == 'undefined' || user.email == undefined ||  user.email == '');

//twra exoume ena pinaka me undeinfed users.

//gia ka8e user (user[i]) apo ton pinaka users; kane to user.emai = "kati.."
undefinedUsers.map(user => user.email = "O xristis den edwse to email tou");
console.log(undefinedUsers);





let specificUser = users. find(x=> x.email="user1@gmail.com");
console.log(specificUser);





{/* <script>
    async function fetchData(){
        const serverResponse = await axios.get('https://random-data-api.com/api/users/random_user?size=10'); // milame me ton  https://random-data-api.com

        const data = serverResponse.data
        console.log(data);
    } 
</script> */}